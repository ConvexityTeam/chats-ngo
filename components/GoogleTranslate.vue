<template>
  <div>
    <v-google-translate :languages="languages" />
  </div>
</template>

<script>
import languages from "~/utils/languages";

export default {
  data: () => ({
    languages,
  }),
};
</script>
