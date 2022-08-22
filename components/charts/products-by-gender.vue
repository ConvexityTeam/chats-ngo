<template>
  <section class="d-flex w-100">
    <div class="w-50 h-100">
      <span class="description" style="font-weight: 500">
        Female</span>
      <female :femaleData="femaleData" />
    </div>
    <div class="w-50 h-100">
      <span class="description" style="font-weight: 500">
        Male</span>
      <male :maleData="maleData" />
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import female from "~/components/charts/products-gender-female";
import male from "~/components/charts/products-gender-male";

export default {
  components: {
    female,
    male
  },

  data() {
    return {
      id: null,
      maleData: null,
      femaleData: null
    }
  },

  computed: {
    ...mapGetters("authentication", ["user"]),
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
          this.femaleData = data.female;
          this.maleData = data.male;
          this.loading = false;
        }

        console.log("GET PRODUCT BY GENDER RESPONSE", response);
      } catch (err) {
        console.log("GETFEMALEERR::", { err });
        this.$toast.error(err.response?.data?.message);
        this.loading = false;
      }
    },
  },
}
</script>