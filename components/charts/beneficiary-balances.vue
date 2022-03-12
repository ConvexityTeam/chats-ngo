<template>
	<div>
		<div>
			<bar-chart
				v-if="requiredData"
				:data="barChartData"
				:options="barChartOptions"
				:height="320"
			/>
		</div>
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
					'100,000',
					'200,000',
					'300,000',
					'400,000',
					'500,000',
					'600,000',
					'700,000',
					'800,000',
					'900,000',
					'1,000,000',
				],
				datasets: [
					{
						label: 'Visits',
						data: [],
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
		this.updateChart();
	},

	computed: {
		requiredData() {
			return this.barChartData?.datasets[0]?.data?.length;
		},
	},

	methods: {
		async updateChart() {
			try {
				this.loading = true;
				const response = await this.$axios.get(
					'/beneficiaries/total_balance'
				);

				const data = response.data;
				Object.values(data).forEach((item) => {
					this.barChartData.datasets[0].data.push(item);
				});

				if (response.status == 'success') {
					this.loading = false;
				}

				console.log('GET TOTAL_BALANCE RESPONSE', response);
			} catch (err) {
				console.log('GETTOTALBALANCEERERR::', { err });
				this.loading = false;
			}
		},
	},
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
