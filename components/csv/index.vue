<template>
  <div>
    <download-csv :data="data" :name="`${name}.csv`">
      <Button
        text="Export"
        :csv="greenCsv ? false : true"
        :hasBorder="hasBorder"
        :green-csv="greenCsv"
        custom-styles="height: 3.125rem"
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
    }
  }
};
</script>
