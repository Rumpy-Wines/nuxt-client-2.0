<template>
  <div>
    <Navbar />
    <div id="account-layout-content">
      <Sidebar />
      <div id="page-container">
        <Nuxt />
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import Sidebar from "~/components/Sidebar";

export default {
  components: {
    Navbar,
    Footer,
    Sidebar,
  },
};
</script>
<style lang="scss" scoped>
@import '~assets/styles/variables';
@import '~assets/styles/include-media';

	#account-layout-content {
		height: calc(var(--viewport-height) - #{$navbar-height});
		padding: 1rem 2rem;
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 1rem;
		overflow: hidden;

		@include media('<=desktop') {
			padding: 1rem;
		}

		@include media('<=tablet'){
			grid-template-columns: 1fr;
			overflow: unset;
			height: unset;
		}
		@include media('<=600px') {
			padding: 0.5rem;
		}
	}
	
	#page-container {
		background: white;
		border-radius: 5px;
		box-shadow: 0px 4px 10px rgba($dark, 0.15);
		padding: 1rem;
	}
</style>
