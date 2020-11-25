<template>
  <div id="checkout-page--id">
    <edit-profile-details-modal
      v-if="showEditProfileDetailsModal"
      @modal-close="showEditProfileDetailsModal = false"
    />
    <create-edit-address-modal
      v-if="showAddressModal"
      @modal-close="showAddressModal = false"
    />
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
            <div class="image"></div>
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
      <div class="total-price m-b-3">Total: NGN {{$formatPrice(totalPrice)}}</div>
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
        <light-card @icon-clicked="showAddressModal = true">
          <template v-slot:header-text>School</template>
          <template v-slot:icon><i class="fas fa-pencil-alt"></i></template>
          <template v-slot:body-header-text>Default Shipping Address</template>
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
      <div
        class="actions-container m-t-3 flex-wrap-wrap display-flex justify-content-sb"
      >
        <select name="" id="" class="change-address-select">
          <option value="" disabled selected>Change Address</option>
          <option value="1">School</option>
          <option value="2">Home</option>
          <option value="3">Shogo's House</option>
        </select>
        <div class="">
          <button class="button" @click="showAddressModal = true">
            <i class="fas fa-plus"></i> Add Address
          </button>
          <button class="continue-button">
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

@Component({
  middleware: ["authenticated"],
  components: { LightCard, EditProfileDetailsModal, CreateEditAddressModal },
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

  async fetch() {
    let id = this.$nuxt.$route.params.id;
    if (!id) {
      await this.$store.dispatch("cart_store/fetchCartItems");
    }
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
}
</script>

<style lang="scss">
@import "~assets/styles/pages/checkout/id";
</style>