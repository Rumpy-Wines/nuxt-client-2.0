<template>
  <div id="sidebar">
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

@Component({})
export default class Sidebar extends Vue {
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/components/sidebar';
</style>