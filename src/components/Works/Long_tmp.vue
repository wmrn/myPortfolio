<template>
    <v-app class="w-100">
        <v-breadcrumbs :items="breadItems" color="primary"></v-breadcrumbs>
        <h1 class="text-center mt-3">{{ storeSelectedImage.selectedImage.title }}</h1>

        <div>
            <h2>概要説明</h2>
            <v-row>
                <v-col cols="7">
                    <h3>{{ storeSelectedImage.selectedImage.des }}</h3>
                </v-col>
                <v-col cols="5">
                    <iframe :src="'https://www.youtube.com/embed/' + storeSelectedImage.selectedImage.youtube"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen class="iframe-wrapper"></iframe>
                </v-col>
            </v-row>
            <h2 class="mt-10">制作メモ</h2>
            <v-row>
                <v-col cols="7">
                    <li>環境：</li>
                    <li>使用ソフト：{{ storeSelectedImage.selectedImage.tech }}</li>
                    <li>ソースコード：
                        <a :href="storeSelectedImage.selectedImage.code" target="_blank"
                            rel="noopener noreferrer">GitHub<v-icon icon="mdi-open-in-new" size="x-small" /></a>
                        <br><span class="pl-5 " />※容量の制限範囲内からはみ出していたのでScriptsのみ
                    </li>
                    <li>制作期間：</li>
                </v-col>
                <v-col cols="5">
                    <v-img :src="storeSelectedImage.selectedImage.img_list[1].src" @click="imageClick(1)" />
                </v-col>
            </v-row>
            <hr>
            <v-row>
                <v-col cols="12">
                    <h3>こだわりポイント</h3>
                </v-col>
            </v-row>
            <hr>
            <v-row>
                <v-col cols="8">
                    <h3>学習ポイント</h3>
                </v-col>
                <v-col cols="4">
                    <v-img :src="storeSelectedImage.selectedImage.img_list[2].src" @click="imageClick(2)" />
                </v-col>
            </v-row>
            <hr>
            <v-row>
                <v-col cols="12">
                    <h3>今後の改善ポイント</h3>
                </v-col>
            </v-row>
        </div>
    </v-app>

    <!-- 画像拡大 -->
    <v-dialog v-model="imgDialogActive" width="70%">
        <v-card>
            <v-card-title>
                <v-icon icon="mdi-close" color="primary" @click="imgDialogActive = false" class="close-icon" />
            </v-card-title>
            <v-card-item><v-img :src="storeSelectedImage.selectedImage.img_list[selectImageIndex].src" /></v-card-item>

        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { selectedImageStore } from '@/stores/selectedImage';

//data
const storeSelectedImage = selectedImageStore();
const breadItems = [
{
      title: '制作物まとめ',
      disabled: false,
      href: '/Works',
    },

{
      title: storeSelectedImage.selectedImage.title,
      disabled: true,
      href: 'Works/'+storeSelectedImage.selectedImage.img_list[0].alt
    },
];
const imgDialogActive = ref(false);
const selectImageIndex = ref(0);

// function
const imageClick = (index: number) => {
    imgDialogActive.value = true;
    selectImageIndex.value = index;
}

</script>
<style scoped>
/* shortと共通 */
.close-icon {
    position: absolute;
    /* 垂直方向の中央揃え */
    top: 12px;
    /* 右端からの距離を調整 */
    right: 12px;

    z-index: 10;
}

.iframe-container {
    display: flex;
    /* 水平方向の中央揃え */
    justify-content: center;
    /* 垂直方向の中央揃え */
    align-items: center;
    /* 必要に応じて高さを調整 */
    height: 100%;
}

.iframe-wrapper {
    width: 100%;
    /* 必要に応じて調整 */
    aspect-ratio: 16 / 9;
    /* アスペクト比を16:9に設定 */
    position: relative;
}

/* long独自 */
h2 {
    background-color: aliceblue;
    margin: 0px 0 10px 0;
}

.li_none {
    list-style: none;
}

.numbered-list {
    /* 数字の箇条書き */
    list-style-type: decimal;
}

hr {
    margin: 20px 0;
    /* デフォルトのボーダーをリセット */
    border: 0;
    /* 上の線に色を設定 */
    border-top: 1px solid rgb(var(--v-theme-primary_light));
    /* 線の太さ */
    height: 1px;
}
</style>