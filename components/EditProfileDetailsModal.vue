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
					  <div class="input-group email">
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
@import '~assets/styles/variables';
.form {
	margin-top: 1.5rem;
	.divider {
		height: 1px;
		background: rgba($dark, 0.29);
		margin-top: 2rem;
		margin-bottom: 2rem;
	}
	.form-group {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
		row-gap: 1rem;
		.input-group {
			display: flex;
			flex-direction: column;

			&.email {
				grid-column: 1 / span 2;
			}
			.label {
				font-size: 0.8rem;
			}
			.form-control {
				width: 100%;
				height: 35px;
				background: $back-color;
				border: 1px solid rgba($dark, 0.39);
				border-radius: 3px;
				font-size: 0.8rem;
				padding-left: 0.5rem;
				padding-right: 0.5rem;
				&::placeholder {
					color: #A0A6AD;
				}
			}
		}
	}

	.actions-container {
		margin-top: 2rem;
		.submit-button {
			background: $accent-1;
			color: white;
			border: none;
			border-radius: 3px;
			font-size: 1rem;
			padding: 0.5rem 1rem;
		}
	}
}
</style>