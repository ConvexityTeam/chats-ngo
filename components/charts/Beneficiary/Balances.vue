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
      <h4 class="card-title">Beneficiary Balances</h4>
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
        labels: [
          "0",
          "10,000",
          "20,000",
          "30,000",
          "40,000",
          "50,000",
          "60,000",
          "70,000",
          "80,000",
          "90,000",
          "100,000",
        ],
        datasets: [
          {
            label: "Visits",
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
          text: "Beneficiary Balances",
          fontSize: 18,
          fontColor: "#33333",
        },
        tooltips: {
          backgroundColor: "#17BF62",
        },
        scales: {
          xAxes: [
            {
              barPercentage: 1,
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
      const data = this.barChartData?.datasets[0]?.data;
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
        const response = await this.$axios.get("/beneficiaries/total_balance");

        console.log("BENEFICIARY BALANCES", response);

        if (response.status === "success") {
          const data = response.data;
          Object.values(data).forEach((item) => {
            this.barChartData.datasets[0].data.push(item);
          });
        }

        console.log("GET TOTAL_BALANCE RESPONSE", response);
      } catch (err) {
        console.log("ERROR", err);
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
