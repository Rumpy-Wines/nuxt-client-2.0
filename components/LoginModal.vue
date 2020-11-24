<template>
  <div style="position: absolute">
	  <modal ref="modal" @modal-close="$emit('modal-close')">
		  <template v-slot:modal-header-text>Login</template>
		  <div class="form-container">
			  <form action="" class="form" @submit.prevent="login()">
				  <div class="form-group">
					  <div class="input-group span-2">
						  <label for="" class="label">Email *</label>
						  <input ref="emailInput" required type="email" class="form-control" placeholder="janedoe@example-mail.com">
					  </div>
					  <div class="input-group span-2">
						  <label for="" class="label">Password *</label>
						  <input ref="passwordInput" required type="password" class="form-control" placeholder="Password">
					  </div>
				  </div>
				  <div v-if="errorMessage" class="font-size--4 text-color-error m-t-3">{{errorMessage}}</div>
				  <div class="actions-container display-flex justify-content-center">
					  <button  type="submit" class="submit-button">Login</button>
				  </div>
			  </form>
			  <div class="display-flex justify-content-sb other-actions">
				  <span class="font-size--4 text-color-success cursor-pointer">Forgot Password</span>
				  <span class="font-size--4 cursor-pointer" @click="goToRegister()">No account? <span class="text-color-callout">Sign-up</span></span>
			  </div>
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
export default class LoginModal extends Vue {
	errorMessage : string = "";
	submitting: boolean = false;

	goToRegister(){
		this.$emit('go-to-register')
	}
	login() {
		event?.preventDefault()

		if(this.submitting) return

		let email: string = (this.$refs.emailInput as HTMLInputElement).value
		let password: string = (this.$refs.passwordInput as HTMLInputElement).value

		if(!email || !password)
			return

		this.errorMessage = ""

		this.submitting = true
		this.$store.dispatch("login", {email, password})
		.then(() => {
			this.close()
			this.$toast.open({
				message: "Login successfull",
				position: "bottom",
				type: "success"
			})
		})
			.catch(err => {
				if(err.message){
					this.errorMessage = err.message
					console.log(this.errorMessage)
				}
			}).finally(() => {
				this.submitting = false
			})
	}
	close(){
		(this.$refs.modal as Modal).close()
	}
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/components/modal_forms';
</style>