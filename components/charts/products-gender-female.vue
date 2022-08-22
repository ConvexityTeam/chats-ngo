<template>
    <section>
        <div v-if="loading" class="spinner female">
            <b-spinner class="primary" label="Spinning"></b-spinner>
        </div>

        <doughnut-chart v-else-if="requiredData" :data="doughnutChartData" :options="doughnutChartOptions" :height="220"
            :width="250" />

        <h3 v-else class="text-center no-record">
            NO RECORD FOUND
        </h3>
    </section>
</template>

<script>
import doughnutChart from "~/plugins/charts/doughnutchart";
export default {
    components: {
        doughnutChart,
    },
    data() {
        return {
            id: null,
            loading: false,
            doughnutChartData: {
                labels: ["Rice", "Beans", "Yam", "Crayfish", "Others"],
                datasets: [
                    {
                        label: ["Rice", "Beans", "Yam", "Crayfish", "Others"],
                        data: [],
                        backgroundColor: [
                            "#E8FCCF",
                            "#96E072",
                            "#3DA35D",
                            "#3E8914",
                            "#134611",
                        ],
                    },
                ],
            },
            doughnutChartOptions: {
                responsive: true,
                legend: {
                    display: true,
                    position: "right",

                    labels: {
                        fontColor: "#25396F",
                        usePointStyle: true,
                    },
                },
                // title: {
                //   display: true,
                //   text: "Female",
                //   fontSize: 16,
                //   fontColor: "#333333",
                //   position: "top"
                // },
                cutoutPercentage: 70,
                rotation: Math.PI * 1,
                animation: {
                    animateScale: true,
                },
                tooltips: {
                    backgroundColor: "#17BF62",
                },
            },
        };
    },

    props: {
        femaleData: {
            type: Array,
            default: () => [],
        },
    },

    computed: {
        requiredData() {
            return !!this.doughnutChartData?.datasets[0]?.data?.length;
        },
    },

    mounted() {
        this.updateChart();
    },

    methods: {
        updateChart() {
            // Object.entries(this.femaleData).forEach(([key, value]) => {
            //     this.doughnutChartData.datasets[0].label.push(key);
            //     this.doughnutChartData.datasets[0].data.push(value);
            // });
        },
    },
};
</script>
