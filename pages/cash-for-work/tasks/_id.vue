<template>
  <div class="container">
    <el-button
      type="primary"
      icon="el-icon-arrow-left"
      @click="$router.go(-1)"
      class="my-5"
      >Previous Page</el-button
    >
    <div v-if="loading" class="loader text-center"></div>
    <div v-else-if="tasks.length">
      <el-table
        :data="
          tasks.filter(
            task =>
              !search || task.name.toLowerCase().includes(search.toLowerCase())
          )
        "
        style="width: 100%"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <p>State: {{ props.row.state }}</p>
            <p>City: {{ props.row.city }}</p>
            <p>Address: {{ props.row.address }}</p>
            <p>Zip: {{ props.row.zip }}</p>
          </template>
        </el-table-column>
        <el-table-column
          label="Created"
          prop="createdAt"
          :formatter="dateFormatter"
        ></el-table-column>
        <el-table-column label="Name" prop="name"> </el-table-column>
        <el-table-column label="Description" prop="description">
        </el-table-column>
        <el-table-column
          label="Amount"
          prop="amount"
          :formatter="CurrencyFormatter"
        >
        </el-table-column>
        <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="medium"
              placeholder="Type to search"
            />
          </template>
        </el-table-column>
      </el-table>
    </div>

    <h3 v-else class="text-center no-record">NO RECORD FOUND</h3>
  </div>
</template>

<script>
import moment from "moment";
export default {
  layout: "dashboard",

  data: () => ({
    loading: false,
    tasks: [],
    tableData: [
      {
        date: "2016-05-03",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles"
      },
      {
        date: "2016-05-02",
        name: "John",
        address: "No. 189, Grove St, Los Angeles"
      },
      {
        date: "2016-05-04",
        name: "Morgan",
        address: "No. 189, Grove St, Los Angeles"
      },
      {
        date: "2016-05-01",
        name: "Jessy",
        address: "No. 189, Grove St, Los Angeles"
      }
    ],
    search: ""
  }),

  mounted() {
    this.fetchTasks();
  },

  methods: {
    async fetchTasks() {
      try {
        this.loading = true;
        const response = await this.$axios.get(
          `/cash-for-work/tasks/${this.$route.params.id}`
        );

        if (response.status == "success") {
          this.tasks = response.data.tasks;
        }

        console.log("TaskDetail::", response.data);
        this.loading = false;
      } catch (err) {
        console.log(err);
      }
    },

    dateFormatter(row) {
      return moment(row.createdAt).format(" dddd, MMMM DD, YYYY ");
    },

    CurrencyFormatter(row) {
      let val = (row.amount / 1).toFixed(2).replace(".", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

  }
};
</script>
