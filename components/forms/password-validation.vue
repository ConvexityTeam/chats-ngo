<template>
  <div class="d-flex align-items-center flex-wrap">
    <div class="mt-2 mr-2">
      <span>Make sure it includes:</span>
    </div>

    <div
      v-for="{ text, isValid } in allValidators"
      :key="text"
      class="d-flex align-items-center mt-2 mr-2"
    >
      <svg
        width="13"
        height="16"
        viewBox="0 0 13 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.56578 15.2942C6.47108 15.2942 6.37715 15.2724 6.29169 15.2282L3.53774 13.8027C2.75552 13.3977 2.14421 12.9433 1.66764 12.4139C0.622112 11.2561 0.041604 9.76991 0.0315953 8.22818L2.9188e-05 3.15385C-0.00382034 2.56821 0.373433 2.04256 0.938543 1.84459L5.99528 0.0816617C6.29631 -0.0255688 6.63122 -0.0270686 6.9361 0.0764127L12.0121 1.77935C12.5803 1.96907 12.9645 2.49097 12.9675 3.07587L12.9999 8.15395C13.0099 9.69342 12.4494 11.1856 11.4208 12.3562C10.9481 12.8931 10.3429 13.3543 9.56917 13.7667L6.83986 15.2244C6.75517 15.2702 6.66047 15.2934 6.56578 15.2942Z"
          class="duration-500"
          :fill="isValid ? '#C8E2DE' : '#DF8D8B'"
        />
        <template v-if="isValid">
          <path
            d="M5.86464 9.24068C5.71967 9.24142 5.5747 9.1892 5.46296 9.08183L4.02534 7.6992C3.80335 7.48445 3.80109 7.13585 4.02081 6.91963C4.24053 6.70268 4.59918 6.70047 4.82192 6.91448L5.85634 7.9088L8.38199 5.41859C8.60246 5.20164 8.96111 5.19943 9.1831 5.41345C9.40584 5.62819 9.40811 5.97753 9.18839 6.19301L6.26407 9.07668C6.15383 9.18553 6.00961 9.23995 5.86464 9.24068Z"
            fill="#006156"
          />
        </template>
        <template v-else>
          <path
            d="M7.31536 7.43678L8.35397 6.42521C8.57955 6.2055 8.57955 5.85007 8.35397 5.63036C8.12838 5.41065 7.76268 5.41065 7.5371 5.63036L6.4985 6.64118L5.46066 5.63036C5.23508 5.41065 4.86938 5.41065 4.6438 5.63036C4.41821 5.85007 4.41821 6.2055 4.6438 6.42521L5.6824 7.43678L4.6438 8.44835C4.41821 8.66806 4.41821 9.02349 4.6438 9.2432C4.75697 9.35343 4.90479 9.40817 5.05262 9.40817C5.19967 9.40817 5.34749 9.35343 5.46066 9.2432L6.4985 8.23239L7.5371 9.2432C7.65027 9.35343 7.79732 9.40817 7.94515 9.40817C8.09297 9.40817 8.24079 9.35343 8.35397 9.2432C8.57955 9.02349 8.57955 8.66806 8.35397 8.44835L7.31536 7.43678Z"
            fill="#B0332F"
          />
        </template>
      </svg>

      <div class="ml-2">
        <span
          :class="`validity-text  ${isValid ? 'text-grey-200' : 'text-red'}`"
        >
          {{ text }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    validations: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    allValidators() {
      const validators = [
        {
          text: "8 characters",
          isValid: this.validations.minLength,
        },

        {
          text: "a number",
          isValid: this.validations.containsNumber,
        },

        {
          text: "a special character",
          isValid: this.validations.containsSpecial,
        },
        {
          text: "an uppercase letter",
          isValid: this.validations.containsUppercase,
        },

        {
          text: "a lowercase letter",
          isValid: this.validations.containsLowercase,
        },
      ];

      return validators;
    },
  },
};
</script>

<style scoped>
.text {
  padding-bottom: 0rem !important;
}
.text-red {
  color: #cc4945;
  /* ee3934 */
}

.text-grey-200 {
  color: #575a65;
}

.validity-text {
  transition-duration: 500ms;
  font-size: 0.75rem;
}
</style>
