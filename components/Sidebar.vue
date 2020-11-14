<template>
  <div id="sidebar" :class="{collapsed: collapsed}" ref="sidebar">
	  <div ref="listIcon" class="list-icon" @click="collapsed = false">
		  <i class="fas fa-list-ul"></i>
	  </div>
	  <div class="navs">
		  <div class="nav" :class="{active: $nuxt.$route.path == '/account'}" @click="goToPage('/account')">
			  <i class="fas fa-user-alt"></i><span class="text">Profile</span>
		  </div>
		  <div class="nav" :class="{active: $nuxt.$route.path == '/account/address-book'}" @click="goToPage('/account/address-book')">
			  <i class="fas fa-book"></i><span class="text">Address Book</span>
		  </div>
		  <div class="nav" :class="{active: $nuxt.$route.path == '/account/orders'}" @click="goToPage('/account/orders')">
			  <i class="fas fa-dolly"></i><span class="text">Orders</span>
		  </div>
		  <div class="nav" :class="{active: $nuxt.$route.path == '/account/change-password'}" @click="goToPage('/account/change-password')">
			  <i class="fas fa-user-lock"></i><span class="text">Change Password</span>
		  </div>
		  <div class="nav logout">
			  <i class="fas fa-plug"></i><span class="text">Logout</span>
		  </div>
	  </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from "vue-property-decorator";

@Component({
	
})
export default class Sidebar extends Vue {
	collapsed : boolean = true;

	documentTouchStartEventListener(event: any) {
		let eventPath = event.path
		let sidebar : HTMLElement = this.$refs.sidebar as HTMLElement
		let listIcon : HTMLElement = this.$refs.listIcon as HTMLElement

		if(eventPath.some((el : HTMLElement) => el == listIcon || el == sidebar)) return

		this.collapsed = true
	}

	mounted() {
		console.log("Mounted")
		document.addEventListener('touchstart', this.documentTouchStartEventListener)
		document.addEventListener('click', this.documentTouchStartEventListener)
	}

	goToPage(path: string) {
	  if (this.$nuxt.$route.fullPath == path) return;
      this.$nuxt.$router.push(path);
	}
	
	@Watch('$route')
	totalChanged(to: any, from : any) {
		if(to.fullPath == from.fullPath) return

		this.collapsed = true
	}
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/components/sidebar';
</style>