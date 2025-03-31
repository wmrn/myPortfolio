<template>
  <div class="pt-5 w-100">
    <ImagesGrid :cols="4" :images="images" :image-style="{ width: '300px', marginBottom: '10px' }" :is-responsive="true"
      col-spaces="20px" object-fit="cover" @onImageClick="onImageClick" />
  </div>

  <!-- 詳細 -->
  <v-dialog v-model="isActive" max-width="600px">
    <WorksShort v-model:selectedImage="selectedImage"
      v-model:isActive="isActive" />
  </v-dialog>

</template>
<script setup lang="ts">
import { ref, onMounted} from "vue";
import ImagesGrid from "vue-images-grid";
import "vue-images-grid/dist/style.css";
import { useRouter } from 'vue-router';
import { selectedImageStore } from '@/stores/selectedImage';
import { Item, ItemDetail } from "@/types/Works";
import jsonData from "@/assets/Works/setting.json";
import WorksShort from "@/components/Works/Short.vue";


// data
const router = useRouter();
const storeSelectedImage = selectedImageStore();
const copyData = JSON.parse(JSON.stringify(jsonData.data));//ディープコピー
const images = ref<Item[]>([]);
const isActive = ref(false);
const selectedImage = ref<ItemDetail>({});

// mounted
onMounted(() => {
  for (const item of copyData) {
    // 画像パスの修正
    let path = "/src/assets/Works/Short/"
    if (item.type == "long") {
      path = "/src/assets/Works/" + item.img_list[0].alt + "/";
    }

    for (const i of item.img_list) {
      i.src = path + i.src;
    }
    images.value.unshift(item.img_list[0]);
  }
})

// function
const onImageClick = (image: Item) => {
  const index = images.value.findIndex((img: Item) => img.src == image.src);
  selectedImage.value = copyData[copyData.length - 1 * (index + 1)];
  if (selectedImage.value.type == "short") {
    isActive.value = true;
  }else{
    storeSelectedImage.setSelectedImage(selectedImage.value);
    router.push('/Works/'+selectedImage.value.img_list[0].alt);
  }
};

</script>
<style scoped></style>