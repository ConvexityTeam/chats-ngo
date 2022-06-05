<template>
	<div>
		<b-modal id="check-evidence" hide-header hide-footer>
			<div class="text-center position-relative pt-2">
				<h3 class="header font-bold primary-blue">Task submission</h3>
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
				<!-- Name field  here -->
				<div class="row">
					<!-- Task Name -->
					<div class="col-lg-12 mb-1">
						<div class="form-group">
							<label for="name">Task Name</label>
							<input
								type="text"
								class="form-controls"
								name="taskName"
								id="task-name"
								placeholder="Task Name"
								readonly
							/>
						</div>
					</div>
					<!-- Task Description -->
					<div class="col-lg-12 mb-3">
						<div class="form-group">
							<label for="name">Activity Description</label>
							<textarea
								type="text"
								name="task-description"
								id="taskDescription"
								value="task-description"
								placeholder="Task Description"
								readonly
								cols="50"
								rows="5"
							/>
						</div>
					</div>
				</div>

				<!-- Image -->
				<div class="img-evidence-ctn">
					<label for="name">Photos</label>
					<div class="d-flex mb-3">
						<!-- evidence 1 -->
						<div class="img-evidence">
							<b-img v-if="file1" :src="file1" fluid></b-img>
							<img
								v-else
								src="~/assets/img/vectors/evidence-placeholder.svg"
								width="80"
							/>
						</div>

						<!-- evidence 2 -->
						<div class="img-evidence ml-3">
							<b-img v-if="file2" :src="file2" fluid></b-img>
							<img
								v-else
								src="~/assets/img/vectors/evidence-placeholder.svg"
								width="80"
							/>
						</div>
					</div>

					<div class="d-flex">
						<div class="img-evidence">
							<b-img v-if="file3" :src="file3" fluid></b-img>
							<img
								v-else
								src="~/assets/img/vectors/evidence-placeholder.svg"
								width="80"
							/>
						</div>

						<div class="img-evidence ml-3">
							<b-img v-if="file4" :src="file4" fluid></b-img>
							<img
								v-else
								src="~/assets/img/vectors/evidence-placeholder.svg"
								width="80"
							/>
						</div>
					</div>
				</div>

				<div class="d-flex buttons">
					<div class="save-btn">
						<Button
							type="submit"
							:has-icon="false"
							text="Confirm approval"
							custom-styles="height:50px;  width: 100%"
							:loading="loading"
							:disabled="loading"
						/>
					</div>
					<div class="save-btn px-3">
						<Button
							type="submit"
							:has-icon="false"
							text="Reject"
							custom-styles="height:50px;  width: 100%;"
							class="border"
							:loading="loading"
							:disabled="loading"
						/>
					</div>
				</div>
			</div>
		</b-modal>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';
import close from '~/components/icons/close';

export default {
	components: {
		close,
	},

	data: () => ({
		loading: false,
		orgId: '',
		file1: null,
		file2: null,
		file3: null,
		file4: null,
		taskName: '',
		taskDescription: '',
	}),

	computed: {
		...mapGetters('authentication', ['user']),
	},

	mounted() {
		this.orgId = this.user?.AssociatedOrganisations[0]?.OrganisationId;
	},

	methods: {
		openScreen() {
			screenLoading = this.$loading({
				lock: true,
				spinner: 'el-icon-loading',
				background: '#0000009b',
			});
		},

		closeModal() {
			this.$bvModal.hide('check-evidence');
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

.img-evidence-ctn {
	width: 434px !important;
}

.img-evidence {
	display: flex;
	justify-content: center;
	width: 209px !important;
	height: 150px;
	border-radius: 10px;
	background-color: #fcfcfe;
	border: #7c8db5 solid 1px;
}

.buttons {
	margin: 32px 0 16px 0;
}

.form-group {
	margin-bottom: 1.5rem;
}

.form-group > textarea {
	height: 123px;
	background: #f5f6f8;
	border-radius: 5px;
	border: var(--primary-gray) solid 1px;
	outline: none;
}

.form-group > textarea:focus {
	border: var(--primary-gray) solid 1px !important;
}

.form-group > textarea::placeholder {
	color: #646a86;
	font-size: 1rem;
	padding: 1rem 1.25rem;
}

.form-controls {
	background: #f5f6f8;
	border-radius: 5px;
	border: var(--primary-gray) solid 1px;
	height: 41px;
	padding: 0rem 1.25rem;
}

.form-controls::placeholder {
	color: #646a86;
	font-size: 1rem;
}

.form-controls:focus {
	border: var(--primary-gray) solid 1px !important;
}
.close-btn {
	border: none;
	background: inherit;
	bottom: -3px;
	right: 10px;
}
</style>

<style>
.close-btn {
	border: none;
	background: inherit;
	bottom: -3px;
	right: 10px;
}
</style>
