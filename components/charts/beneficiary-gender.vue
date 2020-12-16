<template>
<div >
  <div class>
    <doughnut-chart
      :data="doughnutChartData"
      :options="doughnutChartOptions"
      :height="480"
    />
  </div>
  </div>
</template>

<script>
import doughnutChart from '~/plugins/charts/doughnutchart'
export default {
  components: {
    doughnutChart,
  },
  data() {
    return {
      doughnutChartData: {
        labels: ['Male', 'Female'],
        datasets: [
          {
            label:  ['Male', 'Female'],
            data: [10, 15],
            backgroundColor: [
              '#855CF8',
              '#E289F2',
            ],
          },
        ],
      },
      doughnutChartOptions: {
        responsive: true,
        legend: {
          display: true,
          position: 'bottom',

          labels: {
            fontColor: '#263238',
            usePointStyle: true,
          },
        },
        title: {
          display: true,
          text: 'Beneficiary By Gender',
          fontSize: 18,
          fontColor: '#333333',
        },
        cutoutPercentage: 70,
        rotation: Math.PI * 1,
        animation: {
          animateScale: true,
        },
        tooltips: {
          backgroundColor: '#17BF62',
        },
      },
    }
  },
}
</script>

