<template>
  <div class="bg-Black py-2 justify-between items-center flex flex-col h-full">
    <div class="border-2 border-BrightOrange mx-3 py-3 max-w-screen-sm">
      <div>
        <div class="flex flex-col items-center px-2 mb-5">
          <h1 class="text-DullWhite text-3xl">{{ this.title }}</h1>
        </div>
        <div class="grid grid-cols-1 space-y-5 sm:grid-cols-2">
          <div class="space-y-5">
            <div>
              <h1 class="text-DullWhite px-2 text-lg">Description:</h1>
              <p class="text-SubText px-2 text-sm">
                {{ this.description }}
              </p>
            </div>
            <div class="flex flex-col items-center">
              <img
                class="border-2 border-opacity-40 border-BrightOrange"
                :src="imgSrc"
              />
            </div>
          </div>
          <div class="flex flex-col space-y-5">
            <div>
              <h1 class="text-DullWhite px-2 text-lg">Release Year:</h1>
              <p class="text-SubText px-2 text-sm">
                {{ this.releaseYear }}
              </p>
            </div>
            <div>
              <h1
                v-if="creditsActors.length > 1"
                class="text-DullWhite px-2 text-lg"
              >
                Cast members:
              </h1>
              <h1 v-else class="text-DullWhite px-2 text-lg">Cast member:</h1>
              <div class="flex w-full">
                <p class="text-SubText px-2 text-sm">
                  {{ stringifyCredits(this.creditsActors) }}
                </p>
              </div>
            </div>

            <div>
              <h1
                v-if="creditsDirectors.length > 1"
                class="text-DullWhite px-2 text-lg"
              >
                Directors:
              </h1>
              <h1 v-else class="text-DullWhite px-2 text-lg">Director:</h1>
              <p class="text-SubText px-2 text-sm">
                {{ stringifyCredits(this.creditsDirectors) }}
              </p>
            </div>
            <div>
              <h1 v-if="genres.length > 1" class="text-DullWhite px-2 text-lg">
                Genres:
              </h1>
              <h1 v-else class="text-DullWhite px-2 text-lg">Genre:</h1>
              <p class="text-SubText px-2 text-sm">
                {{ stringifyGenres() }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-row space-x-3 px-2 py-8 justify-center">
      <div>
        <button
          v-if="!wishlist.includes(this.$route.params.id)"
          @click="addToWishList"
          class="text-DullWhite rounded bg-blue-500"
        >
          <p class="mx-3 text-2xl">Add to Wishlist</p>
        </button>
        <button
          v-else
          @click="removeFromWishList"
          class="text-DullWhite rounded bg-blue-500"
        >
          <p class="mx-3 text-2xl">Remove from Wishlist</p>
        </button>
      </div>
      <div>
        <button class="text-DullWhite rounded bg-red-500">
          <p class="mx-3 text-2xl">Buy media</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import store from "./../store";
export default {
  props: ["mediaId"],
  data() {
    return {
      title: "",
      description: "",
      imgSrc: store.state.defaultImg,
      releaseYear: "",
      creditsActors: [],
      creditsDirectors: [],
      genres: [],
      wishlist: store.state.wishlist,
    };
  },
  mounted() {
    //Here i have to pull out all info even though i dont need it since it wont send the credits when specifically asked for it.
    let str =
      "https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas/" +
      this.$route.params.id +
      "?form=json&lang=en";
    fetch(str)
      .then((response) => response.json())
      .then((data) => {
        this.title = data.title;
        try {
          this.imgSrc = data.plprogram$thumbnails["orig-364x250"].plprogram$url;
        } catch (err) {
          console.log(err);
        }
        this.description = data.description;
        data.plprogram$credits.forEach((e) => {
          if (e.plprogram$creditType == "actor") {
            this.creditsActors.push(e);
          } else if (e.plprogram$creditType == "director") {
            this.creditsDirectors.push(e);
          }
        });
        data.plprogram$tags.forEach((e) => {
          if (e.plprogram$scheme == "genre") this.genres.push(e);
        });
        this.releaseYear = data.plprogram$year;
        this.credits = data.plprogram$credits;
        this.imgSrc = data.plprogram$thumbnails["orig-364x250"].plprogram$url;
      })
      .catch((err) => console.log(err));
  },
  methods: {
    stringifyGenres() {
      let str = "";
      this.genres.forEach((e) => {
        str += e.plprogram$title + ", ";
      });
      return str.substring(0, str.length - 2);
    },
    stringifyCredits(arr) {
      let str = "";
      arr.forEach((e) => {
        str += e.plprogram$personName + ", ";
      });
      return str.substring(0, str.length - 2);
    },
    addToWishList() {
      store.commit("addItemToWishList", this.$route.params.id);
    },
    removeFromWishList() {
      store.commit("removeItemFromWishList", this.$route.params.id);
    },
  },
};
</script>
