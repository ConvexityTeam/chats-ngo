<template>
  <div>
    <div class>
      <doughnut-chart
        v-if="requiredData"
        :data="doughnutChartData"
        :options="doughnutChartOptions"
        :height="220"
        :width="250"
      />
      <div
        v-else
        class="spinner d-flex justify-content-center align-items-center"
      >
        <b-spinner class="primary" label="Spinning"></b-spinner>
      </div>
    </div>
  </div>
</template>

<script>
import doughnutChart from "~/plugins/charts/doughnutchart";
export default {
  components: {
    doughnutChart,
  },
  data() {
    return {
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
        //   text: 'Male',
        //   fontSize: 16,
        //   fontColor: '#333333',
        //     align: 'center',
        //     position: 'top'
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
    requiredData() {
      return this.doughnutChartData?.datasets[0]?.data?.length;
    },
  },

  mounted() {
    this.updateChart();
  },

  methods: {
    async updateChart() {
      try {
        this.loading = true;
        const response = await this.$axios.get("/Orders/product-purchased-age");

        // console.log('doughnutChartData:::', this.doughnutChartData.datasets[0].data);

        if (response.status == "success") {
          const data = response.data;
          Object.values(data).forEach((item) => {
            this.doughnutChartData.datasets[0].data.push(item.male);
          });
          console.log("MaleData:::", data);

          this.loading = false;
        }

        console.log("GET MALE RESPONSE", response);
      } catch (err) {
        console.log("GETMALEERERR::", { err });
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
  right: 130px;
  z-index: 1000;
}
</style>
