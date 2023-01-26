<template>
  <div>
    <div class="mt-3 text-center">
      <p>
        You are about to reject
        {{ benefactors.length === 1 ? "" : benefactors.length }}
        <span class="font-bold">
          {{ benefactors.length === 1 ? namesInString : "Benefactors" }} </span
        >. Are you really sure about this?
        <span>This action cannot be undone.</span>
      </p>
    </div>

    <!-- buttons here -->
    <div class="mt-4 pb-3 d-flex justify-content-center">
      <div class="d-flex">
        <div>
          <Button
            text="Continue"
            type="submit"
            :has-icon="false"
            custom-styles="height: 41px; border-radius:5px !important;  font-size: 14px !important"
            @click="handleApproval"
          />
        </div>

        <div class="ml-3">
          <Button
            text="Cancel"
            :has-icon="false"
            :has-border="true"
            custom-styles=" height: 41px !important; border: 1px solid #17CE89 !important; border-radius: 5px !important; font-size: 0.875rem !important; width: 9rem; font-weight: 600 !important"
            @click="closeModal"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import close from "~/components/icons/close";

export default {
  name: "reject-benefactors",
  props: {
    benefactors: {
      type: Array,
      default: () => [],
    },
  },

  components: { close },

  data: () => ({
    namesInString: "",
  }),

  async created() {
    await this.getNameOfSelectedbenefactors();
  },

  methods: {
    closeModal() {
      this.$bvModal.hide("reject-benefactors");
    },

    handleApproval() {
      this.$emit("rejectBenefactors");
      this.closeModal();
    },

    async getNameOfSelectedbenefactors() {
      if (this.benefactors && this.benefactors.length >= 1) {
        await this.benefactors.map(async (benefactor, index) => {
          if (index < this.benefactors.length - 1) {
            //
            index !== this.benefactors.length - 2
              ? (this.namesInString += `"${benefactor.User.first_name} ${benefactor.User.last_name}", `)
              : (this.namesInString += `"${benefactor.User.first_name} ${benefactor.User.last_name}" and `);
          } else {
            this.namesInString += ` ${benefactor.User.first_name} ${benefactor.User.last_name}`;
          }
        });

        return this.namesInString;
      } else {
        return "";
      }
    },
  },
};
</script>

<style scoped>
p {
  color: #7c8db5;
  font-weight: 500;
  margin: 0 auto;
  width: 70%;
}

.create-campaign {
  background: var(--primary-color);
  border-radius: 10px;
  font-size: 1rem;
  border: 1px solid var(--primary-color);
  color: white;
  border: none;
}
</style>
