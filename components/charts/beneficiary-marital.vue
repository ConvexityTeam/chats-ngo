<template>
  <div>
    <div class>
      <doughnut-chart
        :data="doughnutChartData"
        :options="doughnutChartOptions"
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
        labels: ['Single', 'Married', 'Divorced'],
        datasets: [
          {
            label:['Single', 'Married', 'Divorced'],
            data: [10, 15, 5],
            backgroundColor: ['#855CF8', '#E289F2', '#503795'],
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
          text: 'Beneficiary By Marital Status',
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
