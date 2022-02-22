<template>
	<form @submit.prevent="enableGoogleTwoFa" class="mt-4 px-4">
		<p class="text-center sub-heading secondary-black poppins text-sm">
			Follow the guide below to set up Google authenticator <br />
			for additional layer of security.
		</p>
		<!-- Authentication Area -->
		<div class="row mb-4 mt-4">
			<!-- QR Code  -->
			<div
				class="col-lg-6 d-flex flex-column justify-content-center align-items-center px-3"
			>
				<div
					class="p-3 qrCode d-flex justify-content-center align-items-center"
				>
					<img
						:src="payload.qrcode_url"
						class="img-fluid"
						alt="qrCode"
					/>
				</div>
				<div class="mt-3 qrCode-guide">
					<p class="text-left text-xs primary-blue poppins">
						Use Google Authenticator app to scan this QR code,
						<strong
							><a
								target="_blank"
								href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en&gl=US"
								>Download</a
							></strong
						>
						the app here if you don’t already have it.
					</p>
				</div>
			</div>
			<!-- Authentication Code -->
			<div class="col-lg-6 d-flex flex-column px-3">
				<div
					class="secret-code d-flex flex-row justify-content-between align-items-center"
				>
					<div
						class="code d-flex align-items-center text-sm input-text truncate inconsolata-semibold"
					>
						{{ payload.secret }}
					</div>
					<div
						class="copy-code d-flex justify-content-center align-items-center truncate"
						@click="$copy(payload.secret)"
					>
						<copyIcon />
					</div>
				</div>
				<div>
					<p class="text-left mt-2 text-sm poppins input-text">
						If you have any problem with scanning the QR code, enter
						this code manually into the app
					</p>
				</div>
				<div>
					<span class="primary-blue poppins text-sm"
						><label for="verification_code"
							>Verification code from app:</label
						></span
					>
					<div
						class="d-flex flex-row justify-content-center align-items-center input-wrapper"
					>
						<PincodeInput
							:class="{ error: $v.payload.otp.$error }"
							@blur="$v.payload.otp.$touch()"
							@input="$v.payload.otp.$success"
							v-model="payload.otp"
							placeholder="-"
							:length="6"
							autofocus
							size="1"
						/>
					</div>
				</div>
				<div class="mt-2">
					<Button
						type="submit"
						:has-icon="false"
						text="Enable 2FA"
						custom-styles="height:40px;  width: 100%"
						:loading="loading"
						:disabled="payload.otp.length !== 6"
					/>
				</div>
			</div>
		</div>
	</form>
</template>

<script>
import copyIcon from '../icons/copy';
import { required } from 'vuelidate/lib/validators';
import { mapGetters, mapActions, mapState } from 'vuex';
import PincodeInput from 'vue-pincode-input';

export default {
	components: {
		close,
		copyIcon,
		PincodeInput,
	},
	data() {
		return {
			loading: false,
			validated: false,
			payload: {
				otp: '',
				qrcode_url: {},
				secret: '',
			},
		};
	},
	validations: {
		payload: {
			otp: {},
		},
	},

	mounted() {
		this.initGoogleTwoFa();
		// console.log(this.payload.qrcode_url);
		// console.log(this.payload.secret);
		console.log(this.payload.otp);
	},

	beforeDestroy() {
		this.$emit('google2faValidationStatus', this.validated);
		console.log('validated', this.validated);
	},

	methods: {
		...mapActions('authentication', ['updateUser']),
		async initGoogleTwoFa() {
			try {
				this.loading = true;
				const response = await this.$axios.get('auth/2fa/init');

				let data = response.data;
				// console.log('Data:::', data);

				this.payload.qrcode_url = data.qrcode_url;
				this.payload.secret = data.secret;

				if (response.status == 'success') {
					this.loading = false;
					// this.$toast.success(response.message);
				}

				console.log('INIT 2FA RESPONSE', response);
			} catch (err) {
				console.log('INIT2FAERR::', { err });
				this.$toast.error(err.response.data.message);
				this.loading = false;
			}
		},

		async enableGoogleTwoFa() {
			try {
				console.log('TYPEOF::', typeof this.payload.otp);
				parseInt(this.payload.otp);

				console.log('OPT:::', this.payload.otp);

				this.loading = true;
				this.$v.payload.$touch();

				if (this.$v.payload.$error === true) {
					this.$toast.error('Please fill in appropriately');
					this.loading = false;
					return;
				}

				const response = await this.$axios.post('auth/2fa/enable', {
					otp: this.payload.otp,
				});

				console.log('response:::', response);

				if (response.status == 'success') {
					this.loading = false;
					this.$toast.success(response.message);
					this.validated = true;
					this.closeModal();
				}

				console.log('INIT 2FA RESPONSE', response);
			} catch (err) {
				console.log('INIT2FAERR::', { err });
				this.$toast.error(err.response.data.message);
				this.loading = false;
			}
		},

		closeModal() {
			this.$bvModal.hide('add-twofa-email');
		},
		openModal() {
			this.$bvModal.show(`add-twofa-email`);
		},
	},
};
</script>

<style scoped>
* {
	color: var(--primary-blue);
}
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
	width: 40px;
	height: 40px;
	padding: 5px;
	margin: 0 4px;
	border-radius: 4px;
	text-align: center;
	background-color: #f5f6f8;
}
div.vue-pincode-input-wrapper {
	display: flex;
	justify-content: center;
	align-items: center;
}

div.vue-pincode-input-wrapper {
	padding-left: 20px;
	font-size: 1rem;
	transform: scale(0.7);
}

input {
	resize: horizontal;
	width: 200px;
}
.style-1 .otp-input-8-field {
	border-radius: 4px;
	border: 1px solid #f5cd79;
}
.style-1 .otp-input-8-field:not(:last-child) {
	margin-right: 0.5rem;
	scale: 0.5;
}

.form-controls::placeholder {
	color: #7a7f92;
	font-size: 1rem;
}

.save-btn {
	width: 113px;
}

.sub-heading {
	margin-top: -15px;
}

.qrCode {
	border-radius: 8px;
	height: 160px;
	width: 160px;
	border: 1px solid var(--primary-color);
}

.qrCode img {
	background-image: url('./assets\img\images.png');
	background-repeat: no-repeat;
	background-size: contain;
	width: 100%;
	height: 100%;
}

.qrCode-guide {
	border-radius: 5px;
	border: 1px solid #e0e0e0;
	padding: 0.5rem 0.8rem 0rem 0.8rem;
}

.qrCode-guide p strong a {
	color: var(--primary-color);
	text-decoration: none;
}

.secret-code {
	font-size: 0.5rem;
	border-radius: 8px;
	border: dashed 0.1rem #e0e0e0;
	background-color: #fafafa;
	letter-spacing: 2px;
	height: 35px;
}
.secret-code .code {
	padding: 0rem 0rem 0rem 0.8rem;
	height: 100%;
	width: 85%;
}

.secret-code .copy-code {
	height: 100%;
	width: 15%;
	background-color: #dfe1ea;
	cursor: pointer;
	border-radius: 0px 8px 8px 0px;
}
</style>
