<template>
  <div>
    <!-- Modal here -->

    <Modal id="add-vendor" size="lg" title="Add Vendor">
      <add-vendor @reload="$emit('reload')" />
    </Modal>

    <div class="row mt-4 pt-1">
      <div class="col-lg-8">
        <div class="row">
          <div class="col-lg-5">
            <!-- Search Box here -->
            <div class="position-relative">
              <input
                type="text"
                class="form-controls search"
                placeholder=" Search transactions..."
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

      <div class=" ml-auto d-flex mx-3">
        <csv
          :has-border="true"
          :data="computedData"
          :green-csv="true"
          name="beneficiaries"
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
        <h4>Transactions</h4>
        <div class="ml-auto"></div>
      </div>
      <table class="table table-borderless">
        <thead>
          <tr>
            <th scope="col">Reference ID</th>
            <th scope="col">Amount</th>
            <th scope="col">Vendor</th>
            <th scope="col">Beneficiary</th>
            <th scope="col">Date</th>
            <!-- <th scope="col">Actions</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in 3" :key="i">
            <td>12345678910</td>
            <td>$123,476,000</td>
            <td>Dangote</td>
            <td>Funke</td>
            <td>12 Dec, 2020</td>
            <!-- <td>
              <button type="button" class="more-btn"><dot /></button>
            </td> -->
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
import addVendor from "~/components/forms/add-vendor.vue";

export default {
  props: {
    transactions: {
      type: Array,
      default: () => []
    }
  },

  components: {
    dot,
    addVendor
  },

  data: () => ({
    searchQuery: ""
  }),

  computed: {
    resultQuery() {
      // if (this.searchQuery) {
      //   return this.beneficiaries.filter(benefactor => {
      //     return this.searchQuery
      //       .toLowerCase()
      //       .split(" ")
      //       .every(v => benefactor.first_name.toLowerCase().includes(v));
      //   });
      // } else {
      //   return this.beneficiaries;
      // }
    },

    computedData() {
      // return this.beneficiaries.map(benefactor => {
      //   return {
      //     Name: benefactor.first_name + " " + benefactor.last_name,
      //     Phone_Number: benefactor.phone,
      //     Email_Address: benefactor.email,
      //     location: benefactor.location,
      //     Gender: benefactor.gender,
      //     Marital_Status: benefactor.marital_status,
      //     Created: moment(benefactor.createdAt).format("dddd, MMMM DD, YYYY")
      //   };
      // });
    }
  },

  methods: {}
};
</script>
