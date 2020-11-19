<template>
	<div id="cart-page">
		<div class="cart-items-container">
			<cart-item v-for="i in 9" :key="i" />
		</div>
		<div class="total-container display-flex justify-content-fe m-t-4">
			<div class="total-card ">Total: <span class="value">NGN 529,999</span></div>
		</div>
		<div class="checkout-button-container display-flex justify-content-fe m-t-2">
			<button class="checkout-button">Proceed To Checkout</button>
		</div>
	</div>
</template>

<script lang="ts">
import {Vue, Component} from "nuxt-property-decorator";
import CartItem from '~/components/CartItem.vue';

@Component({
	components: {
		CartItem
	}
})
export default class CartPage extends Vue{

}
</script>

<style lang="scss">
@import '~assets/styles/pages/cart';
</style>