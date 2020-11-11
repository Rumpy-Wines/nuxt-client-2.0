<template>
<div>
	<section class="products-header-section">
		<div class="header-text">
			<h1 class="text">Wine Gallery</h1>
			<div class="header-underline"></div>
		</div>
	</section>
	<ProductsMiniNavbar />
	<section class="products-showcase-section">
		<GalleryProduct v-for="i in 7" :key="i" />
	</section>
</div>
</template>

<script>
import ProductsMiniNavbar from '~/components/ProductsMiniNavbar';
import GalleryProduct from '~/components/GalleryProduct';

export default {
	components: {
		ProductsMiniNavbar,
		GalleryProduct
	}
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/pages/products/index';
</style>