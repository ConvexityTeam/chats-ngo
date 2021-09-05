<template>
  <div>
    <Modal id="beneficiary-complaint" title="Beneficiary complaint">
      <beneficiary-complaint
        :complaint="activeComplaint"
        :complaintStatus="complaintStatus"
        @resolveComplaint="resolveComplaint"
      />
    </Modal>

    <table v-if="complaints.length" class="table table-borderless">
      <thead>
        <tr>
          <th scope="col">Beneficiary</th>
          <th scope="col">Email Address</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="complaint in complaints" :key="complaint.id">
          <td></td>

          <td></td>
          <td>{</td>
          <td>
            <div>
              <Button
                text="View complaint"
                :has-icon="false"
                :has-border="true"
                custom-styles="border: 1px solid #17CE89 !important; border-radius: 5px !important; font-size: 0.875rem !important; height: 33px !important"
                @click="viewComplaint(complaint)"
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else-if="loading" class=" text-center"></div>
    <h3 v-else class="text-center no-complaints py-5">No Complaints</h3>
  </div>
</template>

<script>
import beneficiaryComplaint from "~/components/forms/beneficiary-complaint.vue";

export default {
  props: {
    complaints: {
      type: Array
    },

    loading: {
      type: Boolean,
      default: false
    }
  },

  components: { beneficiaryComplaint },

  data: () => ({
    activeComplaint: {},
    complaintStatus: ""
  }),

  methods: {
    viewComplaint(complaint) {
      this.$bvModal.show("beneficiary-complaint");

      // correct this to the right status
      this.complaintStatus = complaint.xxxxxx;
      this.activeComplaint = complaint;
    },

    async resolveComplaint() {}
  }
};
</script>
