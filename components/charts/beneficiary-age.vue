<template>
  <div>
    <doughnut-chart
      :data="doughnutChartData"
      :options="doughnutChartOptions"
      :height="320"
    />
  </div>
</template>

<script>
import doughnutChart from "~/plugins/charts/doughnutchart";
export default {
  components: {
    doughnutChart
  },
  data() {
    return {
      doughnutChartData: {
        labels: ["18-29", "30-41", "42-53", "54-65", "66~"],

        datasets: [
          {
            label: ["18-29", "30-41", "42-53", "54-65", "66~"],
            data: [10, 15, 20, 30, 40],
            backgroundColor: [
              "#E8FCCF",
              "#96E072",
              "#3DA35D",
              "#3E8914",
              "#134611"
            ]
          }
        ]
      },

      doughnutChartOptions: {
        responsive: true,
        legend: {
          display: true,
          position: "bottom",

          labels: {
            fontColor: "#263238",
            usePointStyle: true
          }
        },

        title: {
          display: true,
          text: "Beneficiary Age Group",
          align: "end",
          fontSize: 18,
          fontColor: "#333333"
        },

        cutoutPercentage: 70,
        // rotation: Math.PI * 1,
        animation: {
          animateScale: true
        },

        tooltips: {
          backgroundColor: "#17BF62"
        }
      }
    };
  }
};
</script>
