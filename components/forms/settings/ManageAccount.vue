<template>
  <div class="container">
    <div class="d-flex col-lg-12 w-full h-5">
      <FormsSettingsNewSubadmin @reload="getMembers" />
      <!-- Transactions Table here -->
      <div class="holder">
        <div class="d-flex align-items-center table-title">
          <span class="primary-blue font-bold text-md">Team Members</span>

          <div class="ml-auto">
            <Button
              v-b-modal.new-subadmin
              text="Add Sub-admin"
              custom-styles="height:50px"
            />
          </div>
        </div>

        <div v-if="loading" class="px-4">
          <Skeleton
            :count="6"
            class="mb-5"
            styles="height: 52px; margin-bottom: 10px"
          />
        </div>

        <template v-else-if="members.length">
          <table class="table table-borderless">
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
                v-for="(member, i) in members"
                :key="i"
                class="d-flex table-body pr-2"
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
              </tr>
            </tbody>
          </table>

          <!-- pagination component  -->
          <pagination
            :currentPageNum="teamMembersPageNum"
            :totalNumOfItems="teamMembersTotalItems"
            @updatePage="updateTeamMembers"
          />
        </template>

        <h3 v-else class="text-center no-record">NO RECORD FOUND</h3>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    loading: false,
    members: [],
    teamMembersPageNum: 1,
    teamMembersTotalItems: 0,
  }),

  computed: {
    ...mapGetters("authentication", ["user"]),
  },

  mounted() {
    this.getMembers();
  },

  methods: {
    updateTeamMembers(action) {
      this.teamMembersPageNum =
        action === "prev"
          ? this.teamMembersPageNum - 1
          : this.teamMembersPageNum + 1;

      this.getMembers();
    },
    async getMembers() {
      try {
        this.loading = true;

        const { OrganisationId } = this.user?.AssociatedOrganisations[0];
        const response = await this.$axios.get(
          `ngos/${OrganisationId}/members?page=${this.teamMembersPageNum}&size=10`
        );

        if (response.status === "success") {
          this.members = response.data.reverse();
        }
        console.log("MOUNTED MEMBERS", this.members);

        this.teamMembersPageNum = response?.currentPage;
        this.teamMembersTotalItems = response?.totalItems;
      } catch (_err) {
      } finally {
        this.loading = false;
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
