<template>
  <div>
	  <modal @modal-close="$emit('modal-close')">
		  <template v-slot:modal-header-text>Edit Profile</template>
		  <div>
			  <form action="" class="form">
				  <div class="form-group">
					  <div class="input-group">
						  <label for="" class="label">Last Name *</label>
						  <input type="text" class="form-control" placeholder="Doe">
					  </div>
					  <div class="input-group">
						  <label for="" class="label">First Name *</label>
						  <input type="text" class="form-control" placeholder="Jane">
					  </div>
					  <div class="input-group">
						  <label for="" class="label">Other Name(s)</label>
						  <input type="text" class="form-control" placeholder="Clair">
					  </div>
				  </div>
				  <div class="divider"></div>
				  <div class="form-group">
					  <div class="input-group span-2">
						  <label for="" class="label">Email Address</label>
						  <input type="email" class="form-control" placeholder="janedoe@examplemail.com">
					  </div>
					  <div class="input-group">
						  <label for="" class="label">Phone Number *</label>
						  <input type="text" class="form-control" placeholder="+234 8000000000">
					  </div>
				  </div>
				  <div class="divider"></div>
				  <div class="form-group">
					  <div class="input-group">
						  <label for="" class="label">Gender *</label>
						  <input type="email" class="form-control" placeholder="janedoe@examplemail.com">
					  </div>
					  <div class="input-group">
						  <label for="" class="label">Date OF Birth *</label>
						  <input type="text" class="form-control" placeholder="+234 8000000000">
					  </div>
				  </div>
				  <div class="actions-container">
					  <button  type="submit" class="submit-button">Update</button>
				  </div>
			  </form>
		  </div>
	  </modal>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Modal from "~/components/Modal.vue";

@Component({
	components: {
		Modal
	}
})
export default class EditProfileDetailsModal extends Vue {}
</script>

<style lang="scss" scoped>
@import '~assets/styles/components/modal_forms';
</style>