<template>
  <div>
    <div class="d-flex pt-lg-4 mr-2">
      <div class="position-relative d-flex">
        <!-- Search Box here -->
        <input
          type="text"
          class="form-controls search"
          placeholder="Search transactions"
        />
        <div class="position-absolute search-icon">
          <img src="~/assets/img/vectors/search.svg" alt="search" />
        </div>

        <div class="ml-3 position-relative">
          <div>
            <el-select v-model="value" filterable placeholder="Select" >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </div>

      <div class="ml-auto">
        <button type="button" class="export-btn px-3">Export as CSV</button>
      </div>
    </div>

    <!-- Transactions Table here -->
    <div class="holder mr-2">
      <!-- <div class="d-flex px-4 pt-3">
        <div>
          <h4 class="header">Transactions</h4>
        </div>

        <div class="ml-auto d-flex filter">
          <p>Filter by:</p>
          <div class="mx-2">
            <select name="" id="">
              <option value="gender">Today</option>
            </select>
          </div>
        </div>
      </div> -->
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
    options: [
      {
        value: "Option1",
        label: "Option1"
      },
         {
        value: "Option2",
        label: "Option2"
      },
    ]
  })
};
</script>

<style scoped>
.form-controls {
  height: 50px;
  width: 150%;
}
.header {
  color: var(--secondary-black);
  font-weight: 700;
  font-size: 1.125rem;
}
.filter {
  color: #4f4f4f;
  font-size: 1rem;
  font-weight: 500;
}
select {
  border: none;
  color: var(--secondary-black);
}
select:focus {
  outline: none;
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
.selected {
  background: #fcfcfe;
}

::placeholder {
  color: #999999;
  font-size: 1rem;
}
</style>
