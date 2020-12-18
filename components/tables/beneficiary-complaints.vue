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
          <b-tab title="First" active><p>I'm the first tab</p></b-tab>
          <b-tab title="Second"><p>I'm the second tab</p></b-tab>
          <b-tab title="Disabled" disabled><p>I'm a disabled tab!</p></b-tab>
        </b-tabs>
      </div>


    <div class="tabs d-flex">
              <!-- Using the key property to rerender the component when a tab is clicked -->
              <li
                @click="
                  tab == 2 ? key++ : '';
                  tab = 1;
                "
                :class="{ selected: tab == 1 }"
                class="d-flex"
              >
                <a href="#">Upcoming Interviews</a>
                <span class="count ml-2" v-if="tab == 1">ww</span>
              </li>
              <li
                class="mx-4 d-flex"
                @click="
                  tab == 1 ? key++ : '';
                  tab = 2;
                "
                :class="{ selected: tab == 2 }"
              >
                <a href="#">Past Interviews</a>
                <span class="count ml-2" v-if="tab == 2">gg</span>
              </li>
            </div>

<div tab='1'>
sssssss
</div>

<div tab='2'>
222222
</div>

    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
        tab: 1,
      key: 0,
    }
  }
}
</script>

<style scoped>

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
