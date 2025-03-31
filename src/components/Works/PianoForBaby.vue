<template>
    <v-app class="w-100">
        <v-breadcrumbs :items="breadItems" color="primary"></v-breadcrumbs>
        <h1 class="text-center mt-3">{{ storeSelectedImage.selectedImage.title }}</h1>

        <div>
            <h2>概要説明</h2>
            <v-row>
                <v-col cols="7">
                    <h3>{{ storeSelectedImage.selectedImage.des }}</h3>
                    <li class="li_none">⭐️ いつも持ち歩いているスマホで遊べる！</li>
                    <li class="li_none">⭐️ 楽譜が読めなくても文字を追うだけで曲が弾ける！</li>
                    <li class="li_none">⭐️ 楽しく遊びながら鍵盤の位置を覚えられる！</li>
                    <br>
                    <p>動作環境：iPhone</p>
                    <p>対象年齢：3歳以上</p>
                    <br>
                    <h3>遊び方</h3>
                    <ol class="numbered-list">
                        <li class="ml-5">遊びたい曲を選ぶ</li>
                        <li class="ml-5">「ドレミ」または「CLAP」の文字が、鍵盤または右端部分に表示されます<br>順にタップしていくと、選んだ曲を弾くことができます</li>
                    </ol>
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
                    <p>
                        まだ幼い姪っ子がピアノの絵本で楽しそうに遊んでいたものの、
                        <br>
                        休符の部分を無視して弾いていた点が気になり、
                        <br>
                        わかりやすく理解してもらえるようにUnityでオリジナルのアプリを制作
                    </p>
                    <br>
                    <li>環境：Mac</li>
                    <li>使用ソフト：{{ storeSelectedImage.selectedImage.tech }}</li>
                    <li>ソースコード：
                        <a :href="storeSelectedImage.selectedImage.code" target="_blank"
                            rel="noopener noreferrer">GitHub<v-icon icon="mdi-open-in-new" size="x-small" /></a>
                        <br><span class="pl-5 " />※容量の制限範囲内からはみ出していたのでScriptsのみ
                    </li>
                    <li>制作期間：1ヶ月</li>
                </v-col>
                <v-col cols="5">
                    <v-img :src="storeSelectedImage.selectedImage.img_list[1].src" @click="imageClick(1)" />
                </v-col>
            </v-row>
            <hr>
            <v-row>
                <v-col cols="12">
                    <h3>こだわりポイント</h3>
                    <li>「休符＝鍵盤を叩かない」と覚えてもらうために、鍵盤の他に「CLAP」のボタンを追加</li>
                    <li>まだスマホのタップ操作が不慣れな子だったので、<br><span class="pl-5 " />ボタンが押された時に音がなるように設定（PointerDown）</li>
                    <li>まずは白い鍵盤のみ、かつ1オクターブ内で収まる簡単な曲を設定</li>
                </v-col>
            </v-row>
            <hr>
            <v-row>
                <v-col cols="8">
                    <h3>学習ポイント</h3>
                    <p class="font-weight-bold">【 設定ファイル(JSONの)設計 】</p>
                    <p>業務で設定ファイルの設計にてこづったため、コツを掴むために練習・整理した</p>
                    <br>
                    <p class="font-weight-bold">＊ 採用した案</p>
                    <p>同じ構造にまとめて、1つのリストにした<br>→ 整っていて読みやすい、情報の塊がわかりやすく読み取る際もわかりやすい</p>
                    <br>
                    <p class="font-weight-bold">＊ 他に考えた案</p>
                    <li>曲名をkeyに設定する<br><span class="pl-5 " />→ 曲名が長い場合、読み取る際のコードが汚くなりそうなので、却下
                    </li>
                    <li>曲名と楽譜部分をそれぞれ分けてリスト化<br><span class="pl-5 " />→ 記載ミスで情報の紐付けバグが生まれそうなので、却下</li>
                    <br>
                    <p class="font-weight-bold">結論、DBのような表の形式を意識するとよさそう</p>
                    <br>

                </v-col>
                <v-col cols="4">
                    <v-img :src="storeSelectedImage.selectedImage.img_list[2].src" @click="imageClick(2)" />
                </v-col>
            </v-row>
            <hr>
            <v-row>
                <v-col cols="12">
                    <h3>今後の改善ポイント</h3>
                    <li>弾き終わった後終わったことが分かりにくかったので、<br><span class="pl-5 " />全ての文字を表示するかTOP画面に自動で戻るようにする</li>
                    <br>
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
      href: '/myPortfolio/Works/'+storeSelectedImage.selectedImage.img_list[0].alt
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