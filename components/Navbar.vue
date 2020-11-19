<template>
  <div ref="navbar" id="navbar" :class="{ expanded: !collapsed }">
    <div class="brand" @click="goToPage('/')">
      <div class="logo"></div>
      <div class="logo-text">
        <span>rumpy </span>
        <span>wines</span>
      </div>
    </div>
    <div ref="hambuger" class="hamburger-container" @click="toggleNavbar()">
      <i class="fas fa-bars"></i>
    </div>
    <!-- <div class="nav-links-container collapsed"> -->
    <div
      ref="navLinkContainer"
      class="nav-links-container"
      :class="{ expanded: !collapsed }"
    >
      <div class="close-button-container">
        <div class="close-button" @click="toggleNavbar()">
          <i class="fas fa-times"></i>
        </div>
      </div>
      <div class="nav-links">
        <div
          class="nav-link"
          @click="goToPage('/products')"
          :class="{ active: $nuxt.$route.path.startsWith('/products') }"
        >
          <i class="icon fas fa-store"></i> Product
        </div>
        <div class="nav-link">
          <i class="icon fas fa-hands-helping"></i> Help Center
        </div>
        <div
          class="nav-link"
          @click="goToPage('/account')"
          :class="{ active: $nuxt.$route.path.startsWith('/account') }"
        >
          <i class="icon fas fa-user-alt"></i> Account
        </div>
        <div class="nav-link">
          <i class="icon fas fa-sign-in-alt"></i> Login
        </div>
        <div class="nav-link">
          <i class="icon fas fa-cart-arrow-down"></i> Cart
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "nuxt-property-decorator";

@Component
export default class Navbar extends Vue {
  collapsed: boolean = true;

  documentTouchStartEventListener(event: any) {
    let eventPath = event.path;
    // debugger
    let navLinkContainer: HTMLElement = this.$refs
      .navLinkContainer as HTMLElement;
    let navbar : HTMLElement = this.$refs.navbar as HTMLElement

    let hambuger : HTMLElement = this.$refs.hambuger as HTMLElement

    if(eventPath.some((el: HTMLElement) => el == hambuger)) return

    if(!this.collapsed && !eventPath.some((el: HTMLElement) => el == navLinkContainer)){
      this.collapsed = true
    }

  }

  mounted() {
    console.log("Mounted");
    document.addEventListener(
      "touchstart",
      this.documentTouchStartEventListener
    );
    document.addEventListener("click", this.documentTouchStartEventListener);
  }

  toggleNavbar() {
    this.collapsed = !this.collapsed;
  }
  goToPage(path: string) {
    if (this.$nuxt.$route.fullPath == path) return;

    this.$nuxt.$router.push(path);
  }

  @Watch("$route")
  routeWatcher(to: any, from: any) {
    if (to.path != from.path) {
      this.collapsed = true;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/styles/components/navbar";
</style>