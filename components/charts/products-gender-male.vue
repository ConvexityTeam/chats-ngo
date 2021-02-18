<template>
  <div>
    <div class>
      <doughnut-chart
        :data="doughnutChartData"
        :options="doughnutChartOptions"
        :height="250"
        :width="250"
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
        labels: ['Rice', 'Beans', 'Yam', 'Crayfish', 'Others'],
        datasets: [
          {
            label:['Rice', 'Beans', 'Yam', 'Crayfish', 'Others'],
            data: [10, 15, 30, 10, 5],
            backgroundColor: ['#855CF8', '#E289F2', '#263238', '#B085FF', '#503795'],
          },
        ],
      },
      doughnutChartOptions: {
        responsive: true,
        legend: {
          display: true,
          position: 'right',

          labels: {
            fontColor: '#263238',
            usePointStyle: true,
          },
        },
        
        title: {
          display: true,
          text: 'Male',
          fontSize: 16,
          fontColor: '#333333',
            align: 'center',
            position: 'top'
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
