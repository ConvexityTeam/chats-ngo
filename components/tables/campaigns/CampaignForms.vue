<template>
  <section class="table-holder mt-5">
    <div class="flex align-items-center table-title">
      <h4>Forms</h4>
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
      <table class="table table-borderless">
        <thead>
          <tr>
            <th scope="col">Form Name</th>
            <th scope="col">Date created</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(form, i) in resultQuery"
            :key="form.id"
            style="cursor: pointer"
            :class="{ selected: i % 2 == 0 }"
          >
            <td class="form-title notranslate">{{ form.title }}</td>

            <td>
              {{ form.createdAt | shortDate }}
            </td>

            <td>
              <div class="d-flex align-items-center">
                <Button
                  :hasBorder="true"
                  :hasIcon="false"
                  text="Edit form"
                  custom-styles=" border-radius: 5px !important;
                  height:33px; border: 1px solid #17ce89 !important; font-size:
                  0.875rem !important; padding:0px 12px !important"
                  @click="handleEdit(form)"
                />

                <div class="ml-3">
                  <Button
                    :hasBorder="true"
                    :hasIcon="false"
                    text="Delete form"
                    custom-styles=" border-radius: 5px !important; color: #E42C66;
                  height:33px; border: 1px solid #E42C66 !important; font-size:
                  0.875rem !important; padding:0px 12px !important"
                    @click="handleDelete(form)"
                  />
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div>
        <pagination
          :currentPageNum="formPageNum"
          :totalNumOfItems="formTotalItems"
          @updatePage="(event) => $emit('updatePage', event)"
        />
      </div>
    </template>

    <h3 v-else class="text-center no-record">NO RECORD FOUND</h3>

    <!-- Modal Here -->
    <Modal id="delete-campaign-form" title="Delete Form">
      <DeleteCampaignForm
        :id="id"
        :form="activeForm"
        :isLoading="isLoading"
        @reload="$emit('reload')"
        @deleteForm="deleteForm"
      />
    </Modal>
  </section>
</template>

<script>
import DeleteCampaignForm from "@/components/forms/DeleteCamapaignForm";
export default {
  name: "CampaignForms",
  components: { DeleteCampaignForm },

  props: {
    resultQuery: {
      type: Array,
      default: () => [],
    },

    loading: {
      type: Boolean,
      default: false,
    },

    id: {
      type: [String, Number],
      default: "",
    },

    formPageNum: {
      type: Number,
      default: 1,
    },

    formTotalItems: {
      type: Number,
      default: 0,
    },
  },

  data: () => ({
    activeForm: {},
    isLoading: false,
  }),

  methods: {
    handleDelete(data) {
      this.activeForm = data;
      this.$bvModal.show("delete-campaign-form");
    },

    handleEdit(form) {
      const { title, questions } = form;

      localStorage.setItem(
        "campaignForm",
        JSON.stringify({ title, questions })
      );
      this.$router.push(`projects/forms/${form.id}`);
    },

    async deleteForm() {
      try {
        console.log("delete form here", this.activeForm);
        this.isLoading = true;

        const response = await this.$axios.delete(
          `organisations/${this.id}/campaign_form`,
          {
            data: {
              formId: this.activeForm?.id,
            },
          }
        );

        if (response.status === "success") {
          this.$toast.success(response.message);
          this.$bvModal.hide("delete-campaign-form");
          this.$emit("reload");
        }

        console.log("response", response);

        console.log("delete form");
      } catch (_err) {
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
th:first-child,
td:first-child {
  width: 40%;
}
</style>
