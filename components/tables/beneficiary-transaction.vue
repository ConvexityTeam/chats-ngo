<template>
  <div>
    <div class="d-flex pt-lg-5 mr-2">
      <div>
        <!-- Search Box here -->
        <input
          type="text"
          class="form-controls"
          placeholder="Search transactions"
          v-model="searchQuery"
        />
      </div>

      <div class="ml-auto">
        <button
          type="button"
        
          class="export-btn p-3"
        >
          <download-csv
            :data="beneficiariesData.transactions"
            name="Beneficiaries-Transactions.csv"
          >
            Export as CSV
          </download-csv>
        </button>
      </div>
    </div>

    <!-- Transactions Table here -->
    <div class="holder mr-2">
      <div class="d-flex px-4 pt-3">
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
      </div>

      <div>
        <table class="table table-borderless" v-if="beneficiariesData.transactions !=''">
          <thead>
            <tr>
              <th scope="col">Reference</th>
              <th scope="col">Amount</th>
              <th scope="col">Type</th>
              <th scope="col">Status</th>
              <th scope="col">Date</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(transaction, index) in resultQuery" :key="index">
              <td>{{ transaction.transactionId }}</td>
              <td>${{transaction.amount}}</td>
              <td class="">
                <span class="badge badge-pill py-2">{{transaction.type}}</span>
              </td>
              <td>{{ transaction.status }}</td>
              <td>{{ transaction.createdAt | formatDateOnly }}</td>
              <td>
                <button type="button" class="more-btn"><dot /></button>
              </td>
            </tr>
          </tbody>
        </table>
     <div v-else-if="loading" class="loader text-center"></div>
        <h3 v-else class="text-center no-record">NO RECORD FOUND</h3>
      </div>
    </div>
  </div>
</template>
<script>
import dot from "~/components/icons/dot";
export default {
    layout: "dashboard",
    props: {
    beneficiariesData:{
      type: Object
    },
    data:{
      type: Object
    }

    },

  data() {
    return {
      searchQuery: null,
      loading: false,
      transactions:null
    };
  },

  mounted(){
// console.log('test',this.beneficiariesData.transactions)
// this.transactions = this.beneficiariesData.transactions
  },

  computed: {
    resultQuery() {
      if (this.searchQuery) {
        return this.beneficiariesData.transactions.filter((data) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => data.transactionId.toLowerCase().includes(v));
        });
      } else {
        return this.beneficiariesData.transactions;
      }
    },
  },

  components: {
    dot,
  },
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
  border: 1px solid #999999;
}
.table thead th {
  color: #4f4f4f;
  letter-spacing: 0.01em;
  font-size: 1rem;
  font-weight: 700;
}
.table th,
.table td {
  padding: 0.75rem 2rem;
  color: var(--secondary-black);
  font-size: 1rem;
}
::placeholder {
  color: #999999;
  font-size: 1rem;
}
</style>
