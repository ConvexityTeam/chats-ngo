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
          Cash Campaign
        </span>
      </div>

      <div class="mgt-btn-container" @click="handleSwitch('items')">
        <span
          class="mgt-btn"
          :class="activeCampaignForm === 'items' && 'active'"
        >
          Items Campaign
        </span>
      </div>
    </div>

    <!-- Cash Campaign Form Here -->
    <form @submit.prevent="createCampaign">
      <!-- Name field  here -->
      <div class="form-group">
        <label for="name">Campaign name</label>
        <input
          id="name"
          type="text"
          class="form-controls"
          :class="{
            error: $v.payload.title.$error,
          }"
          placeholder="Enter name of campaign"
          v-model="payload.title"
          @mouseenter.once="runMap"
          @blur="$v.payload.title.$touch()"
        />
      </div>

      <!--Description field  here -->
      <div class="form-group">
        <label for="description">Description</label>
        <textarea
          id="description"
          class="form-controls"
          placeholder="Short description"
          :class="{
            error: $v.payload.description.$error,
          }"
          cols="30"
          rows="3"
          @blur="$v.payload.description.$touch()"
          v-model="payload.description"
        ></textarea>
      </div>

      <!--Budget field  here  for cash based campaign  -->
      <div class="form-group">
        <label :for="computedId"> {{ campaignLabel }} </label>
        <template v-if="activeCampaignForm === 'cash'">
          <CurrencyInput
            :id="computedId"
            :placeholder="`${$currency}0.00`"
            :customStyles="`height: 41px; border: 1px solid #7c8db5; background: white; padding: 0.75rem`"
            :error="$v.payload.budget.$error"
            v-model="payload.budget"
          />
        </template>

        <template v-else>
          <input
            :id="computedId"
            type="number"
            class="form-controls"
            min="1"
            :class="{
              error: $v.payload.minting_limit.$error,
            }"
            placeholder="0"
            @blur="$v.payload.minting_limit.$touch()"
            v-model="payload.minting_limit"
          />
        </template>
      </div>

      <!--Unit Cost of Item  here -->
      <div class="form-group" v-if="activeCampaignForm === 'items'">
        <label for="unit_cost">Unit cost of Item</label>

        <CurrencyInput
          id="unit_cost"
          :placeholder="`${$currency}0.00`"
          :customStyles="`height: 41px; border: 1px solid #7c8db5; background: white; padding: 0.75rem`"
          v-model="payload.unit_cost"
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
              @blur="$v.payload.start_date.$touch()"
              :disabled-date="(present) => present <= new Date()"
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
              @blur="$v.payload.end_date.$touch()"
              :disabled-date="(present) => present <= new Date()"
            ></date-picker>
          </div>
        </div>
      </div>

      <!-- Campaign Form here -->
      <div class="form-group">
        <label for="campaign-form">Campaign form</label>
        <div id="product" class="w-100">
          <el-select
            v-model="payload.formId"
            id="vendor"
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

      <div class="row form-group pt-3 px-3">
        <!--Allow geofence   here -->
        <div class="">
          <checkbox
            id="geofence"
            @input="checkValue"
            :disabled="!payload.title.length"
          />
        </div>

        <div class="ml-2">
          <label for="geofence">Geofence an area</label>
        </div>
      </div>

      <div :class="isGeofence ? 'd-block' : 'd-none'" id="map_canvas"></div>

      <!-- button area here -->
      <div class="d-flex pb-2" :class="isGeofence ? 'pt-3' : 'pt-1'">
        <div>
          <Button
            text="Create campaign"
            type="submit"
            :has-icon="false"
            :loading="loading"
            :disabled="loading"
            custom-styles="height: 41px; border-radius:5px !important; font-size: 14px !important"
          />
        </div>

        <div class="ml-3">
          <Button
            text="Cancel"
            :has-icon="false"
            :has-border="true"
            custom-styles="height: 41px; border-radius:5px !important; font-size: 14px !important;  border: 1px solid #17CE89 !important"
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
import MapSideBar from "./map-sidebar";

let geocoder;

export default {
  components: { DatePicker, MapSideBar },

  props: {
    selectedCampaign: {
      type: String,
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
      payload: {
        type: "",
        title: "",
        description: "",
        budget: "",
        minting_limit: "",
        location: [],
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
        this.payload[prop] = "";
      }
    },

    async createCampaign() {
      try {
        this.loading = true;
        this.$v.payload.$touch();

        if (this.$v.payload.$error) {
          return (this.loading = false);
        }

        this.payload.location = this.payload.location
          ? JSON.stringify(this.payload.location)
          : "";

        const response = await this.$axios.post(
          `/organisations/${+this.id}/campaigns`,
          {
            ...this.payload,
            budget: this.payload.budget.replace(/[^0-9.]/g, ""),
            type: this.campaignType,
          }
        );

        if (response.status == "success") {
          this.$emit("reload");
          this.closeModal();
          this.$toast.success(response.message);
        }
      } catch (err) {
        console.log({ err });
        this.$toast.error(err?.response?.data?.message);
      } finally {
        this.loading = false;
      }
    },

    // TODO:Try emiting fetch all campaigns method from parent and calling here
    runMap() {
      let google = window?.google;
      const mapComponent = document.getElementById("map_canvas");

      if (!mapComponent || !google) return;
      const map = new google.maps.Map(mapComponent, {
        center: { lat: 17.35297042396732, lng: 8.808737500000019 },
        zoom: 3,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      });

      let all_overlays = [];
      let selectedShape;
      let drawingManager = new google.maps.drawing.DrawingManager({
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
        let controlUI = document.createElement("div");
        controlUI.style.backgroundColor = "#17CE89";
        controlUI.style.border = "none";
        controlUI.style.borderRadius = "10px";

        controlUI.style.cursor = "pointer";
        controlUI.style.marginBottom = "22px";
        controlUI.style.textAlign = "center";
        controlUI.title = "Select to delete the shape";
        controlDiv.appendChild(controlUI);

        // Set CSS for the control interior.
        let controlText = document.createElement("div");
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
            let len = event.getPath().getLength();
            for (let i = 0; i < len; i++) {
              const coordinates = vertices.getAt(i).toUrlValue(6);
              // push into array

              // this.payload.location.coordinates.push(coordinates);
              this.payload.location.push(coordinates);
              console.log("PAYLOAD2::", this.payload.location);
            }
          });

          google.maps.event.addListener(event.getPath(), "set_at", () => {
            let len = event.getPath().getLength();
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
            //Write code to select the newly selected object.

            let newShape = event.overlay;
            newShape.type = event.type;
            google.maps.event.addListener(newShape, "click", function () {
              setSelection(newShape);
            });

            console.log("HERE::", newShape);

            setSelection(newShape);
          }
        }
      );

      let centerControlDiv = document.createElement("div");
      let centerControl = new CenterControl(centerControlDiv, map);

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
