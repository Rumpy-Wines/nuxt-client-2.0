<template>
  <div id="track-order-page">
    <div v-if="!$fetchState.pending && !$fetchState.error">
      <div class="header">
        <i
          @click="$nuxt.$router.back()"
          class="back-icon fas fa-arrow-left"
        ></i>
        <div class="mini-heading heading-light">
          <span class="text">Order Item ID: {{orderItem.itemId}}</span>
          <div class="underline"></div>
        </div>
      </div>

      <div class="order-brief">
        <div class="questions-responses">
          <div class="questions">
            <div class="question">Order Item ID</div>
            <div class="question">Date</div>
            <div class="question">Item Count</div>
            <div class="question">Price Per Item</div>
            <div class="question">Total</div>
          </div>
          <div class="divider"></div>
          <div class="responses">
            <div class="response">{{orderItem.itemId}}</div>
            <div class="response">{{$formatDate(new Date(orderItem.createdAt))}}</div>
            <div class="response">{{orderItem.itemCount}}</div>
            <div class="response">NGN {{$formatPrice(orderItem.pricePerItem)}}</div>
            <div class="response">NGN {{$formatPrice(orderItem.pricePerItem * orderItem.itemCount)}}</div>
          </div>
        </div>
        <button class="copy-button" @click="copyID()">
          <i class="far fa-copy"></i> <span>Copy Order Item ID</span>
        </button>
      </div>

      <div class="divider"></div>
      <div class="item-details">
        <div class="image-container">
          <div class="image" :style="{ backgroundImage: `url(${orderItem.imageUrl})` }"></div>
        </div>
        <div class="content">
          <div class="name">{{orderItem.name}}</div>
          <div class="year">{{orderItem.year}}</div>
          <div class="address">{{orderItem.address}}</div>
          <div class="alcohol-content">{{orderItem.alcoholContent.toFixed(1)}}% Alcohol Content</div>
          <div class="rating-container">
            <div class="rating-box">
              <i class="fas fa-star icon"></i>
              <span>{{orderItem.productItem.ratingAverage.toFixed(1)}}</span>
            </div>
            <div class="rating-text">{{orderItem.productItem.numberOfReviews}} Ratings</div>
          </div>
          <div class="price">
            NGN {{$formatPrice(orderItem.pricePerItem)}} X 3 <span class="total">= NGN {{$formatPrice(orderItem.pricePerItem * orderItem.itemCount)}}</span>
          </div>
        </div>
      </div>
      <div class="divider"></div>
      <div class="locations">
        <div class="location" v-for="i in 5" :key="i">
          <div class="track" :class="{ 'not-active': i >= 3 }">
            <div class="circle"></div>
          </div>
          <div class="content">
            <div class="name">Rumpy Warehouse, Ikorodu Lagos</div>
            <div class="full-address">
              Lorem Ipsum Corp. 114 West 17th Street New York, NY 10011, USA +1
              212 229 0906 info@loremipsumcorp.com
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
import { OrderStoreState } from "~/store/order_store";

@Component({
  layout: "account",
  fetchOnServer: false
})
export default class TrackSingleOrderPage extends Vue {
  copyID() {
    let text = this.orderItem.itemId;
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

  async fetch() {
    let id = this.$nuxt.$route.params.order_id;

    await this.$store.dispatch("order_store/fetchOrderItem", { id });
  }


  get orderItem(): any {
    let id = this.$nuxt.$route.params.order_id;
    return (this.$store.state.order_store as OrderStoreState).orderItems.find(
      (el: any) => el.id == id
    );
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/styles/pages/account/orders/track_order/index";
</style>