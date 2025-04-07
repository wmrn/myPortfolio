<template>
  <v-app class="w-100">
    <v-card variant="text" h-50 max-height="250px">
      <v-img h-100 :src="header" class="ripples_effect" />
      <div class="overlay-text">初めまして、和田毬那です</div>
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
import { ref, onMounted,onUnmounted,onActivated,onDeactivated } from 'vue';
import header from '/images/header.jpg';
import { useRouter, onBeforeRouteUpdate } from 'vue-router';
import { selectedImageStore } from '@/stores/selectedImage';
import { ItemDetail } from "@/types/Works";

import $ from 'jquery';
import 'jquery.ripples';

// data
let copyData = null;
const router = useRouter();
const storeSelectedImage = selectedImageStore();
const leastItem = ref<ItemDetail[]>([]);
let intervalId: number;

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

  // 波紋エフェクトの初期設定
  setRipples();
});

// unmounted
onUnmounted(() => {
  // 波紋エフェクトの停止
  clearInterval(intervalId);
  $('.ripples_effect').ripples('stop');
});



//function
const clickedCard = ((name: string) => {
  const index = copyData.findIndex((item: ItemDetail) => item.img_list[0].alt == name);
  storeSelectedImage.setSelectedImage(copyData[index]);
  router.push('/Works/' + copyData[index].img_list[0].alt);
})

// 波紋エフェクトの初期設定
const setRipples = (() => {
  $('.ripples_effect').ripples({
    imageUrl: header, // 背景画像のURL
    resolution: 450,// 重さ、値が大きいほど遅い
    interactive: false, // クリックで波紋を発生させるかどうか
  });

  $('.ripples_effect').ripples('show');
  $('.ripples_effect').ripples('play');

  // 自動的に波紋を発生させる
  intervalId = setInterval(() => {
    const $rippleContainer = $('.ripples_effect');
    const width = $rippleContainer.outerWidth() || 0;
    const height = $rippleContainer.outerHeight() || 0;

    // ランダムな位置に波紋を発生させる
    const dropRadius = 50; // 波紋の半径、小さいと雨、大きいと波
    const perturbance = 0.05; // 波紋の強度、小さいと出だしが目立たないが広がらない
    let x = 0;
    let y = 0;
    if (Math.random()*100 % 2 == 0) {
      x = Math.random() >= 0.5 ? -1 * dropRadius / 2 : width + dropRadius / 2; // 画面外から入るようにする
      y = Math.random() * height;
    } else {
      x = Math.random() * width;
      y = Math.random() >= 0.5 ? -1 * dropRadius / 2 : height + dropRadius / 2; // 画面外から入るようにする
    }

    $rippleContainer.ripples('drop', x, y, dropRadius, perturbance);
  }, 1000); // 1秒ごとに波紋を発生
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
  width: 100%;
  height: auto;
  object-fit: contain; /* アスペクト比を保ちながら表示 */
  aspect-ratio: 16 / 9; /* 必要に応じてアスペクト比を設定 */
  position: relative;
  overflow: hidden; 
}

.overlay-text {
  position: absolute;
  top: 50%;
  /* 縦方向の中央揃え */
  left: 50%;
  /* 横方向の中央揃え */
  transform: translate(-50%, -50%);
  /* 中央揃えの補正 */
  color: white;
  /* 文字色 */
  font-size: 1.5rem;
  /* 文字サイズ */
  font-weight: bold;
  /* 太字 */
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
  /* 文字の影 */
  pointer-events: none;
  /* クリックを無効化 */
}
</style>