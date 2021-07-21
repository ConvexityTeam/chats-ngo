<template>
  <div class="mt-4 px-3">
    <form @submit.prevent="createCampaign">
      <!-- Name field  here -->
      <div class="form-group">
        <label for="name">Campaign name</label>
        <input
          id="name"
          type="text"
          class="form-controls"
          :class="{
            error: $v.payload.title.$error
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
          :class="{
            error: $v.payload.description.$error
          }"
          cols="30"
          rows="3"
          @blur="$v.payload.description.$touch()"
          v-model="payload.description"
        ></textarea>
      </div>

      <div class="row form-group">
        <div class="col-lg-12">
          <!--Total Amount  field  here -->
          <div class="">
            <label for="total-amount">Budget</label>
            <input
              type="number"
              class="form-controls"
              :class="{
                error: $v.payload.budget.$error
              }"
              id="total-amount"
              placeholder="0.00"
              v-model="payload.budget"
              @blur="$v.payload.budget.$touch()"
              ref="budget"
            />
          </div>
        </div>
      </div>

      <div class="row ">
        <div class="col-lg-6">
          <!--start date  field  here -->
          <div class="form-group">
            <label for="start-date">Start Date</label>
            <date-picker
              v-model="payload.start_date"
              format="MM-DD-YYYY"
              placeholder="MM-DD-YYYY"
              valueType="format"
            ></date-picker>
          </div>
        </div>

        <!--end date field  here -->
        <div class="col-lg-6">
          <div class="form-group">
            <label for="end-date">End Date</label>

            <date-picker
              v-model="payload.end_date"
              format="MM-DD-YYYY"
              placeholder="MM-DD-YYYY"
              valueType="format"
            ></date-picker>
          </div>
        </div>
      </div>

      <div class="row form-group mt-2 px-3">
        <!--start date  field  here -->
        <div class="">
          <checkbox id="geofence" @input="checkValue" />
          <!-- <input type="checkbox" id="geofence" /> -->
        </div>

        <div class="ml-2">
          <label for="geofence">Geofence an Area</label>
        </div>
      </div>

      <div :class="isGeofence ? 'd-block' : 'd-none'" id="map_canvas"></div>

      <!-- button area here -->
      <div class="d-flex pb-2 " :class="isGeofence ? 'pt-3' : 'pt-1'">
        <div>
          <Button
            text="Create campaign"
            type="submit"
            :has-icon="false"
            :loading="loading"
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
import { required } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
const apiKey = "AIzaSyApnZ4U1qeeHgHZuckDndNVVMIJAo-b5Vo";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
// import Checkbox from "../generic/checkbox.vue";

let geocoder;

export default {
  head() {
    return {
      script: [
        {
          src: `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&libraries=geometry,drawing&v=weekly`
        }
      ]
    };
  },

  data() {
    return {
      loading: false,
      isGeofence: false,
      payload: {
        organisation_id: 0,
        type: "campaign",
        title: "",
        description: "",
        budget: "",
        location: {
          country: "",
          coordinates: []
        },
        start_date: "",
        end_date: ""
      },

      location: {
        coordinates: []
      }
    };
  },

  validations: {
    payload: {
      title: {
        required
      },
      description: {
        required
      },
      budget: {
        required
      },
      //   location: {
      //     coordinates: {
      //       required
      //     }
      //   },
      start_date: {
        required
      },
      end_date: {
        required
      }
    }
  },
  components: { DatePicker },

  computed: {
    ...mapGetters("authentication", ["user"])
  },

  mounted() {
    this.payload.organisation_id = this.user.AssociatedOrganisations[0].OrganisationId;
  },

  methods: {
    closeModal() {
      this.$bvModal.hide("new-campaign");
    },

    checkValue(value) {
      this.isGeofence = value;
    },

    async createCampaign() {
      console.log("pd::", this.payload);

      try {
        this.loading = true;
        this.$v.payload.$touch();

        if (this.$v.payload.$error === true) {
          return (this.loading = false);
        }

        this.payload.location ? JSON.stringify(this.payload.location) : "";

        const response = await this.$axios.post(
          "/organisation/campaign",
          this.payload
        );

        if (response.status == "success") {
          this.$emit("reload");
          this.closeModal();
          this.$toast.success(response.message);
        } else {
          this.$toast.error(response.message);
        }

        console.log("campaignResponse:::", response);

        this.loading = false;
      } catch (err) {
        console.log(err);
        this.loading = false;
      }
    },

    // TODO:Try emiting fetch all campaigns method from parent and calling here
    runMap() {
      const map = new google.maps.Map(document.getElementById("map_canvas"), {
        center: { lat: 17.35297042396732, lng: 8.808737500000019 },
        zoom: 3,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      var all_overlays = [];
      var selectedShape;
      var drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.POLYGON,
        drawingControl: true,
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_CENTER,
          drawingModes: [google.maps.drawing.OverlayType.POLYGON]
        },

        polygonOptions: {
          clickable: true,
          draggable: true,
          editable: true,
          fillColor: "",
          fillOpacity: 0.35
        }
      });

      const clearSelection = () => {
        if (selectedShape) {
          selectedShape.setEditable(false);
          selectedShape = null;
        }
      };

      const setSelection = shape => {
        clearSelection();
        selectedShape = shape;
        shape.setEditable(true);
      };

      const deleteSelectedShape = () => {
        if (selectedShape) {
          this.payload.location.coordinates = [];
          selectedShape.setMap(null);
        }
      };

      const CenterControl = (controlDiv, map) => {
        // Set CSS for the control border.
        var controlUI = document.createElement("div");
        controlUI.style.backgroundColor = "#17CE89";
        controlUI.style.border = "none";
        controlUI.style.borderRadius = "10px";

        controlUI.style.cursor = "pointer";
        controlUI.style.marginBottom = "22px";
        controlUI.style.textAlign = "center";
        controlUI.title = "Select to delete the shape";
        controlDiv.appendChild(controlUI);

        // Set CSS for the control interior.
        var controlText = document.createElement("div");
        controlText.style.color = "#fff";
        controlText.style.fontWeight = 500;
        controlText.style.fontSize = "1rem";
        controlText.style.lineHeight = "38px";
        controlText.style.padding = "3px 15px";
        controlText.innerHTML = "Delete Selected Area";
        controlUI.appendChild(controlText);

        // Setup the click event listeners: simply set the map to Chicago.
        controlUI.addEventListener("click", function() {
          deleteSelectedShape();
        });
      };

      drawingManager.setMap(map);

      google.maps.event.addListener(
        drawingManager,
        "polygoncomplete",
        event => {
          const vertices = event.getPath();
          for (let i = 0; i < vertices.getLength(); i++) {
            const coordinates = vertices.getAt(i).toUrlValue(6);
            // reassign into array
            // this.payload.location.coordinates.length = 0
            this.payload.location.coordinates.push(coordinates);
          }

          // event.getPath().getLength();
          google.maps.event.addListener(event.getPath(), "insert_at", () => {
            var len = event.getPath().getLength();
            for (var i = 0; i < len; i++) {
              const coordinates = vertices.getAt(i).toUrlValue(6);
              // push into array
              this.payload.location.coordinates.push(coordinates);
            }
          });

          google.maps.event.addListener(event.getPath(), "set_at", () => {
            var len = event.getPath().getLength();
            for (var i = 0; i < len; i++) {
              const coordinates = vertices.getAt(i).toUrlValue(6);
              // reassign into array
              // this.payload.location.coordinates.length = 0
              this.payload.location.coordinates.push(coordinates);
            }
          });
        }
      );

      google.maps.event.addListener(drawingManager, "overlaycomplete", function(
        event
      ) {
        all_overlays.push(event);
        if (event.type !== google.maps.drawing.OverlayType.MARKER) {
          drawingManager.setDrawingMode(null);
          //Write code to select the newly selected object.

          var newShape = event.overlay;
          newShape.type = event.type;
          google.maps.event.addListener(newShape, "click", function() {
            setSelection(newShape);
          });

          setSelection(newShape);
        }
      });

      var centerControlDiv = document.createElement("div");
      var centerControl = new CenterControl(centerControlDiv, map);

      centerControlDiv.index = 1;
      map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(
        centerControlDiv
      );
    }
  }
};
</script>

<style scoped>
#map_canvas {
  height: 300px;
}

#current {
  padding-top: 25px;
}

.cancel {
  color: #492954;
  font-size: 1rem;
  border: 1px solid #492954;
  background: inherit;
  border-radius: 10px;
}
.create-campaign {
  background: var(--primary-color);
  border-radius: 10px;
  font-size: 1rem;
  border: 1px solid var(--primary-color);
  color: white;
  border: none;
}
.header {
  color: var(--tertiary-black);
  font-weight: bold;
  font-size: 1.5rem;
}

::placeholder {
  color: #999999;
  letter-spacing: 0.01em;
  font-size: 0.875rem;
  opacity: 0.7;
}
label {
  color: var(--tertiary-black);
  font-size: 1rem;
  font-weight: 500;
}

.form-group {
  margin-bottom: 1.5rem;
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
}

textarea.form-controls {
  height: auto;
  resize: none;
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
</style>
