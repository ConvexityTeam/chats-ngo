<template>
    <div>
<div class="row no-gutters">
<div class="col-lg-8">

</div>

<!-- Personal details here -->
<div class="col-lg-4">

</div>
</div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    layout: 'dashboard',

  created(){
      console.log('BEnEfacor', this.BENEFACTOR)
  },
     computed: {
    ...mapGetters("beneficiaries", ["BENEFACTOR"]),
  },
}
</script>