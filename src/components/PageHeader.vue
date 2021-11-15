<template>
  <div class="flex flex-row space-x-4 px-2 py-5">
    <button class="text-3xl text-DullWhite">Fetnlix</button>
    <div id="nav" class="flex flex-row space-x-3 items-end">
      <router-link :to="{ name: 'Home' }" class="hover:text-DullWhite">
        Home
      </router-link>
      <router-link :to="{ name: 'WishList' }" class="hover:text-DullWhite"
        >Wishlist
      </router-link>
    </div>
  </div>
</template>

<style>
#nav a.router-link-exact-active {
  text-decoration: underline;
}
</style>
