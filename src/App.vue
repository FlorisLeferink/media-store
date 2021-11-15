<template>
  <PageHeader class="bg-Orange"></PageHeader>
  <router-view class="bg-Black"></router-view>
</template>

<script>
import PageHeader from "./components/PageHeader.vue";

export default {
  name: "App",
  components: {
    PageHeader,
  },
};
</script>
