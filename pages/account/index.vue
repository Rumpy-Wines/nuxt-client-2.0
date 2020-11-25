<template>
  <div>
    <edit-profile-details-modal
      v-if="showEditProfileDetialsModal"
      @modal-close="showEditProfileDetialsModal = false"
    />
    <div class="mini-heading heading-light">
      <span class="text">Account Overview</span>
      <div class="underline"></div>
    </div>
    <div class="light-cards-container">
      <light-card @icon-clicked="showEditProfileDetialsModal = true">
        <template v-slot:header-text>Account Details</template>
        <template v-slot:icon><i class="fas fa-pencil-alt"></i></template>
        <template v-slot:body-header-text>{{user.name || `!!Name Not Set!!`}}</template>
        <div>
          <div class="account-email">{{user.email}}</div>
          <div class="questions-responses">
            <div class="questions">
              <div class="question">Sex</div>
              <div class="question">Phone Number</div>
              <div class="question">DOB</div>
            </div>
            <div class="divider"></div>
            <div class="responses">
              <div class="response">{{genderMap[user.gender] || `!!Unset!!`}}</div>
              <div class="response">{{user.phoneNumber || `!!Unset!!`}}</div>
              <div class="response">{{user.dateOfBirth || `!!Unset!!`}}</div>
            </div>
          </div>
        </div>
      </light-card>
      <light-card @icon-clicked="goToPage('/account/address-book')">
        <template v-slot:header-text>Address Book</template>
        <template v-slot:icon><i class="fas fa-pencil-alt"></i></template>
        <template v-slot:body-header-text>Home Address</template>
        white gold guest house, 8, rail road line, budo giwa, Ilorin Ilorin -
        Gaaakanbi-Asadam-Ganmo, Kwara +234 8094183083

        <div class="landmarks-container">
          <div class="landmarks">
            <div class="landmark">Roemich International School</div>
            <div class="landmark">White Gold Guest House</div>
            <div class="landmark">Redeem Church</div>
          </div>
        </div>
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
  showEditProfileDetialsModal: boolean = false;
  genderMap = {
    MALE: "Male",
    FEMALE: "Female",
    OTHER: "Rather not say"
  }

  goToPage(path: string) {
    if (this.$nuxt.$route.fullPath == path) return;

    this.$nuxt.$router.push(path);
  }

  get user() {
    return this.$auth.user
  }
}
</script>

<style lang="scss">
@import "~assets/styles/pages/account/index.scss";
</style>