<template>
  <div>
    <!-- Modal here -->

    <Modal id="add-vendor" size="lg" title="Add Vendor">
      <FormsAddVendor @reload="$emit('reload')" />
    </Modal>

    <div class="row mt-4 pt-1">
      <div class="col-lg-8">
        <div class="row">
          <div class="col-lg-5">
            <!-- Search Box here -->
            <div class="position-relative">
              <input
                v-model="searchQuery"
                type="text"
                class="form-controls search"
                placeholder=" Search transactions..."
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

      <div class="ml-auto d-flex mx-3">
        <csv
          :has-border="true"
          :data="computedData"
          :green-csv="true"
          name="Vendor Transactions"
        />

        <div class="ml-3">
          <Button
            text="Add Vendor"
            custom-styles="height:50px; border: 1px solid #17ce89 !important;"
            :has-border="false"
            :is-green="false"
            @click="$bvModal.show('add-vendor')"
          />
        </div>
      </div>
    </div>

    <!-- Table here -->
    <div class="table-holder mt-4">
      <div class="flex align-items-center table-title">
        <h4>Vendor Transactions</h4>
        <div class="ml-auto"></div>
      </div>

      <template v-if="resultQuery.length">
        <table class="table table-borderless">
          <thead>
            <tr>
              <th scope="col">Reference ID</th>
              <th scope="col">Amount</th>
              <th scope="col">Vendor</th>
              <th scope="col">Beneficiary</th>
              <th scope="col">Date</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(transaction, index) in resultQuery" :key="index">
              <td>{{ transaction.reference }}</td>
              <td>{{ transaction.amount | formatCurrency }}</td>
              <td>
                {{ getVendorName(transaction.Vendor) }}
              </td>
              <td>
                {{ getBeneficiaryName(transaction.Beneficiary) }}
              </td>
              <td>{{ transaction.createdAt | shortDate }}</td>
            </tr>
          </tbody>
        </table>

        <!-- pagination component  -->
        <pagination
          :currentPageNum="transactionPageNum"
          :totalNumOfItems="totalTransactions"
          @updatePage="updateVendorTransactions"
        />
      </template>

      <h3 v-else class="text-center no-record">NO RECORD FOUND</h3>
      <FullScreenLoader :loading="$fetchState.pending" />
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";

export default {
  name: "VendorTransaction",

  data: () => ({
    searchQuery: "",
    loading: false,
    transactions: [],
    transactionPageNum: 1,
    totalTransactions: 0,
  }),

  async fetch() {
    const id = this.user?.AssociatedOrganisations[0]?.OrganisationId;
    const response = await this.$axios.get(
      `organisations/${id}/vendors/transactions?page=${this.transactionPageNum}&size=10`
    );

    this.transactions = response.data;
    this.transactionPageNum = response?.currentPage || 1;
    this.totalTransactions = response?.totalItems || response.data.length;
  },

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
          Amount: transaction.amount,
          Vendor: this.getVendorName(transaction?.Vendor),
          Beneficiary: this.getBeneficiaryName(transaction?.Beneficiary),
          Type: transaction.transaction_type,
          Created: moment(transaction.createdAt).format("dddd, MMMM DD, YYYY"),
        };
      });
    },
  },

  methods: {
    getVendorName(vendor) {
      return vendor ? `${vendor.first_name} ${vendor.last_name}` : "-";
    },

    updateVendorTransactions(action) {
      this.transactionPageNum =
        action === "prev"
          ? this.transactionPageNum - 1
          : this.transactionPageNum + 1;

      this.$fetch();
    },

    getBeneficiaryName(Beneficiary) {
      return Beneficiary
        ? `${Beneficiary.first_name} ${Beneficiary.last_name}`
        : "-";
    },
  },
};
</script>
