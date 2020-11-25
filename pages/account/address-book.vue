<template>
  <div class="">
    <div class="mini-heading heading-light">
      <span class="text">Address Book</span>
      <div class="underline"></div>
    </div>
    <create-edit-address-modal
      v-if="showCreateEditAddressModal"
      @modal-close="showCreateEditAddressModal = false"
      :address="featuredAddress"
    >
      <template v-slot:modal-header-text>
        <span v-if="create">Create New</span>
        <span v-else>Edit</span> Address</template
      >

      <template v-slot:submit-button-text>
        <span v-if="create">Create</span>
        <span v-else>Update</span></template
      >
    </create-edit-address-modal>

    <div class="light-cards-container" v-if="$fetchState.pending">
      <div
        v-for="i in 3"
        :key="i"
        class="__loading-background"
        style="height: 15rem; border-radius: 5px"
      ></div>
    </div>
    <div v-else-if="$fetchState.error">
      <h2 class="h2 text-align-center">
        An error occurred while fetching addresses
      </h2>
    </div>
    <div class="light-cards-container" v-else-if="addresses.length > 0">
      <light-card
        v-for="address in addresses"
        :key="address.id"
        @icon-clicked="
          create = false;
          showCreateEditAddressModal = true;
          featuredAddress = address;
        "
      >
        <template v-slot:header-text>Address Book</template>
        <template v-slot:icon><i class="fas fa-pencil-alt"></i></template>
        <template v-slot:body-header-text>{{ address.title }}</template>
        {{ address.addressString }}

        <div class="landmarks-container">
          <div class="landmarks">
            <div
              class="landmark"
              v-for="landmark in address.landmarks"
              :key="landmark"
            >
              {{ landmark }}
            </div>
          </div>
        </div>

        <div class="status-container">
          <span v-if="address.isDefault" class="active"
            ><i class="fas fa-circle"></i> Active</span
          >
          <span v-else @click="setAsDefault(address)"
            ><i class="fas fa-circle"></i> Set as default</span
          >
          <span class="remove-button" @click="deleteAddress(address)"
            ><i class="fas fa-trash-alt"></i> Remove Address</span
          >
        </div>
      </light-card>
    </div>
    <div class="light-cards-container empty" v-else>
      <i class="icon fas fa-exclamation"></i>
      <span>Address book is empty</span>
    </div>
    <div
      class="add-address-button-container"
      v-if="!$fetchState.pending || !$fetchState.error"
    >
      <button
        class="add-address-button"
        @click="
          create = true;
          showCreateEditAddressModal = true;
          featuredAddress = {};
        "
      >
        <i class="fas fa-plus"></i> Add New Address.
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import LightCard from "~/components/LightCard.vue";
import CreateEditAddressModal from "~/components/CreateEditAddressModal.vue";
import { AddressStoreState } from "~/store/address_store";
import _ from "lodash";

@Component({
  components: { LightCard, CreateEditAddressModal },
  layout: "account",
})
export default class AddressBook extends Vue {
  showCreateEditAddressModal: boolean = false;
  create: boolean = false;
  featuredAddress: object = {};

  goToPage(path: string) {
    if (this.$nuxt.$route.fullPath == path) return;

    this.$nuxt.$router.push(path);
  }

  async fetch() {
    await this.$store.dispatch("address_store/fetchAllAddresses");
  }

  get addresses() {
    return (this.$store.state.address_store as AddressStoreState).list;
  }

  setAsDefault(address: any) {
    let addressCopy = _.cloneDeep(address);
    addressCopy.isDefault = true;
    this.$store
      .dispatch("address_store/updateAddress", { address: addressCopy })
      .then(() => {
        this.$toast.open({
          message: "Address set as default",
          type: "success",
          position: "bottom",
          duration: 5000,
        });
      });
  }

  deleteAddress(address: any) {
    let addressCopy = _.cloneDeep(address);
    this.$store
      .dispatch("address_store/deleteAddress", { address: addressCopy })
      .then(() => {
        this.$toast.open({
          message: "Address deleted successfully.",
          type: "success",
          position: "bottom",
        });
      });
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

.light-cards-container.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // color: rgba($dark, 0.8);
  min-height: 20rem;
  .icon {
    font-size: 6rem;
  }

  span {
    font-size: 2rem;
  }
}
</style>