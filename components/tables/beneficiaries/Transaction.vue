<template>
  <div>
    <div class="row pt-4">
      <div class="col-lg-8">
        <div class="row">
          <div class="col-lg-5">
            <!-- Search Box here -->
            <div class="position-relative">
              <input
                v-model="searchQuery"
                type="text"
                class="form-controls search"
                placeholder="Search transactions..."
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

      <div class="ml-auto mx-3">
        <csv :data="computedData" name="beneficiary-transactions" />
      </div>
    </div>

    <!-- Table here -->
    <div class="table-holder mt-4">
      <div class="flex align-items-center table-title">
        <h4>Transactions</h4>
        <div class="ml-auto"></div>
      </div>

      <div v-if="loading" class="px-4">
        <Skeleton
          :count="6"
          class="mb-5"
          styles="height: 52px; margin-bottom: 10px"
        />
      </div>

      <template v-else-if="resultQuery.length">
        <table v-if="resultQuery.length" class="table table-borderless">
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
              <td>{{ transaction.reference }}</td>
              <td>{{ transaction.amount | formatCurrency }}</td>
              <td class="">
                <div
                  class="status px-1"
                  :class="{
                    approval: transaction.transaction_type == 'approval',
                    pending: transaction.transaction_type == 'spent',
                    withdrawal: transaction.transaction_type == 'withdrawal',
                    progress: transaction.transaction_type == 'transfer',
                  }"
                >
                  {{ transaction.transaction_type | capitalize }}
                </div>
              </td>
              <td>
                {{ getBeneficiaryName(transaction) }}
              </td>
              <td>{{ transaction.createdAt | shortDate }}</td>
            </tr>
          </tbody>
        </table>

        <!-- pagination component  -->
        <pagination
          :currentPageNum="transactionPageNum"
          :totalNumOfItems="transactionTotalItems"
          @updatePage="updateTransactions"
        />
      </template>

      <h3 v-else class="text-center no-record">NO RECORD FOUND</h3>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";

export default {
  layout: "dashboard",

  data: () => ({
    loading: false,
    id: "",
    searchQuery: "",
    transactions: [],
    transactionPageNum: 1,
    transactionTotalItems: 0,
  }),

  computed: {
    ...mapGetters("authentication", ["user"]),
    resultQuery() {
      if (this.searchQuery) {
        return this.transactions.filter((data) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => data.reference.toLowerCase().includes(v));
        });
      } else {
        return this.transactions;
      }
    },
    computedData() {
      const data = this.transactions || [];
      return data.map((transaction) => {
        return {
          Reference: transaction.reference,
          Amount: transaction.amount,
          Beneficiary:
            transaction?.Beneficiary?.first_name +
            " " +
            transaction?.Beneficiary?.last_name,

          Type: transaction.transaction_type,
          Created: moment(transaction.createdAt).format("dddd, MMMM DD, YYYY"),
        };
      });
    },
  },

  mounted() {
    this.id = this.user?.AssociatedOrganisations[0]?.OrganisationId;
    this.getTransactions();
  },

  methods: {
    updateTransactions(action) {
      this.transactionPageNum =
        action === "prev"
          ? this.transactionPageNum - 1
          : this.transactionPageNum + 1;

      this.getTransactions();
    },

    async getTransactions() {
      try {
        this.loading = true;
        const response = await this.$axios.get(
          `/organisation/${this.id}/beneficiaries/transactions?page=${this.transactionPageNum}&size=10`
        );

        if (response.status === "success") {
          this.transactions = response.data;

          this.transactionPageNum = response?.currentPage;
          this.transactionTotalItems = response?.totalItems;
        }
      } catch (_err) {
      } finally {
        this.loading = false;
      }
    },

    getBeneficiaryName(transaction) {
      if (
        transaction?.Beneficiary?.first_name &&
        transaction?.Beneficiary?.last_name
      ) {
        return `${transaction?.Beneficiary?.first_name} ${transaction?.Beneficiary?.last_name}`;
      }
      return "-";
    },
  },
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

.status {
  width: 72px;
  max-width: 90px;
}
</style>
