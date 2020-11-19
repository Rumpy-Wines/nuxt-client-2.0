<template>
  <div class="review-box">
    <div class="name">Oyinbo David Bayode</div>
    <div class="rating-box">
      <i class="icon fas fa-star"></i>
      <span>4.0</span>
    </div>
    <p class="review-text">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>
  </div>
</template>
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