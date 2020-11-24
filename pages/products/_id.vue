<template>
  <div id="single-product-page">
    <div>
      <section
        class="product-brief"
        style="height: calc(var(--viewport-height) - 110px)"
        v-if="$fetchState.pending"
      >
        <div
          class="right __loading-background"
          style="border-radius: 5px"
        ></div>
        <div class="left __loading-background" style="border-radius: 5px"></div>
      </section>
      <section v-else-if="$fetchState.error">
        <h1>Error loading post!!!</h1>
      </section>
      <section
        class="product-brief"
        v-if="!$fetchState.pending && !$fetchState.error"
      >
        <div class="right">
          <div
            class="image"
            :style="{ backgroundImage: `url('${displayPhoto}')` }"
          ></div>
        </div>
        <div class="left">
          <div class="text">
            <div class="name">{{ product.name }}</div>
            <div class="year">{{ product.year }}</div>
            <div class="address">{{ product.address }}</div>
            <div class="rating-container">
              <div class="rating-box">
                <i class="icon fas fa-star"></i>
                <span>{{ product.ratingAverage.toFixed(1) }}</span>
              </div>
              <div class="rating-count">
                {{ product.numberOfReviews }} Ratings
              </div>
            </div>
            <div class="alcohol-content">
              {{ product.alcoholContent.toFixed(1) }}% Alcohol content.
            </div>
            <div class="price">
              NGN {{ $formatPrice(product.pricePerItem) }}
            </div>
            <div class="action-button-container">
              <button class="button buy-now">Buy Now</button>
              <button class="button add-to-cart">Add To Cart</button>
            </div>
          </div>
        </div>
      </section>

      <section
        class="other-info"
        v-if="!$fetchState.pending && !$fetchState.error"
      >
        <div class="manufacturers-description">
          <div class="mini-heading">
            <span class="text">Manufacturer's Description</span>
            <div class="underline"></div>
          </div>
          <div class="body">
            <p class="description">{{ product.manufacturerDescription }}</p>
          </div>
        </div>
        <div class="info">
          <div class="quick-info">
            <div class="mini-heading">
              <span class="text">Quick Info</span>
              <div class="underline"></div>
            </div>
            <div class="body">
              <div class="questions-responses">
                <div class="questions">
                  <div class="question">Category</div>
                  <div class="question">Origin</div>
                  <div class="question">Alcohol Content</div>
                  <div class="question">Production Year</div>
                  <div class="question">Rating</div>
                </div>
                <div class="divider"></div>
                <div class="responses">
                  <div class="response">{{ category }}</div>
                  <div class="response">{{ product.origin }}</div>
                  <div class="response">
                    {{ product.alcoholContent.toFixed(1) }}%
                  </div>
                  <div class="response">{{ product.year }}</div>
                  <div class="response" v-if="product.numberOfReviews > 0">
                    {{ product.ratingAverage.toFixed(1) }} from
                    {{ product.numberOfReviews }} reviewers
                  </div>
                  <div class="response" v-else>No Reviews yet</div>
                </div>
              </div>
            </div>
          </div>
          <div class="wine-tags">
            <div class="mini-heading">
              <span class="text">Wine Tags</span>
              <div class="underline"></div>
            </div>
            <div class="body">
              <div class="tags">
                <div class="tag" v-for="tag in product.tags" :key="tag">
                  {{tag}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <section class="reviews" v-if="!$fetchState.pending && !$fetchState.error">
      <div class="mini-heading">
        <span class="text">Reviews</span>
        <div class="underline"></div>
      </div>
      <div class="reviews-container" v-if="product.productReviews.length <= 0">
        No Reviews yet
      </div>
      <div class="reviews-container" v-else>
        <Review :review="review" v-for="review in product.productReviews" :key="review.id" />
      </div>
    </section>

    <!-- <section class="product-suggestions" v-if="!$fetchState.pending && !$fetchState.error">
          <GalleryProduct v-for="i in 2" :key="i" />
    </section> -->
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Review from "~/components/Review.vue";
import GalleryProduct from "~/components/GalleryProduct.vue";
import { ProductItemState } from "~/store/product_item_store";

@Component({
  components: {
    Review,
    GalleryProduct,
  },
})
export default class SingleProductPage extends Vue {
  get id() {
    return this.$nuxt.$route.params.id;
  }
  async fetch() {
    await this.$store.dispatch("product_item_store/fetchSingleProductItem", {
      id: this.$nuxt.$route.params.id,
    });
  }
  get productItemState(): ProductItemState {
    return this.$store.state.product_item_store as ProductItemState;
  }

  get product() {
    return this.productItemState.paginationData.content.find(
      (el: any) => el.id == this.id
    );
  }

  get category(): string {
    return (
    //@ts-ignore
      this.productItemState.categoryMap[this.product.category] ||
      "Uncategorized"
    );
  }

  mounted() {}

  get displayPhoto() {
    return (
    //@ts-ignore
      process.env.API_URL.replace(/\/+$/, "") +
      "/product-items/display-photo/" +
      //@ts-ignore
      this.product.imageUrl.replace(/^\/+/, "")
    );
  }

  goToPage(path: string) {
    event?.preventDefault();

    if (this.$nuxt.$route.fullPath == path) return;

    this.$nuxt.$router.push(path);
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/styles/pages/products/id";
</style>