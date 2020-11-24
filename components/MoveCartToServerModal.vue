<template>
  <div style="position: absolute">
	  <modal>
		  <template v-slot:modal-header-text>Login Alert</template>
		  <div id="move-cart-to-server-modal">
			  <i class="icon fas fa-exclamation"></i>
			  <p class="info-text">
				  There are some items in your cart. Do you want to move then to your account?
			  </p>
			  <div></div>
		  </div>
	  </modal>
  </div>
</template>

<script lang="ts">
import {Vue, Prop, Component} from "nuxt-property-decorator"
import Modal from "~/components/Modal.vue";

@Component
export default class MoveCartToServerModal extends Vue {
	
}
</script>

<style scoped>
#move-cart-to-server-modal {
	
}
</style>