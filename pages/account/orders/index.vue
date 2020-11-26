<template>
  <div>
    <div class="mini-heading heading-light">
      <span class="text">Orders</span>
      <div class="underline"></div>
    </div>

    <div class="orders-container" v-if="$fetchState.pending">
      <div v-for="i in 3" :key="i" class="__loading-background m-b-2" style="height: 15rem; border-radius: 5px;"></div>
    </div>
    <div v-else-if="$fetchState.error">
      <h2>Error fetching orders!</h2>
    </div>
    <div v-else-if="orders.length == 0">
      <h2>No orders yet!</h2>
    </div>
    <div class="orders-container" v-else>
      <order-detail v-for="order in orders" :key="order.id" :order="order" />
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
import OrderDetail from "~/components/OrderDetail.vue";
import {OrderStoreState } from "~/store/order_store";

@Component({
  components: { OrderDetail },
  layout: "account",
})
export default class OrdersPage extends Vue {
  async fetch() {
    await this.$store.dispatch("order_store/fetchAllOrders");
  }

  get orders() {
    return (this.$store.state.order_store as OrderStoreState).list
  }


  goToPage(path: string) {
    if (this.$nuxt.$route.fullPath == path) return;

    this.$nuxt.$router.push(path);
  }
}
</script>
<style lang="scss" scoped>
@import "~assets/styles/pages/account/orders/index";
</style>