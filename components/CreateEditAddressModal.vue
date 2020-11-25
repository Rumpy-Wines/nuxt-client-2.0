<template>
  <div>
    <modal ref="modal" @modal-close="$emit('modal-close')">
      <template v-slot:modal-header-text
        ><slot name="modal-header-text"> Create/Edit Address </slot></template
      >
      <div>
        <form ref="form" action="" class="form" @submit.prevent="submitForm()">
          <div class="form-group">
            <div class="input-group span-2">
              <label for="" class="label"
                >Address Title *
                <span class="text-muted"
                  >(A name given to the address by you to easily remember, eg,
                  Home School)</span
                ></label
              >
              <input
                type="text"
                class="form-control"
                name="title"
                ref="titleInput"
				required
                placeholder="Eg. Home, School Address"
              />
            </div>
            <div class="input-group span-2">
              <label for="" class="label">Street Address *</label>
              <input
                required
                ref="streetAddressInput"
				name="streetAddress"
                type="text"
                class="form-control"
                placeholder="Doe"
              />
            </div>
            <div class="input-group">
              <label for="" class="label">City *</label>
              <input
                required
                ref="cityInput"
				name="city"
                type="text"
                class="form-control"
                placeholder="Ilorin"
              />
            </div>
            <div class="input-group">
              <label for="" class="label">State</label>
              <select
                ref="stateSelect"
                name="state"
                id=""
                class="form-control"
                required
              >
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
              <input
                type="text"
                class="form-control"
                placeholder="Rhema Chapel"
				ref="landmarkInput"
				@keypress.enter="addLandmark()"
              />
            </div>
            <div class="input-group span-2">
              <div class="landmarks">
                <div
                  class="landmark"
                  v-for="landmark in landmarks"
                  :key="landmark"
                >
                  {{ landmark }} &nbsp;
                  <i  @click="removeLandmark(landmark)" class="delete-button fas fa-times"></i>
                </div>
              </div>
			  <div class="text-color-error text-size--6 m-t-3" v-if="landmarkError">
				  {{landmarkError}}
			  </div>
            </div>
          </div>
          <div class="actions-container">
            <button type="submit" class="submit-button"><slot name="submit-button-text">Create/Update</slot></button>
          </div>
        </form>
      </div>
    </modal>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
import Modal from "~/components/Modal.vue";
import _ from "lodash";

@Component({
  components: {
    Modal,
  },
})
export default class CreateEditAddressModal extends Vue {
  @Prop()
  address: any;

  landmarks: Array<string> = [];
  submitting: boolean = false;
  landmarkError: string = "";

  mounted() {
    if (Object.keys(this.address).length > 0) {
      this.landmarks = _.clone(this.address.landmarks) || [];
      (this.$refs.titleInput as HTMLInputElement).value = this.address.title;
      (this.$refs.streetAddressInput as HTMLInputElement).value = this.address.streetAddress;
      (this.$refs.cityInput as HTMLInputElement).value = this.address.city;
      (this.$refs.stateSelect as HTMLInputElement).value = this.address.state;
    }
  }

  submitForm() {
	  event?.preventDefault()

	  if(this.landmarks.length == 0)
		  this.landmarkError = "The landmarks cannot be left empty. Click <Enter> after typing your value";
		  

	  let formData = new FormData((this.$refs.form as HTMLFormElement))
	  //@ts-ignore
	  formData.append("landmarks", this.landmarks)
	  formData.append("isDefault", this.address.isDefault || false)

	  if(this.address.id){
		  formData.set("id", this.address.id)
	  	this.updateAddress(formData)
	  }else{
		  this.createAddress(formData)
	  }
  }

  createAddress(formData : FormData) {
	  this.$store.dispatch("address_store/createAddress", {formData})
	  	.then(() => {
			  this.$toast.open({
				  message: "Address updated successfully.",
				  type: "success",
				  position: "bottom"
			  })
			  this.close()
		  })
  }

  updateAddress(formData: FormData) {
	  this.$store.dispatch("address_store/updateAddress", {formData})
	  	.then(() => {
			  this.$toast.open({
				  message: "Address updated successfully.",
				  type: "success",
				  position: "bottom"
			  })
			  this.close()
		  })
  }

  addLandmark() {
	  event?.preventDefault()
	  event?.stopImmediatePropagation()
	  event?.stopPropagation()

	  let landmarkInput : HTMLInputElement = (this.$refs.landmarkInput as HTMLInputElement)
	  this.landmarks.push(landmarkInput.value)
	  landmarkInput.value = ""
  }

  removeLandmark(landmark: string){
	  let index = this.landmarks.findIndex((el: string) => el == landmark)
	  if(index < 0) return

	  this.landmarks.splice(index, 1)
  }

  close(){
		(this.$refs.modal as Modal).close()
	}
}
</script>

<style lang="scss" scoped>
@import "~assets/styles/components/modal_forms";
</style>