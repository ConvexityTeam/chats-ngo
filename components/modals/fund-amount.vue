<template>
  <div>
    <b-modal id="fund-amount" hide-header hide-footer>
      <div class="text-center position-relative pt-4">
        <h3 class="header">Fund wallet</h3>
        <!--Close button here -->
        <button
          type="button"
          class="close-btn position-absolute"
          @click="closeModal"
        >
          <close />
        </button>
      </div>

      <form @submit.prevent="sendAmount" class="mt-4 px-3">
        <!-- Name field  here -->
        <div class="form-group">
          <label for="amount">Amount to fund</label>
          <input
            type="number"
            class="form-controls"
            :class="{
              error: $v.amount.$error,
            }"
            id="amount"
            placeholder="0.00"
            v-model="amount"
            @blur="$v.amount.$touch()"
          />
        </div>

        <div class="d-flex py-3">
          <Button
            type="submit"
            :has-icon="false"
            text="Fund wallet"
            custom-styles="height:41px; border-radius: 5px; width: 100%"
          />
        </div>
      </form>
    </b-modal>
  </div>
</template>
<script>
import { required } from "vuelidate/lib/validators";
import close from "~/components/icons/close";
export default {
  props: {
    fundAmount: {
      type: Number,
    },
  },

  data() {
    return {
      amount: "",
    };
  },

  validations: {
    amount: {
      required,
    },
  },

  watch: {
    fundAmount(value) {
      this.amount = value;
    },
  },

  components: { close },

  methods: {
    closeModal() {
      this.$bvModal.hide("fund-amount");
    },

    sendAmount() {
      this.$v.$touch();
      if (this.$v.amount.$error === true) {
        return;
      }
      this.$emit("fundWallet", { amount: this.amount });
      this.closeModal();
    },
  },
};
</script>

<style scoped>
.header {
  color: var(--primary-blue);
  font-weight: bold;
  font-size: 1.5rem;
}

.modal-body {
  border-radius: 10px;
  background: white;
}

.close-btn {
  border: none;
  background: inherit;
  bottom: 20px;
  right: 0px;
}

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
