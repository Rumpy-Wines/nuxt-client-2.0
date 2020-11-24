<template>
  <div id="cart-page">
    <div
      class="cart-items-container"
      style="margin-bottom: 2rem"
      v-if="cartItemsLoading"
    >
      <div
        v-for="i in 4"
        :key="i"
        class="__loading-background"
        style="height: 15rem; border-radius: 5px"
      ></div>
    </div>
    <div v-else-if="cartItems.length == 0">
      <div class="cart-empty">
        <i class="icon fas fa-exclamation"></i> <span>Cart is empty</span>
		<button class="button" @click="goToPage('/products')">Continue Shopping</button>
      </div>
    </div>
    <div class="cart-items-container" v-else>
      <cart-item
        :cartItem="cartItem"
        v-for="cartItem in cartItems"
        :key="cartItem.id"
      />
    </div>
    <div
      v-if="!cartItemsLoading && cartItems.length > 0"
      class="total-container display-flex justify-content-fe m-t-4"
    >
      <div class="total-card">
        Total: <span class="value">NGN {{ $formatPrice(totalPrice) }}</span>
      </div>
    </div>
    <div
      v-if="!cartItemsLoading && cartItems.length > 0"
      class="checkout-button-container display-flex justify-content-fe m-t-2"
    >
      <button class="checkout-button" @click="checkout()">
        Proceed To Checkout
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import CartItem from "~/components/CartItem.vue";
import { CartStoreState } from "~/store/cart_store";

@Component({
  components: {
    CartItem,
  },
})
export default class CartPage extends Vue {
  goToPage(path: string) {
    if (path == this.$nuxt.$route.fullPath) return;
    this.$nuxt.$router.push(path);
  }

  get cartItemsLoading() {
    return !(this.$store.state.cart_store as CartStoreState).loaded;
  }

  get cartItems() {
    return (this.$store.state.cart_store as CartStoreState).list;
  }

  get totalPrice() {
    let totalPrice = 0;

    for (let cartItem of this.cartItems) {
      //@ts-ignore
      if (cartItem.isActive) {
        //@ts-ignore
        totalPrice += cartItem.itemCount * cartItem.productItem.pricePerItem;
      }
    }
    return totalPrice;
  }

  checkout() {
    if (!this.$auth.loggedIn) {
      this.$nuxt.$emit("login-needed");
      return;
    }
    this.goToPage("/checkout");
  }
}
</script>

<style lang="scss">
@import "~assets/styles/pages/cart";
</style>