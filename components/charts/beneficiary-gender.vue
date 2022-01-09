<template>
  <div>
    <div class>
      <doughnut-chart
        v-if="requiredData"
        :data="doughnutChartData"
        :options="doughnutChartOptions"
        :height="320"
      />
      <div
        v-else
        class="spinner d-flex justify-content-center align-items-center"
      >
        <b-spinner class="primary" label="Spinning"></b-spinner>
      </div>
    </div>
  </div>
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
      return this.doughnutChartData?.datasets[0]?.data?.length;
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

        // console.log('GENDERNEWDATA:::', newData);

        if (response.status == "success") {
          const data = response.data;
          Object.values(data).forEach((item) => {
            this.doughnutChartData.datasets[0].data.push(item);
          });

          this.loading = false;
        }

        console.log("GET GENDER RESPONSE", response);
      } catch (err) {
        console.log("GETGENDERERR::", { err });
        this.$toast.error(err.response.data.message);
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.spinner {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1000;
}
</style>
