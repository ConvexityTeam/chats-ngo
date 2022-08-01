<template>
    <section>
        <div v-if="loading" class="spinner female">
            <b-spinner class="primary" label="Spinning"></b-spinner>
        </div>

        <doughnut-chart v-else-if="requiredData" :data="doughnutChartData" :options="doughnutChartOptions" :height="220"
            :width="250" />

        <h3 v-else class="no-record-dashboard text-center no-record">
            NO RECORD FOUND
        </h3>
    </section>
</template>

<script>
import doughnutChart from "~/plugins/charts/doughnutchart";
import { mapGetters } from "vuex";
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

    computed: {
        ...mapGetters("authentication", ["user"]),
        requiredData() {
            return !!this.doughnutChartData?.datasets[0]?.data?.length;
        },
    },

    mounted() {
        this.id = this.user?.AssociatedOrganisations[0]?.OrganisationId;
        this.updateChart();
    },

    methods: {
        async updateChart() {
            try {
                this.loading = true;
                const response = await this.$axios.get(
                    `/orders/product-purchased-gender/${this.id}`
                );

                if (response.status == "success") {
                    const data = response.data;
                    this.doughnutChartData.datasets[0].data = data.female;
                    this.loading = false;
                }

                console.log("GET FEMALE RESPONSE", response);
            } catch (err) {
                console.log("GETFEMALEERR::", { err });
                this.$toast.error(err.response?.data?.message);
                this.loading = false;
            }
        },
    },
};
</script>
