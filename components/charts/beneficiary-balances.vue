<template>
	<div>
		<bar-chart :data="barChartData" :options="barChartOptions" :height="320" />
	</div>
</template>

<script>
import barChart from '~/plugins/charts/barchart';
export default {
	components: {
		barChart,
	},
	data() {
		return {
			barChartData: {
				labels: [
					'0',
					'10,000',
					'15,000',
					'20,000',
					'25,000',
					'30,000',
					'35,000',
					'40,000',
					'45,000',
				],
				datasets: [
					{
						label: 'Visits',
						data: [10000, 5000, 2000, 300, 4000, 500, 300, 4000, 500],
						backgroundColor: '#27AE60',
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
								fontColor: '#000000',
							},
						},
					],
					yAxes: [
						{
							ticks: {
								beginAtZero: true,
								fontSize: 10,
								fontColor: '#000000',
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

	mounted() {
		// this.updateChart();
	},

	// methods: {
	// 	async updateChart() {
	// 		try {
	// 			this.loading = true;
	// 			const response = await this.$axios.get('/beneficiaries/total_balance');

	// 			const data = response.data;
	// 			Object.values(data).forEach((item) => {
	// 				this.doughnutChartData.datasets[0].data.push(item);
	// 			});

	// 			console.log('TotalBalanceData:::', data);

	// 			if (response.status == 'success') {
	// 				this.loading = false;
	// 				// this.$toast.success(response.message);
	// 			}

	// 			console.log('GET TOTAL_BALANCE RESPONSE', response);
	// 		} catch (err) {
	// 			console.log('GETTOTALBALANCEERERR::', { err });
	// 			this.$toast.error(err.response.data.message);
	// 			this.loading = false;
	// 		}
	// 	},
	// },
};
</script>

<style scoped>
.spinner {
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	z-index: 1000;
}
</style>
