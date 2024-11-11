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

export const useLinesStore = defineStore('linesStore', () => {
  const lines = ref([]);
  const linesLoaded = ref(false);
  const authStore = useAuthStore();

  let linesCollectionRef;
  let linesCollectionQuery;
  let linesSnapshot = null;

  const getLineContentById = computed(() => {
    return (id) => {
      return lines.value.find((line) => line.id === id).content;
    };
  });

  const getLines = async () => {
    linesCollectionRef = collection(db, 'users', authStore.user.uid, 'lines');
    linesCollectionQuery = query(linesCollectionRef, orderBy('date', 'desc'));

    // const querySnapshot = await getDocs(collection(db, 'notes'));
    // querySnapshot.forEach((doc) => {
    //   let note = {
    //     id: doc.id,
    //     content: doc.data().content
    //   };
    //   notes.value.push(note);
    // });



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
    const currentDate = new Date().getTime().toString();
    linesLoaded.value = false
    // const note = {
    //   id: currentDate,
    //   content: noteContent
    // };

    //notes.value.unshift(note);

    await addDoc(linesCollectionRef, { content: lineContent, date: currentDate }).then(() => {
      linesLoaded.value = true
    })
  };

  const deleteLine = async (lineId) => {
    linesLoaded.value = false

    await deleteDoc(doc(linesCollectionRef, lineId)).then(() => {
      getLines().then(() => {
        linesLoaded.value = true
      })
    })
  };

  const updateLine = async (id, content) => {
    linesLoaded.value = false

    await updateDoc(doc(linesCollectionRef, id), {
      content
    }).then(() => {
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
    clearLines
  };
});
