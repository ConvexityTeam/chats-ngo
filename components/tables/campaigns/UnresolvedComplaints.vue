<template>
  <div :class="{ 'pb-3': loading }">
    <div>
      <Modal
        id="beneficiary-complaint-unresolved"
        title="Beneficiary complaint"
      >
        <FormsBeneficiariesComplaint
          :complaint="activeComplaint"
          :campaignName="campaignName"
          @resolved="$emit('resolved')"
        />
      </Modal>

      <div v-if="loading" class="px-4">
        <Skeleton :count="3" styles="height: 52px; margin-bottom: 10px" />
      </div>

      <template v-else-if="complaints.length">
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
              <td class="notranslate">
                {{
                  complaint.Beneficiary
                    ? complaint.Beneficiary.first_name +
                      " " +
                      complaint.Beneficiary.last_name
                    : ""
                }}
              </td>
              <td class="email notranslate">
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
                  <span class="">{{ complaint.status | capitalize }}</span>
                </div>
              </td>
              <td>
                <div>
                  <Button
                    text="View"
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

        <!-- pagination component  -->
        <pagination
          :currentPageNum="unresolvedComplaintPageNum"
          :totalNumOfItems="unresolvedComplaintTotalItems"
          @updatePage="updatePage"
        />
      </template>

      <h3 v-else class="text-center no-complaints no-record py-5">
        NO COMPLAINTS
      </h3>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    complaints: {
      type: Array,
      default: () => [],
    },

    campaignName: {
      type: String,
      default: "",
    },

    loading: {
      type: Boolean,
      default: false,
    },
    unresolvedComplaintPageNum: {
      type: Number,
      default: 1,
    },
    unresolvedComplaintTotalItems: {
      type: Number,
      default: 0,
    },
  },

  data: () => ({
    activeComplaint: {},
  }),

  methods: {
    viewComplaint(complaint) {
      this.activeComplaint = complaint;
      this.$bvModal.show("beneficiary-complaint-unresolved");
    },

    updatePage(action) {
      this.$emit("updatePage", { action, activeTab: "unresolved" });
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

.status {
  width: 80px;
}
</style>
