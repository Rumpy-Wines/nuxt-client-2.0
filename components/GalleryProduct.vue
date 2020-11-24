<template>
  <div class="gallery-product">
	  <div class="image" :style="{backgroundImage: `url(${displayPhoto})`}" @click="goToPage(`/products/${product.id}`)"></div>
	  <div class="text">
		  <div class="name" @click="goToPage(`/products/${product.id}`)">{{product.name}}</div>
		  <div class="year">{{product.year}}</div>
		  <div class="address">{{product.address}}</div>
		  <div class="rating-container">
			  <div class="rating-box">
				  <i class="icon fas fa-star"></i>
				  <span>{{product.ratingAverage.toFixed(1)}}</span>
			  </div>
			  <div class="rating-count"> {{product.numberOfReviews}} Ratings</div>
		  </div>
		  <div class="alcohol-content">{{product.alcoholContent.toFixed(1)}}% Alcohol content.</div>
		  <div class="price">NGN {{$formatPrice(product.pricePerItem)}}</div>
		  <div class="action-button-container">
			  <button class="button buy-now">Buy Now</button>
			  <button class="button add-to-cart">Add To Cart</button>
		  </div>
	  </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator"

@Component({})
export default class GalleryProduct extends Vue {
	@Prop()
	product: any;

	goToPage(path : string) {
		event?.preventDefault()

		if(this.$nuxt.$route.fullPath == path) return

		this.$nuxt.$router.push(path)
	}

	get displayPhoto() {
		//@ts-ignore
		return process.env.API_URL.replace(/\/+$/, "")
			+ "/product-items/display-photo/"
			+ this.product.imageUrl.replace(/^\/+/, "")
	}
}
</script>

<style lang="scss">
@import '~assets/styles/components/gallery_product';
</style>