<template>
  <div id="single-product-page">
    <div>
      <section class="product-brief">
        <div class="right">
          <div class="image"></div>
        </div>
        <div class="left">
          <div class="text">
            <div class="name">Bonny doon von cigare de greece.</div>
            <div class="year">1998</div>
            <div class="address">Rosé from Cotes de provence south, France</div>
            <div class="rating-container">
              <div class="rating-box">
                <i class="icon fas fa-star"></i>
                <span>4.0</span>
              </div>
              <div class="rating-count">27 Ratings</div>
            </div>
            <div class="alcohol-content">15% Alcohol content.</div>
            <div class="price">NGN 29,999</div>
            <div class="action-button-container">
              <button class="button buy-now">Buy Now</button>
              <button class="button add-to-cart">Add To Cart</button>
            </div>
          </div>
        </div>
      </section>

      <section class="other-info">
        <div class="manufacturers-description">
          <div class="mini-heading">
            <span class="text">Manufacturer's Description</span>
            <div class="underline"></div>
          </div>
          <div class="body">
            <p class="description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
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
                  <div class="response">Rosé</div>
                  <div class="response">France</div>
                  <div class="response">15%</div>
                  <div class="response">1998</div>
                  <div class="response">4.8 from 119 reviewers</div>
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
                <div class="tag">Perfect With Friends</div>
                <div class="tag">Classic</div>
                <div class="tag">Vineyard Tour</div>
                <div class="tag">Wine Class</div>
                <div class="tag">BYO Wine Party</div>
                <div class="tag">Pairing Dinner</div>
                <div class="tag">Wine Tasting</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <section class="reviews">
      <div class="mini-heading">
        <span class="text">Reviews</span>
        <div class="underline"></div>
      </div>
      <div class="reviews-container">
        <Review v-for="i in 5" :key="i" />
      </div>
    </section>

    <section class="product-suggestions">
      <GalleryProduct v-for="i in 2" :key="i" />
    </section>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Review from "~/components/Review.vue";
import GalleryProduct from "~/components/GalleryProduct.vue";

@Component({
  components: {
    Review,
    GalleryProduct,
  },
})
export default class SingleProductPage extends Vue {
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