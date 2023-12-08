<template>
  <div class="d-flex">
    <!-- form here -->
    <div class="w-50 p-5">
      <div class="mt-2 mb-4">
        <h3 class="primary-blue font-bold">Add Item</h3>
        <span class="font-medium primary-gray">
          Add items and assign vendors.
        </span>
      </div>

      <!-- item here -->
      <div class="mb-3">
        <label for="tag" class="primary-blue font-medium"> Item</label>
        <div class="w-100">
          <input
            id="tag"
            v-model="payload.tag"
            type="text"
            class="form"
            :class="{ error: $v.payload.tag.$error }"
            placeholder="Name of item"
            @blur="$v.payload.tag.$touch()"
          />
        </div>
      </div>

      <!-- Vendor here -->
      <div class="mb-3">
        <label for="vendor">Vendor</label>
        <div id="item" class="w-100">
          <el-select
            id="vendor"
            v-model="payload.vendors"
            :placeholder="!allVendors ? 'Add vendor' : 'Add another'"
            multiple
          >
            <el-option
              v-for="vendor in allVendors"
              :key="vendor.id"
              :label="vendor.first_name + ' ' + vendor.last_name"
              :value="vendor.id"
            >
            </el-option>
          </el-select>
        </div>
      </div>

      <!-- Create button here -->
      <div class="mt-4 pt-2">
        <Button
          :text="` ${isEdit ? 'Update' : 'Add'}  ${
            !payload.type ? 'Item' : payload.type
          }`"
          custom-styles="height:41px; border-radius: 5px; padding: 0px 20px !important"
          :has-border="false"
          :has-icon="false"
          :disabled="!isComplete"
          @click="addItem"
        />
      </div>
    </div>

    <div class="vl mx-auto" />

    <div class="w-50 py-5 px-4">
      <i
        class="el-dialog__close el-icon el-icon-close float-right mt-2"
        @click="$emit('close')"
      ></i>

      <div v-if="items.length" class="main transparent">
        <!--Save button here -->

        <div class="my-4">
          <Button
            :text="`Save ${items.length == 1 ? 'item' : 'items'}`"
            custom-styles="height:41px; border-radius: 5px; padding: 0px 25px !important"
            :has-border="false"
            :has-icon="false"
            @click="saveItems"
          />
        </div>

        <!-- displayed all items here -->
        <div
          v-for="(item, i) in items"
          :key="i"
          class="mb-3 product-holder px-4 py-3"
          :class="{ odd: i % 2 !== 0 }"
        >
          <div class="row">
            <!-- Item name here -->
            <div class="col-lg-4">
              <div class="mb-3">
                <span
                  class="primary-gray text-xs"
                  style="text-transform: uppercase"
                >
                  ITEM
                </span>
                <h6 class="word-content primary-blue font-medium">
                  {{ item.tag | capitalize }}
                </h6>
              </div>
            </div>

            <!-- Vendors here -->
            <div class="col-lg-5">
              <div class="mb-3">
                <span class="primary-gray text-xs mb-1">VENDOR(s)</span>
                <span
                  v-for="(vendor, index) in item.vendors"
                  :key="index + 'vendor'"
                  class="word-content d-block primary-blue font-medium"
                >
                  {{ findVendor(vendor) }}
                </span>
              </div>
            </div>

            <!-- Delete actions here -->
            <div class="col-lg-3" style="align-self: center">
              <div class="mb-3 d-flex">
                <!-- Edit button here -->
                <div>
                  <button class="actions" type="button" @click="editItem(item)">
                    <img src="~/assets/img/vectors/prod-edit.svg" alt="edit" />
                  </button>
                </div>

                <!-- Delete button here -->
                <div class="ml-2">
                  <button
                    class="actions"
                    type="button"
                    @click="deleteItem(item)"
                  >
                    <img src="~/assets/img/vectors/red-bin.svg" alt="bin" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- no products here -->
      <div v-else class="no-product">
        <div class="d-flex justify-content-center">
          <IconsNoProduct />
        </div>

        <div class="text-center mt-4 w-75 mx-auto">
          <h5 class="font-bold primary-blue" style="font-size: 1.125rem">
            Nothing in here yet.
          </h5>

          <p class="font-medium primary-gray">
            Products or services will show up here once you add them on the left
            pane.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { mapActions, mapGetters } from "vuex";
let screenLoading;

export default {
  data: () => ({
    isEdit: false,
    isSuccessful: false,
    items: [],
    orgId: "",
    payload: { type: "item", tag: "", cost: "", vendors: [] },
  }),

  validations: {
    payload: {
      type: { required },
      tag: { required },
      vendors: { required },
    },
  },

  computed: {
    ...mapGetters("authentication", ["user"]),
    ...mapGetters("vendors", ["allVendors"]),
    computedVendors() {
      // return only the vendors whose id is not in payload.vendors
      return this.allVendors.filter((vendor) => {
        return !this.payload.vendors.includes(vendor.id);
      });
    },
    isComplete() {
      return this.payload.tag && this.payload.vendors.length;
    },
  },

  mounted() {
    this.orgId = this.user.AssociatedOrganisations[0].OrganisationId;
    this.getallVendors(this.orgId);
  },

  methods: {
    ...mapActions("vendors", ["getallVendors"]),
    findVendor(id) {
      const vendors = this.allVendors.length ? this.allVendors : [];
      const foundVendor = vendors.filter((vendor) => vendor.id === id);
      return foundVendor[0].first_name + " " + foundVendor[0].last_name;
    },
    addItem() {
      this.$v.payload.$touch();
      if (this.$v.payload.$error)
        return this.$toast.error("Please fill in appropriately");

      if (this.isEdit) {
        this.items[this.payload] = this.payload;
        this.payload = { type: "item", tag: "", vendors: [] };
        return (this.isEdit = false);
      }

      this.items.push(this.payload);
      this.payload = { type: "item", tag: "", vendors: [] };
      this.isEdit = false;
      this.$v.payload.$reset();
    },
    async saveItems() {
      try {
        this.openScreen();
        this.loading = true;

        const response = await this.$axios.post(
          `/organisations/${this.orgId}/campaigns/${this.$route.params.id}/products`,
          this.items
        );

        if (response.status === "success") {
          this.$emit("close");
          this.$toast.success(response.message);
        }

        this.items = [];
        this.payload = { type: "item", tag: "", vendors: [] };
      } catch (_err) {
      } finally {
        screenLoading.close();
      }
    },
    editItem(item) {
      this.isEdit = true;
      this.payload = item;
    },
    deleteItem(item) {
      const index = this.items.indexOf(item);
      if (index < -1) return;
      if (this.isEdit) this.payload = { type: "item", tag: "", vendors: [] };
      this.isEdit = false;
      this.items.splice(index, 1);
    },

    openScreen() {
      screenLoading = this.$loading({
        lock: true,
        spinner: "el-icon-loading",
        background: "#0000009b",
      });
    },
  },
};
</script>

<style scoped>
.main {
  height: calc(100vh - 72px);
  overflow-y: scroll;
}

button.actions {
  background: inherit;
  border: none;
}

div.vl {
  border-left: 1px solid #7c8db5;
  height: 100vh;
}

label {
  font-size: 1rem;
  color: var(--primary-blue);
  font-weight: 500;
  letter-spacing: 0.01em;
  margin-bottom: 0.25rem;
}

.form {
  height: 41px;
  border: 1px solid #7c8db5;
  box-sizing: border-box;
  border-radius: 5px;
  color: #222222;
  background: inherit;
  width: 100%;
  transition: all 0.3s ease;
  padding: 0rem 1rem;
  font-weight: 500;
  font-size: 1rem;
}

.form.error {
  border: 1px #ee3934 !important;
  border-style: solid solid double solid !important;
}

.form:focus {
  border: 1px solid var(--primary-color) !important;
  outline: none;
}

.form::placeholder {
  letter-spacing: 0.01em;
  font-size: 0.875rem;
  color: #646a86;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
