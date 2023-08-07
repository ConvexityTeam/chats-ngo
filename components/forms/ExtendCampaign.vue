<template>
  <div class="mt-4 px-3">
    <!-- Cash Campaign Form Here -->
    <form @submit.prevent="extendCampaign">
      <!-- Name field  here -->
      <div class="form-group">
        <label for="name">Project name</label>
        <input
          id="name"
          v-model="payload.title"
          type="text"
          class="form-controls"
          placeholder="Enter name of project"
          disabled
        />
      </div>

      <!--Description field  here -->
      <div class="form-group">
        <label for="description">Description</label>
        <textarea
          id="description"
          class="form-controls"
          placeholder="Short description"
          :class="{
            error: $v.payload.description.$error,
          }"
          cols="30"
          rows="3"
          @blur="$v.payload.description.$touch()"
          v-model="payload.description"
        ></textarea>
      </div>

      <!--Budget field  here  for cash based campaign  -->
      <div class="form-group">
        <label> Additional Budget </label>

        <template>
          <input
            type="number"
            class="form-controls"
            placeholder="0.00"
            v-model="payload.additional_budget"
          />
        </template>
      </div>

      <!-- Date fields here -->
      <div class="row">
        <div class="col-lg-6">
          <!--start date  field  here -->
          <div id="c4w" class="form-group">
            <label for="start-date">Start Date</label>

            <date-picker
              format="YYYY-MM-DD"
              placeholder="YYYY-MM-DD"
              valueType="format"
              disabled
              :value="payload?.start_date?.slice(0, 10)"
            ></date-picker>
          </div>
        </div>

        <!--end date field  here -->
        <div class="col-lg-6">
          <div id="c4w" class="form-group">
            <label for="end-date">End Date</label>

            <date-picker
              v-model="payload.end_date"
              :input-class="`mx-input  ${
                $v.payload.end_date.$error ? 'error' : ''
              }`"
              format="DD-MM-YYYY"
              placeholder="DD-MM-YYYY"
              valueType="format"
              @blur="$v.payload.end_date.$touch()"
              :disabled-date="(present) => present <= new Date()"
            ></date-picker>
          </div>
        </div>
      </div>

      <!-- button area here -->
      <div class="d-flex pb-2 mt-4">
        <div>
          <Button
            text="Extend project"
            type="submit"
            :has-icon="false"
            :loading="loading"
            :disabled="loading"
            custom-styles="height: 41px; border-radius:5px !important; font-size: 14px !important"
          />
        </div>

        <div class="ml-3">
          <Button
            text="Cancel"
            :has-icon="false"
            :has-border="true"
            custom-styles="height: 41px; border-radius:5px !important; font-size: 14px !important;  border: 1px solid #17CE89 !important"
            @click="closeModal"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { required, maxLength } from "vuelidate/lib/validators";
import { mounted } from "vue";
import { mapGetters } from "vuex";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

export default {
  components: { DatePicker },

  props: {
    campaignDetails: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      drawer: false,
      present: new Date(),
      loading: false,
      id: 0,
      payload: {
        end_date: "",
        campaign_id: "",
        additional_budget: 0,
        description: "",
      },
    };
  },

  validations: {
    payload: {
      description: { required, maxLength: maxLength(250) },
      end_date: { required },
    },
  },

  computed: {
    ...mapGetters("authentication", ["user"]),
  },

  mounted() {
    this.payload = this.campaignDetails;
    this.payload.end_date = "";
  },

  methods: {
    async extendCampaign() {
      try {
        this.loading = true;
        this.$v.payload.$touch();

        if (this.$v.payload.$error) {
          return (this.loading = false);
        }
        const body = {
          end_date: this.payload.end_date,
          additional_budget: this.payload.additional_budget,
          description: this.payload.description,
          campaign_id: this.campaignDetails.id,
        };

        const response = await this.$axios.post(
          `/organisations/extend-campaign/${this.campaignDetails.OrganisationId}`,
          body
        );

        if (response.status == "success") {
          this.$emit("reload");
          this.closeModal();
          this.$toast.success(response.message);
        }
      } catch (err) {
        console.log({ err });
        this.$toast.error(err?.response?.data?.message);
      } finally {
        this.loading = false;
      }
    },

    closeModal() {
      this.$bvModal.hide("extend-campaign");
    },
  },
};
</script>

<style scoped>
#map_canvas {
  height: 300px;
}

label {
  color: var(--primary-blue);
  font-size: 1rem;
  font-weight: 500;
}

.form-group {
  margin-bottom: 1rem !important;
}

.form-controls {
  border: 1px solid #7c8db5;
  background: white;
  height: 41px;
  padding: 0rem 0.75rem;
}

.form-controls::placeholder {
  color: #646a86;
  font-size: 0.875rem;
  letter-spacing: 0.01em;
}

textarea.form-controls {
  height: auto;
  resize: none;
  padding: 0.75rem;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

/* Campaign form toggler */
.ctn-mgt-btn {
  border-radius: 10px;
  background: #f5f6f8;
}

.mgt-btn-container {
  width: 50%;
  display: flex;
  align-content: center;
  text-align: center;
  cursor: pointer;
  justify-content: center;
  user-select: none;
}

.mgt-btn {
  border: none;
  font-size: 1rem;
  font-weight: 500;
  color: #646a86;
  background: inherit;
  border-radius: 10px;
  padding: 0.6rem;
  display: inline-block;
}

.mgt-btn.active {
  color: #fff;
  font-weight: bold;
  background: #9dadca;
  border: none;
  border-radius: 10px;
  width: 100%;
}
</style>
