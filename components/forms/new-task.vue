<template>
  <div class="mt-4 px-3">
    <form @submit.prevent="createTask">
      <!-- Name field  here -->
      <div class="form-group">
        <label for="name">Task name</label>
        <input
          id="name"
          v-model="payload.name"
          type="text"
          class="form-controls"
          :class="{
            error: $v.payload.name.$error,
          }"
          placeholder="Enter name of task"
          @blur="$v.payload.name.$touch()"
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

      <!--Amount field  here -->
      <div class="row form-group">
        <div class="col-lg-12">
          <!--Amount field  here -->
          <div class="">
            <label for="total-amount">Amount</label>
            <CurrencyInput
              id="total-amount"
              v-model="payload.amount"
              placeholder="0.00"
              :customStyles="`height: 41px; border: 1px solid #7c8db5; background: white; padding: 0.75rem`"
              :error="$v.payload.amount.$error"
              @blur="$v.payload.amount.$touch()"
            />
          </div>
        </div>
      </div>

      <!--Max. Entries field here -->
      <div class="row form-group">
        <div class="col-lg-12">
          <!--Max. Entries  field  here -->
          <div class="">
            <label for="entries">Maximum entries</label>
            <input
              id="entries"
              v-model="payload.assignment_count"
              type="number"
              class="form-controls"
              :class="{
                error: $v.payload.assignment_count.$error,
              }"
              placeholder="0"
              @blur="$v.payload.assignment_count.$touch()"
            />
          </div>
        </div>
      </div>

      <!--Evidence field here -->
      <div class="row mb-1">
        <div class="col-lg-12">
          <!--Evidence field  here -->
          <div class="d-flex mt-2">
            <Checkbox
              id="evidence"
              :value="payload.require_evidence"
              @input="(value) => (payload.require_evidence = value)"
            />
            <label for="evidence" class="ml-2">Require evidence?</label>

            <div class="ml-2">
              <Tooltip :content="content" />
            </div>
          </div>
        </div>
      </div>

      <transition name="fade">
        <div v-if="payload.require_evidence">
          <!--Vendor approval field here -->
          <div class="row mb-1">
            <div class="col-lg-12">
              <div class="d-flex mt-">
                <Checkbox
                  id="require-vendor-approval"
                  :value="payload.require_vendor_approval"
                  @input="(value) => (payload.require_vendor_approval = value)"
                />
                <label for="require-vendor-approval" class="ml-2 approval"
                  >To be approved by vendor</label
                >
              </div>
            </div>
          </div>

          <!-- field agent approv here -->
          <div class="row">
            <div class="col-lg-12">
              <div class="d-flex mt-">
                <Checkbox
                  id="require-agent-approval"
                  :value="payload.require_agent_approval"
                  @input="(value) => (payload.require_agent_approval = value)"
                />
                <label for="require-agent-approval" class="ml-2 approval"
                  >To be approved by field agent</label
                >
              </div>
            </div>
          </div>
        </div>
      </transition>

      <!-- button area here -->
      <div class="d-flex mt-3 mb-3">
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
            :disabled="loading"
            custom-styles="height: 41px; border-radius:5px !important; font-size: 14px !important; padding: 0px 25px !important;"
            @click="closeModal"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { required, minValue, maxLength } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
// import DatePicker from "vue2-datepicker";
// import "vue2-datepicker/index.css";

export default {
  // components: { DatePicker },

  props: {
    campaign: {
      type: Object,
      default: () => null,
    },
  },

  data() {
    return {
      loading: false,
      id: 0,
      payload: {
        name: "",
        description: "",
        amount: "",
        assignment_count: "",
        require_evidence: true,
        require_vendor_approval: false,
        require_agent_approval: false,
      },
      content:
        "Choose if evidence should be approved by the Field Agent assigned by this NGO or the Vendor.",
      location: {
        coordinates: [],
      },
    };
  },

  validations: {
    payload: {
      name: { required },
      description: { required, maxLength: maxLength(250) },
      amount: { required },
      assignment_count: { required, minValue: minValue(1) },
      require_evidence: { required },
    },
  },

  computed: {
    ...mapGetters("authentication", ["user", "getCampaign"]),
  },

  watch: {
    "payload.require_evidence": function (value) {
      if (!value) {
        this.payload.require_vendor_approval = false;
        this.payload.require_agent_approval = false;
      }
    },
  },

  mounted() {
    this.id = this.user?.AssociatedOrganisations[0]?.OrganisationId;
    console.log("OrgId:::", this.id);
  },

  methods: {
    closeModal() {
      this.$bvModal.hide("new-task");
    },
    async createTask() {
      try {
        this.$v.payload.$touch();

        if (this.$v.payload.$error) {
          return;
        }

        if (this.payload.require_evidence) {
          if (
            !this.payload.require_vendor_approval &&
            !this.payload.require_agent_approval
          ) {
            this.$toast.error("Please select either vendor or agent approval");
            return;
          }
        }

        this.loading = true;
        let currentCampaignId;

        if (this.campaign) {
          currentCampaignId = this.campaign.id;
        } else {
          currentCampaignId = this.$route?.params?.id;
        }

        this.payload.amount = this.payload.amount.replace(/[^0-9.]/g, "");

        const response = await this.$axios.post(
          `tasks/${this.id}/${currentCampaignId}`,
          [this.payload]
        );

        if (response.status === "success") {
          this.closeModal();
          this.$emit("reload");
          this.$toast.success(response.message);
        }

        console.log("TASK RESP:::", response);
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

label.approval {
  color: var(--primary-gray);
  font-weight: 400;
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
