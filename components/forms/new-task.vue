<template>
  <div class="mt-4 px-3">
    <form @submit.prevent="createCampaign">
      <!-- Name field  here -->
      <div class="form-group">
        <label for="name">Task name</label>
        <input
          id="name"
          type="text"
          class="form-controls"
          :class="{
            error: $v.payload.title.$error
          }"
          placeholder="Enter name of task"
          v-model="payload.title"
          @blur="$v.payload.title.$touch()"
        />
      </div>

      <!--Description field  here -->
      <div class="form-group">
        <label for="description">Description</label>
        <textarea
          id="description"
          class="form-controls p-2"
          placeholder="Short description"
          :class="{
            error: $v.payload.description.$error
          }"
          cols="30"
          rows="3"
          @blur="$v.payload.description.$touch()"
          v-model="payload.description"
        ></textarea>
      </div>

      <!--Budget field  here -->
      <div class="row form-group">
        <div class="col-lg-12">
          <!--Budget field  here -->
          <div class="">
            <label for="total-amount">Amount</label>
            <input
              type="number"
              class="form-controls"
              :class="{
                error: $v.payload.budget.$error
              }"
              id="total-amount"
              placeholder="0.00"
              v-model="payload.budget"
              @blur="$v.payload.budget.$touch()"
              ref="budget"
            />
          </div>
        </div>
      </div>

      <!-- button area here -->
      <div class="d-flex mt-4 mb-3">
        <div>
          <Button
            text="Create"
            type="submit"
            :has-icon="false"
            :loading="loading"
            :disabled="loading"
            custom-styles="height: 41px; border-radius:5px !important; font-size: 14px !important; padding: 0px 25px !important"
          />
        </div>

        <div class="ml-3">
          <Button
            text="Cancel"
            :has-icon="false"
            :has-border="true"
            custom-styles="height: 41px; border-radius:5px !important; font-size: 14px !important; padding: 0px 25px !important;"
            @click="closeModal"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { required, minValue } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
const greaterThanZero = value => value >= 100;

export default {
  data() {
    return {
      loading: false,
      id: 0,
      payload: {
        type: "cash-for-work",
        title: "",
        description: "",
        budget: "",
        location: [],
        start_date: "",
        end_date: ""
      },

      location: {
        coordinates: []
      }
    };
  },

  validations: {
    payload: {
      title: {
        required
      },
      description: {
        required
      },
      budget: {
        required,
        greaterThanZero
      },
      //   location: {
      //     coordinates: {
      //       required
      //     }
      //   },
      start_date: {
        required
      },
      end_date: {
        required
      }
    }
  },
  components: { DatePicker },

  computed: {
    ...mapGetters("authentication", ["user"])
  },

  mounted() {
    this.id = this.user.AssociatedOrganisations[0].OrganisationId;
    // this.formatCurrency(100000);
  },

  methods: {
    closeModal() {
      this.$bvModal.hide("new-cash");
    },
    async createCampaign() {
      console.log("pd::", this.payload);
      console.log("COORD", this.payload.location.coordinates);

      try {
        this.loading = true;
        this.$v.payload.$touch();

        if (this.$v.payload.$error === true) {
          return (this.loading = false);
        }

        this.payload.location = this.payload.location
          ? JSON.stringify(this.payload.location)
          : "";

        const response = await this.$axios.post(
          `/organisations/${+this.id}/campaigns`,
          this.payload
        );

        if (response.status == "success") {
          this.$emit("reload");
          this.closeModal();
          this.$toast.success(response.message);
        }
        console.log("C4W:::", response);

        this.loading = false;
      } catch (err) {
        console.log({ err });
        this.loading = false;
        this.$toast.error(err.response.data?.message);
      }
    }

    // TODO:Try emiting fetch all campaigns method from parent and calling here
  }
};
</script>

<style scoped>
label {
  color: var(--tertiary-black);
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
