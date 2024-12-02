<template>
  <TitleComponent :title="'account.edit_bookcover_title'">
    <template v-slot:buttons>
      <div class="d-flex flex-nowrap justify-content-end">
        <RouterLink :to="{ name: 'account', params: { locale: route.params.locale } }">
          <i class="bi-x-lg me-2" style="font-size: 1.5rem;"></i>
        </RouterLink>
      </div>
    </template>
  </TitleComponent>

  <!-- Display the current book cover if it exists -->
  <div v-if="bookCover">
    <img class="preview" height="268" width="356" :src="bookCover" alt="Current Book Cover" />
  </div>

  <!-- Button to trigger the file input -->
  <ButtonPrimary @click="choosePhoto" :content="'Upload foto'" />

  <!-- Hidden file input for the user to select an image -->
  <input type="file" ref="input1" style="display: none" @change="previewImage" accept="image/*" />

  <!-- Show preview of the selected image before uploading -->
  <div v-if="imageData">
    <img class="preview" height="268" width="356" :src="imageData" />
  </div>

  <!-- Button to save the new image -->
  <ButtonPrimary @click="saveImage" v-if="imageData" :content="'Save Image'" />
</template>

<script setup>
import ButtonPrimary from "@/components/Buttons/ButtonPrimary.vue";
import { ref, onMounted } from "vue";
import { useBookStore } from '@/stores/BookStore';
import TitleComponent from "@/components/TitleComponent.vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";

const imageData = ref(null);  // To hold the preview image
const { uploadAndSaveBookCover, bookCover } = useBookStore();
const { bookCover: currentBookCover } = storeToRefs(useBookStore());
const route = useRoute();
const router = useRouter();

// Fetch the current book cover when the component mounts
onMounted(() => {
  if (!currentBookCover.value) {
    // If there's no book cover, you can trigger a fetch or handle appropriately
  }
});

function choosePhoto() {
  const input = document.querySelector('input[type="file"]');
  input.click();
}

function previewImage(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      imageData.value = reader.result; // Set the image preview
    };
    reader.readAsDataURL(file);
  }
}

async function saveImage() {
  const file = document.querySelector('input[type="file"]').files[0];
  if (file) {
    await uploadAndSaveBookCover(file);
    // After saving, you can navigate back or handle the state
    await router.push({name: 'account', params: {locale: route.params.locale}});
  }
}
</script>
