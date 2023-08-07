<template>
  <div>
    <!-- Table here -->
    <div class="table-holder mt-4">
      <div class="d-flex align-items-center table-title">
        <h4>Project Transactions</h4>

        <!-- Export here -->
        <div class="ml-auto" v-if="transactions.length">
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

      <table class="table table-borderless" v-if="transactions.length">
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

  async fetch() {
    const id = this.user?.AssociatedOrganisations[0]?.OrganisationId;
    const response = await this.$axios.get(
      `organisations/${id}/vendors/transactions?CampaignId=${this.campaignId}`
    );

    console.log("Campaign Transactions:::", response);
    this.transactions = response.data;
  },

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

  data: () => ({
    transactions: [],
  }),

  methods: {
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
