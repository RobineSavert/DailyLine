import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import {
  getDocs,
  collection,
  onSnapshot,
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
  query,
  orderBy,
  limit
} from 'firebase/firestore';
import {auth, db} from '../js/firebase';
import { useAuthStore } from './AuthStore';
import {useMessageStore} from "@/stores/MessagesStore";

export const useLinesStore = defineStore('linesStore', () => {
  const lines = ref([]);
  const linesLoaded = ref(false);
  const authStore = useAuthStore();
  const messageStore = useMessageStore();
  let linesCollectionRef;
  let linesCollectionQuery;
  let linesSnapshot = null;


  const getLineById = computed(() => {
    return (id) => {
      return lines.value.find(line => line.id === id);
    };
  });

  const getLineContentById = computed(() => {
    return (id) => {
      return lines.value.find((line) => line.id === id).content;
    };
  });

  const getLines = async () => {
    linesCollectionRef = collection(db, 'users', authStore.user.uid, 'lines');
    linesCollectionQuery = query(linesCollectionRef, orderBy('date', 'desc'));




    linesSnapshot = onSnapshot(linesCollectionQuery, (querySnapshot) => {
      let linesData = [];
      linesLoaded.value = false;
      querySnapshot.forEach((doc) => {
        let line = {
          id: doc.id,
          content: doc.data().content,
          date: doc.data().date
        };
        linesData.push(line);
      });

      lines.value = linesData;
      linesLoaded.value = true;
    });
  };

  const clearLines = () => {
    lines.value = [];
    if (linesSnapshot) linesSnapshot();
  };

  const totalLinesCount = computed(() => {
    return lines.value.length;
  });

  const totalCharactersCount = computed(() => {
    let count = 0;
    for (let line of lines.value) {
      count += line.content.length;
    }
    return count;
  });

  const addLine = async (lineContent) => {
    const currentDate = new Date().toISOString();
    linesLoaded.value = false;

    await addDoc(linesCollectionRef, { content: lineContent, date: currentDate }).then(() => {
      messageStore.addMessage(0,{ title: 'lines.add_line_success' });
      linesLoaded.value = true;
    });
  };


  const deleteLine = async (lineId) => {
    linesLoaded.value = false

    await deleteDoc(doc(linesCollectionRef, lineId)).then(() => {
      getLines().then(() => {
        messageStore.addMessage(0,{ title: 'lines.delete_line_success' });
        linesLoaded.value = true
      })
    })
  };

  const updateLine = async (id, content) => {
    linesLoaded.value = false

    await updateDoc(doc(linesCollectionRef, id), {
      content
    }).then(() => {
      messageStore.addMessage(0,{ title: 'lines.edit_line_success' });
      linesLoaded.value = true
    })
  };


  const getLineByDate = computed(() => {
    return (timestamp) => {
      return lines.value.find((line) => parseInt(line.date) === timestamp) || null;
    };
  });

  return {
    lines,
    updateLine,
    getLineContentById,
    addLine,
    deleteLine,
    totalCharactersCount,
    totalLinesCount,
    getLines,
    getLineByDate,
    linesLoaded,
    clearLines,
    getLineById
  };
});
