<template>
  <div>
    <span
      class="toggle-wrapper"
      :class="{ disabled: disabled, 'is-large': isLarge }"
      role="checkbox"
      :aria-checked="modelValue.toString()"
      tabindex="0"
      @click="toggle"
      @keydown.space.prevent="toggle"
    >
      <span class="toggle-background" :class="backgroundStyles" />
      <span class="toggle-indicator" :style="indicatorStyles" />
    </span>
  </div>
</template>

<script>
export default {
  model: {
    prop: "modelValue",
    event: "input",
  },

  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    isLarge: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    backgroundStyles() {
      return {
        "gold-mid": this.modelValue,
        "gray-lighter": !this.modelValue,
      };
    },
    indicatorStyles() {
      if (this.isLarge) {
        return {
          transform: this.modelValue ? "translateX(33px)" : "translateX(1px)",
        };
      }

      return {
        transform: this.modelValue ? "translateX(14px)" : "translateX(-2px)",
      };
    },
  },
  methods: {
    toggle() {
      if (this.disabled) return;
      this.$emit("input", !this.modelValue);
    },
  },
};
</script>

<style lang="scss" scoped>
.gold-mid {
  background-color: #17ce89;
}

.gray-lighter {
  background-color: #7c8db5;
}

.toggle-wrapper {
  display: inline-block;
  position: relative;
  cursor: pointer;
  width: 34px;
  height: 18px;
  border-radius: 9999px;

  &:focus {
    outline: 0;
  }

  &.disabled {
    cursor: not-allowed;

    &:focus {
      cursor: not-allowed;
    }
  }

  &.is-large {
    height: 38px;
    width: 72px;

    .toggle-indicator {
      height: 29px;
      width: 29px;
      bottom: 4px;
    }
  }
}

.toggle-background {
  display: inline-block;
  border-radius: 9999px;
  height: 100%;
  width: 100%;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.4s ease;
}

.toggle-indicator {
  position: absolute;
  height: 14px;
  width: 14px;
  left: 4px;
  bottom: 2px;
  background-color: #ffffff;
  border-radius: 9999px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.4s ease;
}
.disabled {
  cursor: not-allowed !important;
}
</style>
