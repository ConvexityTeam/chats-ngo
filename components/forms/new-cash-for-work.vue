<template>
  <div class="mt-4 px-3">
    <form @submit.prevent="createCampaign">
      <!-- Name field  here -->
      <div class="form-group">
        <label for="name">Project name</label>
        <input
          id="name"
          v-model="payload.title"
          type="text"
          class="form-controls"
          :class="{
            error: $v.payload.title.$error,
          }"
          placeholder="Enter name of project"
          @blur="$v.payload.title.$touch()"
        />
      </div>

      <!--Description field  here -->
      <div class="form-group">
        <label for="description">Description</label>
        <textarea
          id="description"
          v-model="payload.description"
          class="form-controls"
          placeholder="Short description"
          :class="{
            error: $v.payload.description.$error,
          }"
          cols="30"
          rows="3"
          @blur="$v.payload.description.$touch()"
        ></textarea>
      </div>

      <!--Budget field  here -->
      <div class="row form-group">
        <div class="col-lg-12">
          <!--Budget field  here -->
          <div class="">
            <label for="total-amount">Budget</label>
            <CurrencyInput
              id="total-amount"
              v-model="payload.budget"
              placeholder="0.00"
              :customStyles="`height: 41px; border: 1px solid #7c8db5; background: white; padding: 0.75rem`"
              :error="$v.payload.budget.$error"
              @blur="$v.payload.budget.$touch()"
            />
          </div>
        </div>
      </div>

      <!-- Date fields here -->
      <div class="row">
        <div class="col-lg-6">
          <!--start date  field  here -->
          <div id="c4w" class="form-group">
            <label for="start-date">Start Date</label>
            <date-picker
              v-model="payload.start_date"
              :input-class="`mx-input  ${
                $v.payload.start_date.$error ? 'error' : ''
              }`"
              format="DD-MM-YYYY"
              placeholder="DD-MM-YYYY"
              valueType="format"
              :disabled-date="(present) => present <= new Date()"
              @blur="$v.payload.start_date.$touch()"
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
              :disabled-date="(present) => present <= new Date()"
              @blur="$v.payload.end_date.$touch()"
            ></date-picker>
          </div>
        </div>
      </div>

      <!-- Country here -->
      <div class="form-group">
        <label for="country">Country</label>
        <div
          id="product"
          class="w-100"
          :class="{ error: $v.payload.location.country.$error }"
        >
          <el-select
            id="country"
            v-model="payload.location.country"
            filterable
            placeholder="—Select — "
          >
            <el-option
              v-for="(country, i) in countries"
              :key="i"
              :label="country.countryName"
              :value="country.countryName"
            >
            </el-option>
          </el-select>
        </div>
      </div>

      <!-- State here -->
      <div class="form-group">
        <label for="state">State</label>
        <div
          id="product"
          class="w-100"
          :class="{ error: $v.payload.location.state.$error }"
        >
          <el-select
            id="state"
            v-model="payload.location.state"
            filterable
            multiple
            placeholder="—Select — "
          >
            <el-option
              v-for="(state, i) in states"
              :key="i"
              :label="state.name"
              :value="state.name"
            >
            </el-option>
          </el-select>
        </div>

        <h6 class="primary-gray text-sm pt-1">
          You can add multiple states/regions
        </h6>
      </div>

      <!-- button area here -->
      <div class="d-flex my-3">
        <div>
          <Button
            text="Create project"
            type="submit"
            :has-icon="false"
            :loading="loading"
            :disabled="loading"
            custom-styles="height: 45px; border-radius:5px !important; font-size: 14px !important; padding: 0 28px !important"
          />
        </div>

        <div class="ml-3">
          <Button
            text="Cancel"
            :has-icon="false"
            :has-border="true"
            custom-styles="height: 45px; border-radius:5px !important; font-size: 14px !important;  border: 1px solid #17CE89 !important; padding: 0 28px !important"
            @click="closeModal"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { required, maxLength } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import countriesRegions from "~/plugins/countries-regions";

export default {
  components: { DatePicker },
  data() {
    return {
      present: new Date(),
      loading: false,
      id: 0,
      countries: [],
      payload: {
        type: "cash-for-work",
        title: "",
        description: "",
        budget: "",
        location: {
          country: "",
          state: [],
        },
        start_date: "",
        end_date: "",
      },

      location: {
        coordinates: [],
      },
    };
  },

  validations: {
    payload: {
      title: { required },
      description: { required, maxLength: maxLength(250) },
      budget: { required },
      start_date: { required },
      end_date: { required },
      location: {
        country: { required },
        state: { required },
      },
    },
  },

  async fetch() {
    this.id = this.user?.AssociatedOrganisations[0]?.OrganisationId;
    const response = await this.$axios.get(
      `organisations/${this.id}/campaign_form`
    );

    if (response.status === "success") {
      this.forms = response.data;
    }

    // Country data here
    const { data } = await this.$axios.get("/utils/countries");
    this.countries = data;
  },

  computed: {
    ...mapGetters("authentication", ["user"]),

    states() {
      const setCountry = this.payload.location.country;
      console.log("SETCOUNTRY", setCountry);
      if (setCountry) {
        return countriesRegions.find(
          (country) => setCountry === country.countryName
        )?.regions;
      }

      return [];
    },
  },

  mounted() {
    this.id = this.user?.AssociatedOrganisations[0]?.OrganisationId;
  },

  methods: {
    closeModal() {
      this.$bvModal.hide("new-cash");
    },
    async createCampaign() {
      console.log("pd::", this.payload);
      // console.log("COORD", this.payload.location.coordinates);

      try {
        this.loading = true;
        this.$v.payload.$touch();

        if (this.$v.payload.$error === true) {
          return (this.loading = false);
        }

        const response = await this.$axios.post(
          `/organisations/${+this.id}/campaigns`,
          {
            ...this.payload,
            budget: this.payload.budget.replace(/[^0-9.]/g, ""),
          }
        );

        if (response.status === "success") {
          this.$emit("reload");
          this.closeModal();
          this.$toast.success(response.message);
        }
        console.log("C4W:::", response);
      } catch (_err) {
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
label {
  color: var(--primary-blue);
  font-size: 1rem;
  font-weight: 500;
}

.form-group {
  margin-bottom: 1.5rem;
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
</style>
