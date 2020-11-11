<template>
  <div id="home-page">
    <section id="hero">
      <div class="hero-text">
        <span
          >I make wine disappear</span
        >
        <span>What's your superpower?</span>
      </div>
      <div class="hero-wine-splash-image-container">
        <img
          class="hero-wine-splash-image"
          src="~/assets/images/hero-wine-splash.png"
          alt=""
          srcset=""
        />
      </div>
    </section>
    <section id="section-1" class="first-set-section">
      <div class="right">
        <div>
          <h2 class="h2 header">Made from the finest of grapefriuts.</h2>
          <p class="paragraph">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat
          </p>
          <button class="action-button" @click="goToPage('/products')">See product gallery</button>
        </div>
      </div>
      <div class="left">
        <div class="image-container">
          <div class="image"></div>
        </div>
      </div>
    </section>
    <section id="section-2" class="first-set-section">
      <div class="right">
        <div>
          <h2 class="h2 header">It’s a thing to share with loved ones..</h2>
          <p class="paragraph">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat
          </p>
          <button class="action-button" @click="goToPage('/products')">Perfect wines for dates</button>
        </div>
      </div>
      <div class="left">
        <div class="image-container">
          <div class="image" :style="{backgroundImage:'url(\'/images/section-2-home-image.png\')'}" ></div>
        </div>
      </div>
    </section>
    <section id="section-3" class="first-set-section">
      <div class="right">
        <div>
          <h2 class="h2 header">It’s a thing to share with loved ones..</h2>
          <p class="paragraph">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat
          </p>
          <button class="action-button" @click="goToPage('/products')">Perfect wines for dates</button>
        </div>
      </div>
      <div class="left">
        <div class="image-container">
          <div class="image" :style="{backgroundImage:'url(\'/images/section-3-home-image.png\')'}" ></div>
        </div>
      </div>
    </section>
    <section id="white-wine-section" class="wines-section-home-page">
      <div class="left">
        <div class="image-container">
          <div class="image"></div>
        </div>
      </div>
      <div class="right">
        <div class="right-content">
          <h2 class="h2 header">
            <span class="emphasis">White </span>
            <span>wines</span>
          </h2>
          <p class="paragraph">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
          </p>
          <button class="action-button">Browse wines</button>
        </div>
        </div>
    </section>
    <section id="red-wine-section" class="wines-section-home-page right">
      <div class="left">
        <div class="image-container">
          <div class="image" style="background-image: url('/images/red-wines.jpg')"></div>
        </div>
      </div>
      <div class="right">
        <div class="right-content">
          <h2 class="h2 header">
            <span class="emphasis">Red </span>
            <span>wines</span>
          </h2>
          <p class="paragraph">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
          </p>
          <button class="action-button">Browse wines</button>
        </div>
        </div>
    </section>
    <section id="rose-wine-section" class="wines-section-home-page">
      <div class="left">
        <div class="image-container">
          <div class="image" style="background-image: url('/images/rose-wines.png')"></div>
        </div>
      </div>
      <div class="right">
        <div class="right-content">
          <h2 class="h2 header">
            <span class="emphasis">Rosé </span>
            <span>wines</span>
          </h2>
          <p class="paragraph">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
          </p>
          <button class="action-button">Browse wines</button>
        </div>
        </div>
    </section>
    <section id="sparkling-wine-section" class="wines-section-home-page right">
      <div class="left">
        <div class="image-container">
          <div class="image" style="background-image: url('/images/sparkling-wines.png')"></div>
        </div>
      </div>
      <div class="right">
        <div class="right-content">
          <h2 class="h2 header">
            <span class="emphasis">Sparkling </span>
            <span>wines</span>
          </h2>
          <p class="paragraph">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
          </p>
          <button class="action-button">Browse wines</button>
        </div>
        </div>
    </section>
  </div>
</template>

<script>

export default {
  methods: {
    goToPage(path) {
      if(this.$nuxt.$route.fullPath == path) return

      this.$nuxt.$router.push(path)
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/styles/pages/index";
</style>
