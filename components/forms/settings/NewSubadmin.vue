<template>
  <div>
    <b-modal id="new-subadmin" hide-header hide-footer>
      <div class="text-center position-relative pt-2">
        <h3 class="header font-bold primary-blue">New Sub-admin</h3>
        <!--Close button here -->
        <button
          type="button"
          class="close-btn position-absolute pb-3"
          @click="closeModal"
        >
          <close />
        </button>
      </div>

      <div class="col-lg-12 mt-5 px-3 primary-blue font-medium">
        <form @submit.prevent="addSubadmin">
          <!-- Name field  here -->
          <div class="row">
            <!-- First name -->
            <div class="col-lg-6 mb-3">
              <div class="form-group">
                <label for="name">First Name</label>
                <input
                  id="name"
                  v-model="payload.first_name"
                  type="text"
                  class="form-controls"
                  :class="{
                    error: $v.payload.first_name.$error,
                  }"
                  name="name"
                  placeholder="first name"
                  @blur="$v.payload.first_name.$touch()"
                />
              </div>
            </div>
            <!-- Last Name -->
            <div class="col-lg-6 mb-3">
              <div class="form-group">
                <label for="name">Last Name</label>
                <input
                  id="name"
                  v-model="payload.last_name"
                  type="text"
                  class="form-controls"
                  :class="{
                    error: $v.payload.last_name.$error,
                  }"
                  name="name"
                  placeholder="last name"
                  @blur="$v.payload.last_name.$touch()"
                />
              </div>
            </div>
          </div>

          <div class="row">
            <!-- Email -->
            <div class="col-lg-6 mb-3">
              <div class="form-group">
                <label for="email">Email</label>
                <input
                  id="email"
                  v-model="payload.email"
                  type="email"
                  class="form-controls"
                  :class="{
                    error: $v.payload.email.$error,
                  }"
                  name="email"
                  placeholder="example@gmail.com"
                  @blur="$v.payload.email.$touch()"
                />
              </div>
            </div>
            <div class="col-lg-6">
              <!-- Phone  -->
              <label for="vendor">Phone Number</label>
              <div>
                <vue-tel-input
                  id="vendor"
                  v-model="payload.phone"
                  mode="international"
                  class="form-controls"
                  :class="{
                    error: $v.payload.phone.$error,
                  }"
                  :inputOptions="options"
                ></vue-tel-input>
              </div>
            </div>
          </div>

          <div class="row">
            <!-- Role -->
            <div class="col-lg-6 mb-3">
              <div class="form-group">
                <label for="Role">Role</label>
                <el-select
                  id="dropdown"
                  v-model="payload.role"
                  :class="{ error: $v.payload.role.$error }"
                  filterable
                  placeholder="Role"
                  @blur="$v.payload.role.$touch()"
                >
                  <el-option
                    v-for="(role, i) in roles"
                    :key="i"
                    :label="role.name | capitalize"
                    :value="role.name"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>

          <div class="d-flex py-3">
            <div class="save-btn ml-auto">
              <Button
                type="submit"
                :has-icon="false"
                text="Save"
                custom-styles="height:50px;  width: 100%"
                :loading="loading"
                :disabled="loading"
              />
            </div>
          </div>
        </form>
      </div>
    </b-modal>
  </div>
</template>
<script>
import { required } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
import close from "~/components/icons/close";
import allRoles from "~/plugins/roles";

export default {
  components: { close },

  data: () => ({
    options: { placeholder: "(759) 012-3985" },
    loading: false,
    orgId: "",
    roles: [],
    payload: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      role: "",
    },
  }),

  validations: {
    payload: {
      first_name: {
        required,
      },
      last_name: {
        required,
      },
      email: {
        required,
      },
      phone: {
        required,
      },
      role: {
        required,
      },
    },
  },

  computed: {
    ...mapGetters("authentication", ["user"]),
  },

  mounted() {
    this.roles = allRoles;
    console.log("Roles:::", this.roles);
    this.orgId = this.user?.AssociatedOrganisations[0]?.OrganisationId;
  },

  methods: {
    async addSubadmin() {
      try {
        // console.log('payload:::', this.payload);
        this.loading = true;
        this.$v.payload.$touch();

        if (this.$v.payload.$error === true) {
          this.$toast.error("Please fill in appropriately");
          this.loading = false;
          return;
        }

        this.payload.phone = this.payload.phone.replace(/\s/g, "");

        const response = await this.$axios.post(
          `ngos/${this.orgId}/members`,
          this.payload
        );
        console.log("response:::", response);

        if (response.status === "success") {
          this.$emit("reload");
          this.closeModal();
          this.$toast.success(response.message);
        }

        this.$emit("addSubadmin", this.payload);

        console.log("ADD SUBADMIN RESPONSE", response);
      } catch (_err) {
      } finally {
        this.loading = false;
      }
    },

    closeModal() {
      this.$bvModal.hide("new-subadmin");
    },
  },
};
</script>

<style scoped>
label {
  color: var(--primary-blue);
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.01em;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-controls {
  background: #f5f6f8;
  border-radius: 8px;
  height: 50px;
  padding: 0rem 0.75rem;
}

.form-controls::placeholder {
  color: #646a86;
  font-size: 1rem;
}
.close-btn {
  border: none;
  background: inherit;
  bottom: -3px;
  right: 10px;
}
</style>
