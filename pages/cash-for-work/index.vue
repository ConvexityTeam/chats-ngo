<template>
  <div class="main">
    <div class="container">
      <!-- Modal here -->

      <div class="d-flex pt-lg-4">
        <div class="d-flex">
          <!-- Search Box here -->
          <input
            type="text"
            class="form-controls"
            placeholder="Search campaigns"
          />
        </div>

        <div class="ml-auto">
          <button type="button" v-b-modal.new-campaign class="create px-3">
            <i>
              <svg
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M13 6V7H7V13H6V7H0V6H6V0H7V6H13Z" fill="white" />
              </svg>
            </i>
            <span class="mx-2">Create New</span>
          </button>
        </div>
      </div>

      <!-- cards here -->
      <div class="row mt-5">
        <div class="col-lg-4 mb-4" v-for="i in 3" :key="i">
          <div class="card__holder">
            <!-- <img src="~/assets/img/dish.png" width="322" alt /> -->
            <div class="p-3">
              <h4 class="caption">Feed The Hungry Campaign</h4>
              <p class="beneficiary-count">284 Beneficiaries</p>

              <!-- Progress bar here -->
              <b-progress
                :value="value"
                :max="max"
                variant="success"
                class="mb-3"
              ></b-progress>

              <!-- Task count here -->
              <div class="d-flex">
                <div>
                  <p class="tasks">134/264 Tasks</p>
                </div>
                <div class="ml-auto">
                  <p class="tasks">64%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "dashboard",
  data() {
    return {
      value: 64,
      max: 100
    };
  }
};
</script>

<style scoped>
.progress {
  border-radius: 10px;
  height: 10px;
  background: #e5e5e5;
}
.tasks {
  color: var(--secondary-black);
  font-size: 0.875rem;
}
.beneficiary-count {
  letter-spacing: 0.01em;
  font-size: 1rem;
  font-weight: 500;
  color: #4f4f4f;
}
.caption {
  color: var(--secondary-black);
  font-weight: 700;
  font-size: 1.125rem;
}
.card__holder {
  background: #ffffff;
  box-shadow: 0px 4px 30px rgba(174, 174, 192, 0.2);
  border-radius: 10px;
}
.main {
  height: calc(100vh - 72px);
  overflow-y: scroll;
}
.create {
  background: var(--primary-color);
}
::placeholder {
  color: #999999;
  font-size: 1rem;
}
.form-controls {
  height: 50px;
  width: 300px;
}

.form-control:focus {
  box-shadow: none;
}

.create {
  border-radius: 10px;
  color: white;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  height: 50px;
}

/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
