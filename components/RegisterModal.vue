<template>
  <div style="position: absolute">
    <modal ref="modal" @modal-close="$emit('modal-close')">
      <template v-slot:modal-header-text>Register</template>
      <div class="form-container">
        <form action="" class="form" @submit.prevent="register()">
          <div class="form-group">
            <div class="input-group span-2">
              <label for="" class="label">Email *</label>
              <input
                required
                ref="emailInput"
                type="email"
                class="form-control"
                placeholder="janedoe@example-mail.com"
                :class="{ 'border-color-danger': !!errors.email }"
              />
              <div
                class="text-color-error font-size--5 m-t-1"
                v-if="errors.email"
              >
                <div v-for="error in errors.email" :key="error">
                  {{ error }}
                </div>
              </div>
            </div>
            <div class="input-group span-2">
              <label for="" class="label">Password *</label>
              <input
                required
                ref="passwordInput"
                type="password"
                class="form-control"
                placeholder="Password"
                :class="{ 'border-color-danger': !!errors.password }"
              />
              <div
                class="text-color-error font-size--5 m-t-1"
                v-if="errors.password"
              >
                <div v-for="error in errors.password" :key="error">
                  {{ error }}
                </div>
              </div>
            </div>
            <div class="input-group span-2">
              <label for="" class="label">Confim Password *</label>
              <input
                required
                ref="passwordConfirmationInput"
                type="password"
                class="form-control"
                placeholder="Confirm Password"
                :class="{ 'border-color-danger': !!errors.password }"
              />
            </div>
          </div>
          <div class="actions-container display-flex justify-content-center">
            <button type="submit" class="submit-button">Register</button>
          </div>
        </form>
        <div class="display-flex justify-content-sb other-actions">
          <span class="font-size--4 text-color-success cursor-pointer"
            >Forgot Password</span
          >
          <span class="font-size--4 cursor-pointer" @click="goToLogin()"
            >Have an account?
            <span class="text-color-callout">Login</span></span
          >
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
    Modal,
  },
})
export default class RegisterModal extends Vue {
  registering: boolean = false;
  errors: object = {};

  goToLogin() {
    this.$emit("go-to-login");
  }

  close() {
    (this.$refs.modal as Modal).close();
  }

  register() {
    event?.preventDefault();

    if (this.registering) return;

    let email: string = (this.$refs.emailInput as HTMLInputElement).value;
    let password: string = (this.$refs.passwordInput as HTMLInputElement).value;
    let passwordConfirmation: string = (this.$refs
      .passwordConfirmationInput as HTMLInputElement).value;

    if (!email || !password || !passwordConfirmation) {
      return;
    }

    let data = {
      email,
      password,
      passwordConfirmation,
    };

    this.registering = true;
    this.errors = {};
    this.$store
      .dispatch("register", data)
      .then(() => {
        this.$toast.open({
          message: "Registeration successful",
          type: "success",
          duration: 1000,
          position: "bottom",
          // all of other options may go here
        });
        this.$toast.open({
          message: "Logging in",
          type: "info",
          duration: 1000,
          position: "bottom",
          // all of other options may go here
        });
        this.$toast.open({
          message: "Successfully logged in",
          type: "success",
          duration: 1000,
          position: "bottom",
          // all of other options may go here
		});
		
		this.close()
      })
      .catch((err) => {
        this.errors = err.errors || {};
      })
      .finally(() => {
        this.registering = false;
      });
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/styles/components/modal_forms";
</style>