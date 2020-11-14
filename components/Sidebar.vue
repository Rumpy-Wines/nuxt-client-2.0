<template>
  <div id="sidebar" :class="{collapsed: collapsed}" ref="sidebar">
	  <div ref="listIcon" class="list-icon" @click="collapsed = false">
		  <i class="fas fa-list-ul"></i>
	  </div>
	  <div class="navs">
		  <div class="nav active">
			  <i class="fas fa-user-alt"></i><span class="text">Profile</span>
		  </div>
		  <div class="nav">
			  <i class="fas fa-book"></i><span class="text">Address Book</span>
		  </div>
		  <div class="nav">
			  <i class="fas fa-dolly"></i><span class="text">Orders</span>
		  </div>
		  <div class="nav">
			  <i class="fas fa-user-lock"></i><span class="text">Change Password</span>
		  </div>
		  <div class="nav logout">
			  <i class="fas fa-plug"></i><span class="text">Logout</span>
		  </div>
	  </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator";

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
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/components/sidebar';
</style>