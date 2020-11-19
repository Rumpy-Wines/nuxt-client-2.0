<template>
  <div class="gallery-product">
	  <div class="image" @click="goToPage('/products/id')"></div>
	  <div class="text">
		  <div class="name" @click="goToPage('/products/id')">Bonny doon von cigare de greece.</div>
		  <div class="year">1998</div>
		  <div class="address">Rosé from Cotes de provence south, France</div>
		  <div class="rating-container">
			  <div class="rating-box">
				  <i class="icon fas fa-star"></i>
				  <span>4.0</span>
			  </div>
			  <div class="rating-count"> 27 Ratings</div>
		  </div>
		  <div class="alcohol-content">15% Alcohol content.</div>
		  <div class="price">NGN 29,999</div>
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
	goToPage(path : string) {
		event?.preventDefault()

		if(this.$nuxt.$route.fullPath == path) return

		this.$nuxt.$router.push(path)
	}
}
</script>

<style lang="scss">
@import '~assets/styles/components/gallery_product';
</style>