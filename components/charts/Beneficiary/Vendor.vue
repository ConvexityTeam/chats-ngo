<template>
  <div>
    <div>
      <h4 class="card-title">Beneficiary Vendors</h4>
      <h3 class="no-record-dashboard text-center no-record">NO RECORD FOUND</h3>
    </div>
  </div>
</template>

<script>
// import barChart from "~/plugins/charts/barchart";
export default {
  components: {
    // barChart,
  },
  data() {
    return {
      barChartData: {
        labels: ["Ade", "Ope", "Obi", "Test", "Doe", "Jane"],
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
          text: "Vendor Transaction By Beneficiary",
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
