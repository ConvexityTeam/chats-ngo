<template>
  <section>
    <div v-if="loading" class="spinner ">
      <b-spinner class="primary" label="Spinning"></b-spinner>
    </div>

    <doughnut-chart
      v-else-if="requiredData"
      :data="doughnutChartData"
      :options="doughnutChartOptions"
      :height="220"
      :width="250"
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
              "#134611"
            ]
          }
        ]
      },
      doughnutChartOptions: {
        responsive: true,
        legend: {
          display: true,
          position: "right",

          labels: {
            fontColor: "#25396F",
            usePointStyle: true
          }
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
        const response = await this.$axios.get("/Orders/product-purchased-age");

        if (response.status == "success") {
          const data = response.data;

          Object.values(data).forEach(item => {
            this.doughnutChartData.datasets[0].data.push(item.female);
          });

          this.loading = false;
        }

        console.log("GET FEMALE RESPONSE", response);
      } catch (err) {
        console.log("GETFEMALEERR::", { err });
        this.$toast.error(err.response?.data?.message);
        this.loading = false;
      }
    }
  }
};
</script>
