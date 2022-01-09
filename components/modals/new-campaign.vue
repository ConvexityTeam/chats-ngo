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
					<close />
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
							@mouseenter.once="runMap"
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
import { required } from 'vuelidate/lib/validators';
import { mapGetters } from 'vuex';
const apiKey = 'AIzaSyApnZ4U1qeeHgHZuckDndNVVMIJAo-b5Vo';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import close from '~/components/icons/close';
let geocoder;
export default {
	head() {
		return {
			script: [
				{
					src: `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&libraries=geometry,drawing&v=weekly`,
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
				type: 'campaign',
				title: '',
				description: '',
				budget: '',
				location: {
					country: '',
					coordinates: [],
				},
				start_date: '',
				end_date: '',
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
				coordinates: {
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
	components: { DatePicker, close },

	computed: {
		...mapGetters('authentication', ['user']),
	},

	mounted() {
		this.payload.organisation_id = this.user.AssociatedOrganisations[0].OrganisationId;
	},

	methods: {
		closeModal() {
			this.$bvModal.hide('new-campaign');
		},

		async createCampaign() {
			console.log('pd::', this.payload);

			try {
				this.loading = true;
				this.$v.payload.$touch();

				if (this.$v.payload.$error === true) {
					if (this.$v.payload.location.coordinates.$error == true) {
						this.$toast.error('Please Geofence a location on the map');
					}
					return (this.loading = false);
				}

				this.payload.location = JSON.stringify(this.payload.location);

				const response = await this.$axios.post(
					'/organisation/campaign',
					this.payload
				);

				if (response.status == 'success') {
					this.$emit('reload');
					this.closeModal();
					this.$toast.success(response.message);
				} else {
					this.$toast.error(response.message);
				}

				console.log('campaignResponse:::', response);

				this.loading = false;
			} catch (err) {
				console.log(err);
				this.loading = false;
			}
		},

		// TODO:Try emiting fetch all campaigns method from parent and calling here
		runMap() {
			document.getElementById('map_canvas').style.display = 'block';

			const map = new google.maps.Map(document.getElementById('map_canvas'), {
				center: { lat: 17.35297042396732, lng: 8.808737500000019 },
				zoom: 3,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
			});

			var all_overlays = [];
			var selectedShape;
			var drawingManager = new google.maps.drawing.DrawingManager({
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
					fillColor: '',
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
					this.payload.location.coordinates = [];
					selectedShape.setMap(null);
				}
			};

			const CenterControl = (controlDiv, map) => {
				// Set CSS for the control border.
				var controlUI = document.createElement('div');
				controlUI.style.backgroundColor = '#17CE89';
				controlUI.style.border = 'none';
				controlUI.style.borderRadius = '10px';

				controlUI.style.cursor = 'pointer';
				controlUI.style.marginBottom = '22px';
				controlUI.style.textAlign = 'center';
				controlUI.title = 'Select to delete the shape';
				controlDiv.appendChild(controlUI);

				// Set CSS for the control interior.
				var controlText = document.createElement('div');
				controlText.style.color = '#fff';
				controlText.style.fontWeight = 500;
				controlText.style.fontSize = '1rem';
				controlText.style.lineHeight = '38px';
				controlText.style.padding = '3px 15px';
				controlText.innerHTML = 'Delete Selected Area';
				controlUI.appendChild(controlText);

				// Setup the click event listeners: simply set the map to Chicago.
				controlUI.addEventListener('click', function() {
					deleteSelectedShape();
				});
			};

			drawingManager.setMap(map);

			google.maps.event.addListener(
				drawingManager,
				'polygoncomplete',
				(event) => {
					const vertices = event.getPath();
					for (let i = 0; i < vertices.getLength(); i++) {
						const coordinates = vertices.getAt(i).toUrlValue(6);
						// reassign into array
						// this.payload.location.coordinates.length = 0
						this.payload.location.coordinates.push(coordinates);
					}

					// event.getPath().getLength();
					google.maps.event.addListener(event.getPath(), 'insert_at', () => {
						var len = event.getPath().getLength();
						for (var i = 0; i < len; i++) {
							const coordinates = vertices.getAt(i).toUrlValue(6);
							// push into array
							this.payload.location.coordinates.push(coordinates);
						}
					});

					google.maps.event.addListener(event.getPath(), 'set_at', () => {
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

			google.maps.event.addListener(drawingManager, 'overlaycomplete', function(
				event
			) {
				all_overlays.push(event);
				if (event.type !== google.maps.drawing.OverlayType.MARKER) {
					drawingManager.setDrawingMode(null);
					//Write code to select the newly selected object.

					var newShape = event.overlay;
					newShape.type = event.type;
					google.maps.event.addListener(newShape, 'click', function() {
						setSelection(newShape);
					});

					setSelection(newShape);
				}
			});

			var centerControlDiv = document.createElement('div');
			var centerControl = new CenterControl(centerControlDiv, map);

			centerControlDiv.index = 1;
			map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(
				centerControlDiv
			);
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
input[type='number'] {
	-moz-appearance: textfield;
}
</style>
