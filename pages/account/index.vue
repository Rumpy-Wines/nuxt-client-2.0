<template>
  <div>
    <edit-profile-details-modal v-if="showEditProfileDetialsModal" @modal-close="showEditProfileDetialsModal = false"/>
    <div class="mini-heading heading-light">
      <span>Account Overview</span>
      <div class="underline"></div>
    </div>
    <div class="light-cards-container">
      <light-card @icon-clicked="showEditProfileDetialsModal = true">
        <template v-slot:header-text>Account Details</template>
        <template v-slot:icon><i class="fas fa-pencil-alt"></i></template>
        <template v-slot:body-header-text>Oyinbo David Bayode</template>
        <div>
          <div class="account-email">davexoyinbo@gmail.com</div>
          <div class="questions-responses">
            <div class="questions">
              <div class="question">Sex</div>
              <div class="question">Phone Number</div>
              <div class="question">DOB</div>
            </div>
            <div class="divider"></div>
            <div class="responses">
              <div class="response">Male</div>
              <div class="response">+2348094183083</div>
              <div class="response">14th of October, 1998</div>
            </div>
          </div>
        </div>
      </light-card>
      <light-card>
        <template v-slot:header-text>Address Book</template>
        <template v-slot:icon><i class="fas fa-pencil-alt"></i></template>
        <template v-slot:body-header-text>Home Address</template>
        white gold guest house, 8, rail road line, budo giwa, Ilorin Ilorin -
        Gaaakanbi-Asadam-Ganmo, Kwara +234 8094183083
      </light-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import LightCard from "~/components/LightCard.vue";
import EditProfileDetailsModal from "~/components/EditProfileDetailsModal.vue";

@Component({
  components: { LightCard, EditProfileDetailsModal },
  layout: "account",
})
export default class Account extends Vue {
	showEditProfileDetialsModal : boolean = false;

}
</script>

<style lang="scss">
@import "~assets/styles/pages/account/index.scss";
</style>