<template class="">
  <div
    v-if="dataLoaded"
    @click="routeToMovie"
    class="
      px-2
      bg-Black
      w-full
      h-full
      border-2 border-BrightOrange
      rounded-md
      hover:bg-LightBlack
    "
  >
    <div class="flex flex-col justify-between h-full py-2">
      <img
        class="border-2 border-opacity-40 border-BrightOrange"
        :src="imgSrc"
        onerror="this.onerror=null; this.src='/PosterNotFound.jpg'"
      />
      <p class="text-center text-DullWhite">
        {{ this.title }}
      </p>
    </div>
  </div>
</template>

<script>
import router from "./../router/index.js";
import store from "./../store";

export default {
  props: ["mediaId"],
  data() {
    return {
      title: "",
      imgSrc: store.state.defaultImg,
      dataLoaded: false,
    };
  },
  mounted() {
    let str =
      "https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas/" +
      this.mediaId +
      "?form=json&lang=en&fields=title,plprogram$thumbnails";
    fetch(str)
      .then((response) => response.json())
      .then((data) => {
        this.title = data.title;
        //Not all images are suitable as a "logo" and all the movies dont share certain sizes so ive chosen a size that
        //a lot of movies have and fits well.
        try {
          this.imgSrc = data.plprogram$thumbnails["orig-364x250"].plprogram$url;
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => console.log(err));
    this.dataLoaded = true;
  },
  methods: {
    routeToMovie() {
      router.push({
        name: "MovieInfo",
        params: { id: this.mediaId },
      });
    },
  },
};
//orig-364x250
//orig-198x136
</script>
