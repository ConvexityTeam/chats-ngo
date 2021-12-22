<template>
  <div :class="{ 'pb-3': loading }">
    <div v-if="loading" class="loader mt-3"></div>

    <div v-else>
      <Modal
        id="beneficiary-complaint-unresolved"
        title="Beneficiary complaint"
      >
        <beneficiary-complaint
          :complaint="activeComplaint"
          :campaignName="campaignName"
          @resolved="$emit('resolved')"
        />
      </Modal>

      <table v-if="complaints.length" class="table table-borderless">
        <thead>
          <tr>
            <th scope="col">Beneficiary</th>
            <th scope="col">Email Address</th>
            <th scope="col">Status</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="complaint in complaints" :key="complaint.id">
            <td>
              {{
                complaint.Beneficiary
                  ? complaint.Beneficiary.first_name +
                    " " +
                    complaint.Beneficiary.last_name
                  : ""
              }}
            </td>
            <td class="email">
              {{ complaint.Beneficiary ? complaint.Beneficiary.email : "" }}
            </td>
            <td>
              <div
                class="status"
                :class="{
                  pending: complaint.status == 'unresolved',
                  completed: complaint.status == 'resolved',
                }"
              >
                <span class="">{{ complaint.status }}</span>
              </div>
            </td>
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
      <div v-else-if="loading" class="text-center"></div>
      <h3 v-else class="text-center no-complaints py-5">No Complaints</h3>
    </div>
  </div>
</template>

<script>
import beneficiaryComplaint from "~/components/forms/beneficiary-complaint.vue";

export default {
  props: {
    complaints: {
      type: Array,
    },

    campaignName: {
      type: String,
      default: "",
    },

    loading: {
      type: Boolean,
      default: false,
    },
  },

  components: { beneficiaryComplaint },

  data: () => ({
    activeComplaint: {},
  }),

  methods: {
    viewComplaint(complaint) {
      this.activeComplaint = complaint;
      this.$bvModal.show("beneficiary-complaint-unresolved");
    },
  },
};
</script>

<style scoped>
.email {
  display: block;
  word-wrap: break-word;
  max-width: 12rem;
}
</style>
