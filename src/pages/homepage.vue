<template>
  <div v-if="dataLoaded" class="px-4 space-y-4 bg-Black">
    <div v-for="col in collection" v-bind:key="col">
      <div class="py-2">
        <h1
          @click="routeToGenre(col.genre)"
          class="text-center text-xl text-DullWhite hover:text-SubText"
        >
          {{ col.genre }} ({{ col.count }})
        </h1>
        <h2 class="text-center text-DullWhite">Featured media:</h2>
      </div>

      <div
        class="
          grid grid-cols-2
          gap-6
          place-items-center
          sm:grid-cols-3
          md:grid-cols-4
        "
      >
        <!-- For some reason the API has put the id of the movie/series inside of a string and is not stored seperatly. -->
        <movieShowcase
          v-for="index in 4"
          :key="index"
          :mediaId="
            col.idArr[getFeaturedMovieId(parseInt(col.count))].id.replace(
              'http://data.entertainment.tv.theplatform.eu/entertainment/data/ProgramAvailability/',
              ''
            )
          "
        ></movieShowcase>
      </div>
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
      collection: [
        { genre: "Action", count: 0, idArr: [] },
        { genre: "Comedy", count: 0, idArr: [] },
        { genre: "Thriller", count: 0, idArr: [] },
        { genre: "War", count: 0, idArr: [] },
        { genre: "Romance", count: 0, idArr: [] },
        { genre: "Drama", count: 0, idArr: [] },
        { genre: "Crime", count: 0, idArr: [] },
        { genre: "Documentary", count: 0, idArr: [] },
        { genre: "Horror", count: 0, idArr: [] },
      ],
      dataLoaded: false,
    };
  },
  mounted() {
    for (let i = 0; i < this.collection.length; i++) {
      let str =
        "https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas?form=json&lang=en&range=1-9999&fields=id&$tags&byTags=genre:" +
        this.collection[i].genre;
      fetch(str)
        .then((response) => response.json())
        .then((data) => {
          this.collection[i].count = data.entryCount;
          this.collection[i].idArr = data.entries;
          this.dataLoaded = true;
        })
        .catch((err) => console.log(err));
    }
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
  },
};
</script>
