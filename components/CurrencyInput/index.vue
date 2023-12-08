<template>
  <div>
    <input
      :id="id"
      :ref="id"
      class="form-controls"
      type="text"
      :class="{ error: error }"
      :placeholder="placeholder"
      :style="customStyles"
      :disabled="disabled"
      v-bind="$attrs"
      @input="handleInput($event.target.value)"
      @keypress="isNumber($event)"
      v-on="inputListeners"
    />
  </div>
</template>

<script>
export default {
  name: "CurrencyInput",
  inheritAttrs: false,

  model: {
    prop: "value",
    event: "input",
  },

  props: {
    id: {
      type: String,
      default: "",
      required: true,
    },
    placeholder: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    customStyles: {
      type: [String, Object],
      default: "",
    },
    error: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({ mounted: false }),

  computed: {
    inputListeners() {
      const vm = this;
      return Object.assign({}, this.$listeners, {
        input(event) {
          vm.handleInput(event.target.value);
        },
      });
    },
  },

  mounted: function () {
    this.mounted = true;
  },

  methods: {
    handleInput(value) {
      if (value) {
        value = value
          .toString()
          .replace(/\D/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        this.$emit("input", `${this.$store.$currency}${value}`);
      }
    },

    isNumber(event) {
      const charCode = event.which ? event.which : event.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        event.preventDefault();
      }
    },
  },
};
</script>
