<template>
  <div>
    <modal @modal-close="$emit('modal-close')">
      <template v-slot:modal-header-text>Edit Profile</template>
      <div>
        <form ref="form" action="" class="form" @submit.prevent="submitForm()">
          <div class="form-group">
            <div class="input-group">
              <label for="" class="label">Last Name *</label>
              <input
                ref="lastNameInput"
                required
                name="lastName"
                type="text"
                class="form-control"
                placeholder="Doe"
              />
            </div>
            <div class="input-group">
              <label for="" class="label">First Name *</label>
              <input
                ref="firstNameInput"
                required
                name="firstName"
                type="text"
                class="form-control"
                placeholder="Jane"
              />
            </div>
            <div class="input-group">
              <label for="" class="label">Other Name(s)</label>
              <input
                ref="otherNamesInput"
                required
                name="otherNames"
                type="text"
                class="form-control"
                placeholder="Clair"
              />
            </div>
          </div>
          <div class="divider"></div>
          <div class="form-group">
            <div class="input-group span-2">
              <label for="" class="label">Email Address</label>
              <input
                ref="emailInput"
                required
                disabled
                type="email"
                class="form-control"
                placeholder="janedoe@examplemail.com"
              />
            </div>
            <div class="input-group">
              <label for="" class="label">Phone Number *</label>
              <input
                ref="phoneNumberInput"
                required
                name="phoneNumber"
                type="text"
                class="form-control"
                placeholder="+234 8000000000"
              />
            </div>
          </div>
          <div class="divider"></div>
          <div class="form-group">
            <div class="input-group">
              <label for="" class="label">Gender *</label>
              <select name="gender" ref="genderSelect" required class="form-control">
                <option value="" disabled selected>Gender</option>
                <option
                  :value="gender"
                  v-for="gender in Object.keys(genderMap)"
                  :key="gender"
                >
                  {{ genderMap[gender] }}
                </option>
              </select>
            </div>
            <!-- <div class="input-group">
              <label for="" class="label">Date OF Birth *</label>
              <input
                ref="dobInput"
                required
                type="text"
                class="form-control"
                placeholder="1998-10-14"
              />
            </div> -->
            <div class="input-group">
              <label for="" class="label">Date OF Birth *</label>
              <date-picker
              :editable="false"
                v-model="dateOfBirth"
                :default-value="user.dateOfBirth"
                value-type="YYYY-MM-DD"
                format="YYYY-MM-DD"
              ></date-picker>
            </div>
          </div>
          <div v-if="dobError" class="text-color-error font-size--4 m-t-4">{{dobError}}</div>
          <div class="actions-container">
            <button type="submit" class="submit-button">Update</button>
          </div>
        </form>
      </div>
    </modal>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Modal from "~/components/Modal.vue";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

@Component({
  components: {
    Modal,
    DatePicker,
  },
})
export default class EditProfileDetailsModal extends Vue {
  dateOfBirth: any = "";
  dobError : string = "";
  submitting: boolean = false;

  genderMap = {
    MALE: "Male",
    FEMALE: "Female",
    OTHER: "Rather not say",
  };
  picker: any;

  get user() {
    return this.$auth.user;
  }

  mounted() {
    (this.$refs.firstNameInput as HTMLInputElement).value =
      this.user.firstName || "";
    (this.$refs.lastNameInput as HTMLInputElement).value =
      this.user.lastName || "";
    (this.$refs.otherNamesInput as HTMLInputElement).value =
      this.user.otherNames || "";
    (this.$refs.emailInput as HTMLInputElement).value = this.user.email || "";
    (this.$refs.phoneNumberInput as HTMLInputElement).value =
      this.user.phoneNumber || "";
    (this.$refs.genderSelect as HTMLSelectElement).value =
      this.user.gender || "";
    this.dateOfBirth = this.user.dateOfBirth;
  }

  submitForm() {
    event?.preventDefault()

    if(this.submitting) return

    this.dobError = ""
    if(!this.dateOfBirth){
      this.dobError = "dateOfBirth field is required"
      return
    }

    let formData = new FormData(this.$refs.form as HTMLFormElement)

    formData.set("dateOfBirth", this.dateOfBirth)

    this.submitting = true
    this.$store.dispatch("setupUser", {formData})
      .then(() => {
        this.$toast.open({
          message: "Record Updated.",
          type: "success",
          duration: 2000,
          position: "bottom"
        })
        this.close()
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
@import "~assets/styles/components/modal_forms";
</style>