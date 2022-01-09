<template>
  <div>
    <bar-chart :data="barChartData" :options="barChartOptions" :height="320" />
    <!-- v-if="barChartData.datasets[0].data.length" -->
    <!-- <div
			v-else
			class="spinner d-flex justify-content-center align-items-center"
		>
			<b-spinner class="primary" label="Spinning"></b-spinner>
		</div> -->
  </div>
</template>

<script>
import barChart from "~/plugins/charts/barchart";
export default {
  components: {
    barChart,
  },
  data() {
    return {
      barChartData: {
        labels: ["KADUNA", "ABUJA", "LAGOS", "JOS"],
        datasets: [
          {
            label: "Beneficiary By Location",
            data: [],
            backgroundColor: "#27AE60",
          },
        ],
      },
      barChartOptions: {
        responsive: true,
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: "Beneficiary By Location",
          fontSize: 18,
          fontColor: "#33333",
        },
        tooltips: {
          backgroundColor: "#17BF62",
        },
        scales: {
          xAxes: [
            {
              barPercentage: 0.9,
              gridLines: {
                display: true,
                drawBorder: true,
                drawOnChartArea: false,
              },
              ticks: {
                fontSize: 10,
                fontColor: "#000000",
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                fontSize: 10,
                fontColor: "#000000",
              },
              gridLines: {
                display: true,
                drawBorder: true,
                drawOnChartArea: false,
              },
            },
          ],
        },
      },
    };
  },

  mounted() {
    this.updateChart();
  },

  methods: {
    async updateChart() {
      try {
        this.loading = true;
        const response = await this.$axios.get("/beneficiaries/location");

        console.log("LOCATION DATA:::", response);

        if (response.status == "success") {
          const data = response.data;
          Object.values(data).forEach((item) => {
            this.barChartData.datasets[0].data.push(item);
          });

          this.loading = false;
        }

        console.log("GET LOCATION RESPONSE", response);
      } catch (err) {
        console.log("GETLOCATIONERERR::", { err });
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
