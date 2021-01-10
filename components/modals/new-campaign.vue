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
        <form @submit.prevent="createCampaign">
          <!-- Name field  here -->
          <div class="form-group">
            <label for="name">Name</label>
            <input
              type="text"
              class="form-controls"
              name="name"
              id="name"
              placeholder="Name of the campaign"
              v-model="payload.title"
            />
          </div>

          <!--Description field  here -->
          <div class="form-group">
            <label for="description">Description</label>
            <textarea
              class="form-controls"
              name="description"
              id="description"
              cols="30"
              rows="2"
              v-model="payload.description"
            ></textarea>
          </div>

          <div class="row">
            <div class="col-lg-6">
              <!--Total Amount  field  here -->
              <div class="form-group">
                <label for="total-amount">Total Wallet</label>
                <input
                  type="text"
                  class="form-controls"
                  name="total-amount"
                  pattern="^[-,0-9]+$"
                  id="total-amount"
                  placeholder="Amount from NGO wallet"
                  v-model="payload.budget"
                  ref="budget"
          
                />
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
                  v-model="payload.location.field_office"
                />
              </div>
            </div>

            <!--Amount per receipient field  here -->
            <!-- <div class="col-lg-6">
              <div class="form-group">
                <label for="receipient-amount">Amount Per Recipient</label>
                <input
                  type="text"
                  class="form-controls"
                  name="receipient-amount"
                  pattern="^[0-9]*$"
                  id="receipient-amount"
                  placeholder="Amount for each recipient"
                />
              </div>
            </div> -->
          </div>

          <div class="row">
            <!--Location  field  here -->
            <!-- <div class="col-lg-6">
              <div class="form-group">
                <label for="location">Location</label>
                <select name="location" class="form-controls" id="location">
                  <option value="">Lagos</option>
                </select>
              </div>
            </div> -->

            <div class="col-lg-6">
              <!--start date  field  here -->
              <div class="form-group">
                <label for="start-date">Start Date</label>
                <input
                  type="date"
                  class="form-controls"
                  name="total-amount"
                  id="start-date"
                  placeholder="Amount from NGO wallet"
                  v-model="payload.start_date"
                />
              </div>
            </div>

            <!--end date field  here -->
            <div class="col-lg-6">
              <div class="form-group">
                <label for="end-date">End Date</label>
                <input
                  type="date"
                  class="form-controls"
                  name="total-amount"
                  id="end-date"
                  placeholder="Amount from NGO wallet"
                  v-model="payload.end_date"
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
      <div>
        <code>
          <pre>{{ payload }}</pre>
        </code>
      </div>
    </b-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      budget:'',
      payload: {
        title: '',
        description: '',
        budget: '',
        location: {
          country: '',
          state: '',
          field_office: '',
          coodordinates: [
            {
              long: '',
              lat: '',
            },
          ],
        },
        start_date: '',
        end_date: '',
      },
    }
  },

  watch: {
   'payload.budget': function(newValue) {
      const result = newValue.replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
       this.$nextTick(() => this.payload.budget = result);
    },
  },

  methods: {
    closeModal() {
      this.$bvModal.hide('new-campaign')
    },

    async createCampaign() {
      try {
        this.loading = true

        const response = await this.$axios.post('/campaigns', this.payload)
        console.log({ campaignResponse: response })

        this.$toast.success(response.data.message)
        this.loading = false
        this.closeModal()
        
      } catch (err) {
        console.log(err)
         this.loading = false
         this.$toast.error(err.response.data.message)
      }
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
</style>
