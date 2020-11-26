<template>
  <div class="order-detail">
    <div class="images-container" :class="imageClass">
      <div class="image" :style="{backgroundImage: 'url(\''+ displayPhotoBase + item.imageUrl.replace(/^\/+/, '') +'\')'}" v-for="item in items.slice(0, 4)" :key="item.id"></div>
    </div>
    <div class="content">
      <div class="price">NGN {{ $formatPrice(order.price) }}</div>
      <div class="date">{{ $formatDate(new Date(order.createdAt)) }}</div>
      <div class="order-id">
        <span>Order ID: </span>
        <span class="id">{{ order.orderId }}</span>
      </div>
      <div class="status-container">
        <div class="text">Status:</div>
        <div class="status-tag delivered">{{ order.status }}</div>
      </div>
      <button
        class="view-details-button"
        @click.prevent="goToPage(`/account/orders/${order.id}`)"
      >
        View Details
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";

@Component
export default class OrderDetail extends Vue {
  @Prop()
  order: any;
  get displayPhotoBase() {
    return (
    //@ts-ignore
      process.env.API_URL.replace(/\/+$/, "") + "/product-items/display-photo/"
    );
  }
  goToPage(path: string) {
    event?.preventDefault();
    if (this.$nuxt.$route.fullPath == path) return;

    this.$nuxt.$router.push(path);
  }

  get items() {
    return this.order.customerOrderItems;
  }

  get imageClass() {
    let count = this.items.length;
    if (count >= 4) return {};

    let data = {};

    //@ts-ignore
    data[`contains-${count}`] = true;

    return data;
  }
}
</script>

<style lang="scss">
@import "~assets/styles/components/order_detail";
</style>