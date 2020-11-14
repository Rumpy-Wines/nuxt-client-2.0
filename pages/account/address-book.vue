<template>
  <div class="">
    <div class="mini-heading heading-light">
      <span>Address Book</span>
      <div class="underline"></div>
    </div>
    <create-edit-address-modal
      v-if="showCreateEditAddressModal"
      @modal-close="showCreateEditAddressModal = false"
    />
    <div class="light-cards-container">
      <light-card
        v-for="i in 5"
        :key="i"
        @icon-clicked="showCreateEditAddressModal = true"
      >
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

        <div class="status-container">
          <span v-if="i == 2" class="active"
            ><i class="fas fa-circle"></i> Active</span
          >
          <span v-else><i class="fas fa-circle"></i> Set as default</span>
          <span class="remove-button"
            ><i class="fas fa-trash-alt"></i> Remove Address</span
          >
        </div>
      </light-card>
    </div>
    <div class="add-address-button-container">
      <button class="add-address-button" @click="showCreateEditAddressModal = true">
        <i class="fas fa-plus"></i> Add New Address
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import LightCard from "~/components/LightCard.vue";
import CreateEditAddressModal from "~/components/CreateEditAddressModal.vue";

@Component({
  components: { LightCard, CreateEditAddressModal },
  layout: "account",
})
export default class AddressBook extends Vue {
  showCreateEditAddressModal: boolean = false;

  goToPage(path: string) {
    if (this.$nuxt.$route.fullPath == path) return;

    this.$nuxt.$router.push(path);
  }
}
</script>

<style lang="scss">
@import "~assets/styles/pages/account/index.scss";

.add-address-button-container {
  padding-top: 2rem;
  padding-bottom: 1rem;
  display: flex;
  justify-content: center;
  .add-address-button {
    background: $accent-1;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 0.5rem 1rem;
  }
}
</style>