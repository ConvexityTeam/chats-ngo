<template>
  <div>
    <div class="row pt-4 mt-2">
      <div class="col-lg-8">
        <div class="row">
          <div class="col-lg-8">
            <!-- Search Box here -->
            <div class="position-relative">
              <input
                type="text"
                class="form-controls search"
                placeholder="Search transactions..."
                v-model="searchQuery"
              />
              <img
                src="~/assets/img/vectors/search.svg"
                class="search-icon position-absolute"
                alt="search"
              />
            </div>
          </div>

          <!-- <div class=" position-relative">
            <span class="filter position-absolute">
              <img src="~/assets/img/vectors/filter.svg" alt="filter" />
            </span>
            <b-form-select
              v-model="selected"
              :options="options"
              class="filter"
              plain
            ></b-form-select>
          </div> -->
        </div>
      </div>

      <div class=" ml-auto mx-3">
        <csv :data="computedData" name="beneficiaries" />
      </div>
    </div>

    <!-- Table here -->
    <div class="table-holder mt-4">
      <div class="flex align-items-center table-title">
        <h4>Transactions</h4>
        <div class="ml-auto"></div>
      </div>
      <table class="table table-borderless">
        <thead>
          <tr>
            <th scope="col">Reference ID</th>
            <th scope="col">Amount</th>
            <th scope="col">Type</th>
            <th scope="col">Paid To</th>
            <th scope="col">Date</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in 4" :key="i" :class="{ selected: i % 2 == 0 }">
            <td>12345678910</td>
            <td>$123,476,000</td>
            <td class="">
              <span
                class="badge badge-pill deposited p-2"
                :class="{ disbursed: i % 2 == 0 }"
              >
                {{ i % 2 == 0 ? "Disbursed" : "Deposited" | capitalize }}
              </span>
            </td>
            <td>Wallet</td>
            <td>12 Dec, 2020</td>
            <td>
              <button type="button" class="more-btn"><dot /></button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- <div v-else-if="loading" class=" text-center"></div>
        <h3 v-else class="text-center no-record">NO RECORD FOUND</h3> -->
    </div>
  </div>
</template>
<script>
import dot from "~/components/icons/dot";
export default {
  components: {
    dot
  },

  data: () => ({
    searchQuery: "",
    options: [
      {
        value: "Option1",
        label: "Option1"
      },
      {
        value: "Option2",
        label: "Option2"
      }
    ]
  }),

  computed: {
    resultQuery() {
      // if (this.searchQuery) {
      //   return this.campaigns.filter(campaign => {
      //     return this.searchQuery
      //       .toLowerCase()
      //       .split(" ")
      //       .every(v => campaign.title.toLowerCase().includes(v));
      //   });
      // } else {
      //   return this.campaigns;
      // }
    },

    computedData() {
      return [];
    }
  }
};
</script>

<style scoped>
.filter {
  top: 12px;
  left: 11px;
}
select {
  border-left: 0px;
  padding-left: 40px;
  box-shadow: none;
}

select.form-control {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  height: 50px;
  border-radius: 10px;
}
.holder {
  background: #ffffff;
  box-shadow: 0px 4px 30px rgba(174, 174, 192, 0.2);
  border-radius: 10px;
  margin-top: 30px;
}
.badge {
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 400;
  font-size: 0.75rem;
}

.badge.deposited {
  background: #d1f7c4;
  color: #337138;
}
.badge.disbursed {
  background: #ffcdc7;
  color: #5e0e03;
}
.table thead th {
  color: #25396f;
  letter-spacing: 0.01em;
  font-size: 1rem;
  font-weight: 500;
  background: #fafafa;
  padding: 1.25rem;
}

.table td {
  color: #25396f;
  padding: 1rem 1.25rem;
}
</style>
