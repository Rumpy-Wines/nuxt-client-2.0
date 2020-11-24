<template>
  <div class="cart-item" :class="{ 'not-active': !cartItem.isActive }">
    <div class="image-container">
      <div
        class="image"
        :style="{ backgroundImage: `url('${displayPhoto}')` }"
      ></div>
    </div>
    <div class="content">
      <div class="name">{{ product.name }}</div>
      <div class="year">{{ product.year }}</div>
      <div class="price">NGN {{ $formatPrice(product.pricePerItem) }}</div>
      <div class="questions-responses brief">
        <div class="questions">
          <div class="question">Rating</div>
          <div class="question">Quantity</div>
          <div class="question">Sub-total</div>
        </div>
        <div class="divider"></div>
        <div class="responses">
          <div class="response">
            {{
              product.ratingAverage > 0
                ? product.ratingAverage
                : "No Reviews Yet"
            }}
          </div>
          <div class="response">{{ cartItem.itemCount }}</div>
          <div class="response">
            NGN {{ $formatPrice(product.pricePerItem * cartItem.itemCount) }}
          </div>
        </div>
      </div>
      <div
        class="actions-container align-items-c flex-wrap-wrap display-flex justify-content-sb"
      >
        <select
          class="quantity-input"
          name=""
          id=""
          @change="quantityChanged()"
        >
          <option value="" disabled selected>Quantity</option>
          <option :value="i" v-for="i in product.numberAvailable" :key="i">
            {{ i }}
          </option>
        </select>
        <div class="deep">
          <button
            class="exclude-button"
            @click="setIsActive(false)"
            v-show="cartItem.isActive"
          >
            <i class="icon fas fa-minus"></i>
            Exclude
          </button>
          <button
            class="include-button"
            @click="setIsActive(true)"
            v-show="!cartItem.isActive"
          >
            <i class="icon fas fa-plus"></i>
            Include
          </button>
          <button class="remove-button" @click="removeCartItem()">
            <i class="icon fas fa-trash-alt"></i>
            Remove
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
import _ from "lodash";
import { ToastComponent } from "vue-toast-notification";

@Component
export default class CartItem extends Vue {
  @Prop()
  cartItem: any;

  get product() {
    return this.cartItem.productItem;
  }

  get displayPhoto() {
    return (
      //@ts-ignore
      process.env.API_URL.replace(/\/+$/, "") +
      "/product-items/display-photo/" +
      this.product.imageUrl.replace(/^\/+/, "")
    );
  }

  quantityChanged() {
    let value = parseInt((event?.target as HTMLSelectElement).value);
    let cartItemClone = _.cloneDeep(this.cartItem);
    cartItemClone.itemCount = value;

    if (cartItemClone.itemCount > cartItemClone.productItem.numberAvailable)
      cartItemClone.itemCount = cartItemClone.productItem.numberAvailable;
    this.$store.dispatch("cart_store/updateCartItem", {
      cartItem: cartItemClone,
    });
  }

  setIsActive(isActive: boolean) {
    let cartItemClone = _.cloneDeep(this.cartItem);
    cartItemClone.isActive = isActive;
    this.$store.dispatch("cart_store/updateCartItem", {
      cartItem: cartItemClone,
    });
  }

  removeCartItem() {
    let instance: ToastComponent = this.$toast.open({
      message: "Removing item from cart...",
      type: "info",
      duration: 10000,
      position: "bottom",
      // all of other options may go here
    });
    this.$store
      .dispatch("cart_store/removeCartItem", { cartItem: this.cartItem })
      .then(() => {
        this.$toast.open({
          message: "Item removed",
          type: "success",
          duration: 2000,
          position: "bottom",
          // all of other options may go here
        });
      })
      .finally(() => {
        setTimeout(() => {
          instance.close();
        }, 1000);
      });
  }
}
</script>

<style lang="scss">
@import "~assets/styles/components/cart_item";
</style>