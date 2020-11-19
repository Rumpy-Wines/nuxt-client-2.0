<template>
  <div class="order-detail">
    <div class="images-container">
      <div class="image" v-for="i in 4" :key="i"></div>
    </div>
    <div class="content">
      <div class="price">NGN 179,999</div>
      <div class="date">22-01-2020</div>
      <div class="order-id">
        <span>Order ID: </span>
        <span class="id">davex-adsnfaiudskfaiusbfaidsufbadskv</span>
      </div>
      <div class="status-container">
        <div class="text">Status:</div>
        <div class="status-tag delivered">Delivered</div>
      </div>
      <button
        class="view-details-button"
        @click.prevent="goToPage(`/account/orders/afvadsfads`)"
      >
        View Details
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class OrderDetail extends Vue {
  goToPage(path: string) {
    event?.preventDefault();
    if (this.$nuxt.$route.fullPath == path) return;

    this.$nuxt.$router.push(path);
  }
}
</script>

<style lang="scss">
@import "~assets/styles/components/order_detail";
</style>