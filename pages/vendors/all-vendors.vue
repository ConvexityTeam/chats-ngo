<template>
  <div class="main">
    <h4 class="header">All Vendors</h4>

    <div class="d-flex pt-lg-4 mr-4">
      <div>
        <!-- Search Box here -->
        <input
          type="text"
          class="form-controls"
          placeholder="Search vendors by name"
          v-model="searchQuery"
        />
      </div>

      <div class="ml-auto">
        <button type="button" class="export-btn p-3">
           <download-csv
            :data="vendors"
            name="Vendors.csv"
          >
            Export as CSV
          </download-csv>
        </button>
      </div>
    </div>

    <!-- Vendors Table here -->
    <div class="holder">
      <table class="table table-borderless" v-if="vendors != ''">
        <thead>
          <tr>
            <th scope="col" class="py-4">
              <input type="checkbox" @click="checkAll()" v-model="isCheckAll" />
            </th>
            <th scope="col" class="py-4">
              Selected
              {{
                data.length == 1
                  ? data.length + ' ' + `vendor`
                  : data.length + ' ' + `vendors`
              }}
            </th>
            <th scope="col" class="py-4">Phone Number</th>
            <th scope="col" class="py-4">Email Address</th>
            <th scope="col" class="py-4">Created</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="vendor in resultQuery" :key="vendor.id">
            <td class="pt-3">
              <input
                type="checkbox"
                :value="vendor.id"
                v-model="data"
                @change="updateCheckall()"
              />
            </td>

            <td class="d-flex" @click="handleTempVendor(vendor)">
              <img
                v-if="vendor.profile_pic == null"
                :src="src"
                width="30"
                height="30"
                class="rounded"
                alt="Vendor"
              />
              <img
                v-else
                :src="vendor.profile_pic"
                width="30"
                height="30"
                class="rounded-circle"
                alt="Vendor"
              />
              <p class="mx-3 pt-1">{{ vendor.first_name + " " + vendor.last_name}}</p>
            </td>
            <td @click="handleTempVendor(vendor)">{{ vendor.phone }}</td>
            <td @click="handleTempVendor(vendor)">{{ vendor.email }}</td>
            <td @click="handleTempVendor(vendor)">
              {{ vendor.createdAt | formatDateText }}
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else-if="loading" class="loader text-center my-5"></div>
      <h3 v-else class="text-center no-record">NO RECORD FOUND</h3>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  layout: 'dashboard',
  data() {
    return {
      src:
        'https://t4.ftcdn.net/jpg/02/29/75/83/240_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg',
      isCheckAll: false,
      data: [],
      vendors: [],
      searchQuery: null,
      loading: false,
    }
  },

  computed: {
    resultQuery() {
      if (this.searchQuery) {
        return this.vendors.filter((vendor) => {
          return this.searchQuery
            .toLowerCase()
            .split(' ')
            .every((v) => vendor.first_name.toLowerCase().includes(v))
        })
      } else {
        return this.vendors
      }
    },
  },

  created() {
    this.fetchAllVendors()
  },

  methods: {
    ...mapActions('beneficiaries', ['SAVE_TEMP_VENDOR']),
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

    handleTempVendor(vendor) {
      this.SAVE_TEMP_VENDOR(vendor)
      this.$router.push(`/vendors/${vendor.id}`)
    },

    async fetchAllVendors() {
      try {
        this.loading = true

        const response = await this.$axios.get('/vendors')
             if (response.data.code == 200) {
          this.loading = false;
          this.vendors = response.data.data
        }
    
        console.log('vendors::::', response)

        this.loading = false

      } catch (error) {
        this.loading = false
      }
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
  margin-right: 20px;
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
  cursor: pointer;
}
.main {
  height: calc(100vh - 72px);
  overflow-y: scroll;
}
/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
