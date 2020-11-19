<template>
  <div class="cart-item">
    <div class="image-container">
      <div class="image"></div>
    </div>
    <div class="content">
      <div class="name">Sauvignon Blanc</div>
      <div class="year">1998</div>
      <div class="price">NGN 239,999</div>
      <div class="questions-responses brief">
        <div class="questions">
          <div class="question">Rating</div>
          <div class="question">Quantity</div>
          <div class="question">Sub-total</div>
        </div>
        <div class="divider"></div>
        <div class="responses">
          <div class="response">Male</div>
          <div class="response">1</div>
          <div class="response">NGN 239,999</div>
        </div>
      </div>
      <div class="actions-container align-items-c flex-wrap-wrap display-flex justify-content-sb">
        <select class="quantity-input" name="" id="">
          <option value="" disabled selected>Quantity</option>
          <option :value="i" v-for="i in 5" :key="i">{{i}}</option>
        </select>
        <div class="deep">
          <button class="exclude-button">
            <i class="icon fas fa-minus"></i>
            Exclude
          </button>
          <!-- <button class="include-button">
            <i class="icon fas fa-plus"></i>
            Include
          </button> -->
          <button class="remove-button">
            <i class="icon fas fa-trash-alt"></i>
            Remove
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "~assets/styles/components/cart_item";
</style>