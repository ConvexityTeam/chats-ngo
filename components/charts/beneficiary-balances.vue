<template>
  <div>
    <bar-chart :data="barChartData" :options="barChartOptions" :height="525"/>
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
        labels: ['0', '10,000', '15,000', '20,000', '25,000', '30,000','35,000','40,000', '45,000'],
        datasets: [
          {
            label: 'Visits',
            data: [10000, 5000, 2000, 300, 4000, 500, 300, 4000, 500],
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
          text: 'Beneficiary Balances',
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
