import { defineStore } from 'pinia';
import { ItemDetail } from "@/types/Works";

export const selectedImageStore = defineStore('selectedImage', {
  state: () => ({
    selectedImage: null as ItemDetail | null
  }),
  persist: true,
  actions: {
    setSelectedImage(data: ItemDetail){
      this.selectedImage = data;
    }
  }
});
