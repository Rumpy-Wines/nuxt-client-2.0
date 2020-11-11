<template>
  <div id="products-mini-navbar">
    <div>
      <div class="search form-group">
        <div class="icon">
          <i class="fas fa-search"></i>
        </div>
        <input class="input" type="text" placeholder="search wine..." />
      </div>
    </div>
    <div class="group-2">
      <div class="navs">
        <div class="nav" @click="goToPage('/products')" :class="{active: $nuxt.$route.path == '/products'}">All Wines</div>
        <div class="nav" @click="goToPage('/products/white-wine')" :class="{active: $nuxt.$route.path == '/products/white-wine'}">White Wine</div>
        <div class="nav" @click="goToPage('/products/red-wine')" :class="{active: $nuxt.$route.path == '/products/red-wine'}">Red Wine</div>
        <div class="nav" @click="goToPage('/products/rose-wine')" :class="{active: $nuxt.$route.path == '/products/rose-wine'}">Rosé Wine</div>
        <div class="nav" @click="goToPage('/products/sparkling-wine')" :class="{active: $nuxt.$route.path == '/products/sparkling-wine'}">Sparkling Wine</div>
      </div>
      <button class="filter-button">
        <i class="fas fa-filter"></i>
        <span>Filter</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToPage(path) {
      if (this.$nuxt.$route.fullPath == path) return;

      this.$nuxt.$router.push(path);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~assets/styles/components/products_mini_navbar";
</style>