<template>
  <div>
    <section class="products-header-section">
      <div class="header-text">
        <h1 class="text">Wine Gallery</h1>
        <div class="header-underline"></div>
      </div>
    </section>
    <ProductsMiniNavbar />
    <section class="products-showcase-section" v-if="$fetchState.pending">
      <div
        class="__loading-background"
        style="height: 15rem; border-radius: 5px"
        v-for="i in 4"
        :key="i"
      ></div>
    </section>
	<section class="products-showcase-section" v-else-if="$fetchState.error">
      <h1>Error While loading!!!</h1>
    </section>
    <section class="products-showcase-section" v-else>
      <GalleryProduct v-for="product in products" :key="product.id" :product="product" />
    </section>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
import ProductsMiniNavbar from "~/components/ProductsMiniNavbar.vue";
import GalleryProduct from "~/components/GalleryProduct.vue";
import {ProductItemState} from "~/store/product_item_store";

@Component({
  components: {
    ProductsMiniNavbar,
    GalleryProduct,
  },
})
export default class ProductsPage extends Vue {
  async fetch() {
    await this.$store.dispatch("product_item_store/fetchProductItems", {});
  }

  get productItemState() : ProductItemState{
	  return this.$store.state.product_item_store as ProductItemState
  }

  get products() {
	  return this.productItemState.paginationData.content
  }

  

}
</script>

<style lang="scss" scoped>
@import "~assets/styles/pages/products/index";
</style>