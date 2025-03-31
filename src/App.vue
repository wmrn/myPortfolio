<template>
  <v-app>
    <!-- 目次 -->
    <v-navigation-drawer v-model="drawer">
      <div class="w-100 d-flex justify-end">
        <v-spacer />
        <v-icon icon="mdi-close" class="mr-4 mt-5" @click.stop="drawer = !drawer" />
      </div>
      <v-list>
        <v-list-item title="ホーム" to="/" class="pl-10" />
        <v-list-item title="自己紹介" class="pl-10" to="/Profile" />
        <v-list-item title="制作物まとめ" class="pl-10" to="/Works" />
      </v-list>
      <v-img absolute class="gradient" />
    </v-navigation-drawer>

    <!-- ヘッダー -->
    <v-app-bar color="light-blue-darken-3" :image="headerImage" :elevation="2" scroll-behavior="hide">
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </template>
      <v-app-bar-title>初めまして、和田毬那です</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-card class="d-flex justify-center align-center px-4 scrollable-content">
        <router-view />
      </v-card>

    </v-main>

    <v-divider />
    <v-footer>
      <v-row>
        <v-col>
          <p class="text-caption">© 2025 Marina Wada &nbsp; 全ての文章・画像の転載をお断りします </p>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import headerImage from '/images/header.jpg';

// data
const drawer = ref(false);
</script>

<style scoped>
.gradient {
  background: linear-gradient(to top left, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.9)380px, rgba(255, 255, 255, 1)), url('/images/header.jpg');
  background-size: cover;
}

.scrollable-content {
  /* 横スクロールを許可 */
  overflow-x: auto;
  /* 子要素が折り返されないようにする */
  white-space: nowrap;
}
</style>

<style>
h1,
h2 {
  color: rgb(var(--v-theme-primary));
}
</style>