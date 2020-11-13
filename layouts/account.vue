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

	#account-layout-content {
		height: calc(var(--viewport-height) - #{$navbar-height});
		padding: 1rem 2rem;
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 1rem;
		overflow: hidden;
	}
	
	#page-container {
		background: white;
		border-radius: 5px;
		box-shadow: 0px 4px 10px rgba($dark, 0.15);
		padding: 1rem;
	}
</style>
