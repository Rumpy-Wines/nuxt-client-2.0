<template>
  <div id="single-order-page">
    <div class="header">
      <i @click="$nuxt.$router.back()" class="back-icon fas fa-arrow-left"></i>
      <div class="mini-heading heading-light">
        <span class="text">Order ID: davex-adasdadsfadsfadsfa</span>
        <div class="underline"></div>
      </div>
    </div>

    <div class="order-brief">
      <div class="questions-responses">
        <div class="questions">
          <div class="question">Order ID</div>
          <div class="question">Item Count</div>
          <div class="question">Date</div>
          <div class="question">Total</div>
        </div>
        <div class="divider"></div>
        <div class="responses">
          <div class="response">davex-adasdadsfadsfadsfa</div>
          <div class="response">3</div>
          <div class="response">14th of October, 1998</div>
          <div class="response">NGN 239,999</div>
        </div>
      </div>
    </div>

    <div class="divider"></div>

    <div class="order-items-container">
      <order-item v-for="i in 3" :key="i" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
import OrderItem from "~/components/OrderItem.vue";

@Component({
  components: {
    OrderItem,
  },
  layout: "account",
})
export default class SingleOrderPage extends Vue {
  goToPage(path: string) {
    if(path == this.$nuxt.$route.fullPath) return
    this.$nuxt.$router.push(path)
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/styles/pages/account/orders/order_id";
</style>