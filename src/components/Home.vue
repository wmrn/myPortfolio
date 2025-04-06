<template>
  <v-app class="w-100">
    <v-card variant="text">
      <v-img :src="logo" class="ripples_effect" />
      <div  class="overlay-text">和田</div>
    </v-card>
    <v-card variant="text">
      <h2>最近の活動</h2>
      <v-card v-for="(item, index) of leastItem.slice(0, 5)" :key="index" width="25%" min-width="200px" class="ma-1"
        @click="clickedCard(item.img_list[0].alt)">
        <v-card-item>
          <v-img :src=item.img_list[0].src />
          <h3 class="text-center">{{ item.title }}</h3>
          <p>{{ item.des }}</p>
        </v-card-item>
      </v-card>
    </v-card>
    <br>
  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import logo from '/images/header.jpg';
import { useRouter } from 'vue-router';
import { selectedImageStore } from '@/stores/selectedImage';
import { ItemDetail } from "@/types/Works";

import $ from 'jquery';
import 'jquery.ripples';

// data
let copyData = null;
const router = useRouter();
const storeSelectedImage = selectedImageStore();
const leastItem = ref<ItemDetail[]>([]);

// mounted
onMounted(async () => {
  const setting = await fetch('/myPortfolio/images/Works/setting.json');
  copyData = JSON.parse(JSON.stringify(await setting.json())).data;//ディープコピー

  for (const item of copyData) {
    if (item.type == "long") {
      let path = "/myPortfolio/images/Works/" + item.img_list[0].alt + "/";
      for (const i of item.img_list) {
        i.src = path + i.src;
      }
      leastItem.value.unshift(item);
    }
  }

  // Ripplesエフェクトを適用
  $('.ripples_effect').ripples({
    resolution: 512,
    dropRadius: 20, // 波紋の半径
    perturbance: 0.04, // 波紋の揺れ具合
  });
})

//function
const clickedCard = ((name: string) => {
  const index = copyData.findIndex((item: ItemDetail) => item.img_list[0].alt == name);
  storeSelectedImage.setSelectedImage(copyData[index]);
  router.push('/Works/' + copyData[index].img_list[0].alt);
})

</script>
<style scoped>
h1,
h2 {
  background-color: aliceblue;
  margin: 20px 0 5px 0;
}

h3 {
  color: rgb(var(--v-theme-primary)) !important;
}

p {
  white-space: normal;
}

.ripples_effect {
  position: relative;
  overflow: hidden; /* 必須 */
}

.overlay-text {
  position: absolute;
  top: 50%; /* 縦方向の中央揃え */
  left: 50%; /* 横方向の中央揃え */
  transform: translate(-50%, -50%); /* 中央揃えの補正 */
  color: white; /* 文字色 */
  font-size: 1.5rem; /* 文字サイズ */
  font-weight: bold; /* 太字 */
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.7); /* 文字の影 */
  pointer-events: none; /* クリックを無効化 */
}
</style>