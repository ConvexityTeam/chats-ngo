<template>
  <section>
    <div v-if="loading" class="spinner ">
      <b-spinner class="primary" label="Spinning"></b-spinner>
    </div>

    <bar-chart v-else-if="!requireData" :data="barChartData" :options="barChartOptions" :height="300" />

    <h3 v-else class="no-record-dashboard text-center no-record">
      NO RECORD FOUND
    </h3>
  </section>
</template>

<script>
import barChart from "~/plugins/charts/barchart";
import { mapGetters } from "vuex";
export default {
  components: {
    barChart,
  },
  data() {
    return {
      id: null,
      loading: false,
      barChartData: {
        labels: [],
        datasets: [
          {
            backgroundColor: "#134611",
          },
          {
            backgroundColor: "#3E8914",
          },
          {
            backgroundColor: "#3DA35D",
          },
          {
            backgroundColor: "#96E072",
          },
          {
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
    ...mapGetters("authentication", ["user"]),
    requireData() {
      const data = this.barChartData?.datasets;
      const hasValue = Object.values(data).some(value => value > 0);
      return !!data.length && hasValue;
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
          `/orders/product-purchased-age/${this.id}`
        );

        console.log("Product Age BY Group:::", response);

        if (response.status == "success") {
          const data = response.data;
          const colors = ["#134611", "#3E8914", "#3DA35D", "#96E072", "#E8FCCF"]

          this.barChartData.labels = data.ageRange
          const mapData = data?.data.map((item, index) => {
            return {
              label: item.label,
              data: item.data,
              backgroundColor: colors[index] || "#134611"
            };
          });

          this.barChartData.datasets = mapData
          console.log('mapData', mapData);
        }

        this.loading = false;

        console.log("PRODUCT GET AGE RESPONSE", response);
      } catch (err) {
        console.log("GETAGEERERR::", { err });
        this.$toast.error(err?.response?.data?.message);
        this.loading = false;
      }
    },
  },
};
</script>
