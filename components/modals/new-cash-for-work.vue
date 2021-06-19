<template>
  <div>
    <b-modal id="new-cash" hide-header hide-footer>
      <div class="text-center position-relative pt-2">
        <h3 class="header">New Campaign</h3>
        <!--Close button here -->
        <button
          type="button"
          class="close-btn position-absolute"
          @click="closeModal"
        >
          <close />
        </button>
      </div>

      <div class="mt-5 px-3">
        <form @submit.prevent="createWork">
          <!-- Name field  here -->
          <div class="form-group">
            <label for="name">Name</label>
            <input
              type="text"
              class="form-controls"
              :class="{
                error: $v.payload.title.$error
              }"
              name="name"
              id="name"
              placeholder="Name of the campaign"
              v-model="payload.title"
              @blur="$v.payload.title.$touch()"
            />
          </div>

          <!--Description field  here -->
          <div class="form-group">
            <label for="description">Description</label>
            <textarea
              class="form-controls"
              :class="{
                error: $v.payload.description.$error
              }"
              name="description"
              id="description"
              cols="30"
              rows="2"
              @blur="$v.payload.description.$touch()"
              v-model="payload.description"
            ></textarea>
          </div>

          <div class="row">
            <div class="col-lg-12">
              <!--Total Amount  field  here -->
              <div class="form-group">
                <label for="total-amount">Budget</label>
                <input
                  type="number"
                  class="form-controls"
                  :class="{
                    error: $v.payload.budget.$error
                  }"
                  name="total-amount"
                  id="total-amount"
                  placeholder="Amount from NGO wallet"
                  v-model="payload.budget"
                  @blur="$v.payload.budget.$touch()"
                  ref="budget"
                />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-6">
              <!--start date  field  here -->
              <div class="form-group">
                <label for="start-date">Start Date</label>

                <date-picker
                  v-model="payload.start_date"
                  format="MM-DD-YYYY"
                  placeholder="MM-DD-YYYY"
                  valueType="format"
                ></date-picker>
              </div>
            </div>

            <!--end date field  here -->
            <div class="col-lg-6">
              <div class="form-group">
                <label for="end-date">End Date</label>

                <date-picker
                  v-model="payload.end_date"
                  format="MM-DD-YYYY"
                  placeholder="MM-DD-YYYY"
                  valueType="format"
                ></date-picker>
              </div>
            </div>
          </div>

          <!--Location  field  here -->
          <div class="row">
            <div class="col-lg-12">
              <div class="form-group">
                <label for="location">Location</label>
                <input
                  type="text"
                  class="form-controls"
                  :class="{
                    error: $v.payload.location.$error
                  }"
                  name="location"
                  id="location"
                  v-model="payload.location"
                  @blur="$v.payload.location.$touch()"
                />
              </div>
            </div>
          </div>

          <div class="d-flex py-3">
            <div>
              <button
                type="button"
                class="cancel px-4 py-2"
                @click="closeModal"
              >
                Cancel
              </button>
            </div>

            <div class="ml-auto">
              <button class="create-campaign px-4 py-2">
                <span v-if="loading">
                  <img
                    src="~/assets/img/vectors/spinner.svg"
                    class="btn-spinner"
                  />
                </span>
                <span v-else>Create</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </b-modal>
  </div>
</template>
<script>
import { required } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import close from "~/components/icons/close";

export default {
  data() {
    return {
      loading: false,
      isFired: false,
      payload: {
        organisation_id: 0,
        type: "cash-for-work",
        title: "",
        description: "",
        budget: "",
        location: "",
        start_date: "",
        end_date: ""
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
        required
      },
      location: {
        required
      },
      start_date: {
        required
      },
      end_date: {
        required
      }
    }
  },
  components: { DatePicker, close },

  computed: {
    ...mapGetters("authentication", ["user"])
  },

  mounted() {
    this.payload.organisation_id = this.user.AssociatedOrganisations[0].OrganisationId;
  },

  methods: {
    closeModal() {
      this.$bvModal.hide("new-cash");
    },

    async createWork() {
      console.log("pd::", this.payload);

      try {
        this.loading = true;
        this.$v.payload.$touch();

        if (this.$v.payload.$error === true) {
          return (this.loading = false);
        }

        const response = await this.$axios.post(
          "/organisation/campaign",
          this.payload
        );

        if (response.status == "success") {
          this.$emit("reload");
          this.closeModal();
          this.$toast.success(response.message);
        } else {
          this.$toast.error(response.message);
        }

        console.log("campaignResponse:::", response);

        this.loading = false;
      } catch (err) {
        console.log(err);
        this.loading = false;
        this.$toast.error(err.response.data.message);
      }
    }
  }
};
</script>

<style scoped>
#current {
  padding-top: 25px;
}

.cancel {
  color: #492954;
  font-size: 1rem;
  border: 1px solid #492954;
  background: inherit;
  border-radius: 10px;
}
.create-campaign {
  background: var(--primary-color);
  border-radius: 10px;
  font-size: 1rem;
  border: 1px solid var(--primary-color);
  color: white;
  border: none;
}
.header {
  color: var(--secondary-black);
  font-weight: 700;
  font-size: 1.5rem;
}
.modal-body {
  border-radius: 10px;
  background: white;
}
.close-btn {
  border: none;
  background: inherit;
  bottom: -3px;
  right: 10px;
}
::placeholder {
  color: #999999;
  letter-spacing: 0.01em;
  font-size: 0.875rem;
  opacity: 0.7;
}
label {
  color: var(--secondary-black);
  font-size: 1rem;
  font-weight: 500;
}
.form-group {
  margin-bottom: 1.5rem;
}
.form-controls {
  border: 1px solid #999999;
}
textarea {
  height: auto;
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
