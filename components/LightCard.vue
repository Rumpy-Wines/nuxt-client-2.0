<template>
  <div class="light-card">
    <div class="header">
      <span>
		  <slot name="header-text">Header Text</slot>
	  </span>
      <div class="icon" @click="$emit('icon-clicked')">
        <slot name="icon"><i class="fas fa-question"></i></slot>
      </div>
    </div>
    <div class="body">
      <div class="body-header">
		  <span>
			  <slot name="body-header-text">Body Heading</slot>
		  </span>
	  </div>
      <div class="body-content">
        <slot>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam dolorum
        	eum iusto odio. Nemo eos sequi, expedita voluptate laborum possimus!
		</slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "~assets/styles/variables";

.light-card {
	border: 1px solid $neutral-grey-2;
	font-size: 0.85rem;
	--side-padding: 0.5rem;
	--header-height: 40px;
	> * {
		padding-left: var(--side-padding);
		padding-right: var(--side-padding);
	}
	.header {
		border-bottom: 1px solid $neutral-grey-2;
		display: flex;
		align-items: center;
		justify-content: space-between;
		text-transform: uppercase;
		font-size: 0.9rem;
		height: var(--header-height);
		.icon {
			padding: 0.2rem;
			cursor: pointer;
		}
	}
	.body {
		padding-top: var(--side-padding);
		padding-bottom: var(--side-padding);
		.body-header {
			margin-bottom: 0.2rem;
		}
		.body-content {
			color: rgba($dark, 0.67);
			font-size: 0.8rem;
		}
	}
}
</style>