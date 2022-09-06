<template>
  <section class="d-flex w-100">
    <div class="w-50 h-100">
      <span class="description" style="font-weight: 500"> Female</span>
      <Female :loading="loading" :femaleDoughnutChartData="femaleDoughnutChartData"
        :doughnutChartOptions="doughnutChartOptions" />
    </div>

    <div class="w-50 h-100">
      <span class="description" style="font-weight: 500"> Male</span>
      <Male :loading="loading" :maleDoughnutChartData="maleDoughnutChartData"
        :doughnutChartOptions="doughnutChartOptions" />
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import Female from "~/components/charts/products-gender-female";
import Male from "~/components/charts/products-gender-male";

export default {
  components: {
    Female,
    Male
  },

  data() {
    return {
      loading: false,
      id: null,
      maleData: [],
      femaleData: [],
      labels: [],

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
    ...mapGetters("authentication", ["user"]),

    maleDoughnutChartData() {
      return {
        labels: this.labels,
        datasets: [
          {
            data: this.maleData,
            backgroundColor: [
              "#E8FCCF",
              "#96E072",
              "#3DA35D",
              "#3E8914",
              "#134611"
            ]
          }
        ]
      };
    },

    femaleDoughnutChartData() {
      return {
        labels: this.labels,
        datasets: [
          {
            data: this.femaleData,
            backgroundColor: [
              "#E8FCCF",
              "#96E072",
              "#3DA35D",
              "#3E8914",
              "#134611"
            ]
          }
        ]
      };
    }
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

        console.log("RESPONSEHEREoooo:::", response);

        if (response.status == "success") {
          const data = response?.data;
          this.femaleData = this.abstractData(data?.female);
          this.maleData = this.abstractData(data?.male);
          this.getLabels(data);
        }

        console.log("GET PRODUCT BY GENDER RESPONSE", response);
      } catch (err) {
        console.log("GETFEMALEERR::", { err });
        this.$toast.error(err.response?.data?.message);
      } finally {
        this.loading = false;
      }
    },

    getLabels(value) {
      const data = value.male || value.female;

      if (data.length) {
        data.forEach(item => {
          Object.keys(item).forEach(key => {
            if (!this.labels.includes(key)) {
              this.labels.push(key);
            }
          });
        });
      }
    },

    abstractData(data) {
      const mapped = [];
      if (data.length) {
        data.forEach(item => {
          Object.values(item).forEach(value => {
            mapped.push(value);
          });
        });
      }
      return mapped;
    }
  }
};
</script>
