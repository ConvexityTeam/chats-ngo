<template>
  <!-- Table here -->
  <div class="table-holder mt-4">
    <div v-if="data.length" class="flex align-items-center table-title">
      <h4>SMS Token</h4>
      <div class="ml-auto"></div>
    </div>
    <table v-if="data.length" class="table table-borderless">
      <thead>
        <tr>
          <th scope="col">
            <Checkbox
              @input="handleSelectAll"
              :checked="selected.length === SampleData.length"
            />
          </th>
          <th scope="col">Beneficiary</th>
          <th></th>
          <th scope="col">Campaign</th>
          <th></th>
          <th scope="col">Amount</th>
          <th></th>
          <th scope="col">SMS Token</th>
          <th></th>
          <th scope="col">Action</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(token, i) in data"
          :key="i"
          style="cursor: pointer"
          :class="{ selected: i % 2 == 0 }"
        >
          <td>
            <Checkbox
              @input="handleCheckbox"
              :value="token.beneficiaryId"
              :checked="selected.includes(token.beneficiaryId)"
            />
          </td>
          <td class="wrap">
            <div>
              <span>
                <b-avatar
                  size="32px"
                  :src="token.Beneficiary ? token.Beneficiary.profile_pic : ''"
                  class="mr-2"
                  variant="light"
                ></b-avatar>
              </span>
              {{
                token.Beneficiary
                  ? `${token.Beneficiary.first_name +
                      " " +
                      token.Beneficiary.last_name}`
                  : ""
              }}
            </div>
          </td>
          <td></td>
          <td class="wrap">{{ token.Campaign ? token.Campaign.title : "" }}</td>
          <td></td>
          <td class="wrap">{{ $currency }}{{ token.amount }}</td>
          <td></td>
          <td>{{ token.token }}</td>
          <td></td>
          <td>
            <div>
              <Button
                :hasBorder="true"
                :hasIcon="false"
                text="Resend token"
                custom-styles=" border-radius: 5px !important;
                  height:33px; border: 1px solid #17ce89 !important; font-size:
                  0.875rem !important; padding:0px 15px !important"
                @click="$emit('resendToken', token.beneficiaryId)"
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Loader Here -->
    <div v-else-if="loading" class="py-5">
      <div class="text-center loader "></div>
    </div>

    <!-- No Data Here -->
    <h3 v-else class="text-center no-record">NO RECORD FOUND</h3>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },

    loading: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    selected: []
  }),

  methods: {
    handleCheckbox(value) {
      const index = this.selected.indexOf(value);

      if (index > -1) {
        this.selected.splice(index, 1);
      } else {
        this.selected.push(value);
      }

      this.$emit("handleSelected", this.selected);
    },
    handleSelectAll() {
      if (this.SampleData.length === this.selected.length) {
        this.selected = [];
      } else {
        this.selected = this.SampleData.map(user => user.id);
      }

      this.$emit("handleSelected", this.selected);
    }
  }
};
</script>

<style scoped>
.wrap {
  word-wrap: break-word;
  width: 14rem;
  max-width: 14rem;
}

.table thead th:nth-child(1) {
  width: 1rem;
}

.table thead th:nth-child(2),
.table tbody td:nth-child(2) {
  padding: 1.25rem 0rem;
}

.table thead th,
.table tbody td {
  padding: 1.25rem;
}
</style>
