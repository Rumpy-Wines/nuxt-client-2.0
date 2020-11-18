<template>
	<div>
    <div class="mini-heading heading-light">
      <span class="text">Orders</span>
      <div class="underline"></div>
    </div>
    <div class="orders-container">
      <order-detail v-for="i in 5" :key="i" />
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import OrderDetail from '~/components/OrderDetail.vue';


@Component({
  components: { OrderDetail },
  layout: "account",
})
export default class OrdersPage extends Vue {
  goToPage(path: string) {
    if (this.$nuxt.$route.fullPath == path) return;

    this.$nuxt.$router.push(path);
  }
}
</script>
<style lang="scss" scoped>
@import '~assets/styles/pages/account/orders/index';
</style>