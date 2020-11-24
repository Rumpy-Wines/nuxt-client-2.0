<template>
  <div class="review-box">
    <div class="name">{{review.user.name || "Anonymous"}}</div>
    <div class="rating-box">
      <i class="icon fas fa-star"></i>
      <span>{{review.rating.toFixed(1)}}</span>
    </div>
    <p class="review-text">{{review.reviewText}}</p>
  </div>
</template>
<script lang="ts">
import {Vue, Component, Prop} from 'nuxt-property-decorator';

@Component
export default class Review extends Vue {
  @Prop()
  review: any;
}
</script>
<style lang="scss">
@import "~assets/styles/variables";

.review-box {
  background: $back-color;
  margin-bottom: 1rem;
  padding: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
  .name {
	font-weight: 500;
	font-size: 0.9rem;
  }
  .rating-box {
    font-size: 0.7rem;
	margin-bottom: 0.8rem;
	border: 0.5px solid rgba($accent-1, 0.9);
	display: inline-block;
	.icon {
		color: rgba($accent-1, 0.9);
	}
  }
  .review-text {
	  font-size: 0.8rem;
  }
}
</style>