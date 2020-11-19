<template>
  <div ref="navbar" id="navbar" :class="{ expanded: !collapsed }">
    <!-- Login Modal -->
    <login-modal ref="loginModal" @go-to-register="goToRegister()" v-if="showLoginModal" @modal-close="showLoginModal = false" />
    <register-modal ref="registerModal" @go-to-login="goToLogin()" v-if="showRegisterModal" @modal-close="showRegisterModal = false" />
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
        <div class="nav-link"  @click="showRegisterModalFunction()">
          <i class="icon fas fa-sign-in-alt"></i> Login / Register
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
import LoginModal from "~/components/LoginModal.vue";
import RegisterModal from "~/components/RegisterModal.vue";
import Modal from '~/components/Modal.vue';

@Component({
  components: {RegisterModal}
})
export default class Navbar extends Vue {
  collapsed: boolean = true;
  showLoginModal: boolean = false;
  showRegisterModal: boolean = false;

  runFunctionAfter(functionToRun: Function, delay: number){
    setTimeout(functionToRun, delay);
  }

  goToRegister() {
    let loginModal : LoginModal | undefined = this.$refs.loginModal as LoginModal | undefined
    if(loginModal != undefined)
      loginModal.close()

    this.runFunctionAfter(this.showRegisterModalFunction, Modal.animationTime)
  }

  goToLogin() {
    let registerModal : RegisterModal | undefined = this.$refs.registerModal as RegisterModal | undefined
    if(registerModal != undefined)
      registerModal.close()
    this.runFunctionAfter(this.showLoginModalFunction, Modal.animationTime)
  }

  collapseNavbar(){
    if(this.collapsed == false) this.collapsed = true
  }

  showRegisterModalFunction(){
    this.collapseNavbar()
    this.showRegisterModal = true
  }
  showLoginModalFunction(){
    this.collapseNavbar()
    this.showLoginModal = true
  }

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