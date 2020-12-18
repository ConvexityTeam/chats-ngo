<template>
  <div>
    <h4 class="header">All Vendors</h4>

     <div class="d-flex pt-lg-4 mr-4">
      <div>
        <!-- Search Box here -->
        <input
          type="text"
          class="form-controls"
          placeholder="Search vendors by name or ID"
        />
      </div>

      <div class="ml-auto">
        <button type="button" class="export-btn p-3">Export as CSV</button>
      </div>
    </div>

     <!-- Vendors Table here -->
    <div class="holder">
      <table class="table table-borderless">
        <thead>
          <tr>
           <th scope="col"><input type="checkbox"></th>
            <th scope="col">Selected 2 vendors</th>
            <th scope="col">Vendor ID</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Email Address</th>
            <th scope="col">Account Created</th>
          </tr>
        </thead>
        <tbody >
          <tr v-for="i in 3" :key="i" >
             <td class="pt-3"><input type="checkbox"></td>
            <td class="d-flex"> <img src="~/assets/img/user.png" width="30" height="30" class="rounded" alt=""> <p class="mx-3 pt-1">Cadbury Ng</p> </td>
            <td>DEV63016762</td>
            <td>2348013123065</td>
            <td>rsnyder@blogspan.gov</td>
            <td>04/28/2018</td>
   
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
}
</script>

<style scoped>
.header {
  color: var(--secondary-black);
  font-weight: 700;
  line-height: 28px;
  letter-spacing: 0.01em;
  font-size: 1.5rem;
}
.form-controls {
  height: 50px;
  width: 150%;
}
::placeholder{
    color: #999999;
font-size: 1rem;
}
.holder {
  background: #ffffff;
  box-shadow: 0px 4px 30px rgba(174, 174, 192, 0.2);
  border-radius: 10px;
  margin-top: 30px;
}
.table thead th {
  color: #4f4f4f;
  letter-spacing: 0.01em;
  font-size: 1rem;
  font-weight: 700;
  line-height: 20px;
letter-spacing: -0.05px;
}
.table th,
.table td {
  padding: 0.5rem 2rem;
color: #3A3B3F;
  font-size: 0.875rem;
}
</style>
