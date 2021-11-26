<template>
  <div>
    <bar-chart :data="barChartData" :options="barChartOptions" :height="300" />
    <!-- :height="525" -->
  </div>
</template>

<script>
import barChart from "~/plugins/charts/barchart";
export default {
  components: {
    barChart
  },
  data() {
    return {
      barChartData: {
        labels: ["1", "2", "3", "4", "5", "6"],
        datasets: [
          {
            label: "18-29",
            data: [10, 15, 20, 30, 5, 50],
            backgroundColor: "#134611"
          },
          {
            label: "30-41",
            data: [10, 15, 20, 30, 40, 50],
            backgroundColor: "#3E8914"
          },
          {
            label: "42-53",
            data: [10, 15, 5, 30, 40, 60],
            backgroundColor: "#3DA35D"
          },
          {
            label: "54-65",
            data: [10, 15, 5, 30, 80, 60],
            backgroundColor: "#96E072"
          },
          {
            label: "66~",
            data: [10, 15, 5, 30, 10, 60],
            backgroundColor: "#E8FCCF"
          }
        ]
      },
      barChartOptions: {
        responsive: true,
        legend: {
          display: true,
          position: "bottom",
          labels: {
            fontColor: "#263238",
            usePointStyle: true
          }
        },
        // title: {
        //   display: true,
        //   text: "Products By Age Group",
        //   fontSize: 18,
        //   fontColor: "#33333"
        // },
        tooltips: {
          backgroundColor: "#17BF62"
        },
        scales: {
          xAxes: [
            {
              stacked: true,
              barPercentage: 0.9,
              gridLines: {
                display: true,
                drawBorder: true,
                drawOnChartArea: false
              },
              ticks: {
                fontSize: 10,
                fontColor: "#000000"
              }
            }
          ],
          yAxes: [
            {
              stacked: true,
              ticks: {
                beginAtZero: true,
                fontSize: 10,
                fontColor: "#000000"
              },
              gridLines: {
                display: true,
                drawBorder: true,
                drawOnChartArea: false
              }
            }
          ]
        }
      }
    };
  }
};
</script>
