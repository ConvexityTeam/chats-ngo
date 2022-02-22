<template>
	<div>
		<div class="row">
			<!-- Form Here -->
			<div class="col-lg-7">
				<div class="form-holder p-4">
					<div>
						<!-- Toggler here -->
						<div class="d-flex mb-3 w-full ctn-mgt-btn">
							<div class="mgt-btn-container">
								<transition name="slide">
									<button
										@click="step = 1"
										type="button"
										class="mgt-btn one"
										:class="{ active: step == 1 }"
									>
										Organisation Profile
									</button>
								</transition>
							</div>

							<div class="mgt-btn-container">
								<button
									@click="step = 2"
									type="button"
									class="mgt-btn two"
									:class="{ active: step == 2 }"
								>
									User Profile
								</button>
							</div>
						</div>

						<!-- Organization profile here  -->
						<form
							v-if="step == 1"
							@submit.prevent="updateOrganisationProfile"
						>
							<!-- Country - State section here  -->
							<div class="row sizing-top">
								<div class="col-lg-6">
									<label for="country">Country</label>

									<div>
										<el-select
											id="dropdown"
											v-model="
												payload.organisation_profile
													.country
											"
											@blur="
												$v.payload.organisation_profile.country.$touch()
											"
											filterable
											placeholder="Nigeria"
											class="country"
											:class="{
												error:
													$v.payload
														.organisation_profile
														.country.$error,
											}"
										>
											<el-option
												v-for="(country,
												i) in countries"
												:key="i"
												:label="country.countryName"
												:value="country.countryName"
											>
											</el-option>
										</el-select>
									</div>
								</div>

								<!-- State Here  -->
								<div class="col-lg-6 mb-3">
									<label for="state">State</label>
									<input
										type="text"
										class="form-controls px-3"
										:class="{
											error:
												$v.payload.organisation_profile
													.state.$error,
										}"
										id="state"
										placeholder="John"
										v-model="
											payload.organisation_profile.state
										"
										@blur="
											$v.payload.organisation_profile.state.$touch()
										"
									/>
								</div>
							</div>

							<!-- Address -  year section here  -->
							<div class="row">
								<!-- Address  here  -->
								<div class="col-lg-6 mb-3">
									<label for="address">Address</label>
									<input
										type="text"
										id="address"
										placeholder="Address"
										class="form-controls px-3"
										:class="{
											error:
												$v.payload.organisation_profile
													.address.$error,
										}"
										v-model="
											payload.organisation_profile.address
										"
										@blur="
											$v.payload.organisation_profile.address.$touch()
										"
									/>
								</div>

								<!-- Year Founded here  -->
								<div class="col-lg-6 mb-3">
									<label id="year_founded" for="year"
										>Year Founded</label
									>
									<input
										type="number"
										@wheel="$event.target.blur()"
										id="year_founded"
										class="form-controls px-3"
										:class="{
											error:
												$v.payload.organisation_profile
													.year_of_inception.$error,
										}"
										placeholder="YYYY"
										v-model="
											payload.organisation_profile
												.year_of_inception
										"
										@blur="
											$v.payload.organisation_profile.year_of_inception.$touch()
										"
									/>
								</div>
							</div>

							<!-- Website - OrgID section here  -->
							<div class="row">
								<!-- Website here  -->
								<div class="col-lg-6 mb-3">
									<label for="address">Website</label>
									<input
										type="url"
										id="website"
										placeholder="Website"
										class="form-controls px-3"
										:class="{
											error:
												$v.payload.organisation_profile
													.website_url.$error,
										}"
										v-model="
											payload.organisation_profile
												.website_url
										"
										@blur="
											$v.payload.organisation_profile.website_url.$touch()
										"
									/>
								</div>
								<!-- Store name here -->
								<div class="col-lg-12 mb-2 mt-1">
									<div class="save-btn">
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
							</div>
						</form>

						<!-- User Profile here  -->
						<form
							v-if="step == 2"
							@submit.prevent="updateUserProfile"
						>
							<!-- Name section here  -->
							<div class="row sizing-top">
								<!-- First Name  -->
								<div class="col-lg-6 mb-3">
									<label for="first_name">First Name</label>
									<input
										type="text"
										id="first_name"
										placeholder="Juliana"
										class="form-controls px-3"
										:class="{
											error:
												$v.payload.user_profile
													.first_name.$error,
										}"
										v-model="
											payload.user_profile.first_name
										"
										@blur="
											$v.payload.user_profile.first_name.$touch()
										"
									/>
								</div>

								<div class="col-lg-6 mb-3">
									<label for="last_name">Last Name</label>
									<input
										type="text"
										id="last_name"
										placeholder="Orji"
										class="form-controls px-3"
										:class="{
											error:
												$v.payload.user_profile
													.last_name.$error,
										}"
										v-model="payload.user_profile.last_name"
										@blur="
											$v.payload.user_profile.last_name.$touch()
										"
									/>
								</div>
							</div>

							<!-- Email - Phone Number section here  -->
							<div class="row">
								<!-- Phone number Here  -->
								<div class="col-lg-6 mb-3">
									<label for="phone">Phone Number</label>
									<vue-tel-input
										id="phone"
										mode="international"
										class="form-controls phone"
										:inputOptions="options"
										v-model="payload.user_profile.phone"
									></vue-tel-input>
								</div>

								<!-- Country Code Here  -->
								<div class="col-lg-6 mb-3">
									<label for="country">Country Code</label>

									<div>
										<el-select
											id="dropdown"
											v-model="
												payload.user_profile.country
											"
											filterable
											placeholder="Country Code"
											input-class="form-controls"
										>
											<el-option
												v-for="(countryCode,
												i) in countries"
												:key="i"
												:label="countryCode.countryCode"
												:value="countryCode.countryCode"
											>
											</el-option>
										</el-select>
									</div>
								</div>

								<!-- Currency Code  -->
								<div class="col-lg-6 mb-3">
									<label for="country">Currency Code</label>
									<el-select
										autocomplete="new-password"
										id="dropdown"
										v-model="payload.user_profile.currency"
										filterable
										placeholder="Currency Code"
									>
										<el-option
											v-for="(currencyCode,
											i) in countries"
											:key="i"
											:label="currencyCode.currencyCode"
											:value="currencyCode.currencyCode"
										>
										</el-option>
									</el-select>
								</div>

								<!-- Location Here  -->
								<div class="col-lg-6 mb-3">
									<label for="state">Location</label>
									<input
										type="text"
										class="form-controls px-3"
										id="location"
										placeholder="John"
										v-model="payload.user_profile.location"
									/>
								</div>

								<!-- Address Here  -->
								<div class="col-lg-6 mb-3">
									<label for="state">Address</label>
									<input
										type="text"
										class="form-controls px-3"
										id="address"
										placeholder="Address"
										v-model="payload.user_profile.address"
									/>
								</div>

								<!-- Gender Here  -->
								<div class="col-lg-6 mb-3">
									<label for="state">Gender</label>
									<div>
										<el-select
											id="dropdown"
											v-model="
												payload.user_profile.gender
											"
											filterable
											placeholder="Gender"
											class=""
										>
											<el-option
												v-for="(status, i) in gender"
												:key="i"
												:label="status.name"
												:value="status.name"
											>
											</el-option>
										</el-select>
									</div>
								</div>

								<!-- Marital Status Here  -->
								<div class="col-lg-6 mb-3">
									<label for="state">Marital Status</label>
									<div>
										<el-select
											id="dropdown"
											v-model="
												payload.user_profile
													.marital_status
											"
											filterable
											placeholder="Marital Status"
											class=""
										>
											<el-option
												v-for="(type,
												i) in marital_status"
												:key="i"
												:label="type.name"
												:value="type.name"
											>
											</el-option>
										</el-select>
									</div>
								</div>

								<!-- Date of Birth Here  -->

								<div class="col-lg-6 mb-3">
									<label for="state">Date of Birth</label>
									<date-picker
										v-model="payload.user_profile.dob"
										input-class=""
										format="DD-MM-YYYY"
										placeholder="DD-MM-YYYY"
										id="year_of_inception"
										:disabled-date="
											(present) => present >= new Date()
										"
									></date-picker>
								</div>

								<!-- Save Button -->
								<div class="col-lg-12 mb-2 mt-1">
									<div class="save-btn">
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
							</div>
						</form>
					</div>
				</div>
			</div>

			<!-- Logo Here -->
			<div class="col-lg-3">
				<b-card class="profile-card pb-2">
					<div
						class="d-flex profile-card-image-holder justify-content-center mx-auto"
					>
						<div
							class="d-flex align-items-center just profile-card-image-holder m-auto overflow-hidden"
						>
							<!--Organisation Photo here -->
							<b-avatar
								:src="file"
								size="150px"
								class="img-fluid p-1"
								variant="light"
							></b-avatar>

							<label>
								<button
									type="button"
									class="profile-card-btn"
									@click="$refs.fileInput.click()"
								>
									<Camera />
								</button>

								<input
									type="file"
									accept="image/png, .pdf"
									@change="handlePhotoUpdate"
									ref="fileInput"
									style="display: none"
								/>
							</label>
						</div>
					</div>

					<!-- organisation title here -->
					<b-card-title
						class="mt-4 d-flex justify-content-center text-center"
					>
						<h6 class="font-bold primary-blue">
							{{ organisationName }}
						</h6>
					</b-card-title>

					<!-- reg.ID here -->
					<b-card-text
						class="profile-card-id text-input d-flex justify-content-center"
						>{{ registrationId }}</b-card-text
					>

					<!-- websiteUrl here -->
					<b-card-text
						class="profile-card-website-url secondary-black text-sm d-flex justify-content-center"
					>
						<a
							:href="websiteUrl"
							target="_blank"
							rel="noreferrer"
							class="secondary-black"
						>
							{{ websiteUrl }}</a
						>
					</b-card-text>
				</b-card>
			</div>
		</div>
	</div>
</template>

<script>
import { required, email, maxLength, numeric } from 'vuelidate/lib/validators';
import Camera from '~/components/icons/camera';
import DatePicker from 'vue2-datepicker';
import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'ProfileSettings',
	components: {
		Camera,
		DatePicker,
		email,
	},

	data: () => ({
		options: { placeholder: 'Phone number' },
		marital_status: [
			{ name: 'single' },
			{ name: 'married' },
			{ name: 'divorced' },
		],
		gender: [{ name: 'male' }, { name: 'female' }],

		present: new Date(),
		organisation_id: 0,
		loading: false,
		countries: [],
		step: 1,
		file: '',
		payload: {
			organisation_profile: {
				country: '',
				state: '',
				address: '',
				year_of_inception: '',
				website_url: '',
			},
			user_profile: {
				first_name: '',
				last_name: '',
				country: '',
				currency: '',
				phone: '',
				location: '',
				address: '',
				gender: '',
				marital_status: '',
				dob: '',
			},
			logo: {},
		},
	}),

	validations: {
		payload: {
			organisation_profile: {
				country: { required },
				state: { required },
				address: { required },
				year_of_inception: {
					required,
					maxLength: maxLength(4),
					numeric,
				},
				website_url: { required },
			},
			user_profile: {
				first_name: { required },
				last_name: { required },
			},
		},
	},

	async fetch() {
		const response = await this.$axios.get('/utils/countries');
		this.countries = response.data;
	},

	computed: {
		...mapGetters('authentication', ['user']),

		websiteUrl() {
			return this.payload?.organisation_profile?.website_url ?? '';
		},

		organisationName() {
			return (
				this.user?.AssociatedOrganisations[0]?.Organisation?.name ?? ''
			);
		},

		registrationId() {
			return (
				this.user?.AssociatedOrganisations[0]?.Organisation
					?.registration_id ?? ''
			);
		},
	},

	mounted() {
		this.loadData();
		console.log('USER::', this.user);
	},

	methods: {
		...mapActions('authentication', ['commitUserUpdate']),
		async updateOrganisationProfile() {
			try {
				this.loading = true;
				this.$v.payload.organisation_profile.$touch();

				if (this.$v.payload.organisation_profile.$error === true) {
					if (
						this.$v.payload.organisation_profile.country.$error ===
						true
					) {
						this.$toast.error('Please fill in country');
						return (this.loading = false);
					}
					return (this.loading = false);
				}

				const response = await this.$axios.put(
					`/organisations/${this.organisation_id}/profile`,
					this.payload.organisation_profile
				);

				if (response.status == 'success') {
					this.loading = false;
					this.$toast.success(response.message);
					this.commitUserUpdate(response.data);
				}
			} catch (err) {
				console.log('UPDATEORGPROFILEERR::', { err });
				this.$toast.error(err?.response?.data?.message);
				this.loading = false;
			}
		},
		async updateUserProfile() {
			try {
				this.loading = true;
				this.$v.payload.user_profile.$touch();

				if (this.$v.payload.user_profile.$error === true) {
					return (this.loading = false);
				}

				console.log('PL::', this.payload.user_profile);

				const response = await this.$axios.put(
					'/users/profile',
					this.payload.user_profile
				);
				console.log('USER RESPONSE:::', response);

				if (response.status == 'success') {
					this.loading = false;
					this.$toast.success(response.message);
				}

				console.log('UPDATE PROFILE RESPONSE', response);
			} catch (err) {
				console.log('UPDATEUSERPROFILEERR::', { err });
				this.$toast.error(err?.response?.data?.message);
				this.loading = false;
			}
		},

		loadData() {
			const organisation = this.user?.AssociatedOrganisations[0]
				?.Organisation;

			this.payload.logo = organisation.logo_link;
			this.file = organisation.logo_link;
			this.organisation_id = organisation.id;

			this.objectAliaser(this.payload.organisation_profile, organisation);
			this.objectAliaser(this.payload.user_profile, this.user);
		},
		objectAliaser(oldObj, newObj) {
			return Object.keys(oldObj).forEach((item) => {
				oldObj[item] = newObj?.[item];
				if (item == 'dob') {
					oldObj[item] = new Date(newObj?.[item]);
				}
			});
		},

		handlePhotoUpdate(value) {
			const image = value.target.files[0];
			this.file = URL.createObjectURL(image);
			this.payload.logo = image;
			this.updatephoto();
		},
		async updatephoto() {
			try {
				this.loading = true;
				const formData = new FormData();

				formData.append('logo', this.payload.logo);

				const response = await this.$axios.post(
					`organisations/${this.organisation_id}/logo`,
					formData
				);

				if (response.status == 'success') {
					this.loading = false;
					this.$toast.success(response.message);
					this.commitUserUpdate(response.data);
				}
			} catch (err) {
				console.log('UPDATEPROFILEERR::', { err });
				this.$toast.error(err?.response?.data?.message);
				this.loading = false;
			}
		},
	},
};
</script>

<style scoped>
a {
	text-decoration: none;
}
.ctn-mgt-btn {
	border-radius: 10px;
	background: #f5f6f8;
}
.mgt-btn-container {
	width: 50%;
	display: flex;
	align-content: center;
	justify-content: center;
}
.mgt-btn {
	color: #7c8db5;
	border: none;
	font-size: 1rem;
	font-weight: 500;
	color: #333333;
	background: inherit;
	border-radius: 10px;
}
.mgt-btn.active {
	color: #fff;
	font-weight: 500;
	background: #9dadca;
	border: none;
	border-radius: 10px;
	width: 100%;
}

.slide-enter {
	transform: translateY(50%);
}

.slide-leave {
	transform: translateY(-50%);
}

.mgt-btn.one {
	padding: 0.6rem 3.5rem;
}

.mgt-btn.two {
	padding: 0.6rem 5.2rem;
}

.logo-text {
	font-size: 1rem;
	font-weight: 500;
	color: #333333;
	margin-top: 1rem;
}

.profile-card-btn {
	position: absolute;
	top: 110px;
	right: 50px;
	border: 0.156rem solid #ffffff;
	background-color: #7c8db5;
	border-radius: 50px;
	width: 40px;
	height: 40px;
}

.profile-card {
	background: #ffffff;
	box-shadow: 0px 4px 30px rgba(174, 174, 192, 0.2);
	border-radius: 10px;
	border: none;
	color: var(--primary-text-color);
	padding: 1.5rem;
}
.profile-card-org-name {
	color: var(--primary-text-color);
	font-weight: bold;
	font-size: 1.125rem;
}
.profile-card-image-holder {
	border-radius: 50%;
	width: 130px;
	height: 130px;
	background: #e7e7e762;
	border: none;
	margin-top: -20px;
}
.profile-card-id {
	color: var(--input-text-color);
	font-size: 1rem;
	font-weight: 400;
	margin-top: -15px;
}

.profile-controls.reg_id {
	background-color: #c7c7c7;
}
.profile-card-website-url {
	color: var(--secondary-text-color);
	font-size: 1rem;
	font-weight: 500;
	margin-top: -15px;
}

.form-controls.currency,
.phone {
	border: none;
	background-color: none;
	border-radius: 10px;
	padding: 0rem 0.7rem;
}

.sizing-top {
	margin-top: 1.7rem;
}

.save-btn:focus {
	outline: none;
}

.form-holder {
	background: #ffffff;
	box-shadow: 0px 4px 30px rgba(174, 174, 192, 0.2);
	border-radius: 10px;
}

label {
	color: var(--primary-blue);
	font-size: 1rem;
	font-weight: 500;
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

.form-controls-dp {
	background: #f5f6f8;
	border-radius: 8px;
	height: 50px;
	padding: 0rem 0.75rem;
}

.form-controls::placeholder {
	color: #646a86;
	font-size: 1rem;
}

.save-btn {
	width: 113px;
}
</style>
