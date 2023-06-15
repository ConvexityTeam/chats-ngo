<template>
  <div>
    <!-- Table here -->
    <div class="table-holder mt-4">
      <div class="flex align-items-center table-title">
        <h4>Beneficiaries</h4>
      </div>

      <table class="table table-borderless" v-if="beneficiaries.length">
        <thead>
          <tr>
            <th scope="col">Beneficiaries</th>
            <th scope="col">Phone number</th>
            <th scope="col">Date of Birth</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(beneficiary, i) in beneficiaries"
            :key="i"
            :class="{ selected: i % 2 == 0 }"
          >
            <td class="campaign-title">
              <div class="flex align-items-center">
                <img
                  :src="beneficiary.profile_pic || defaultImg"
                  width="30"
                  height="30"
                  class="rounded-circle"
                  :alt="beneficiary.full_name"
                  loading="lazy"
                />

                <span class="ml-3 pt-1"> {{ beneficiary.full_name }}</span>
              </div>
            </td>
            <td>{{ phone }}</td>
            <td>{{ beneficiary.dob | formatDate }}</td>
          </tr>
        </tbody>
      </table>

      <h3 v-else class="text-center no-record">NO RECORD FOUND</h3>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    beneficiaries: {
      type: Array,
      default: () => [],
    },

    phone: {
      type: String,
      default: "",
    },
  },

  data: () => ({
    defaultImg: require("~/assets/img/svg/default-user.svg"),
  }),
};
</script>

<style scoped>
.campaign-title {
  max-width: 10rem;
}
.filter {
  top: 12px;
  left: 11px;
}
select {
  border-left: 0px;
  padding-left: 40px;
  box-shadow: none;
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
}

select.form-control {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  height: 50px;
  border-radius: 10px;
}

.create {
  border-radius: 10px;
  color: white;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  height: 50px;
}
</style>
