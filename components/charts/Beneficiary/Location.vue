<template>
  <section>
    <div v-if="loading" class="spinner">
      <b-spinner class="primary" label="Spinning"></b-spinner>
    </div>

    <bar-chart
      v-else
      :data="barChartData"
      :options="barChartOptions"
      :height="320"
    />

    <!-- <div v-else>
      <h4 class="card-title">Beneficiary By Location</h4>
      <h3 class="no-record-dashboard text-center no-record">NO RECORD FOUND</h3>
    </div> -->
  </section>
</template>

<script>
import barChart from "~/plugins/charts/barchart";
export default {
  components: {
    barChart,
  },
  data() {
    return {
      loading: false,
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

  computed: {
    requiredData() {
      return !!this.barChartData?.datasets[0]?.data?.length;
    },
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

        if (response.status === "success") {
          const data = response.data;
          this.barChartData.datasets[0].data = data;
        }

        console.log("GET LOCATION RESPONSE", response);
      } catch (err) {
        console.log("GETLOCATIONERERR::", { err });
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
