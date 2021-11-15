<template>
  <div class="py-4 bg-black px-4">
    <div
      class="
        grid grid-cols-2
        gap-6
        sm:grid-cols-3
        md:grid-cols-4
        lg:grid-cols-5
        xl:grid-cols-6
        2xl:grid-cols-7
      "
    >
      <div v-for="media in idArr" :key="media">
        <movieShowcase
          :mediaId="
            media.id.replace(
              'http://data.entertainment.tv.theplatform.eu/entertainment/data/ProgramAvailability/',
              ''
            )
          "
        ></movieShowcase>
      </div>
    </div>
    <div class="flex flex-row space-x-3 px-2 py-8 justify-center">
      <button
        @click="decreaseIndex"
        class="text-DullWhite rounded bg-blue-500 w-1/3"
      >
        <p class="mx-3 text-2xl">Previous</p>
      </button>
      <button
        @click="increaseIndex"
        class="text-DullWhite rounded bg-blue-500 w-1/3"
      >
        <p class="mx-3 text-2xl">Next</p>
      </button>
    </div>
  </div>
</template>

<script>
import movieShowcase from "./../components/MovieShowcase.vue";
import router from "./../router/index.js";

export default {
  components: {
    movieShowcase,
  },
  data() {
    return {
      dataLoaded: false,
      countMin: 1,
      countMax: 20,
      idArr: [],
    };
  },
  mounted() {
    this.Loaddata();
  },
  methods: {
    getFeaturedMovieId(maxNum) {
      return Math.floor(Math.random() * (maxNum - 0 + 1) + 0);
    },
    routeToGenre(genre) {
      router.push({
        name: "MovieGenre",
        params: { genre: genre },
      });
    },
    increaseIndex() {
      this.countMin += 20;
      this.countMax += 20;
      this.idArr = [];
      this.Loaddata();
    },
    decreaseIndex() {
      if (this.countMin > 1) {
        this.countMin -= 20;
        this.countMax -= 20;
        this.idArr = [];
        this.Loaddata();
      }
    },
    Loaddata() {
      let str =
        "https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas?form=json&lang=en&range=" +
        this.countMin +
        "-" +
        this.countMax +
        "&fields=id&$tags&byTags=genre:" +
        this.$route.params.genre;

      fetch(str)
        .then((response) => response.json())
        .then((data) => {
          data.entries.forEach((e) => {
            this.idArr.push(e);
          });
          this.dataLoaded = true;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
