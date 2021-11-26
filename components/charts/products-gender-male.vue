<template>
  <div>
    <div class>
      <doughnut-chart
        :data="doughnutChartData"
        :options="doughnutChartOptions"
        :height="220"
        :width="250"
      />
    </div>
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
        labels: ["Rice", "Beans", "Yam", "Crayfish", "Others"],
        datasets: [
          {
            label: ["Rice", "Beans", "Yam", "Crayfish", "Others"],
            data: [10, 15, 30, 10, 5],
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
          position: "right",

          labels: {
            fontColor: "#25396F",
            usePointStyle: true
          }
        },

        // title: {
        //   display: true,
        //   text: 'Male',
        //   fontSize: 16,
        //   fontColor: '#333333',
        //     align: 'center',
        //     position: 'top'
        // },
        cutoutPercentage: 70,
        rotation: Math.PI * 1,
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
