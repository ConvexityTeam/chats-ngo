<template>
  <div>
    <client-only>
      <vue-html2pdf
        ref="qr_code"
        :show-layout="false"
        :float-layout="true"
        :enable-download="true"
        :preview-modal="false"
        :filename="`${campaign}_QR_Codes`"
        :pdf-quality="2"
        :manual-pagination="true"
        :paginate-elements-by-height="1400"
        pdf-format="a4"
        pdf-orientation="landscape"
        :pdf-content-width="screenWidth"
        @progress="onProgress($event)"
      >
        <section slot="pdf-content">
          <!-- Component Here -->
          <slot />
        </section>
      </vue-html2pdf>
    </client-only>
    <!--  -->
    <!--  -->
  </div>
</template>

<script>
import VueHtml2pdf from "vue-html2pdf";
let screenLoading;

export default {
  name: "PdfGenerator",
  components: { VueHtml2pdf },

  props: {
    triggerDownload: {
      type: Boolean,
      default: false,
    },

    campaignDetails: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    screenWidth() {
      return "100%";
    },

    campaign() {
      return this.campaignDetails[0]?.Campaign?.title ?? "";
    },
  },

  watch: {
    triggerDownload: function (value) {
      if (value) {
        this.downloadPdf();
      }
    },
  },

  methods: {
    downloadPdf() {
      this.openScreen();

      setTimeout(() => {
        this.$refs.qr_code.generatePdf();
      }, 1000);
    },

    onProgress(progress) {
      if (progress === 100) {
        screenLoading.close();
        this.$emit("download-complete");
      }
    },

    openScreen() {
      screenLoading = this.$loading({
        lock: true,
        spinner: "el-icon-loading",
        background: "#0000009b",
      });
    },
  },
};
</script>
