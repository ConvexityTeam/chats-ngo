<template>
    <div>
        <!-- <bar-chart :data="barChartData" :options="barChartOptions" :height="320" /> -->
        <h3 class="no-record-dashboard text-center no-record">
            NO RECORD FOUND
        </h3>
    </div>
</template>

<script>
import barChart from "~/plugins/charts/barchart";
export default {
    components: {
        barChart,
    },
    data() {
        return {
            barChartData: {
                labels: ["1", "2", "3", "4", "5", "6"],
                datasets: [
                    {
                        label: "Visits",
                        data: [],
                        backgroundColor: "#27AE60",
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
                    text: "Vendor Transaction per Beneficiary",
                    fontSize: 18,
                    fontColor: "#33333",
                },
                tooltips: {
                    backgroundColor: "#17BF62",
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
                                fontColor: "#000000",
                            },
                        },
                    ],
                    yAxes: [
                        {
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
};
</script>
