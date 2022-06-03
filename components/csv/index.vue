<template>
  <div>
    <download-csv :data="data" :name="`${name}.csv`">
      <Button
        text="Export"
        :csv="greenCsv ? false : true"
        :hasBorder="hasBorder"
        :green-csv="greenCsv"
        :custom-styles="customStyles"
        :fontSize="fontSize"
      >
      </Button>
    </download-csv>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
      required: true
    },

    name: {
      type: String,
      default: "",
      required: true
    },

    hasBorder: {
      type: Boolean,
      default: false
    },

    greenCsv: {
      type: Boolean,
      default: false
    },
    customStyles: {
      type: String,
      default: "height: 3.125rem"
    },
    fontSize: {
      type: String,
      default: "0.875rem"
    }
  }
};
</script>
