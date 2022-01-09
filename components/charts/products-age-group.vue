<template>
	<div>
		<bar-chart
			v-if="requireData"
			:data="barChartData"
			:options="barChartOptions"
			:height="300"
		/>
		<div
			v-else
			class="spinner d-flex justify-content-center align-items-center"
		>
			<b-spinner class="primary" label="Spinning"></b-spinner>
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
			loading: false,
			barChartData: {
				labels: ['1', '2', '3', '4', '5', '6'],
				datasets: [
					{
						label: 'Rice',
						data: [10, 15, 20, 30, 5, 50],
						backgroundColor: '#134611',
					},
					{
						label: 'Beans',
						data: [10, 15, 20, 30, 40, 50],
						backgroundColor: '#3E8914',
					},
					{
						label: 'Yam',
						data: [10, 15, 5, 30, 40, 60],
						backgroundColor: '#3DA35D',
					},
					{
						label: 'Crayfish',
						data: [10, 15, 5, 30, 80, 60],
						backgroundColor: '#96E072',
					},
					{
						label: 'Others',
						data: [10, 15, 5, 30, 10, 60],
						backgroundColor: '#E8FCCF',
					},
				],
			},
			barChartOptions: {
				responsive: true,
				legend: {
					display: true,
					position: 'bottom',
					labels: {
						fontColor: '#263238',
						usePointStyle: true,
					},
				},
				// title: {
				//   display: true,
				//   text: "Products By Age Group",
				//   fontSize: 18,
				//   fontColor: "#33333"
				// },
				tooltips: {
					backgroundColor: '#17BF62',
				},
				scales: {
					xAxes: [
						{
							stacked: true,
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
							stacked: true,
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

	computed: {
		requireData() {
			return this.barChartData?.datasets[0]?.data?.length;
		},
	},

	mounted() {
		this.updateChart();
	},

	methods: {
		async updateChart() {
			try {
				this.loading = true;
				const response = await this.$axios.get('/orders/product-purchased-age');

				// console.log('doughnutChartData:::', this.doughnutChartData.datasets[0].data);

				if (response.status == 'success') {
					const data = response.data;
					Object.values(data).forEach((item) => {
						this.barChartData.datasets[0].data.push(item);
					});
					console.log('AgeData:::', data);
					this.loading = false;
				}

				console.log('GET AGE RESPONSE', response);
			} catch (err) {
				console.log('GETAGEERERR::', { err });
				this.$toast.error(err.response.data.message);
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
	/* left: 0; */
	bottom: 0;
	right: 120px;
	z-index: 1000;
}
</style>
