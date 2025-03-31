<template>
    <v-app class="w-100">
        <h1 class="text-center">-- 自己紹介 --</h1>
        <div>
            <v-card variant="text">
                <v-card-item>
                    <v-row>
                        <v-col cols="8">
                            <h3>和田毬那（Wada Marina）</h3>
                            <p>アニメ、水が関連するもの、洋菓子が好きです。</p>
                        </v-col>
                        <v-col cols="4">
                            <v-img :src="p_me" width="100%" max-width="350px" />
                        </v-col>
                    </v-row>
                </v-card-item>
            </v-card>
        </div>



        <h2>経歴</h2>
        <v-timeline align="start" side="end">
            <v-timeline-item dot-color="primary">
                <template v-slot:opposite>2021/03</template>
                <v-card variant="text">
                    <v-card-title class="font-weight-black">明治大学大学院 先端数理科学研究科<br>
                        先端メディアサイエンス専攻 修士課程 修了</v-card-title>
                    <v-card-item>
                        <li>研究分野：VR、CGキャラクター、リアクション</li>
                        <li>関連記事：
                            <a href="https://fukuchilab.org/projects-j/speech-karaoke-j" target="_blank"
                                rel="noopener noreferrer">スピーチやプレゼンテーションを話者になりきって<br>追体験できるVR教材の開発</a>
                        </li>
                        <v-carousel hide-delimiters show-arrows="hover" cycle class="my-4 h-auto">
                            <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src" contain />
                        </v-carousel>

                    </v-card-item>
                </v-card>
            </v-timeline-item>
            <v-timeline-item dot-color="primary">
                <template v-slot:opposite>2021/04</template>
                <v-card variant="text">
                    <v-card-title class="font-weight-black">一般企業 総合職 入社</v-card-title>
                    <v-card-item>
                        <p>社内システムの開発・運用・保守</p>
                    </v-card-item>
                </v-card>
            </v-timeline-item>
        </v-timeline>

        <h2>スキル<span class="text-caption">（最終更新：2025/01/01）</span></h2>
        <div>
            <v-card variant="text">
                <v-card-title class="font-weight-bold">言語経験</v-card-title>
                <v-card-text class="li_2">
                    <li class="li_l">Python</li>
                    <li class="li_r">2年半（実務経験での利用あり）</li>
                    <li class="li_l">Vue</li>
                    <li class="li_r">2年（実務経験での利用あり）</li>
                    <li class="li_l">JavaScripts, TypeScripts</li>
                    <li class="li_r">2年（実務経験での利用あり）</li>
                    <li class="li_l">MySQL</li>
                    <li class="li_r">2年（実務経験での利用あり）</li>
                    <li class="li_l">Unity</li>
                    <li class="li_r">2年</li>
                    <li class="li_l">Blender</li>
                    <li class="li_r">1年</li>
                    <li class="li_l">Processing</li>
                    <li class="li_r">1年</li>
                </v-card-text>
            </v-card>
            <v-card variant="text">
                <v-card-title class="font-weight-bold">保有資格</v-card-title>
                <v-card-item>
                    <li>数学検定2級（2012年6月）</li>
                    <li>英検2級（2015年7月）</li>
                    <li>CGクリエイター検定 エキスパート（2021年7月）</li>
                    <li>CGエンジニア検定 エキスパート（2021年11月）</li>
                    <li>Webデザイナー検定 エキスパート（2021年11月）</li>
                    <li>色彩検定2級（2021年12月）</li>
                    <li>paizaランクS達成（2023年2月）</li>
                </v-card-item>
            </v-card>
        </div>


    </v-app>


</template>

<script setup lang="ts">
import { ref } from 'vue';
import p_me from '/images/Profile/me.jpg';
import img1 from '/images/Profile/1.jpg';
import img2 from '/images/Profile/2.jpg';

// data
const items = ref([
    { src: img1 },
    { src: img2 },
]);
</script>

<style scoped>
h1,
h2 {
    background-color: aliceblue;
    margin: 20px 0 5px 0;
}

.li_2 {
    display: grid;
    width: fit-content;
    column-gap: 2em;
    grid-template-columns: repeat(2, auto);
}

.li_r {
    list-style: none;
}
</style>