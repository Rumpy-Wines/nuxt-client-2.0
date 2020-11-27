<template>
  <div id="checkout-page--id">
    <edit-profile-details-modal
      v-if="showEditProfileDetailsModal"
      @modal-close="showEditProfileDetailsModal = false"
    />
    <create-edit-address-modal
      v-if="showAddressModal"
      @modal-close="showAddressModal = false"
      :address="addressForEdit"
    >
      <template v-slot:modal-header-text>
        <span v-if="createAddress">Create New</span>
        <span v-else>Edit</span> Address</template
      >

      <template v-slot:submit-button-text>
        <span v-if="createAddress">Create</span>
        <span v-else>Update</span></template
      >
    </create-edit-address-modal>
    <div class="account-setup" :class="{ 'not-active': activeIndex != 0 }">
      <div class="header">Account Record</div>
      <div v-if="!user.firstName" class="no-setup">
        <p>
          Your account has not been setup, press the button below to set it up.
        </p>
        <button class="button" @click="showEditProfileDetailsModal = true">
          Setup Account
        </button>
      </div>
      <div v-else class="content">
        <div class="questions-responses">
          <div class="questions">
            <div class="question">Name</div>
            <div class="question">Gender</div>
            <div class="question">DOB</div>
            <div class="question">Phone Number</div>
          </div>
          <div class="divider"></div>
          <div class="responses">
            <div class="response">{{ user.name }}</div>
            <div class="response">{{ genderMap[user.gender] }}</div>
            <div class="response">{{ user.dateOfBirth }}</div>
            <div class="response">{{ user.phoneNumber }}</div>
          </div>
        </div>
        <div
          class="actions-container m-t-3 flex-wrap-wrap display-flex justify-content-fe"
        >
          <button class="button" @click="showEditProfileDetailsModal = true">
            Edit Details
          </button>
          <button class="continue-button" @click="updateActiveIndex(1)">
            Continue <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="items-summary" :class="{ 'not-active': activeIndex != 1 }">
      <div class="header">Items Summary</div>
      <div class="summary-items-container">
        <div
          class="summary-item"
          v-for="cartItem in cartItems"
          :key="cartItem.id"
        >
          <div class="image-container">
            <div class="image" :style="{backgroundImage: `url(${cartItem.productItem.imageUrl})`}"></div>
          </div>
          <div class="content">
            <div class="name">{{ cartItem.productItem.name }}</div>
            <div class="year">{{ cartItem.productItem.year }}</div>
            <div class="price">
              NGN {{ $formatPrice(cartItem.productItem.pricePerItem) }} X
              {{ cartItem.itemCount }}
            </div>
            <div class="total">
              NGN
              {{
                $formatPrice(
                  cartItem.itemCount * cartItem.productItem.pricePerItem
                )
              }}
            </div>
          </div>
        </div>
      </div>
      <div class="total-price m-b-3">
        Total: NGN {{ $formatPrice(totalPrice) }}
      </div>
      <div class="actions-container display-flex justify-content-fe">
        <button class="button" @click="goToPage('/cart')">Modify Cart</button>
        <button class="continue-button" @click="updateActiveIndex(2)">
          Continue <i class="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
    <div
      class="shipping-address-container"
      :class="{ 'not-active': activeIndex != 2 }"
    >
      <div class="header">Shipping Address</div>
      <div class="light-card-container">
        <light-card
          v-if="addresses.length > 0 && featuredAddress"
          @icon-clicked="
            addressForEdit = featuredAddress;
            showAddressModal = true;
          "
        >
          <template v-slot:header-text>{{ featuredAddress.title }}</template>
          <template v-slot:icon><i class="fas fa-pencil-alt"></i></template>
          <template v-slot:body-header-text
            ><span v-if="featuredAddress.isDefault"
              >Default Shipping Address</span
            >
            ( {{ featuredAddress.title }} )</template
          >
          {{ featuredAddress.addressString }}

          <div class="landmarks-container">
            <div class="landmarks">
              <div
                class="landmark"
                v-for="landmark in featuredAddress.landmarks"
                :key="landmark"
              >
                {{ landmark }}
              </div>
            </div>
          </div>
        </light-card>
        <div v-else>Your address book is empty</div>
      </div>
      <div
        class="actions-container m-t-3 flex-wrap-wrap display-flex justify-content-sb"
      >
        <select
          ref="addressSelect"
          v-if="addresses.length > 0"
          name=""
          id=""
          @change="changeAddress()"
          class="change-address-select"
        >
          <option value="" disabled selected>Change Address</option>
          <option
            :value="address.id"
            v-for="address in addresses"
            :key="address.id"
          >
            {{ address.title }}
          </option>
        </select>
        <div class="">
          <button
            class="button"
            @click="
              createAddress = true;
              addressForEdit = {};
              showAddressModal = true;
            "
          >
            <i class="fas fa-plus"></i> Add Address
          </button>
          <button
            v-if="addresses.length > 0"
            class="continue-button"
            @click="checkout"
          >
            Proceed To Payment <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import LightCard from "~/components/LightCard.vue";
import EditProfileDetailsModal from "~/components/EditProfileDetailsModal.vue";
import CreateEditAddressModal from "~/components/CreateEditAddressModal.vue";
import { CartStoreState } from "~/store/cart_store";
import { AddressStoreState } from "~/store/address_store";

@Component({
  middleware: ["authenticated"],
  components: { LightCard, EditProfileDetailsModal, CreateEditAddressModal },
  fetchOnServer: false
})
export default class CheckoutPage extends Vue {
  activeIndex: number = 0;
  showEditProfileDetailsModal: boolean = false;
  showAddressModal: boolean = false;
  genderMap = {
    MALE: "Male",
    FEMALE: "Female",
    OTHER: "Rather not say",
  };
  addressForEdit: object = {};
  createAddress: boolean = false;
  featuredAddressId: string = "";
  submitting: boolean = false;

  async fetch() {
    await this.$store.dispatch("address_store/fetchAllAddresses");

    let id = this.$nuxt.$route.params.id;
    if (!id) {
      await this.$store.dispatch("cart_store/fetchCartItems");
    }
  }

  get addresses() {
    return (this.$store.state.address_store as AddressStoreState).list;
  }

  get defaultAddress() {
    return this.addresses.find((el: any) => el.isDefault);
  }

  get featuredAddress() {
    if (this.featuredAddressId)
      return this.addresses.find((el: any) => el.id == this.featuredAddressId);
    return this.defaultAddress;
  }

  changeAddress() {
    let value = (this.$refs.addressSelect as HTMLSelectElement).value;
    if (value) this.featuredAddressId = value;
  }

  get cartItems() {
    return (this.$store.state.cart_store as CartStoreState).list.filter(
      (el: any) => el.isActive == true
    );
  }

  get totalPrice() {
    let total = 0;

    for (let cartItem of this.cartItems) {
      //@ts-ignore
      total += cartItem.itemCount * cartItem.productItem.pricePerItem;
    }
    return total;
  }

  updateActiveIndex(val: number) {
    if (this.activeIndex >= val || val != this.activeIndex + 1) return;

    if (this.activeIndex == 0) {
      if (!this.user.firstName) return;
    }

    this.activeIndex = val;
  }

  goToPage(path: string) {
    if (path == this.$nuxt.$route.fullPath) return;
    this.$nuxt.$router.push(path);
  }

  get user() {
    return this.$auth.user;
  }

  checkout() {
    if (this.submitting) return;
    if (!this.featuredAddress) return;

    let instance = this.$toast.open({
      message: "Initiating checkout...",
      type: "info",
      duration: 10000,
      position: "bottom",
    });
    this.submitting = true;
    this.$store
      .dispatch("order_store/checkout", { address: this.featuredAddress })
      .catch(() => {
        this.$toast.open({
          message: "An error occurred",
          type: "error",
          position: "bottom"
        });
      }).finally(() => {
        instance.close();
        this.submitting = false
      })
  }
}
</script>

<style lang="scss">
@import "~assets/styles/pages/checkout/id";
</style>