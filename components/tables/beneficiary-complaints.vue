<template>
  <div>
    <div class="card__holder p-3">
      <div class="d-flex">
        <div>
          <h5 class="complaints">Beneficiary Complaints</h5>
        </div>

        <div class="ml-auto filter d-flex mb-4">
          <p>Filter by:</p>
          <div class="mx-2">
            <select name="" id="">
              <option value="gender">Gender</option>
            </select>
          </div>

          <div>
            <select name="" id="">
              <option value="female">Female</option>
              <option value="female">Male</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Tabs Here -->
      <div>
        <b-tabs content-class="mt-3">
        <!-- All complaints tab here -->
          <b-tab title="All" active>
          <div class="text-center mt-5">
          <p class="no-complaints"> No Complaints</p>
          </div>
          </b-tab>

          <!-- Resolved complaints here -->
          <b-tab title="Resolved">
              <div class="text-center mt-5">
          <p class="no-complaints"> No Complaints</p>
          </div>
          </b-tab>

          <!-- Unresolved Complaints here -->
          <b-tab title="Unresolved" >
              <div class="text-center mt-5">
          <p class="no-complaints"> No Complaints</p>
          </div>
          </b-tab>
        </b-tabs>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      key: 0,
    }
  }
}
</script>

<style scoped>
.no-complaints{
  color: var(--secondary-black);
  font-size: 0.875rem;
}
.tabs li {
  list-style: none;
  font-size: 13px;
  line-height: 16px;
  color: #767676;
  position: relative;
  cursor: pointer;
}

li.selected {
  color: green;
}

li.selected:after {
  content: "";
  width: 100%;
  height: 4px;
  background:red;
  position: absolute;
  left: 0;
  bottom: -17px;
}

.card__holder {
  background: #ffffff;
  box-shadow: 0px 4px 30px rgba(174, 174, 192, 0.2);
  border-radius: 10px;
}
.complaints {
  color: var(--secondary-black);
  font-weight: 700;
  font-size: 1.125rem;
}
.filter {
  color: var(--secondary-black);
  font-size: 1rem;
  font-weight: 500;
}
select {
  border: none;
}
select:focus {
  outline: none;
}
.nav-tabs .nav-link.active,
.nav-tabs .nav-item.show .nav-link {
  border-bottom: 1px solid red !important;
  color: var(--secondary-black);
  background-color: #fff;
}
.nav-tabs .nav-link {
  border: none !important;
}
.nav-tabs {
  border: none !important;
}

</style>
