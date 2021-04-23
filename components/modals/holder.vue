<template>
  <div>
    <b-modal id="new-campaign" hide-header hide-footer>
      <div class="text-center position-relative pt-2">
        <h3 class="header">New Campaign</h3>
        <!--Close button here -->
        <button
          type="button"
          class="close-btn position-absolute"
          @click="closeModal"
        >
          <i>
            <svg
              width="23"
              height="27"
              viewBox="0 0 23 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                y1="-1.5"
                x2="31.241"
                y2="-1.5"
                transform="matrix(0.640184 0.768221 -0.704167 0.710035 0 3)"
                stroke="#333333"
                stroke-width="3"
              />
              <line
                y1="-1.5"
                x2="21.5132"
                y2="-1.5"
                transform="matrix(0.673504 -0.739183 0.673504 0.739183 2.73074 22.9814)"
                stroke="#333333"
                stroke-width="3"
              />
            </svg>
          </i>
        </button>
      </div>

      <div class="mt-5 px-3">
        <form @submit.prevent="createCampaign">
          <!-- Name field  here -->
          <div class="form-group">
            <label for="name">Name</label>
            <input
              type="text"
              class="form-controls"
              :class="{
                error: $v.payload.title.$error,
              }"
              name="name"
              id="name"
              placeholder="Name of the campaign"
              v-model="payload.title"
              @mouseenter.once="initMaps"
              @blur="$v.payload.title.$touch()"
            />
          </div>

          <!--Description field  here -->
          <div class="form-group">
            <label for="description">Description</label>
            <textarea
              class="form-controls"
              :class="{
                error: $v.payload.description.$error,
              }"
              name="description"
              id="description"
              cols="30"
              rows="2"
              @blur="$v.payload.description.$touch()"
              v-model="payload.description"
            ></textarea>
          </div>

          <div class="row">
            <div class="col-lg-12">
              <!--Total Amount  field  here -->
              <div class="form-group">
                <label for="total-amount">Total Wallet</label>
                <input
                  type="number"
                  class="form-controls"
                  :class="{
                    error: $v.payload.budget.$error,
                  }"
                  name="total-amount"
                  id="total-amount"
                  placeholder="Amount from NGO wallet"
                  v-model="payload.budget"
                  @blur="$v.payload.budget.$touch()"
                  ref="budget"
                />
              </div>
            </div>

            <!--Field office field  here -->
            <!--<div class="col-lg-6">
              <div class="form-group">
                <label for="field-office">Field Office</label>
                <input
                  type="text"
                  class="form-controls"
                  name="field-office"
                  id="field-office"
                  v-model="payload.location.field_office"
                />
              </div>
            </div> -->

            <!--Amount per receipient field  here -->
            <!-- <div class="col-lg-6">
              <div class="form-group">
                <label for="receipient-amount">Amount Per Recipient</label>
                <input
                  type="text"
                  class="form-controls"
                  name="receipient-amount"
                  pattern="^[0-9]*$"
                  id="receipient-amount"
                  placeholder="Amount for each recipient"
                />
              </div>
            </div> -->
          </div>

          <div class="row">
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

          <div class="row">
            <!--Location  field  here -->
            <div class="col-lg-12">
              <div class="form-group">
                <label for="location">Location</label>
                <input
                  type="text"
                  class="form-controls"
                  :class="{
                    error: $v.payload.location.country.$error,
                  }"
                  name="location"
                  id="location"
                  v-model="payload.location.country"
                  @blur="$v.payload.location.country.$touch()"
                />
              </div>
            </div>
          </div>
<code>

  <pre>

    {{payload}}
  </pre>
</code>
          <div id="map_canvas"></div>

          <div class="d-flex py-3">
            <div>
              <button
                type="button"
                class="cancel px-4 py-2"
                @click="closeModal"
              >
                Cancel
              </button>
            </div>

            <div class="ml-auto">
              <button class="create-campaign px-4 py-2">
                <span v-if="loading">
                  <img
                    src="~/assets/img/vectors/spinner.svg"
                    class="btn-spinner"
                  />
                </span>
                <span v-else>Create</span>
              </button>
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
const apiKey = "AIzaSyApnZ4U1qeeHgHZuckDndNVVMIJAo-b5Vo";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
// let geocoder;
export default {
  head() {
    return {
      script: [
        {
          src: `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&libraries=geometry&v=weekly`,
        },
      ],
    };
  },

  data() {
    return {
      loading: false,
      isFired: false,
      payload: {
        organisation_id: 0,
        type: "campaign",
        title: "",
        description: "",
        budget: "",
        location: {
          country: "",
          coordinates: [],
        },
        start_date: "",
        end_date: "",
      },

      location: {
        coordinates: [],
      },
    };
  },

  validations: {
    payload: {
      title: {
        required,
      },
      description: {
        required,
      },
      budget: {
        required,
      },
      location: {
        country: {
          required,
        },
      },
      start_date: {
        required,
      },
      end_date: {
        required,
      },
    },
  },
  components: { DatePicker },

  computed: {
    ...mapGetters("authentication", ["user"]),
  },

  mounted() {
    this.payload.organisation_id = this.user.AssociatedOrganisations[0].OrganisationId;
    console.log("user:::", this.user);
    console.log("orgId:::", this.user.AssociatedOrganisations[0].OrganisationId)
  },

  methods: {
    closeModal() {
      this.$bvModal.hide("new-campaign");
    },

    async createCampaign() {
      console.log("pd::", this.payload)
   
    
      try {
        this.loading = true;
        this.$v.payload.$touch();

        // Gebneral check to see that all compulsory fields are provided
        if (this.$v.payload.$error === true) {
          this.loading = false;
          this.$toast.error("Please fill in appropriately");
          return;
        }

        // let budgetString = this.payload.budget;
        // budgetString = budgetString.replaceAll(",", "");
        // this.payload.budget = budgetString;
           this.payload.location =   JSON.stringify(this.payload.location)

        const response = await this.$axios.post(
          "/organisation/campaign",
          this.payload
        );
        console.log("campaignResponse:::", response);
        this.$emit("reload");
        this.closeModal()
        this.$toast.success(response.data.message);
        this.loading = false;

      } catch (err) {
        console.log(err);
        this.loading = false;
        this.$toast.error(err.response.data.message);
      }
    },

    // TODO:Try emiting fetch all campaigns method from parent and calling here
    initMaps(){
console.log("i was called")
var markers = [
        {
            "title": 'Alibaug',
            "lat": '18.641400',
            "lng": '72.872200',
            "description": 'Alibaug is a coastal town and a municipal council in Raigad District in the Konkan region of Maharashtra, India.'
        },
        {
            "title": 'Lonavla',
            "lat": '18.750000',
            "lng": '73.416700',
            "description": 'Lonavla'
        },
        {
            "title": 'Mumbai',
            "lat": '18.964700',
            "lng": '72.825800',
            "description": 'Mumbai formerly Bombay, is the capital city of the Indian state of Maharashtra.'
        },
        {
            "title": 'Pune',
            "lat": '18.523600',
            "lng": '73.847800',
            "description": 'Pune is the seventh largest metropolis in India, the second largest in the state of Maharashtra after Mumbai.'
        },
        {
            "title": 'Thane',
            "lat": '19.182800',
            "lng": '72.961200',
            "description": 'Thane'
        },
        {
            "title": 'Vashi',
            "lat": '18.750000',
            "lng": '73.033300',
            "description": 'Vashi'
        }
    ];
   document.getElementById("map_canvas").style.display = "block";
         var mapOptions = {
            center: new google.maps.LatLng(markers[0].lat, markers[0].lng),
            zoom: 8,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var infoWindow = new google.maps.InfoWindow();
        var latlngbounds = new google.maps.LatLngBounds();
        var geocoder = geocoder = new google.maps.Geocoder();

        var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

// Marker here
        for (var i = 0; i < markers.length; i++) {
            var data = markers[i]
            var myLatlng = new google.maps.LatLng(data.lat, data.lng);
            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                title: data.title,
                draggable: true,
                animation: google.maps.Animation.DROP
            });
            (function (marker, data) {
                google.maps.event.addListener(marker, "click", function (e) {
                    infoWindow.setContent(data.description);
                    infoWindow.open(map, marker);
                });
                google.maps.event.addListener(marker, "dragend", function (e) {
                    var lat, lng, address;
                    geocoder.geocode({ 'latLng': marker.getPosition() }, function (results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            lat = marker.getPosition().lat();
                            lng = marker.getPosition().lng();
                            address = results[0].formatted_address;
                            this.payload.location.coordinates.push(lat, lng)
                            console.log("coordinates:::", this.payload.location)
                            alert("Latitude: " + lat + "\nLongitude: " + lng + "\nAddress: " + address);
                        }
                    });
                });
            })(marker, data);
            latlngbounds.extend(marker.position);
        }
          var bounds = new google.maps.LatLngBounds();
        map.setCenter(latlngbounds.getCenter());
        map.fitBounds(latlngbounds);
    },

    initMap() {
      document.getElementById("map_canvas").style.display = "block";
      
      //Map Constructor here
      var map = new google.maps.Map(document.getElementById("map_canvas"), {
        zoom: 1,
        center: new google.maps.LatLng(35.137879, -82.836914),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      });

      // Marker Constructor here
      var myMarker = new google.maps.Marker({
        position: new google.maps.LatLng(21.47542448391573, 15.103484999999983),
        animation: google.maps.Animation.DROP,
        draggable: true,
        // title: "Drag me!",
      });

      //Event listener added here
      google.maps.event.addListener(myMarker, "dragend", (evt) => {
        this.payload.location.coordinates.push({
          long: evt.latLng.lng(),
          lat: evt.latLng.lat(),
        });
        this.location.coordinates = {
          long: evt.latLng.lng(),
          lat: evt.latLng.lat(),
        };

        //Geocoder constructor here
        geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(evt.latLng.lat(), evt.latLng.lng());
        codeLatLng((address) => {
          console.log("address:::", address);
          this.payload.location.country = address;
        });

        // Geocoder call back function here
        function codeLatLng(callback) {
          var latlng = new google.maps.LatLng(
            evt.latLng.lat(),
            evt.latLng.lng()
          );

          if (geocoder) {
            geocoder.geocode({ latLng: latlng }, function (results, status) {
              if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                  callback(results[1].formatted_address);
                } else {
                  this.$toast.error("No results found");
                }
              } else {
                this.$toast.error("Geocoder failed, Please try again");
              }
            });
          }
        }
      });
      map.setCenter(myMarker.position);
      myMarker.setMap(map);
    },
  },
};
</script>

<style scoped>
#map_canvas {
  height: 300px;
  display: none;
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
  color: var(--secondary-black);
  font-weight: 700;
  font-size: 1.5rem;
}
.modal-body {
  border-radius: 10px;
  background: white;
}
.close-btn {
  border: none;
  background: inherit;
  bottom: -3px;
  right: 10px;
}
::placeholder {
  color: #999999;
  letter-spacing: 0.01em;
  font-size: 0.875rem;
  opacity: 0.7;
}
label {
  color: var(--secondary-black);
  font-size: 1rem;
  font-weight: 500;
}
.form-group {
  margin-bottom: 1.5rem;
}
.form-controls {
  border: 1px solid #999999;
}
textarea {
  height: auto;
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
