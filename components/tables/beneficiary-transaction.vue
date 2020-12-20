<template>
  <div>
    <div class="d-flex pt-lg-5 mr-2">
      <div>
        <!-- Search Box here -->
        <input
          type="text"
          class="form-controls"
          placeholder="Search transactions"
        />
      </div>

      <div class="ml-auto">
        <button type="button" class="export-btn p-3">Export as CSV</button>
      </div>
    </div>

    <!-- Transactions Table here -->
    <div class="holder mr-2">
      <div class="d-flex px-4 pt-3">
        <div>
          <h4 class="header">Transactions</h4>
        </div>

        <div class="ml-auto d-flex filter">
          <p>Filter by:</p>
          <div class="mx-2">
            <select name="" id="">
              <option value="gender">Today</option>
            </select>
          </div>
        </div>
      </div>
      <table class="table table-borderless">
        <thead>
          <tr>
            <th scope="col">Reference </th>
            <th scope="col">Amount</th>
            <th scope="col">Type</th>
            <th scope="col">Paid </th>
            <th scope="col">Date</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in 3" :key="i">
            <td>12345678910</td>
            <td>$123,476,000</td>
            <td class=""><span class="badge badge-pill  py-2 ">Deposited</span></td>
            <td>Funke</td>
            <td>12 Dec, 2020</td>
            <td>
              <button type="button" class="more-btn"><dot /></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import dot from '~/components/icons/dot'
export default {
  components: {
    dot
  },
}
</script>

<style scoped>
.form-controls {
  height: 50px;
  width: 150%;
}
.header {
  color: var(--secondary-black);
  font-weight: 700;
  font-size: 1.125rem;
}
.filter {
  color: #4f4f4f;
  font-size: 1rem;
  font-weight: 500;
}
select {
  border: none;
  color: var(--secondary-black);
}
select:focus {
  outline: none;
}
.holder {
  background: #ffffff;
  box-shadow: 0px 4px 30px rgba(174, 174, 192, 0.2);
  border-radius: 10px;
  margin-top: 30px;
}
.badge{
    border: 1px solid #999999;
}
.table thead th {
  color: #4f4f4f;
  letter-spacing: 0.01em;
  font-size: 1rem;
  font-weight: 700;
}
.table th,
.table td {
  padding: 0.75rem 2rem;
  color: var(--secondary-black);
  font-size: 1rem;
}
::placeholder{
    color: #999999;
font-size: 1rem;
}
</style>
