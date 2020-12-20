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
            <th scope="col" class="py-4">
              <input type="checkbox" @click="checkAll()" v-model="isCheckAll" />
            </th>
            <th scope="col" class="py-4">
              Selected
              {{
                data.length == 1
                  ? data.length + ' ' + `user`
                  : data.length + ' ' + `users`
              }}
            </th>
            <th scope="col" class="py-4">Vendor ID</th>
            <th scope="col" class="py-4">Phone Number</th>
            <th scope="col" class="py-4">Email Address</th>
            <th scope="col" class="py-4">Account Created</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="vendor in vendors" :key="vendor.id">
            <td class="pt-3">
              <input
                type="checkbox"
                :value="vendor.id"
                v-model="data"
                @change="updateCheckall()"
              />
            </td>

            <td class="d-flex">
              <img
                src="~/assets/img/user.png"
                width="30"
                height="30"
                class="rounded"
                alt=""
              />
              <p class="mx-3 pt-1">{{ vendor.name }}</p>
            </td>
            <td>{{ vendor.id }}</td>
            <td>{{ vendor.number }}</td>
            <td>{{ vendor.email }}</td>
            <td>{{ vendor.created }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  data() {
    return {
      isCheckAll: false,
      data: [],
      vendors: [
        {
          name: 'Cadbury Ng',
          id: 'DEV63016762',
          number: 2348013123065,
          email: 'rsnyder@blogspan.gov',
          created: '04/28/2018',
        },
        {
          name: 'Dangote Ng',
          id: 'DEV63016763',
          number: 2348013123066,
          email: 'dangote@blogspan.gov',
          created: '04/28/2019',
        },
      ],
    }
  },

  methods: {

    checkAll() {
      this.isCheckAll = !this.isCheckAll
      this.data = []
      if (this.isCheckAll) {
        // Check all
        for (var key in this.vendors) {
          this.data.push(this.vendors[key].id)
        }
      }
    },

    updateCheckall() {
      this.data.length === this.vendors.length
        ? (this.isCheckAll = true)
        : (this.isCheckAll = false)
    },
  },
}
</script>

<style scoped>
.header {
  color: var(--secondary-black);
  font-weight: 700;
  line-height: 28px;
  letter-spacing: 0.01em;
  font-size: 1.5rem;
  margin-right: 20px;
}
.form-controls {
  height: 50px;
  width: 150%;
}
::placeholder {
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
  color: #3a3b3f;
  font-size: 0.875rem;
}
</style>
