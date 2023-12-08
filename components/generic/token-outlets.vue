<template>
  <div class="d-flex justify-content-between">
    <div v-for="token in tokens" :key="token.id" class="w-23 mt-1 mb-3">
      <div
        class="d-flex token-holder align-items-center"
        :class="{ active: activeToken.id == token.id }"
        @click="handleToken(token)"
      >
        <img :src="token.img" :alt="token.tradeName" />
        <div class="ml-2">
          <span class="token p-0">{{ token.token }}</span>
          <span class="trade-name p-0">{{ token.tradeName }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    tokens: [
      {
        token: "Tether",
        tradeName: "USDT",
        img: require("~/assets/img/tokens/tether.svg"),
        id: 1,
      },

      {
        token: "Bitcoin",
        tradeName: "BTC",
        img: require("~/assets/img/tokens/btc.svg"),
        id: 2,
      },

      {
        token: "XRP",
        tradeName: "XRP",
        img: require("~/assets/img/tokens/xrp.svg"),
        id: 3,
      },

      {
        token: "Bantu",
        tradeName: "XDN",
        img: require("~/assets/img/tokens/bantu.svg"),
        id: 4,
      },
    ],
    activeToken: {},
  }),

  methods: {
    handleToken(token) {
      this.$emit("handleToken", token);
      this.activeToken = token;
    },
  },
};
</script>

<style scoped>
.token-holder {
  background: #fcfcfe;
  border: 1px solid #f5f6f8;

  border-radius: 10px;
  padding: 5px 10px;
  cursor: pointer;
  height: 52px;
  font-family: "Poppins", sans-serif;
}

.token-holder.active {
  border: 1px solid #17ce89;
}

.token {
  color: #7c8db5;
  font-size: 0.625rem;
}

.trade-name {
  color: #25396f;
  font-size: 0.875rem;
  padding-bottom: 0px !important;
}

.w-23 {
  width: 23%;
}
</style>
