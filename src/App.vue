<template>
  <div id="app">
       <top-header></top-header>
    <router-view/>
  </div>
</template>
<script>
import Header from "./components/Top-Header";
export default {
  components: {
    "top-header": Header
  },
  data() {
    return {
      blah: "erik"
    };
  }
};
</script>
<style>

</style>
