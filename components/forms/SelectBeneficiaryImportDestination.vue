<template>
  <div class="mt-2 mb-12 p-3">
    <p class="description caption">Choose preferred import destination.</p>

    <div>
      <div
        v-for="(importOption, index) in importOptions"
        :key="`${importOption.title}__${index}`"
        class="card-box"
        @click="selectImportOption(importOption.type)"
      >
        <span>
          <IconOption :type="importOption.type" />
        </span>

        <div class="card-text">
          <h5 class="title">{{ importOption.title }}</h5>
          <p class="description">
            {{ importOption.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import IconOption from "~/components/icons/BeneficiaryType.vue";

export default {
  name: "SelectBeneficiaryImportDestination",
  components: { IconOption },
  data() {
    return {
      importOptions: [
        {
          title: "Import from existing project",
          description: `Import beneficiaries from existing project`,
          type:"existing",
        },
        {
          title: "Import CSV",
          description: `Import beneficiaries from .csv file.`,
          type:"csv",
        },
        // {
        //   title: "Import from third party",
        //   description: `Import from third party`,
        //   type:"third-party",
        // },
      ],
    };
  },
  methods: {
    selectImportOption(importType) {
      this.activeCampaignId = importType;
      this.$emit("selectImportOption", importType);
    },
  },
};
</script>

<style scoped>
.card-box {
  display: flex !important;
  align-items: center !important;
  padding: 1.125rem 1rem;
  border-radius: 0.625rem;
  box-shadow: 0px 4px 25px rgba(174, 174, 192, 0.15);
  cursor: pointer;
  margin-bottom: 0.75rem;
  height: 5.75rem;
}

.card-text {
  margin-left: 1rem;
  flex: 1 1 0%;
  margin-top: 1rem;
}

.title {
  color: #25396f;
  display: block;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.125rem;
  margin-bottom: 0.25rem;
}

.description {
  color: #7c8db5;
  display: block;
  font-size: 0.75rem;
}

.description.caption {
  font-size: 0.875rem;
}
</style>
