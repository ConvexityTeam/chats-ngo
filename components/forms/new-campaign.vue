<template>
  <div class="mt-4 px-3">
    <!-- Sidebar Here -->

    <!-- <MapSideBar :drawer="drawer" @hidden="drawer = false" /> -->
    <!-- Toggler here -->
    <div class="d-flex mb-4 w-full ctn-mgt-btn">
      <div class="mgt-btn-container" @click="handleSwitch('cash')">
        <span
          class="mgt-btn"
          :class="activeCampaignForm === 'cash' && 'active'"
        >
          Cash Project
        </span>
      </div>

      <div class="mgt-btn-container" @click="handleSwitch('items')">
        <span
          class="mgt-btn"
          :class="activeCampaignForm === 'items' && 'active'"
        >
          Items Project
        </span>
      </div>
    </div>

    <!-- Cash Campaign Form Here -->
    <form @submit.prevent="createCampaign">
      <!-- Name field  here -->
      <div class="form-group">
        <label for="name">Project name</label>
        <input
          id="name"
          v-model="payload.title"
          type="text"
          class="form-controls"
          :class="{
            error: $v.payload.title.$error,
          }"
          placeholder="Enter name of project"
          @blur="$v.payload.title.$touch()"
        />
      </div>

      <!--Description field  here -->
      <div class="form-group">
        <label for="description">Description</label>
        <textarea
          id="description"
          v-model="payload.description"
          class="form-controls"
          placeholder="Short description"
          :class="{
            error: $v.payload.description.$error,
          }"
          cols="30"
          rows="3"
          @blur="$v.payload.description.$touch()"
        ></textarea>
      </div>

      <!--Budget field  here  for cash based campaign  -->
      <div class="form-group">
        <label :for="computedId"> {{ campaignLabel }} </label>
        <template v-if="activeCampaignForm === 'cash'">
          <CurrencyInput
            :id="computedId"
            v-model="payload.budget"
            :placeholder="`${$currency}0.00`"
            :customStyles="`height: 41px; border: 1px solid #7c8db5; background: white; padding: 0.75rem`"
            :error="$v.payload.budget.$error"
          />
        </template>

        <template v-else>
          <input
            :id="computedId"
            v-model="payload.minting_limit"
            type="number"
            class="form-controls"
            min="1"
            :class="{
              error: $v.payload.minting_limit.$error,
            }"
            placeholder="0"
            @blur="$v.payload.minting_limit.$touch()"
          />
        </template>
      </div>

      <!--Unit Cost of Item  here -->
      <div v-if="activeCampaignForm === 'items'" class="form-group">
        <label for="unit_cost">Unit cost of Item</label>

        <CurrencyInput
          id="unit_cost"
          v-model="payload.unit_cost"
          :placeholder="`${$currency}0.00`"
          :customStyles="`height: 41px; border: 1px solid #7c8db5; background: white; padding: 0.75rem`"
        />
      </div>

      <!-- Date fields here -->
      <div class="row">
        <div class="col-lg-6">
          <!--start date  field  here -->
          <div id="c4w" class="form-group">
            <label for="start-date">Start Date</label>
            <date-picker
              v-model="payload.start_date"
              :input-class="`mx-input  ${
                $v.payload.start_date.$error ? 'error' : ''
              }`"
              format="DD-MM-YYYY"
              placeholder="DD-MM-YYYY"
              valueType="format"
              :disabled-date="(present) => present <= new Date()"
              @blur="$v.payload.start_date.$touch()"
            ></date-picker>
          </div>
        </div>

        <!--end date field  here -->
        <div class="col-lg-6">
          <div id="c4w" class="form-group">
            <label for="end-date">End Date</label>

            <date-picker
              v-model="payload.end_date"
              :input-class="`mx-input  ${
                $v.payload.end_date.$error ? 'error' : ''
              }`"
              format="DD-MM-YYYY"
              placeholder="DD-MM-YYYY"
              valueType="format"
              :disabled-date="(present) => present <= new Date()"
              @blur="$v.payload.end_date.$touch()"
            ></date-picker>
          </div>
        </div>
      </div>

      <!-- Country here -->
      <div class="form-group">
        <label for="country">Country</label>
        <div
          id="product"
          class="w-100"
          :class="{ error: $v.payload.location.country.$error }"
        >
          <el-select
            id="country"
            v-model="payload.location.country"
            filterable
            placeholder="—Select — "
            autocomplete="new-username"
          >
            <el-option
              v-for="(country, i) in countries"
              :key="i"
              :label="country.countryName"
              :value="country.countryName"
            >
            </el-option>
          </el-select>
        </div>
      </div>

      <!-- State here -->
      <div class="form-group">
        <label for="state">State</label>
        <div
          id="product"
          class="w-100"
          :class="{ error: $v.payload.location.state.$error }"
        >
          <el-select
            id="state"
            v-model="payload.location.state"
            filterable
            multiple
            placeholder="—Select — "
            autocomplete="new-username"
          >
            <el-option
              v-for="(state, i) in states"
              :key="i"
              :label="state.name"
              :value="state.name"
            >
            </el-option>
          </el-select>
        </div>

        <h6 class="primary-gray text-sm pt-1">
          You can add multiple states/regions
        </h6>
      </div>

      <!-- Campaign Form here -->
      <div class="form-group">
        <label for="campaign-form">Project form</label>
        <div id="product" class="w-100">
          <el-select
            id="campaign-form"
            v-model="payload.formId"
            filterable
            clearable
            placeholder="—Select — "
          >
            <el-option
              v-for="form in forms"
              :key="form.id"
              :label="form.title"
              :value="form.id"
            >
            </el-option>
          </el-select>
        </div>
      </div>

      <div class="row form-group pt-3 px-3 d-none">
        <!--Allow geofence   here -->
        <div class="">
          <checkbox
            id="geofence"
            :disabled="!payload.title.length"
            @input="checkValue"
          />
        </div>

        <div class="ml-2">
          <label for="geofence">Geofence an area</label>
        </div>
      </div>

      <div id="map_canvas" :class="isGeofence ? 'd-block' : 'd-none'"></div>

      <!-- button area here -->
      <div class="d-flex pb-2 pt-3">
        <div>
          <Button
            text="Create Project"
            type="submit"
            :has-icon="false"
            :loading="loading"
            :disabled="loading"
            custom-styles="height: 45px; border-radius:5px !important; font-size: 14px !important; padding: 0 28px !important"
          />
        </div>

        <div class="ml-3">
          <Button
            text="Cancel"
            :has-icon="false"
            :has-border="true"
            custom-styles="height: 45px; border-radius:5px !important; font-size: 14px !important;  border: 1px solid #17CE89 !important; padding: 0 28px !important"
            @click="closeModal"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import {
  required,
  maxLength,
  requiredIf,
  minValue,
} from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
// import MapSideBar from "./map-sidebar";
import countriesRegions from "~/plugins/countries-regions";

// let geocoder;

export default {
  components: {
    DatePicker,
    //  MapSideBar
  },

  props: {
    selectedCampaign: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      activeCampaignForm: "",
      drawer: false,
      present: new Date(),
      loading: false,
      isGeofence: false,
      id: 0,
      forms: [],
      countries: [],
      payload: {
        type: "",
        title: "",
        description: "",
        budget: "",
        minting_limit: "",
        location: {
          country: "",
          state: [],
        },
        start_date: "",
        end_date: "",
        formId: "",
        unit_cost: "",
      },

      location: {
        coordinates: [],
      },
    };
  },

  validations: {
    payload: {
      title: { required },
      description: { required, maxLength: maxLength(250) },
      budget: {
        required: requiredIf(function () {
          return this.activeCampaignForm === "cash";
        }),
      },
      minting_limit: {
        minValue: minValue(1),
        required: requiredIf(function () {
          return this.activeCampaignForm === "items";
        }),
      },
      start_date: { required },
      end_date: { required },
      location: {
        country: { required },
        state: { required },
      },
    },
  },

  async fetch() {
    this.id = this.user?.AssociatedOrganisations[0]?.OrganisationId;
    const response = await this.$axios.get(
      `organisations/${this.id}/campaign_form`
    );

    if (response.status === "success") {
      this.forms = response.data;
    }

    // Country data here
    const { data } = await this.$axios.get("/utils/countries");
    this.countries = data;
  },

  computed: {
    ...mapGetters("authentication", ["user"]),

    campaignLabel() {
      return this.activeCampaignForm === "items" ? "Number of items" : "Budget";
    },

    computedId() {
      return this.activeCampaignForm === "items" ? "No_of_products" : "Budget";
    },

    campaignType() {
      return this.activeCampaignForm === "items" ? "item" : "campaign";
    },

    states() {
      const setCountry = this.payload.location.country;
      console.log("SETCOUNTRY", setCountry);
      if (setCountry) {
        return countriesRegions.find(
          (country) => setCountry === country.countryName
        )?.regions;
      }

      return [];
    },
  },

  mounted() {
    this.id = this.user.AssociatedOrganisations[0].OrganisationId;
    this.activeCampaignForm = this.selectedCampaign;
  },

  methods: {
    handleSwitch(section) {
      this.activeCampaignForm = section;
      this.$v.payload.$reset();
      for (const prop of Object.getOwnPropertyNames(this.payload)) {
        if (prop === "location") {
          this.payload[prop] = {
            country: "",
            state: [],
          };
        } else {
          this.payload[prop] = "";
        }
      }
    },

    async createCampaign() {
      try {
        this.loading = true;
        this.$v.payload.$touch();

        if (this.$v.payload.$error) {
          return (this.loading = false);
        }

        const response = await this.$axios.post(
          `/organisations/${+this.id}/campaigns`,
          {
            ...this.payload,
            budget: this.payload.budget.replace(/[^0-9.]/g, ""),
            type: this.campaignType,
          }
        );

        if (response.status === "success") {
          this.$emit("reload");
          this.closeModal();
          this.$toast.success(response.message);
        }
      } catch (_err) {
      } finally {
        this.loading = false;
      }
    },

    // TODO:Try emiting fetch all campaigns method from parent and calling here
    runMap() {
      const google = window?.google;
      const mapComponent = document.getElementById("map_canvas");

      if (!mapComponent || !google) return;
      const map = new google.maps.Map(mapComponent, {
        center: { lat: 17.35297042396732, lng: 8.808737500000019 },
        zoom: 3,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      });

      const all_overlays = [];
      let selectedShape;
      const drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.POLYGON,
        drawingControl: true,
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_CENTER,
          drawingModes: [google.maps.drawing.OverlayType.POLYGON],
        },

        polygonOptions: {
          clickable: true,
          draggable: true,
          editable: true,
          fillColor: "",
          fillOpacity: 0.35,
        },
      });

      const clearSelection = () => {
        if (selectedShape) {
          selectedShape.setEditable(false);
          selectedShape = null;
        }
      };

      const setSelection = (shape) => {
        clearSelection();
        selectedShape = shape;
        shape.setEditable(true);
      };

      const deleteSelectedShape = () => {
        if (selectedShape) {
          // this.payload.location.coordinates = [];
          this.payload.location = [];
          selectedShape.setMap(null);
        }
      };

      const CenterControl = (controlDiv, map) => {
        // Set CSS for the control border.
        const controlUI = document.createElement("div");
        controlUI.style.backgroundColor = "#17CE89";
        controlUI.style.border = "none";
        controlUI.style.borderRadius = "10px";

        controlUI.style.cursor = "pointer";
        controlUI.style.marginBottom = "22px";
        controlUI.style.textAlign = "center";
        controlUI.title = "Select to delete the shape";
        controlDiv.appendChild(controlUI);

        // Set CSS for the control interior.
        const controlText = document.createElement("div");
        controlText.style.color = "#fff";
        controlText.style.fontWeight = 500;
        controlText.style.fontSize = "1rem";
        controlText.style.lineHeight = "38px";
        controlText.style.padding = "3px 15px";
        controlText.innerHTML = "Delete Selected Area";
        controlUI.appendChild(controlText);

        // Setup the click event listeners: simply set the map to Chicago.
        controlUI.addEventListener("click", function () {
          deleteSelectedShape();
        });
      };

      drawingManager.setMap(map);

      google.maps.event.addListener(
        drawingManager,
        "polygoncomplete",
        (event) => {
          const vertices = event.getPath();
          for (let i = 0; i < vertices.getLength(); i++) {
            const coordinates = vertices.getAt(i).toUrlValue(6);
            // reassign into array
            // this.payload.location.coordinates.length = 0
            // this.payload.location.coordinates.push(coordinates);
            this.payload.location.push(coordinates);
            console.log("PAYLOAD1::", this.payload.location);
          }

          // event.getPath().getLength();
          google.maps.event.addListener(event.getPath(), "insert_at", () => {
            const len = event.getPath().getLength();
            for (let i = 0; i < len; i++) {
              const coordinates = vertices.getAt(i).toUrlValue(6);
              // push into array

              // this.payload.location.coordinates.push(coordinates);
              this.payload.location.push(coordinates);
              console.log("PAYLOAD2::", this.payload.location);
            }
          });

          google.maps.event.addListener(event.getPath(), "set_at", () => {
            const len = event.getPath().getLength();
            for (let i = 0; i < len; i++) {
              const coordinates = vertices.getAt(i).toUrlValue(6);
              // reassign into array
              // this.payload.location.coordinates.length = 0
              // this.payload.location.coordinates.push(coordinates);
              this.payload.location = coordinates;
              console.log("PAYLOAD3::", this.payload.location);
            }
          });
        }
      );

      google.maps.event.addListener(
        drawingManager,
        "overlaycomplete",
        function (event) {
          all_overlays.push(event);
          if (event.type !== google.maps.drawing.OverlayType.MARKER) {
            drawingManager.setDrawingMode(null);
            // Write code to select the newly selected object.

            const newShape = event.overlay;
            newShape.type = event.type;
            google.maps.event.addListener(newShape, "click", function () {
              setSelection(newShape);
            });

            console.log("HERE::", newShape);

            setSelection(newShape);
          }
        }
      );

      const centerControlDiv = document.createElement("div");
      // eslint-disable-next-line no-unused-vars
      const centerControl = new CenterControl(centerControlDiv, map);

      centerControlDiv.index = 1;
      map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(
        centerControlDiv
      );
    },

    closeModal() {
      this.$bvModal.hide("new-campaign-form");
    },

    checkValue(value) {
      this.isGeofence = value;
      if (this.isGeofence) this.drawer = true;
    },
  },
};
</script>

<style scoped>
#map_canvas {
  height: 300px;
}

label {
  color: var(--primary-blue);
  font-size: 1rem;
  font-weight: 500;
}

.form-group {
  margin-bottom: 1rem !important;
}

.form-controls {
  border: 1px solid #7c8db5;
  background: white;
  height: 41px;
  padding: 0rem 0.75rem;
}

.form-controls::placeholder {
  color: #646a86;
  font-size: 0.875rem;
  letter-spacing: 0.01em;
}

textarea.form-controls {
  height: auto;
  resize: none;
  padding: 0.75rem;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

/* Campaign form toggler */
.ctn-mgt-btn {
  border-radius: 10px;
  background: #f5f6f8;
}

.mgt-btn-container {
  width: 50%;
  display: flex;
  align-content: center;
  text-align: center;
  cursor: pointer;
  justify-content: center;
  user-select: none;
}

.mgt-btn {
  border: none;
  font-size: 1rem;
  font-weight: 500;
  color: #646a86;
  background: inherit;
  border-radius: 10px;
  padding: 0.6rem;
  display: inline-block;
}

.mgt-btn.active {
  font-style: italic;
  color: #fff;
  font-weight: bold;
  background: #9dadca;
  border: none;
  border-radius: 10px;
  width: 100%;
}
</style>
