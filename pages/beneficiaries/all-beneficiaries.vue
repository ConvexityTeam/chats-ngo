<template>
  <div class="main">
    <h4 class="header">All Beneficiaries</h4>

    <div class="d-flex pt-lg-4 mr-4">
      <div>
        <!-- Search Box here -->
        <input
          type="text"
          class="form-controls"
          placeholder="Search beneficiaries by name"
          v-model="searchQuery"
        />
      </div>

      <div class="ml-auto">
        <button type="button" class="export-btn p-3">
          <download-csv
            :data="beneficiaries"
            name="Beneficiaries.csv"
          >
            Export as CSV
          </download-csv>
        </button>
      </div>
    </div>

    <!-- beneficiaries Table here -->
    <div class="holder">
          <div v-if="loading" class="loader text-center my-5"></div>
      <table class="table table-borderless" v-else-if="beneficiaries.length != 0 ">
        <thead>
          <tr>
            <th scope="col" class="py-4">
              <input type="checkbox" @click="checkAll()" v-model="isCheckAll" />
            </th>
            <th scope="col" class="py-4">
              Selected
              {{
                data.length == 1
                  ? data.length + " " + `user`
                  : data.length + " " + `users`
              }}
            </th>
            <!--  <th scope="col" class="py-4">User ID</th> -->
            <th scope="col" class="py-4">Phone Number</th>
            <th scope="col" class="py-4">Email Address</th>
            <th scope="col" class="py-4">Account Created</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(benefactor, index) in resultQuery" :key="index">
            <td class="pt-3">
              <input
                type="checkbox"
                :value="benefactor.id"
                v-model="data"
                @change="updateCheckall()"
              />
            </td>

            <td class="d-flex" @click="handleTempBenefactor(benefactor)">
              <img
                v-if="benefactor.profile_pic == null"
                src="~/assets/img/user.png"
                width="30"
                height="30"
                class="rounded-circle"
                :alt="benefactor.first_name"
                loading="lazy"
              />
              <img
                v-else
                :src="benefactor.profile_pic"
                width="30"
                height="30"
                class="rounded-circle"
                :alt="benefactor.first_name"
                loading="lazy"
              />

              <p class="mx-3 pt-1">
                {{ benefactor.first_name + " " + benefactor.last_name }}
              </p>
            </td>
            <!-- <td @click="handleTempBenefactor(benefactor)">
              {{ benefactor.id }}
            </td> -->
            <td @click="handleTempBenefactor(benefactor)">
              {{ benefactor.phone }}
            </td>
            <td @click="handleTempBenefactor(benefactor)">
              {{ benefactor.email }}
            </td>
            <td @click="handleTempBenefactor(benefactor)">
              {{ benefactor.createdAt | formatDateText }}
            </td>
          </tr>
        </tbody>
      </table>

      <h3 v-else class="text-center no-record">NO RECORD FOUND</h3>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  layout: "dashboard",
  data() {
    return {
      isCheckAll: false,
      loading: false,
      searchQuery: null,
      data: [],
      beneficiaries: [],
    };
  },

  computed: {
    resultQuery() {
      if (this.searchQuery) {
        return this.beneficiaries.filter((benefactor) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => benefactor.first_name.toLowerCase().includes(v));
        });
      } else {
        return this.beneficiaries;
      }
    },
  },

  mounted() {
    this.fetchAllBeneficiaries();
  },

  methods: {
    ...mapActions("beneficiaries", ["SAVE_TEMP_BENEFACTOR"]),
    ...mapActions("authentication", ["logout"]),
    checkAll() {
      this.isCheckAll = !this.isCheckAll;
      this.data = [];
      if (this.isCheckAll) {
        // Check all
        for (var key in this.beneficiaries) {
          this.data.push(this.beneficiaries[key].id);
        }
        console.log(this.data);
      }
    },

    updateCheckall() {
      this.data.length === this.beneficiaries.length
        ? (this.isCheckAll = true)
        : (this.isCheckAll = false);
    },

    handleTempBenefactor(benefactor) {
      //Dynamic page throws error, try to make the call to get details here and save it to the store then use getter yo pick on dynamic page
      this.SAVE_TEMP_BENEFACTOR(benefactor);
      this.$router.push(`/beneficiaries/${benefactor.id}`);
    },

    async fetchAllBeneficiaries() {
      try {
        this.loading = true;

        const response = await this.$axios.get("/beneficiaries");
        console.log("Allbeneficiaries:::", response);

        if (response.status == "success") {
          this.loading = false;
          this.beneficiaries = response.data;
          console.log("beneficiaries000000", this.beneficiaries);
        }
      } catch (error) {
        this.loading = false;
        this.$toast.error(error.response.data.message);
      }
    },
  },
};
</script>

<style scoped>
.main {
  height: calc(100vh - 72px);
  overflow-y: scroll;
}
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
  cursor: pointer;
  font-size: 0.875rem;
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
