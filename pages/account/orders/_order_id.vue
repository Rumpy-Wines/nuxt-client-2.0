<template>
  <div id="single-order-page">
    <div
      class="__loading-background"
      style="height: 15rem; border-radius: 5px; width: 100%"
      v-if="$fetchState.pending"
    ></div>
    <div v-else-if="$fetchState.error">
      <h2>Error loading page.</h2>
    </div>
    <div v-else>
      <div class="header">
        <i
          @click="$nuxt.$router.back()"
          class="back-icon fas fa-arrow-left"
        ></i>
        <div class="mini-heading heading-light">
          <span class="text">Order ID: {{ order.orderId }}</span>
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
            <div class="response">{{order.orderId}}</div>
            <div class="response">{{items.length}}</div>
            <div class="response">{{$formatDate(new Date(order.createdAt))}}</div>
            <div class="response">NGN {{$formatPrice(order.price)}}</div>
          </div>
        </div>
        <button class="copy-button" @click="copyID()">
          <i class="far fa-copy"></i> <span>Copy Order ID</span>
        </button>
      </div>

      <div class="divider"></div>

      <div class="order-items-container">
        <order-item :orderItem="item" v-for="item in items" :key="item.id" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
import OrderItem from "~/components/OrderItem.vue";
import { OrderStoreState } from "~/store/order_store";

@Component({
  components: {
    OrderItem,
  },
  layout: "account",
})
export default class SingleOrderPage extends Vue {
  async fetch() {
    let id = this.$nuxt.$route.params.order_id;

    await this.$store.dispatch("order_store/fetchSingleOrder", { id });
  }

  get order() : any {
    let id = this.$nuxt.$route.params.order_id;
    return (this.$store.state.order_store as OrderStoreState).list.find(
      (el: any) => el.id == id
    );
  }

  get items() {
    return this.order.customerOrderItems
  }

  copyID() {
    let text = `${this.order.orderId}`;
    navigator.clipboard.writeText(text).then(() => {
      // @ts-ignore
      this.$toast.open({
        message: "Copied!",
        type: "info",
        duration: 2000,
        // all of other options may go here
      });
    });
  }

  goToPage(path: string) {
    if (path == this.$nuxt.$route.fullPath) return;
    this.$nuxt.$router.push(path);
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/styles/pages/account/orders/order_id";
</style>