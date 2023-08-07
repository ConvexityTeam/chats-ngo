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
        </div>
      </div>

      <div class="ml-auto mx-3">
        <csv
          :data="computedData"
          name="Transactions"
          :has-border="true"
          :green-csv="true"
        />
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
            <th scope="col">Date</th>
            <th scope="col">Status</th>
          </tr>
        </thead>

        <tbody
          v-for="(transaction, i) in resultQuery"
          :key="i"
          :class="{ selected: i % 2 == 0 }"
        >
          <tr
            @click="toggleTransactionDetails(transaction)"
            class="pointer"
            :class="
              activeReferenceId == transaction.reference && 'border-bottom'
            "
          >
            <td>{{ transaction.reference }}</td>
            <td>{{ transaction.amount | formatCurrency }}</td>
            <td>
              <span class="badge badge-pill deposited p-2">
                {{
                  transaction.transaction_type == "deposit"
                    ? "Deposited"
                    : "Disbursed"
                }}
              </span>
            </td>

            <td>{{ transaction.createdAt | formatDate }}</td>
            <td>
              <span
                class="status p-2"
                :class="{
                  completed: transaction.status == 'success',
                  'pending-2': transaction.status !== 'success',
                }"
              >
                {{ transaction.status == "success" ? "Completed" : "Pending" }}
              </span>
            </td>
          </tr>

          <!-- dropdown transaction details -->
          <tr
            class="selected p-3"
            v-if="activeReferenceId == transaction?.reference"
            :class="
              activeReferenceId == transaction?.reference && 'border-bottom'
            "
          >
            <td colspan="5" :class="{ selected: i % 2 != 0 }">
              <div v-if="activeReferenceId">
                <div class="row align-items-center mb-2">
                  <span class="col-3 h6"> Transaction Hash: </span>
                  <div
                    v-if="transaction?.transaction_hash"
                    class="col-9 mt-n2 primary"
                  >
                    <span
                      class="mr-2 text-truncate underline pointer"
                      @click="
                        handleHashRoute(
                          transaction.transaction_hash?.transactionHash
                        )
                      "
                    >
                      {{
                        transaction.transaction_hash?.transactionHash.length >
                        35
                          ? `${transaction.transaction_hash.transactionHash.substring(
                              1,
                              45
                            )}...`
                          : transaction.transaction_hash.transactionHash
                      }}
                    </span>

                    <span
                      @click="
                        $copy(transaction.transaction_hash.transactionHash)
                      "
                      class="pointer"
                    >
                      <IconsCopy type="line" />
                    </span>
                  </div>

                  <span v-else class="col-9 mt-n2">-</span>
                </div>

                <!-- Confirmation -->
                <div class="row align-items-center mb-2">
                  <span class="col-3 h6">Confirmation:</span>
                  <span class="col-9 mt-n2">
                    {{ transaction?.transaction_hash?.confirmations || "-" }}
                  </span>
                </div>

                <!-- Block Number  -->
                <div class="row align-items-center mb-2">
                  <span class="col-3 h6">Block ID:</span>
                  <span class="col-9 mt-n2 primary">
                    {{
                      transaction?.transaction_hash?.blockNumber ||
                      "-" | formatNumber
                    }}
                  </span>
                </div>

                <!-- Time -->
                <div class="row align-items-center mb-2">
                  <span class="col-3 h6">Time:</span>
                  <span class="col-9 mt-n2">
                    {{ transaction?.createdAt | formatDateTime }}
                  </span>
                </div>

                <!-- Status -->
                <div class="row align-items-center mb-2">
                  <span class="col-3 h6">Status:</span>
                  <span class="col-9 mt-n2">
                    {{
                      transaction.status == "success" ? "Completed" : "Pending"
                    }}
                  </span>
                </div>
              </div>

              <!-- if transaction hash is null -->
              <div v-else class="py-3 text-center">NO RECORD FOUND</div>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-else-if="loading" class="py-5">
        <div class="text-center loader pb-5"></div>
      </div>

      <h3 v-else class="text-center no-record">NO RECORD FOUND</h3>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import appConfig from "~/appConfig";
import moment from "moment";
let screenLoading;

export default {
  data: () => ({
    loading: false,
    organisationId: "",
    searchQuery: "",
    activeReferenceId: "",
    transactions: [],
    transactionDetails: {},
  }),

  computed: {
    ...mapGetters("authentication", ["user"]),

    resultQuery() {
      if (this.searchQuery) {
        return this.transactions.filter((transaction) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => transaction.reference.toLowerCase().includes(v));
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
          Amount: "$" + transaction.amount || "-",
          Transaction_Type: transaction.transaction_type || "-",
          Date: moment(transaction.createdAt).format("DD MMMM, YYYY"),
          Status: transaction.status || "-",
        };
      });
    },
  },

  mounted() {
    this.organisationId =
      this.user?.AssociatedOrganisations[0]?.Organisation?.id;

    this.getTransactions();
  },

  methods: {
    async toggleTransactionDetails(transaction) {
      const { reference } = transaction;

      if (this.activeReferenceId == reference) {
        this.activeReferenceId = "";
      } else {
        this.activeReferenceId = reference;
      }
    },
    async getTransactions() {
      try {
        this.openScreen();
        this.loading = true;

        const response = await this.$axios.get(
          `/organisations/${+this.organisationId}/wallets/transactions`
        );

        if (response.status == "success") {
          this.transactions = response.data;

          screenLoading.close();
        }
        console.log("TRANSACTIONS:::", response);
      } catch (err) {
        screenLoading.close();
        console.log(err);
      } finally {
        this.loading = false;
      }
    },

    async getTransactionDetails(transaction_hash) {
      if (!transaction_hash) return;
      try {
        const response = await this.$axios.get(
          `/transactions/block-details/${transaction_hash}`
        );

        if (response.status == "success") {
          this.transactionDetails = response.data;
        }

        console.log("TRANSACTIONS DETAILS:::", response);
      } catch (err) {
        console.log(err);
      }
    },

    handleHashRoute(hash) {
      const { APP_ENVIRONMENT } = appConfig;

      if (APP_ENVIRONMENT == "staging") {
        window.open(`https://mumbai.polygonscan.com/tx/${hash}`, "_blank");
      } else {
        window.open(`https://polygonscan.com/tx/${hash}`, "_blank");
      }
    },

    openScreen() {
      screenLoading = this.$loading({
        lock: true,
        spinner: "el-icon-loading",
        background: "#0000009b",
      });
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
  background: #eceff1;
  color: #7c8db5;
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
