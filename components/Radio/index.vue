<template>
  <div class="d-flex">
    <label :class="{ disabled: disabled }" :style="labelStyles">
      <input
        :name="name"
        :id="value"
        type="radio"
        ref="radio"
        :value="value"
        :checked="isChecked"
        @change="changed"
        :disabled="disabled"
        v-bind="$attrs"
      />
      <span :class="{ disabled: disabled }"></span>
    </label>

    <div class="d-flex align-items-center">
      <label
        :for="value"
        class="label"
        :class="{ disabled: disabled }"
        :style="customStyles"
      >
        {{ label }}
      </label>

      <p class="extra-text" v-if="extraText">{{ extraText }}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "Gem-radio",
  inheritAttrs: false,

  model: {
    prop: "modelValue",
    event: "change"
  },

  props: {
    label: {
      type: String,
      default: ""
    },

    modelValue: {
      default: ""
    },

    value: {
      type: [String, Boolean],
      default: ""
    },

    disabled: {
      type: Boolean,
      default: false
    },

    name: {
      type: String,
      default: "",
      required: false
    },

    customStyles: {
      type: String,
      default: ""
    },

    labelStyles: {
      type: String,
      default: ""
    },

    extraText: {
      type: String,
      default: ""
    }
  },

  data: () => ({ mounted: false }),

  mounted: function() {
    this.mounted = true;
  },

  computed: {
    isChecked: function() {
      if (this.mounted) return this.modelValue == this.$refs.radio.value;
      else return false;
    },
    computedValue: function() {
      return !this.value ? this.label : this.value;
    }
  },

  methods: {
    changed: function() {
      this.$emit("change", this.$refs.radio.value);
    }
  }
};
</script>

<style scoped>
.flex {
  display: flex;
}
.items-center {
  align-items: center;
}
label {
  position: relative;
  cursor: pointer;
  margin-top: 1px;
}

span {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  border: 1px solid #e1e7ec;
  display: inline-block;
  background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%),
    #f6f6f8;
  transition: all linear 0.3s;
}
span.disabled {
  border: 2px solid #9b9b9b;
}
span:after {
  content: "";
  position: absolute;
  top: 6.5px;
  left: 6.5px;
  border: 1px solid #17ce89;
  height: 11px;
  width: 11px;
  background: #17ce89;
  border-radius: 50%;
  transform: rotate(45deg);
  visibility: hidden;
}
input {
  display: none;
}
input:checked ~ span {
  background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%),
    #f6f6f8;
  border: 1px solid #17ce89;
}
input:checked ~ span:after {
  visibility: visible;
}
.label {
  font-size: 0.875rem;
  color: #25282a;
  margin-left: 0.5rem;
  cursor: pointer;
}

.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.extra-text {
  font-size: 14px;
  color: #24292c;
  font-weight: 400;
  margin-left: 1rem;
}
</style>
