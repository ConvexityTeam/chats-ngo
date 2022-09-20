<template>
  <section class="">
    <div v-if="loading" class="spinner gender">
      <b-spinner class="primary" label="Spinning"></b-spinner>
    </div>

    <div v-else-if="requiredData">
      <span class="primary-blue" style="font-weight: 500"> Male</span>
      <doughnut-chart
        :data="maleDoughnutChartData"
        :options="doughnutChartOptions"
        :height="120"
        :width="250"
      />
    </div>

    <h3 v-else class="text-center no-record my-4">NO RECORD FOUND</h3>
  </section>
</template>

<script>
import doughnutChart from "~/plugins/charts/doughnutchart";

export default {
  components: {
    doughnutChart,
  },

  props: {
    maleDoughnutChartData: {
      type: Object,
      default: () => {},
    },

    doughnutChartOptions: {
      type: Object,
      default: () => {},
    },

    loading: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    requiredData() {
      return !!this.maleDoughnutChartData?.datasets[0]?.data?.length;
    },
  },
};
</script>
