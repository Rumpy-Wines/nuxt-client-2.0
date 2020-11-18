<template>
  <div id="track-order-page">
    <div class="header">
      <i @click="$nuxt.$router.back()" class="back-icon fas fa-arrow-left"></i>
      <div class="mini-heading heading-light">
        <span class="text">Order Item ID: davex-adasdadsfadsfadsfa</span>
        <div class="underline"></div>
      </div>
    </div>

    <div class="order-brief">
      <div class="questions-responses">
        <div class="questions">
          <div class="question">Order Item ID</div>
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
    <div class="item-details">
      <div class="image-container">
        <div class="image"></div>
      </div>
      <div class="content">
        <div class="name">Saugvignon Blanc</div>
        <div class="year">1998</div>
        <div class="address">Rosé from Cotes de provence south, France</div>
        <div class="alcohol-content">15% Alcohol Content</div>
        <div class="rating-container">
          <div class="rating-box">
            <i class="fas fa-star icon"></i>
            <span>4.0</span>
          </div>
          <div class="rating-text">27 Ratings</div>
        </div>
        <div class="price">
          NGN 239,999 X 3 <span class="total">= NGN 719,997</span>
        </div>
      </div>
    </div>
    <div class="divider"></div>
    <div class="locations">
      <div class="location" v-for="i in 5" :key="i">
        <div class="track" :class="{'not-active': i>=3}">
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
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";

@Component({
  layout: "account",
})
export default class TrackSingleOrderPage extends Vue {}
</script>

<style lang="scss" scoped>
@import "~assets/styles/pages/account/orders/track_order/index";
</style>