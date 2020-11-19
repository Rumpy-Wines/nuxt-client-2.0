<template>
  <div>
	  <modal @modal-close="$emit('modal-close')">
		  <template v-slot:modal-header-text>Crate/Edit Address</template>
		  <div>
			  <form action="" class="form">
				  <div class="form-group">
					  <div class="input-group span-2">
						  <label for="" class="label">Address Title * <span class="text-muted">(A name given to the address by you to easily remember, eg, Home School)</span></label>
						  <input type="text" class="form-control" placeholder="Eg. Home, School Address">
					  </div>
					  <div class="input-group span-2">
						  <label for="" class="label">Street Address *</label>
						  <input type="text" class="form-control" placeholder="Doe">
					  </div>
					  <div class="input-group">
						  <label for="" class="label">City *</label>
						  <input type="text" class="form-control" placeholder="Ilorin">
					  </div>
					  <div class="input-group">
						  <label for="" class="label">State</label>
						  <select name="" id="" class="form-control" required>
							  <option value="" disabled selected>Select State</option>
							  <option value="Kwara">Kwara</option>
							  <option value="Lagos">Lagos</option>
							  <option value="Niger">Niger</option>
						  </select>
					</div>
				  </div>
				  <div class="divider"></div>
				  <div class="form-group">
					  <div class="input-group span-2">
						  <label for="" class="label">Landmarks</label>
						  <input type="email" class="form-control" placeholder="Rhema Chapel">
					  </div>
					  <div class="input-group span-2">
						<div class="landmarks">
							<div class="landmark">Roemich International School &nbsp; <i class="delete-button fas fa-times"></i></div>
							<div class="landmark">White Gold Guest House &nbsp; <i class="delete-button fas fa-times"></i></div>
							<div class="landmark">Redeem Church &nbsp; <i class="delete-button fas fa-times"></i></div>
						</div>

					  </div>
				  </div>
				  <div class="actions-container">
					  <button  type="submit" class="submit-button">Create</button>
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
export default class CreateEditAddressModal extends Vue {}
</script>

<style lang="scss" scoped>
@import '~assets/styles/components/modal_forms';
</style>