<template>
  <section>
    <div v-if="loading" class="spinner">
      <b-spinner class="primary" label="Spinning"></b-spinner>
    </div>

    <doughnut-chart
      v-else
      :data="doughnutChartData"
      :options="doughnutChartOptions"
      :height="320"
    />

    <!-- <div v-else>
      <h4 class="card-title">Beneficiary By Marital Status</h4>
      <h3 class="no-record-dashboard text-center no-record">NO RECORD FOUND</h3>
    </div> -->
  </section>
</template>

<script>
import doughnutChart from "~/plugins/charts/doughnutchart";
export default {
  components: {
    doughnutChart,
  },
  data() {
    return {
      loading: false,
      doughnutChartData: {
        labels: ["Single", "Married", "Divorced"],
        datasets: [
          {
            label: ["Single", "Married", "Divorced"],
            data: [],
            backgroundColor: ["#E8FCCF", "#96E072", "#3DA35D"],
          },
        ],
      },
      doughnutChartOptions: {
        responsive: true,
        legend: {
          display: true,
          position: "bottom",

          labels: {
            fontColor: "#263238",
            usePointStyle: true,
          },
        },
        title: {
          display: true,
          text: "Beneficiary By Marital Status",
          fontSize: 18,
          fontColor: "#333333",
        },
        cutoutPercentage: 70,
        rotation: Math.PI * 1,
        animation: {
          animateScale: true,
        },
        tooltips: {
          backgroundColor: "#17BF62",
        },
      },
    };
  },

  computed: {
    requiredData() {
      return !!this.doughnutChartData?.datasets[0]?.data?.length;
    },
  },

  mounted() {
    this.updateChart();
  },

  methods: {
    async updateChart() {
      try {
        this.loading = true;
        const response = await this.$axios.get("/beneficiaries/marital_status");

        console.log("MaritalData:::", response);

        if (response.status === "success") {
          const data = response.data;
          this.doughnutChartData.datasets[0].data = data;
        }

        console.log("MARITAL_STATUS RESPONSE", response);
      } catch (_err) {
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.card-title {
  color: #333;
  font-family: Gilroy;
  font-size: 18px;
  font-weight: bold;
  line-height: 27.09px;
  letter-spacing: 0.497px;
}
</style>
