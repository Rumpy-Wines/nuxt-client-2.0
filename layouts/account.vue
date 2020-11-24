<template>
  <div>
    <Navbar />
    <div id="account-layout-content">
      <Sidebar />
      <div id="page-container" v-if="$auth.loggedIn">
        <Nuxt />
      </div>
      <div id="page-container" class="unauthenticated" v-else>
        <i class="icon fas fa-exclamation-triangle"></i>
        <span class="header">Login Required</span>
        <button class="login-button" @click="$nuxt.$emit('login-needed')">Login/Register</button>
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
  async fetch() {
    await this.$store.dispatch("cart_store/cartItemCount");
  },
};
</script>
<style lang="scss" scoped>
@import "~assets/styles/variables";
@import "~assets/styles/include-media";

#account-layout-content {
  height: calc(var(--viewport-height) - #{$navbar-height});
  padding: 0.5rem 2rem;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  overflow: hidden;

  @include media("<=desktop") {
    padding: 0.5rem 1rem;
  }

  @include media("<=tablet") {
    grid-template-columns: 1fr;
    overflow: unset;
    height: unset;
  }
  @include media("<=600px") {
    padding: 0.5rem;
  }
}

#page-container {
  background: white;
  border-radius: 5px;
  box-shadow: 0px 4px 10px rgba($dark, 0.15);
  padding: 1rem;
  // width: 100%;
  overflow: hidden;
  overflow-y: auto;
  @include media("<=tablet") {
    // overflow: unset;
  }

  &.unauthenticated {
    display: flex;
    align-items: center;
	justify-content: center;
	flex-direction: column;
	color: rgba($dark, 0.8);

    @include media("<=tablet") {
      min-height: calc(var(--viewport-height) - #{$navbar-height} - 5rem);
	}
	
	.icon {
		font-size: 5rem;
		margin-bottom: 0.8rem;
	}
	.header {
		font-size: 2rem;
		margin-bottom: 1rem;
	}
	.login-button {
		color: white;
		background: rgba($dark, 0.8);
		border: none;
		border-radius: 5px;
		padding: 0.5rem 1rem;
	}
  }
}
</style>
