<template>
  <div class="main">
    <!-- Image Here -->
    <div>
      <not-found />
    </div>

    <!-- Text here -->
    <div class="mt-2 text-center">
      <h1>Oops... page not found.</h1>
      <p class="pt-2 m-auto">
        The page you’re looking for might have been removed, temporarily
        unavailable or never existed. We’re sad you had to see this and hope you
        never see it again.
      </p>
    </div>

    <!-- Button Here -->
    <div class="mt-4">
      <Button
        text="Back to Dashboard"
        :hasIcon="false"
        :customStyles="customStyle"
        @click="goHome"
      />
    </div>
  </div>
</template>

<script>
import notFound from "./404.vue";

export default {
  components: { notFound },

  computed: {
    customStyle() {
      return "border-radius: 5px; height: 3.25rem;";
    },
  },

  methods: {
    goHome() {
      window.history.back();
    },
  },
};
</script>

<style scoped>
div.main {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

h1 {
  font-weight: bold;
  font-size: 1.5rem;
  color: #222222;
}

p {
  color: #646a86;
  opacity: 0.7;
  width: 35%;
  font-weight: 500;
}
</style>
