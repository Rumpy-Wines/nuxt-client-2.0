<template>
	<div>This is the orders page</div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  layout: "account",
})
export default class OrdersPage extends Vue {
  goToPage(path: string) {
    if (this.$nuxt.$route.fullPath == path) return;

    this.$nuxt.$router.push(path);
  }
}
</script>