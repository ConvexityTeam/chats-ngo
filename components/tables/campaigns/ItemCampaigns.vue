<template>
  <div>
    <!-- Table here -->
    <section class="table-holder mt-5">
      <div v-if="campaigns.length" class="flex align-items-center table-title">
        <h4>Campaigns</h4>
        <div class="ml-auto"></div>
      </div>

      <table class="table table-borderless">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Total items</th>
            <th scope="col">Items spent</th>
            <th scope="col">Date created</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="x in 10"
            :key="x"
            style="cursor: pointer;"
            :class="{ selected: x % 2 == 0 }"
          >
            <td class="campaign-title">Vaccine for all</td>
            <td>{{ $currency }} {{ x }}000</td>
            <td>{{ $currency }} {{ x * x }}000</td>
            <td>17 Dec, 2023</td>

            <td>
              <div
                class="status px-1"
                :class="{
                  progress: x % 2 == 0,
                  done: x % 3 == 0,
                  ongoing: x % 3 == 1,
                }"
              >
                completed
              </div>
            </td>

            <td>
              <div>
                <Button
                  :hasBorder="true"
                  :hasIcon="false"
                  text="Distribute Items"
                  custom-styles=" border-radius: 5px !important;
                  height:33px; border: 1px solid #17ce89 !important; font-size:
                  0.875rem !important; padding:0px 15px !important"
                />
              </div>
            </td>

            <td>
              <div>
                <Button
                  :hasBorder="true"
                  :hasEye="true"
                  text="View"
                  custom-styles=" border: none !important; font-size: 0.875rem !important"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script>
let screenLoading;

export default {
  props: {
    resultQuery: {
      type: Array,
      default: () => [],
    },

    loading: {
      type: Boolean,
      default: false,
    },

    id: {
      type: [String, Number],
      default: "",
    },
  },

  data() {
    return {
      campaigns: [],
      selected: null,
    };
  },

  methods: {
    openScreen() {
      screenLoading = this.$loading({
        lock: true,
        spinner: "el-icon-loading",
        background: "#0000009b",
      });
    },
  },
};
</script>

<style scoped>
.campaign-title {
  max-width: 12rem;
}
</style>
