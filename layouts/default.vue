<template>
  <div id="default-layout">
    <Navbar />
    <div id="default-layout-page-container">
      <Nuxt />
    </div>
    <Footer />
  </div>
</template>
<script>
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";

export default {
  components: {
    Navbar,
    Footer,
  },

  async fetch() {
    await this.$store.dispatch("cart_store/cartItemCount");
  },
};
</script>
<style scoped lang="scss">
#default-layout {
  display: flex;
  flex-direction: column;
  min-height: var(--viewport-height);
}

#default-layout-page-container {
  flex: 1;
}
</style>
