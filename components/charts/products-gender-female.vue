<template>
  <section>
    <div v-if="loading" class="spinner gender">
      <b-spinner class="primary" label="Spinning"></b-spinner>
    </div>

    <doughnut-chart
      v-else-if="requiredData"
      :data="doughnutChartData"
      :options="doughnutChartOptions"
      :height="120"
      :width="250"
    />

    <h3 v-else class="text-center no-record">
      NO RECORD FOUND
    </h3>
  </section>
</template>

<script>
import doughnutChart from "~/plugins/charts/doughnutchart";
export default {
  components: {
    doughnutChart
  },

  props: {
    femaleDoughnutChartData: {
      type: Object,
      default: () => {}
    },

    doughnutChartOptions: {
      type: Object,
      default: () => {}
    },

    loading: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    requiredData() {
      return !!this.femaleDoughnutChartData?.datasets[0]?.data?.length;
    }
  }
};
</script>
