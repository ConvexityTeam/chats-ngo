<template>
  <div class="main pb-5">
    <div class="text-center">
      <!-- Logo here -->
      <div class="logo-div">
        <img src="~/assets/img/logo.png" class="logo" alt="Chats" />
      </div>
      <h3 class="text-white welcome py-4">Welcome To CHATS</h3>
    </div>

    <div class="d-flex justify-content-center align-items-center">
      <div class="card__holder">
        <form>
          <!-- Organisation name here -->
          <div class="form-group">
            <label for="name">Name Of Organization</label>
            <input type="text" class="form-controls" id="name" />
          </div>

          <!-- Organisation email here -->
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-controls" id="email" />
          </div>

          <!-- Password here -->
          <div class="form-group pb-2">
            <label for="password">Password</label>
            <input type="password" class="form-controls" id="password" />
          </div>

          <div class="mt-4 text-center">
            <button type="button" class="onboarding-btn">Create Account</button>
          </div>
        </form>

        <div class="mt-4 text-center">
          <p class="account">
            Have an account?
            <nuxt-link class="font-bold login" to="/login">Login</nuxt-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
   layout: "default"
}
</script>

<style scoped>
.login {
  text-decoration: underline;
  color: var(--primary-black);
  font-weight: 700;
}
.account {
  color: var(--primary-black);
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 0.01em;
}
.logo {
  height: 10vh;
}
.welcome {
  font-size: 2.25rem;
  font-weight: 500;
}
.logo-div {
  padding-top: 100px;
}
.main {
  background-image: url('../assets/img/Cash For Work.png');
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
}
.card__holder {
  background: #ffffff;
  border-radius: 10px;
  padding: 2rem 5rem;
  width: 30rem;
}
label {
  color: var(--primary-black);
  font-size: 1rem;
  font-weight: 400;
}
</style>
