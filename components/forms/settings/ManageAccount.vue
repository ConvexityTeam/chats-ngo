<template>
  <div class="container">
    <div class="d-flex col-lg-12 w-full h-5">
      <FormsSettingsNewSubadmin @reload="getMembers" />
      <!-- Transactions Table here -->
      <div class="holder">
        <div class="child-holder">
          <table class="table table-borderless">
            <thead class="primary-blue">
              <tr>
                <th>
                  <p class="primary-blue font-bold">Team Members</p>
                  <div class="ml-auto">
                    <Button
                      text="Add Sub-admin"
                      custom-styles="height:50px"
                      v-b-modal.new-subadmin
                    />
                  </div>
                </th>
              </tr>
            </thead>

            <tbody class="text-left primary-blue">
              <tr class="d-flex sub-heading font-medium pr-3">
                <td class="col-2">First Name</td>
                <td class="col-2">Last Name</td>
                <td class="col-3">Email</td>
                <td class="col-2">Role</td>
                <td class="col-2">Phone</td>
                <!-- <td class="col-1 action">Action</td> -->
              </tr>
              <tr
                class="d-flex table-body pr-2"
                v-for="(member, i) in members"
                :key="i"
              >
                <td class="col-2">
                  {{ member.User.first_name || "-" }}
                </td>
                <td class="col-2">
                  {{ member.User.last_name || "-" }}
                </td>
                <td class="col-3">
                  {{ member.User.email }}
                </td>
                <td class="col-2">
                  <span class="text-xs" :class="{ pill: true }">{{
                    member.role | capitalize
                  }}</span>
                </td>
                <td class="col-2">
                  {{ member.User.phone || "-" }}
                </td>
                <!-- <td class="col-1 text-right">
                  <button type="button" class="more-btn"><dot /></button>
                </td> -->
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    members: [],
  }),

  computed: {
    ...mapGetters("authentication", ["user"]),
  },

  mounted() {
    this.getMembers();
  },

  methods: {
    async getMembers() {
      try {
        const { OrganisationId } = this.user?.AssociatedOrganisations[0];
        const response = await this.$axios.get(
          `ngos/${OrganisationId}/members`
        );

        if (response.status == "success") {
          this.members = response.data.reverse();
        }
        console.log("MOUNTED MEMBERS", this.members);
      } catch (err) {
        this.$toast.error(err.response?.data?.message);
      }
    },
  },
};
</script>

<style scoped>
.container {
  margin-left: -30px;
}

.holder {
  background: #ffffff;
  box-shadow: 0px 4px 30px rgba(174, 174, 192, 0.2);
  border-radius: 10px;
  width: 100%;
  height: auto;
  padding: 30px;
}

.child-holder {
  background: #ffffff;
  box-shadow: 0px 4px 30px rgba(201, 201, 211, 0.2);
  border-radius: 10px;
  width: 100%;
  height: auto;
  padding: 10px 0;
}

.table thead tr th {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: inherit;
}

.sub-heading {
  font-weight: 500;
  background: #f5f5f5;
  color: var(--primary-text-color);
}
.sub-heading > .action {
  display: flex;
  align-items: center;
  justify-content: center;
}

.text-xs {
  font-size: 0.8rem;
}

.pill {
  background-color: #f5f5f5f5;
  border-radius: 50px;
  padding: 0.313rem 0.5rem;
  color: #7a809b;
}
</style>
