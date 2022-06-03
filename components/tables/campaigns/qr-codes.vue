<template>
  <div>
    <div class="mt-4" style="overflow:auto">
      <div
        class="row"
        v-infinite-scroll="load"
        :infinite-scroll-disabled="disabled"
        :infinite-scroll-immediate="false"
      >
        <div class="col-lg-4" v-for="i in count" :key="i">
          <div class="card-holder p-4 ">
            <div class="row">
              <!-- QR code here -->
              <div class="col-lg-6">
                <div class="qr-holder p-2 d-flex">
                  <qrcode-vue
                    :value="
                      handleQrCode(
                        'data:image/png;base64,PCFkb2N0eXBlIGh0bWw+CjxodG1sIGxhbmc9ImVuIiBkYXRhLW4taGVhZD0iJTdCJTIybGFuZyUyMjolN0IlMjIxJTIyOiUyMmVuJTIyJTdEJTdEIj4KICA8aGVhZD4KICAgIDx0aXRsZT5yZW5hcGF5PC90aXRsZT48bWV0YSBkYXRhLW4taGVhZD0iMSIgY2hhcnNldD0idXRmLTgiPjxtZXRhIGRhdGEtbi1oZWFkPSIxIiBuYW1lPSJ2aWV3cG9ydCIgY29udGVudD0id2lkdGg9ZGV2aWNlLXdpZHRoLGluaXRpYWwtc2NhbGU9MSI+PG1ldGEgZGF0YS1uLWhlYWQ9IjEiIGRhdGEtaGlkPSJkZXNjcmlwdGlvbiIgbmFtZT0iZGVzY3JpcHRpb24iIGNvbnRlbnQ9IiI+PGxpbmsgZGF0YS1uLWhlYWQ9IjEiIHJlbD0iaWNvbiIgdHlwZT0iaW1hZ2UveC1pY29uIiBocmVmPSIvZmF2aWNvbi5pY28iPjxsaW5rIGRhdGEtbi1oZWFkPSIxIiByZWw9InN0eWxlc2hlZXQiIGhyZWY9Imh0dHBzOi8vdW5wa2cuY29tL2VsZW1lbnQtdWkvbGliL3RoZW1lLWNoYWxrL2luZGV4LmNzcyI+PGxpbmsgZGF0YS1uLWhlYWQ9IjEiIHJlbD0ic3R5bGVzaGVldCIgaHJlZj0iaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvZm9udC1hd2Vzb21lLzQuNy4wL2Nzcy9mb250LWF3ZXNvbWUubWluLmNzcyI+PGxpbmsgcmVsPSJwcmVsb2FkIiBocmVmPSIvX251eHQvYTQ4OWY4Yy5qcyIgYXM9InNjcmlwdCI+PGxpbmsgcmVsPSJwcmVsb2FkIiBocmVmPSIvX251eHQvODIxZjg5Mi5qcyIgYXM9InNjcmlwdCI+PGxpbmsgcmVsPSJwcmVsb2FkIiBocmVmPSIvX251eHQvNjlkMmU1NS5qcyIgYXM9InNjcmlwdCI+PGxpbmsgcmVsPSJwcmVsb2FkIiBocmVmPSIvX251eHQvNWZmNGE2ZS5qcyIgYXM9InNjcmlwdCI+CiAgPC9oZWFkPgogIDxib2R5PgogICAgPGRpdiBpZD0iX19udXh0Ij48c3R5bGU+I251eHQtbG9hZGluZ3tiYWNrZ3JvdW5kOiNmZmY7dmlzaWJpbGl0eTpoaWRkZW47b3BhY2l0eTowO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDtyaWdodDowO3RvcDowO2JvdHRvbTowO2Rpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcjtmbGV4LWRpcmVjdGlvbjpjb2x1bW47YW5pbWF0aW9uOm51eHRMb2FkaW5nSW4gMTBzIGVhc2U7LXdlYmtpdC1hbmltYXRpb246bnV4dExvYWRpbmdJbiAxMHMgZWFzZTthbmltYXRpb24tZmlsbC1tb2RlOmZvcndhcmRzO292ZXJmbG93OmhpZGRlbn1Aa2V5ZnJhbWVzIG51eHRMb2FkaW5nSW57MCV7dmlzaWJpbGl0eTpoaWRkZW47b3BhY2l0eTowfTIwJXt2aXNpYmlsaXR5OnZpc2libGU7b3BhY2l0eTowfTEwMCV7dmlzaWJpbGl0eTp2aXNpYmxlO29wYWNpdHk6MX19QC13ZWJraXQta2V5ZnJhbWVzIG51eHRMb2FkaW5nSW57MCV7dmlzaWJpbGl0eTpoaWRkZW47b3BhY2l0eTowfTIwJXt2aXNpYmlsaXR5OnZpc2libGU7b3BhY2l0eTowfTEwMCV7dmlzaWJpbGl0eTp2aXNpYmxlO29wYWNpdHk6MX19I251eHQtbG9hZGluZz5kaXYsI251eHQtbG9hZGluZz5kaXY6YWZ0ZXJ7Ym9yZGVyLXJhZGl1czo1MCU7d2lkdGg6NXJlbTtoZWlnaHQ6NXJlbX0jbnV4dC1sb2FkaW5nPmRpdntmb250LXNpemU6MTBweDtwb3NpdGlvbjpyZWxhdGl2ZTt0ZXh0LWluZGVudDotOTk5OWVtO2JvcmRlcjouNXJlbSBzb2xpZCAjZjVmNWY1O2JvcmRlci1sZWZ0Oi41cmVtIHNvbGlkICMyMjI4NDA7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWigwKTstbXMtdHJhbnNmb3JtOnRyYW5zbGF0ZVooMCk7dHJhbnNmb3JtOnRyYW5zbGF0ZVooMCk7LXdlYmtpdC1hbmltYXRpb246bnV4dExvYWRpbmcgMS4xcyBpbmZpbml0ZSBsaW5lYXI7YW5pbWF0aW9uOm51eHRMb2FkaW5nIDEuMXMgaW5maW5pdGUgbGluZWFyfSNudXh0LWxvYWRpbmcuZXJyb3I+ZGl2e2JvcmRlci1sZWZ0Oi41cmVtIHNvbGlkICNmZjQ1MDA7YW5pbWF0aW9uLWR1cmF0aW9uOjVzfUAtd2Via2l0LWtleWZyYW1lcyBudXh0TG9hZGluZ3swJXstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMCk7dHJhbnNmb3JtOnJvdGF0ZSgwKX0xMDAley13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpO3RyYW5zZm9ybTpyb3RhdGUoMzYwZGVnKX19QGtleWZyYW1lcyBudXh0TG9hZGluZ3swJXstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMCk7dHJhbnNmb3JtOnJvdGF0ZSgwKX0xMDAley13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpO3RyYW5zZm9ybTpyb3RhdGUoMzYwZGVnKX19PC9zdHlsZT48c2NyaXB0PndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCJlcnJvciIsZnVuY3Rpb24oKXt2YXIgZT1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgibnV4dC1sb2FkaW5nIik7ZSYmKGUuY2xhc3NOYW1lKz0iIGVycm9yIil9KTwvc2NyaXB0PjxkaXYgaWQ9Im51eHQtbG9hZGluZyIgYXJpYS1saXZlPSJwb2xpdGUiIHJvbGU9InN0YXR1cyI+PGRpdj5Mb2FkaW5nLi4uPC9kaXY+PC9kaXY+PC9kaXY+PHNjcmlwdD53aW5kb3cuX19OVVhUX189e2NvbmZpZzp7X2FwcDp7YmFzZVBhdGg6Ii8iLGFzc2V0c1BhdGg6Ii9fbnV4dC8iLGNkblVSTDpudWxsfX19PC9zY3JpcHQ+CiAgPHNjcmlwdCBzcmM9Ii9fbnV4dC9hNDg5ZjhjLmpzIj48L3NjcmlwdD48c2NyaXB0IHNyYz0iL19udXh0LzgyMWY4OTIuanMiPjwvc2NyaXB0PjxzY3JpcHQgc3JjPSIvX251eHQvNjlkMmU1NS5qcyI+PC9zY3JpcHQ+PHNjcmlwdCBzcmM9Ii9fbnV4dC81ZmY0YTZlLmpzIj48L3NjcmlwdD48L2JvZHk+CjwvaHRtbD4K'
                      )
                    "
                    level="H"
                    :size="120"
                    render-as="svg"
                    class="m-auto"
                  />
                </div>
              </div>

              <!-- Beneficiary Details here -->
              <div class="col-lg-6">
                <!-- Beneficiary -->
                <div class="mb-2 pb-1">
                  <p class="text-xs primary-gray ">BENEFICIARY</p>
                  <p class="primary-blue text-sm font-medium">
                    Damilare Akinbosun
                  </p>
                </div>

                <!-- Campaign -->
                <div class="mb-2 pb-1">
                  <p class="text-xs primary-gray ">CAMPAIGN</p>
                  <p class="primary-blue text-sm font-medium">Feed the poor</p>
                </div>

                <!-- AMOUNT -->
                <div class="mb-2 ">
                  <p class="text-xs primary-gray ">AMOUNT</p>
                  <p class="primary-blue text-sm font-medium">NGN90,000.00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <p
        class="text-center primary mt-3 mb-4 poppins font-medium"
        v-if="loading"
      >
        Load more...
      </p>

      <!-- <p class="text-center primary my-4 poppins font-medium" v-if="noMore">
      No more...
    </p> -->
    </div>
  </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";

export default {
  name: "Qr-codes",
  components: { QrcodeVue },

  props: {
    triggerDownload: {
      type: Boolean,
      default: false
    },

    data: {
      type: Array,
      default: () => []
    },

    loading: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    count: 6,
    isLoading: false
  }),

  computed: {
    noMore() {
      return this.count >= 20;
    },
    disabled() {
      return this.isLoading || this.noMore;
    }
  },

  methods: {
    load() {
      this.isLoading = true;
      setTimeout(() => {
        this.count = this.count + 6;
        this.isLoading = false;
      }, 2000);
    },
    async handleQrCode(baseStr64) {
      if (!baseStr64) return;

      fetch(baseStr64)
        .then(res => res.blob())
        .then(console.log);
    }
  }
};
</script>

<style scoped>
.card-holder {
  background: #ffffff;
  border: 1px solid #e1e7ec;
  border-radius: 8px;
  height: 193px;
  margin-bottom: 2rem;
}

.qr-holder {
  border: 1px solid #f5f6f8;
  border-radius: 8px;
  height: 145px;
}

.col-md-4 {
  width: 30% !important;
}

p {
  margin-bottom: unset !important;
}
</style>
