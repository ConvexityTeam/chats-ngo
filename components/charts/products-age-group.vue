<template>
    <section>
        <div v-if="loading" class="spinner">
            <b-spinner class="primary" label="Spinning"></b-spinner>
        </div>

        <bar-chart
            v-else-if="!requireData"
            :data="barChartData"
            :options="barChartOptions"
            :height="300"
        />

        <h3 v-else class="no-record-dashboard text-center no-record">
            NO RECORD FOUND
        </h3>
    </section>
</template>

<script>
import barChart from "~/plugins/charts/barchart";
export default {
    components: {
        barChart,
    },
    data() {
        return {
            loading: false,
            barChartData: {
                labels: ["1", "2", "3", "4", "5", "6"],
                datasets: [
                    {
                        label: "Rice",
                        data: [],
                        backgroundColor: "#134611",
                    },
                    {
                        label: "Beans",
                        data: [],
                        backgroundColor: "#3E8914",
                    },
                    {
                        label: "Yam",
                        data: [],
                        backgroundColor: "#3DA35D",
                    },
                    {
                        label: "Crayfish",
                        data: [],
                        backgroundColor: "#96E072",
                    },
                    {
                        label: "Others",
                        data: [],
                        backgroundColor: "#E8FCCF",
                    },
                ],
            },
            barChartOptions: {
                responsive: true,
                legend: {
                    display: true,
                    position: "bottom",
                    labels: {
                        fontColor: "#263238",
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
                    backgroundColor: "#17BF62",
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
                                fontColor: "#000000",
                            },
                        },
                    ],
                    yAxes: [
                        {
                            stacked: true,
                            ticks: {
                                beginAtZero: true,
                                fontSize: 10,
                                fontColor: "#000000",
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
            return !!this.barChartData?.datasets[0]?.data?.length;
        },
    },

    mounted() {
        this.updateChart();
    },

    methods: {
        async updateChart() {
            try {
                this.loading = true;
                const response = await this.$axios.get(
                    "/orders/product-purchased-age"
                );

                // console.log('doughnutChartData:::', this.doughnutChartData.datasets[0].data);

                if (response.status == "success") {
                    const data = response.data;
                    Object.values(data).forEach((item) => {
                        this.barChartData.datasets[0].data.push(item);
                    });
                    console.log("AgeData:::", data);
                }

                this.loading = false;

                console.log("GET AGE RESPONSE", response);
            } catch (err) {
                console.log("GETAGEERERR::", { err });
                this.$toast.error(err?.response?.data?.message);
                this.loading = false;
            }
        },
    },
};
</script>
