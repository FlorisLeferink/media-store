<template class="h-full">
  <div class="py-4 bg-black px-4 flex flex-col h-full">
    <div class="flex flex-col items-center">
      <h1 class="text-DullWhite text-3xl">Your wishlist:</h1>
    </div>
    <div class="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
      <div v-for="media in this.wishlist" :key="media">
        <movieShowcase :mediaId="media"></movieShowcase>
      </div>
    </div>
    <div class="flex flex-col items-center py-44">
      <h1 v-if="wishCount == 0" class="text-DullWhite text-3xl">
        No media added to wishlist!
      </h1>
    </div>
  </div>
</template>

<script>
import movieShowcase from "./../components/MovieShowcase.vue";
import store from "./../store";

export default {
  components: { movieShowcase },
  data() {
    return {
      wishlist: store.state.wishlist,
      wishCount: store.state.wishlist.length,
    };
  },
};
</script>
