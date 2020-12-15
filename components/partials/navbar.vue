<template>
  <div>
    <nav
      class="navbar container navbar-expand-lg navbar-light align-items-center no-gutters flex-nowrap"
    >
      <div class="col-lg-2 col-sm-4 mx-1">
        <a class="navbar-brand" href="#">
          <img src="~/assets/img/logo.png" class="logo" alt />
        </a>
      </div>

      <!-- Route location here -->
      <div class="col-lg-4">
        <h5 class="title">{{title | capitalize }}</h5>
      </div>

      <div
        class="col-sm-auto d-flex ml-auto justify-content-between align-items-center"
      >
        <span>
          <div class="d-flex px-2">
   <a href="#" class="pt-2 mx-3">
              <i>
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.65 21V20.65H20H20.65V20V19V18.7308L20.4596 18.5404L18.65 16.7308V12C18.65 8.87749 17.0532 6.12045 14.15 5.18696V5C14.15 3.81101 13.189 2.85 12 2.85C10.811 2.85 9.85 3.81101 9.85 5V5.18642C6.93788 6.11866 5.35 8.86819 5.35 12V16.7308L3.54038 18.5404L3.35 18.7308V19V20V20.65H4H9.35V21C9.35 21.7028 9.6292 22.3769 10.1262 22.8738C10.6231 23.3708 11.2972 23.65 12 23.65C13.459 23.65 14.65 22.459 14.65 21Z"
                    stroke="black"
                    stroke-width="1.3"
                  />
                  <circle cx="16" cy="5" r="5" fill="#D62929" />
                </svg>
              </i>
            </a>

            <span class="d-none d-md-inline">
              <img src="~/assets/img/user.png" class="rounded-circle" width="50" height="50" alt="" />
            </span>        
          </div>
        </span>
      </div>
    </nav>
  </div>
</template>

<script>
export default {

data(){
	return{
title: ''
	}
},
  mounted() {
	  this.title = this.$router.history.current.name
  console.log('this is router', this.$router.history.current.name)
  }
}
</script>

<style scoped>
.logo {
  height: 5vh;
}
.navbar{
	padding:1rem
}
.title{
	font-size: 1.5rem;
	font-weight: 700;
	color: var(--secondary-black)
}

.container,
main nav {
  max-width: 1330px;
  margin-left: auto;
  margin-right: auto;
}
@media screen and (max-width: 991px) {
  .toggler {
    display: none;
  }
}
</style>
