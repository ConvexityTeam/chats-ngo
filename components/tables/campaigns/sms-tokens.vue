<template>
  <!-- Table here -->
  <div class="table-holder mt-4">
    <div class="flex align-items-center table-title">
      <h4>SMS Token</h4>
      <div class="ml-auto"></div>
    </div>

    <div v-if="loading" class="px-4">
      <Skeleton
        :count="6"
        class="mb-5"
        styles="height: 52px; margin-bottom: 10px"
      />
    </div>

    <table v-else-if="data.length" class="table table-borderless">
      <thead>
        <tr>
          <th scope="col">
            <Checkbox
              :checked="selected.length === data.length"
              @input="handleSelectAll"
            />
          </th>
          <th scope="col">Beneficiary</th>
          <th></th>
          <th scope="col">Project</th>
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
          :class="{ selected: i % 2 == 0 }"
        >
          <td>
            <Checkbox
              :value="token.beneficiaryId"
              :checked="selected.includes(token.beneficiaryId)"
              @input="handleCheckbox"
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
                  alt="user"
                ></b-avatar>
              </span>
              {{
                token.Beneficiary
                  ? `${
                      token.Beneficiary.first_name +
                      " " +
                      token.Beneficiary.last_name
                    }`
                  : ""
              }}
            </div>
          </td>
          <td></td>
          <td class="wrap">{{ token.Campaign ? token.Campaign.title : "" }}</td>
          <td></td>
          <td class="wrap">
            {{ token.amount | formatCurrency }}
          </td>
          <td></td>
          <td>{{ token.token }}</td>
          <td></td>
          <td>
            <div>
              <Button
                :hasBorder="true"
                :hasIcon="false"
                text="Resend"
                custom-styles=" border-radius: 5px !important;
                  height:33px; border: 1px solid #17ce89 !important; font-size:
                  0.875rem !important; padding:0px 15px !important"
                :disabled="selected.length === data.length"
                @click="$emit('resendToken', token.beneficiaryId)"
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- No Data Here -->
    <h3 v-else class="text-center no-record">NO RECORD FOUND</h3>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },

    loading: {
      type: Boolean,
      default: false,
    },

    isCleared: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    selected: [],
  }),

  watch: {
    isCleared(val) {
      if (val) {
        this.selected = [];
      }
    },
  },

  methods: {
    handleCheckbox(value) {
      const index = this.selected.indexOf(value);

      if (index > -1) {
        this.selected.splice(index, 1);
      } else {
        this.selected.push(Number(value));
      }

      this.$emit("handleSelected", this.selected);
    },
    handleSelectAll() {
      if (this.data.length === this.selected.length) {
        this.selected = [];
      } else {
        this.selected = this.data.map((user) => user.beneficiaryId);
      }

      this.$emit("handleSelected", this.selected);
    },
  },
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
