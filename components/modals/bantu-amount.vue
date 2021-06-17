<template>
  <div>
    <b-modal id="fund-bantu" hide-header hide-footer>
      <div class="text-center position-relative pt-4">
        <!-- <h3 class="header">New Campaign</h3> -->
        <!--Close button here -->
        <button
          type="button"
          class="close-btn position-absolute"
          @click="closeModal"
        >
          <i>
            <svg
              width="23"
              height="27"
              viewBox="0 0 23 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                y1="-1.5"
                x2="31.241"
                y2="-1.5"
                transform="matrix(0.640184 0.768221 -0.704167 0.710035 0 3)"
                stroke="#333333"
                stroke-width="3"
              />
              <line
                y1="-1.5"
                x2="21.5132"
                y2="-1.5"
                transform="matrix(0.673504 -0.739183 0.673504 0.739183 2.73074 22.9814)"
                stroke="#333333"
                stroke-width="3"
              />
            </svg>
          </i>
        </button>
      </div>

      <div class="mt-3 px-3">
        <form @submit.prevent="sendAmount">
          <!-- Name field  here -->
          <div class="form-group">
            <label for="amount">Amount to fund</label>
            <input
              type="number"
              class="form-controls"
              :class="{
                error: $v.amount.$error
              }"
              id="amount"
              placeholder="Enter an Amount"
              v-model="amount"
              @blur="$v.amount.$touch()"
            />
          </div>

          <div class="d-flex pt-2">
            <div class="ml-auto">
              <button class="create-campaign px-4 py-2">
                Fund Wallet
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
export default {
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
  methods: {
    closeModal() {
      this.$bvModal.hide("fund-bantu");
    },

    sendAmount() {
      this.$v.$touch();
      if (this.$v.amount.$error === true) {
        return;
      }
      this.$emit("fundAccount", this.amount);
            this.closeModal();
    }
  }
};
</script>

<style scoped>
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
  bottom: 0px;
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
