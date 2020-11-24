<template>
  <div>
    <section
      class="products-header-section"
      style="
        background-image: url('/images/white-wine-gallery-header-image.png');
      "
    >
      <div class="header-text">
        <h1 class="text">White Wine</h1>
        <div class="header-underline"></div>
      </div>
    </section>
    <ProductsMiniNavbar />
    <section class="products-showcase-section">
      <GalleryProduct v-for="product in products" :key="product.id" :product="product" />
    </section>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
import ProductsMiniNavbar from "~/components/ProductsMiniNavbar.vue";
import GalleryProduct from "~/components/GalleryProduct.vue";
import { ProductItemState } from "~/store/product_item_store";

@Component({
  components: {
    ProductsMiniNavbar,
    GalleryProduct,
  },
})
export default class WhiteWinePage extends Vue {
	pageCategory: string = "WHITE";

  async fetch() {
    await this.$store.dispatch("product_item_store/fetchProductItemsByCategory", {
      category: this.pageCategory,
    });
  }

  get productItemState(): ProductItemState {
    return this.$store.state.product_item_store as ProductItemState;
  }

  get products() {
    //@ts-ignore
    return this.productItemState.categoryPaginationData[this.pageCategory].content || [];
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/styles/pages/products/index";
</style>