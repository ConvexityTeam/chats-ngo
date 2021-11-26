<template>
  <form @submit.prevent="sendAmount" class="mt-4 px-3">
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
      amount: ""
    };
  },

  validations: {
    amount: {
      required
    }
  },

  mounted() {
    this.amount = this.fundAmount;
  },

  methods: {
    closeModal() {
      this.$bvModal.hide("fund-amount");
    },

    sendAmount() {
      this.$v.$touch();
      if (this.$v.amount.$error === true || this.amount == 0) {
        return;
      }
      this.$emit("fundWallet", { amount: this.amount });
      this.closeModal();
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
