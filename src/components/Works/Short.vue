<template>
    <v-card>
        <v-card-title>
            <h2 class="text-center mt-3">{{ selectedImage.title }}</h2>
            <v-icon icon="mdi-close" color="primary" @click="emit('update:isActive', false);" class="close-icon" />
        </v-card-title>

        <v-card-item>
            <!-- 画像表示-->
            <div v-if="selectedImage.youtube == ''">
                <v-carousel hide-delimiters :show-arrows="showArrows" cycle>
                    <v-carousel-item v-for="(item, i) in selectedImage.img_list" :key="i" :src="item.src" contain />
                </v-carousel>
            </div>
            <!--動画表示-->
            <div v-else class="iframe-container">
                <iframe :src="'https://www.youtube.com/embed/' + selectedImage.youtube" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen class="iframe-wrapper"></iframe>
            </div>
        </v-card-item>
        <v-card-text v-html="selectedImage.des" />
        <v-card-text class="pt-0">使用ソフト：{{ selectedImage.tech }}
            <div v-if="selectedImage.code != ''">
                ソースコード：
                <a :href="selectedImage.code" target="_blank" rel="noopener noreferrer">GitHub<v-icon
                        icon="mdi-open-in-new" size="x-small" /></a>
            </div>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { ItemDetail } from "@/types/Works";

// prop
const props = defineProps<{
    selectedImage: ItemDetail;
    isActive: boolean;
}>();

// emit
const emit = defineEmits<{
    (event: "update:isActive", value: boolean): void;
}>();

// computed
const showArrows = computed(() => {
    if (props.selectedImage.img_list.length > 1) {
        return "hover"
    } else {
        return false
    }
});

</script>
<style scoped>
.close-icon {
    position: absolute;
    /* 垂直方向の中央揃え */
    top: 12px;
    /* 右端からの距離を調整 */
    right: 12px;
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
</style>