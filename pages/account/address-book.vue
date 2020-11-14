<template>
	<div class="">
		This is the address book page
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import LightCard from "~/components/LightCard.vue";

@Component({
  components: { LightCard },
  layout: "account",
})
export default class AddressBook extends Vue {

  goToPage(path: string) {
    if (this.$nuxt.$route.fullPath == path) return;

    this.$nuxt.$router.push(path);
  }
}
</script>