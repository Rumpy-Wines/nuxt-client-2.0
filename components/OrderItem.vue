<template>
  <div class="order-item">
    <div class="image-container">
      <div class="image"></div>
    </div>
    <div class="content">
      <div class="name">Sauvignon Blanc</div>
      <div class="year">1998</div>
      <div class="price">NGN 239,999</div>
      <div class="quantity">Quantity: <span class="value">3</span></div>
      <div class="tag tag-success" v-if="false">Delivered</div>
      <div class="tag tag-progress" v-else>En-route</div>
      <br />
      <button
        class="track-item-button"
        v-if="false"
        @click="goToTrackOrderPage()"
      >
        Track this item
      </button>
      <button
        class="track-item-button resolved"
        v-else
        @click="goToTrackOrderPage()"
      >
        Track this item
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";

@Component
export default class OrderItem extends Vue {
  goToPage(path: string) {
    if (this.$nuxt.$route.fullPath == path) return;

    this.$nuxt.$router.push(path);
  }
  goToTrackOrderPage() {
    this.goToPage(`/account/orders/track-order/asdfasdf`)
  }
}
</script>

<style lang="scss">
@import "~assets/styles/variables";

.order-item {
  background: #ffffff;
  box-shadow: 0px 2px 10px rgba(31, 48, 64, 0.15);

  display: grid;
  grid-template-columns: 6rem 1fr;
  gap: 1rem;
  padding: 1rem;
  .image-container {
    .image {
      width: 100%;
      height: 100%;
      background-image: url("/images/product-wine-example.png");
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
    }
  }
  .content {
    font-size: 0.8rem;
    font-weight: 300;
    .year {
      font-size: 0.75rem;
      color: rgba($dark, 0.69);
      margin-bottom: 0.8rem;
    }

    .price {
      font-weight: 400;
      margin-bottom: 0.5rem;
      font-weight: 0.85rem;
    }

    .quantity {
      font-weight: 400;
      margin-bottom: 0.8rem;
      .value {
        font-weight: 300;
      }
    }

    .track-item-button {
      margin-top: 0.7rem;
      border-radius: 3px;
      background: $accent-1;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      font-size: 0.85rem;
      box-shadow: 0px 2px 5px rgba(31, 48, 64, 0.15);
      &.resolved {
        background: $back-color;
        color: rgba($dark, 0.52);
      }
    }
  }
}
</style>