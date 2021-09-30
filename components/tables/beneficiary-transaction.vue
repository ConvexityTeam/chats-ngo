<template>
  <div>
    <div class="row pt-4 ">
      <div class="col-lg-8">
        <div class="row">
          <div class="col-lg-5">
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
        <csv :data="computedData" name="beneficiary-transactions" />
      </div>
    </div>

    <!-- Table here -->
    <div class="table-holder mt-4">
      <div class="flex align-items-center table-title">
        <h4>Transactions</h4>
        <div class="ml-auto"></div>
      </div>

      <table class="table table-borderless" v-if="resultQuery.length">
        <thead>
          <tr>
            <th scope="col">Reference ID</th>
            <th scope="col">Amount</th>
            <th scope="col">Type</th>
            <th scope="col">Beneficiary</th>
            <th scope="col">Date</th>
            <!-- <th scope="col">Actions</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(transaction, index) in resultQuery" :key="index">
            <td>{{ transaction.TransactionalId }}</td>
            <td>${{ transaction.amount }}</td>
            <td class="">
              <div
                class="status px-1"
                :class="{
                  approval: transaction.TransactionalType == 'approval',
                  pending: transaction.TransactionalType == 'spent',
                  withdrawal: transaction.TransactionalType == 'withdrawal',
                  progress: transaction.TransactionalType == 'transfer'
                }"
              >
                {{ transaction.TransactionalType | capitalize }}
              </div>
            </td>
            <td>
              {{
                transaction.User
                  ? transaction.User.first_name +
                    " " +
                    transaction.User.last_name
                  : ""
              }}
            </td>
            <td>{{ transaction.createdAt | formatDateOnly }}</td>
            <!-- <td>
              <button type="button" class="more-btn">
                <i><dot /></i>
              </button>
            </td> -->
          </tr>
        </tbody>
      </table>

      <div v-else-if="loading" class="loader text-center"></div>
      <h3 v-else class="text-center no-record">NO RECORD FOUND</h3>
    </div>
  </div>
</template>
<script>
import dot from "~/components/icons/dot";
import { mapGetters } from "vuex";
let screenLoading;

export default {
  layout: "dashboard",
  components: { dot },

  data: () => ({
    loading: false,
    id: "",
    searchQuery: "",
    transactions: []
  }),

  computed: {
    ...mapGetters("authentication", ["user"]),
    resultQuery() {
      if (this.searchQuery) {
        return this.transactions.filter(data => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every(v =>
              data.transaction.User.first_name.toLowerCase().includes(v)
            );
        });
      } else {
        return this.transactions;
      }
    },
    computedData() {
      const data = this.transactions || [];
      return data.map(transaction => {
        return {
          Reference: transaction.TransactionalId,
          Beneficiary:
            transaction.User.first_name + " " + transaction.User.last_name,
          Amount: transaction.amount,
          Type: transaction.TransactionalType,
          Created: moment(transaction.createdAt).format("dddd, MMMM DD, YYYY")
        };
      });
    }
  },

  mounted() {
    this.id = this.user.AssociatedOrganisations[0].OrganisationId;
    this.getTransactions();
  },

  methods: {
    async getTransactions() {
      try {
        this.openScreen();

        const response = await this.$axios.get(
          `/organisation/${this.id}/beneficiaries/transactions`
        );

        console.log("BEN. TRANSACTIONS", response);
        if (response.status == "success") {
          screenLoading.close();
          this.transactions = response.data;
        }
      } catch (err) {
        screenLoading.close();
        console.log("TRANSACTIONS ERR::", err);
      }
    },

    openScreen() {
      screenLoading = this.$loading({
        lock: true,
        spinner: "el-icon-loading",
        background: "#0000009b"
      });
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

.form-controls {
  height: 50px;
}
</style>
