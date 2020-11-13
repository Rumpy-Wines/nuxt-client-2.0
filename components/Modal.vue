<template>
  <div class="modal" ref="modal">
    <div class="content">
      <div class="header">
        <div class="header-text">
          <div class="mini-heading heading-light">
            <span>
              <slot name="modal-header-text"> Modal Header </slot>
            </span>
            <div class="underline"></div>
          </div>
        </div>
        <div class="close-button-container">
          <button class="close-button" @click="close()">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
      <div class="body">
        <slot>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, velit.
            Ea ducimus tempore voluptate sapiente dolore, assumenda, unde quo
            quaerat ut perferendis sunt praesentium aliquid. Officia vitae
            molestiae voluptatum voluptate error deleniti minima accusamus culpa
            sed. Ducimus nostrum aperiam suscipit nemo nesciunt, ipsa rerum,
            eos, at dolore molestias odit hic in iusto. Aliquid quis fugit eaque
            voluptatem accusamus voluptatibus tenetur animi! Molestias eveniet
            minus nisi ex? Ut voluptatum molestias vero repellat odit recusandae
            earum minima quos inventore dolores suscipit natus corporis odio
            consequuntur aut, reprehenderit animi rem! Inventore non corrupti,
            illum accusamus dolore iure, aliquam corporis sequi delectus facilis
            culpa.
          </p>
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Modal extends Vue {
  close() {
    let modal: HTMLDivElement = this.$refs.modal as HTMLDivElement;

    if (modal.classList.contains("closing")) modal.classList.remove("closing");

    modal.classList.add("closing");
    // The animation time in the css is 500 ms => 0.5 s
    // Wait for that time then emit the close event
    setTimeout(() => {
      this.$emit("modal-close");
    }, 500);
  }
}
</script>

<style lang="scss">
@import "~assets/styles/variables";
@keyframes display-modal {
  from {
    clip-path: circle(10%);
  }
  to {
    clip-path: circle(100%);
  }
}
@keyframes close-modal {
  from {
    clip-path: circle(100%);
  }
  to {
    clip-path: circle(10%);
  }
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  overflow-y: auto;
  z-index: 20;
  background: rgba(black, 0.41);
  display: flex;
  align-items: center;
  justify-content: center;
  --modal-padding: 2rem;
  padding: var(--modal-padding);
  animation-duration: 0.5s;
  animation-name: display-modal;
  &.closing {
    animation-duration: 0.5s;
    animation-name: close-modal;
  }
  .content {
    background: white;
    min-width: 60%;
    max-width: 80%;
    min-height: 20vh;
    max-height: 100%;
    padding: 1rem;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    .header {
      position: relative;
      .close-button-container {
        --button-size: 3rem;
        position: absolute;
        display: inline-block;
        top: calc(-1 * (var(--button-size) + var(--modal-padding)) / 2);
        right: calc(-1 * (var(--button-size) + var(--modal-padding)) / 2);
        height: var(--button-size);
        width: var(--button-size);
        .close-button {
          height: 100%;
          width: 100%;
          border-radius: 50%;
          border: none;
          background: rgba($dark, 0.67);
          color: white;
        }
      }
    }

    .body {
      font-size: 0.9rem;
      flex: 1;
      overflow: hidden;
      overflow-y: auto;

    //   /* width */
    //   &::-webkit-scrollbar {
    //     width: 20px;
    //   }

    //   /* Track */
    //   &::-webkit-scrollbar-track {
    //     box-shadow: inset 0 0 5px grey;
    //     border-radius: 10px;
    //   }

    //   /* Handle */
    //   &::-webkit-scrollbar-thumb {
    //     background: red;
    //     border-radius: 10px;
    //   }

    //   /* Handle on hover */
    //   &::-webkit-scrollbar-thumb:hover {
    //     background: #b30000;
    //   }
    }
  }
}
</style>