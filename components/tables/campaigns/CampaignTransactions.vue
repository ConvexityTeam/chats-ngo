<template>
  <div>
    <!-- Table here -->
    <div class="table-holder mt-4">
      <div class="d-flex align-items-center table-title">
        <h4>Project Transactions</h4>

        <!-- Export here -->
        <div v-if="transactions.length" class="ml-auto">
          <csv
            :has-border="true"
            :data="computedData"
            :green-csv="true"
            :name="`${campaignName} Transactions`"
            custom-styles="height: 32px !important; border-radius: 4px !important"
            csvIconHeight="1rem"
          />
        </div>
      </div>

      <div v-if="loading" class="px-4">
        <Skeleton
          :count="3"
          class="mb-5"
          styles="height: 52px; margin-bottom: 10px"
        />
      </div>

      <template v-else-if="transactions.length">
        <table class="table table-borderless">
          <thead>
            <tr>
              <th scope="col">Reference</th>
              <th scope="col">Amount</th>
              <th scope="col">Vendor</th>
              <th scope="col">Beneficiary</th>
              <th scope="col">Date</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(transaction, index) in transactions" :key="index">
              <td>{{ transaction.reference }}</td>
              <td>{{ transaction.amount | formatCurrency }}</td>
              <td>{{ getVendorName(transaction.Vendor) }}</td>
              <td>{{ getBeneficiaryName(transaction.Beneficiary) }}</td>
              <td>{{ transaction.createdAt | formatDateOnly }}</td>
            </tr>
          </tbody>
        </table>

        <pagination
          :currentPageNum="campaignTransactionPageNum"
          :totalNumOfItems="campaignTransactionTotalItems"
          @updatePage="updateCampaignTransactionPage"
        />
      </template>

      <h3 v-else class="text-center no-record">NO RECORD FOUND</h3>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "CampaignTransactions",

  props: {
    campaignId: {
      type: [String, Number],
      default: "",
    },

    user: {
      type: Object,
      default: () => {},
    },

    campaignName: {
      type: String,
      default: "",
    },
  },

  data: () => ({
    id: "",
    loading: false,
    transactions: [],
    campaignTransactionPageNum: 1,
    campaignTransactionTotalItems: 0,
  }),

  computed: {
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

  mounted() {
    this.id = this.user?.AssociatedOrganisations[0]?.OrganisationId;
    this.getTransactions();
  },

  methods: {
    updateCampaignTransactionPage(action) {
      this.campaignTransactionPageNum =
        action === "prev"
          ? this.campaignTransactionPageNum - 1
          : this.campaignTransactionPageNum + 1;

      this.getTransactions();
    },

    async getTransactions() {
      try {
        this.loading = true;
        // this.openScreen();
        const response = await this.$axios.get(
          `organisations/${this.id}/vendors/transactions?CampaignId=${this.campaignId}&page=${this.campaignTransactionPageNum}&size=10`
        );

        if (response.status === "success") {
          this.transactions = response.data;

          this.campaignTransactionPageNum = response?.currentPage;
          this.campaignTransactionTotalItems = response?.totalItems;
        }
      } catch (err) {
      } finally {
        this.loading = false;
      }
    },

    getVendorName(Vendor) {
      return Vendor ? `${Vendor.first_name} ${Vendor.last_name}` : "-";
    },

    getBeneficiaryName(Beneficiary) {
      return Beneficiary
        ? `${Beneficiary.first_name} ${Beneficiary.last_name}`
        : "-";
    },
  },
};
</script>
