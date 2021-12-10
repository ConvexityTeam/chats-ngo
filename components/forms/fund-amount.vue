<template>
  <form @submit.prevent="fundWallet" class="mt-4 px-3">
    <!-- Name field  here -->
    <div class="form-group">
      <label for="amount">Amount to fund</label>
      <input
        type="number"
        class="form-controls "
        :class="{
          error: $v.amount.$error
        }"
        id="amount"
        placeholder="0.00"
        v-model="amount"
        @blur="$v.amount.$touch()"
      />
    </div>

    <!-- Crypto markers here -->
    <div v-if="showCrypto">
      <token-outlets />
    </div>

    <div class="d-flex pb-3 pt-1">
      <Button
        type="submit"
        :has-icon="false"
        :text="text"
        custom-styles="height:41px; border-radius: 5px; width: 100%"
        :loading="loading"
        :disabled="loading"
      />
    </div>
  </form>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import tokenOutlets from "~/components/generic/token-outlets.vue";

export default {
  props: {
    fundAmount: {
      type: [Number, String],
      default: ""
    },

    orgId: {
      type: [Number, String],
      required: true,
      default: ""
    },

    text: {
      type: String,
      default: "Fund wallet"
    },

    showCrypto: {
      type: Boolean,
      default: true
    }
  },

  components: { tokenOutlets },

  data() {
    return {
      loading: false,
      amount: ""
    };
  },

  validations: {
    amount: {
      required
    }
  },

  methods: {
    async fundWallet() {
      try {
        this.loading = true;
        this.$v.$touch();
        if (this.$v.amount.$error === true || this.amount == 0) {
          this.loading = false;
          return;
        }

        const response = await this.$axios.post(
          `organisations/${this.orgId}/wallets/paystack-deposit`,
          {
            amount: this.amount,
            currency: "NGN"
          }
        );

        if (response.status === "success") {
          this.$toast.success(response.message);
          this.$bvModal.hide("fund-amount");
          this.$emit("funded");
        }
        console.log("DEPOSIT RESPONSE", response);
      } catch (err) {
        this.$toast.error(err.response?.data?.message);
        this.loading = false;
        console.log("FUND ERR:::");
      }
    }
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
}

textarea {
  height: auto;
}

.create-campaign {
  background: var(--primary-color);
  border-radius: 10px;
  font-size: 1rem;
  border: 1px solid var(--primary-color);
  color: white;
  border: none;
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
