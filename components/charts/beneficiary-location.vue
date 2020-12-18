<template>
  <div>
    <bar-chart :data="barChartData" :options="barChartOptions"/>
  </div>
</template>

<script>
import barChart from '~/plugins/charts/barchart'
export default {
  components: {
    barChart,
  },
  data() {
    return {
      barChartData: {
        labels: ['KADUNA', 'ABUJA', 'LAGOS', 'JOS'],
        datasets: [
          {
            label: 'Beneficiary By Location',
            data: [10, 15, 20, 30, 40, 50],
            backgroundColor: '#855CF8',
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
          text: 'Beneficiary By Location',
          fontSize: 18,
          fontColor: '#33333',
        },
        tooltips: {
          backgroundColor: '#17BF62',
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
                fontColor: '#000000'
            }
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                 fontSize: 10,
                     fontColor: '#000000'
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
    }
  },
}
</script>
