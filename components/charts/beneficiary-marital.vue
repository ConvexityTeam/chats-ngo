<template>
  <section>
    <div v-if="loading" class="spinner">
      <b-spinner type="grow" label="Spinning"></b-spinner>
    </div>

    <doughnut-chart
      v-else-if="requiredData"
      :data="doughnutChartData"
      :options="doughnutChartOptions"
      :height="320"
    />

    <h3 v-else class="no-record-dashboard text-center no-record">
      NO RECORD FOUND
    </h3>
  </section>
</template>

<script>
import doughnutChart from "~/plugins/charts/doughnutchart";
export default {
  components: {
    doughnutChart
  },
  data() {
    return {
      loading: false,
      doughnutChartData: {
        labels: ["Single", "Married", "Divorced"],
        datasets: [
          {
            label: ["Single", "Married", "Divorced"],
            data: [0, 0, 0],
            backgroundColor: ["#E8FCCF", "#96E072", "#3DA35D"]
          }
        ]
      },
      doughnutChartOptions: {
        responsive: true,
        legend: {
          display: true,
          position: "bottom",

          labels: {
            fontColor: "#263238",
            usePointStyle: true
          }
        },
        title: {
          display: true,
          text: "Beneficiary By Marital Status",
          fontSize: 18,
          fontColor: "#333333"
        },
        cutoutPercentage: 70,
        rotation: Math.PI * 1,
        animation: {
          animateScale: true
        },
        tooltips: {
          backgroundColor: "#17BF62"
        }
      }
    };
  },

  computed: {
    requiredData() {
      return !!this.doughnutChartData?.datasets[0]?.data?.length;
    }
  },

  mounted() {
    this.updateChart();
  },

  methods: {
    async updateChart() {
      try {
        this.loading = true;
        const response = await this.$axios.get("/beneficiaries/marital_status");

        // console.log('MaritalData:::', data);

        if (response.status == "success") {
          const data = response.data;
          Object.values(data).forEach(item => {
            this.doughnutChartData.datasets[0].data.push(item);
          });
        }

        this.loading = false;

        console.log("MARITAL_STATUS RESPONSE", response);
      } catch (err) {
        console.log("MARITALSTATUSERERR::", { err });
        this.$toast.error(err.response.data.message);
        this.loading = false;
      }
    }
  }
};
</script>
