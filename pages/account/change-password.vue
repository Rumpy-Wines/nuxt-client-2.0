<template>
  <div id="change-password-page">
    <div class="mini-heading heading-light">
      <span class="text">Change Password</span>
      <div class="underline"></div>
    </div>
    <div class="form-container">
      <form action="" class="form">
        <div class="input-group">
          <label class="form-label" for="">Current Password *</label>
          <input
            type="password"
            class="form-control"
            placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxx"
          />
        </div>
        <div class="form-group">
          <div class="input-group">
            <label class="form-label" for="">New Password *</label>
            <input
              type="password"
              class="form-control"
              placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxx"
            />
          </div>
          <div class="input-group">
            <label class="form-label" for="">New Password Confirmation *</label>
            <input
              type="password"
              class="form-control"
              placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxx"
            />
          </div>
        </div>
        <div class="submit-button-container">
          <button class="submit-button">Change Password</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  layout: "account",
  fetchOnServer: false
})
export default class ChangePasswordPage extends Vue {
  goToPage(path: string) {
    if (this.$nuxt.$route.fullPath == path) return;

    this.$nuxt.$router.push(path);
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/styles/variables";
@import "~assets/styles/include-media";

#change-password-page {
  .form-container {
    border: 1px solid rgba($dark, 0.3);
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 1rem;
    padding-right: 1rem;
    .form {
      margin-top: 2rem;
      margin-bottom: 2rem;
      min-width: 70%;
      @include media("<=425px") {
        width: 100%;
      }
      .form-group {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        @include media("<=600px") {
          grid-template-columns: 1fr;
          gap: 0;
        }
      }
      .input-group {
        display: flex;
        flex-direction: column;
        margin-bottom: 1.5rem;

        &:last-child {
          margin-bottom: 0.5rem;
        }
      }
      .form-control {
        width: 100%;
        height: 35px;
        border: 1px solid rgba($dark, 0.39);
        border-radius: 3px;
        background: $back-color;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        font-size: 0.8rem;

        &::placeholder {
          color: #A0A6AD;
        }
      }
      .form-label {
        font-size: 0.8rem;
      }

      .submit-button-container {
        margin-top: 2rem;
        display: flex;
        justify-content: center;
        .submit-button {
          color: white;
          background: $accent-1;
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 3px;
        }
      }
    }
  }
}
</style>