<template>
  <div>
    <b-modal id="new-campaign" hide-header hide-footer>
      <div class="text-center position-relative pt-2">
        <h3 class="header">New Campaign</h3>
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

      <div class="mt-5 px-3">
        <form>
          <!-- Name field  here -->
          <div class="form-group">
            <label for="name">Name</label>
            <input
              type="text"
              class="form-controls"
              name="name"
              id="name"
              placeholder="Name of the campaign"
            />
          </div>

          <!--Number of Beneficiaries field  here -->
          <div class="form-group">
            <label for="number">Number Of Beneficiaries</label>
            <input
              type="text"
              class="form-controls"
              name="number"
              pattern="^[0-9]*$"
              id="number"
            />
          </div>

          <div class="row">
            <div class="col-lg-6">
              <!--Total Amount  field  here -->
              <div class="form-group">
                <label for="total-amount">Number Of Beneficiaries</label>
                <input
                  type="text"
                  class="form-controls"
                  name="total-amount"
                  pattern="^[0-9]*$"
                  id="total-amount"
                  placeholder="Amount from NGO wallet"
                />
              </div>
            </div>

            <div class="col-lg-6">
              <!--Amount per receipient field  here -->
              <div class="form-group">
                <label for="receipient-amount">Number Of Beneficiaries</label>
                <input
                  type="text"
                  class="form-controls"
                  name="receipient-amount"
                  pattern="^[0-9]*$"
                  id="receipient-amount"
                  placeholder="Amount for each recipient"
                />
              </div>
            </div>
          </div>

          <div class="row">
            <!--Location  field  here -->
            <div class="col-lg-6">
              <div class="form-group">
                <label for="location">Location</label>
                <select name="location" class="form-controls" id="location">
                  <option value="">Lagos</option>
                </select>
              </div>
            </div>

            <!--Field office field  here -->
            <div class="col-lg-6">
              <div class="form-group">
                <label for="field-office">Field Office</label>
                <input
                  type="text"
                  class="form-controls"
                  name="field-office"
                  id="field-office"
                />
              </div>
            </div>
          </div>

          <div class="d-flex pb-3">
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
              <button class="create-campaign px-4 py-2">Create</button>
            </div>
          </div>
        </form>
      </div>
    </b-modal>
  </div>
</template>
<script>
export default {
  methods: {
    closeModal() {
      this.$bvModal.hide('new-campaign')
    },
  },
}
</script>

<style scoped>
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
  font-size: 0.75rem;
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
</style>
