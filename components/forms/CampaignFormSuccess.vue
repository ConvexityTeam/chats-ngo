<template>
  <div>
    <!-- Icon -->
    <div class="mt-3 d-flex justify-content-center">
      <svg
        width="70"
        height="70"
        viewBox="0 0 70 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M35 70C54.33 70 70 54.33 70 35C70 15.67 54.33 0 35 0C15.67 0 0 15.67 0 35C0 54.33 15.67 70 35 70Z"
          fill="#17CE89"
        />
        <g filter="url(#filter0_d_5152_3288)">
          <path
            d="M51.0002 27.9722L33.0672 46.4202C32.7559 46.7442 32.3822 47.002 31.9688 47.1781C31.5554 47.3542 31.1106 47.4449 30.6612 47.4449C30.2119 47.4449 29.7671 47.3542 29.3537 47.1781C28.9402 47.002 28.5666 46.7442 28.2552 46.4202L19.0002 36.8962C18.361 36.2311 18.0039 35.3443 18.0039 34.4217C18.0039 33.4992 18.361 32.6124 19.0002 31.9472C19.3116 31.6231 19.6851 31.3652 20.0986 31.1891C20.512 31.0129 20.9568 30.9221 21.4062 30.9221C21.8557 30.9221 22.3004 31.0129 22.7139 31.1891C23.1273 31.3652 23.5009 31.6231 23.8122 31.9472L30.6662 38.9972L46.1912 23.0232C46.5026 22.6992 46.8762 22.4415 47.2897 22.2654C47.7031 22.0893 48.1479 21.9985 48.5972 21.9985C49.0466 21.9985 49.4914 22.0893 49.9048 22.2654C50.3182 22.4415 50.6919 22.6992 51.0032 23.0232C51.6419 23.6889 51.9983 24.5758 51.9977 25.4983C51.9971 26.4208 51.6397 27.3073 51.0002 27.9722Z"
            fill="white"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_5152_3288"
            x="12.0039"
            y="18.9985"
            width="45.9941"
            height="37.4463"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="3" />
            <feGaussianBlur stdDeviation="3" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.161 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_5152_3288"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_5152_3288"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </div>

    <!-- Header Here -->
    <div>
      <h2 class="primary-blue font-bold header text-center mt-4 pt-1">
        Form {{ isEdit ? "Updated" : "Created" }}
      </h2>
    </div>

    <!-- text here -->
    <div class="text-center mt-3">
      <p class="primary-gray font-medium w-75 m-auto">
        Your campain form
        <span class="font-medium primary-blue">{{ formName }}</span> has been
        {{ isEdit ? "Updated" : "Created" }} succefully
      </p>
    </div>

    <!-- Button Here -->
    <div class="m-4 pb-1">
      <Button
        type="button"
        :has-icon="false"
        text="Preview"
        :hasBorder="true"
        custom-styles="height:41px; border-radius: 5px; width: 100%; border:1px
      solid #17ce89 !important; font-weight: 600 !important"
        @click="handlePreview"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    formName: {
      type: String,
      default: "",
    },

    isEdit: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    handlePreview() {
      this.$router.push({
        path: "/campaigns/forms/new",
        query: { success: true },
      });

      this.$bvModal.hide("campaign-form");
      window.scrollTo(0, 0);
    },
  },
};
</script>

<style scoped>
.header {
  font-size: 24px;
}
</style>
