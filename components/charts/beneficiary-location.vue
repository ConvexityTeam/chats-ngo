<template>
	<div>
		<div>
			<bar-chart
				v-if="requiredData"
				:data="barChartData"
				:options="barChartOptions"
				:height="320"
			/>
		<h3 v-else class="no-record-dashboard text-center no-record">NO RECORD FOUND</h3>
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
				labels: ['KADUNA', 'ABUJA', 'LAGOS', 'JOS'],
				datasets: [
					{
						label: 'Beneficiary By Location',
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
			return this.barChartData?.datasets[0]?.data[0] || this.barChartData?.datasets[0]?.data[1] || this.barChartData?.datasets[0]?.data[2] || this.barChartData?.datasets[0]?.data[3] !== 0;
		},
	},

	methods: {
		async updateChart() {
			try {
				this.loading = true;
				const response = await this.$axios.get(
					'/beneficiaries/location'
				);

				console.log('LOCATION DATA:::', response);

				if (response.status == 'success') {
					const data = response.data;
					Object.values(data).forEach((item) => {
						this.barChartData.datasets[0].data.push(item);
					});

					this.loading = false;
				}

				console.log('GET LOCATION RESPONSE', response);
			} catch (err) {
				console.log('GETLOCATIONERERR::', { err });
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
