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
      <h4 class="card-title">Beneficiary By Gender</h4>
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
        labels: ["Male", "Female"],
        datasets: [
          {
            label: ["Male", "Female"],
            data: [],
            backgroundColor: ["#3DA35D", "#96E072"],
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
          text: "Beneficiary By Gender",
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
      const data = this.doughnutChartData?.datasets[0]?.data;
      const hasValue = Object.values(data).some((value) => value > 0);
      return !!data.length && hasValue;
    },
  },

  mounted() {
    this.updateChart();
  },

  methods: {
    async updateChart() {
      try {
        this.loading = true;
        const response = await this.$axios.get("/beneficiaries/gender");

        if (response.status === "success") {
          const data = response.data;
          Object.values(data).forEach((item) => {
            this.doughnutChartData.datasets[0].data.push(item);
          });
        }

        console.log("GET GENDER RESPONSE", response);
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
