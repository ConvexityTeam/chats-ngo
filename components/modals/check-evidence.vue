<template>
	<div>
		<DisburseFunds :task="task" :campaignId="campaignId" />
		<Rejected :task="rejectDetails" />
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
								:value="task && task.SubmittedEvidences && task.SubmittedEvidences[0] && task.SubmittedEvidences[0].task_name"
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
								:value="task && task.SubmittedEvidences && task.SubmittedEvidences[0] && task.SubmittedEvidences[0].comment"
								placeholder="Task Description"
								readonly
								cols="50"
								rows="5"
							/>
						</div>
					</div>
				</div>

				<!-- Image -->
				<div class="img-evidence-ctn mb-3">
					<label for="name">Photos</label>
					<div class="d-flex mb-3">
						<!-- evidence 1 -->
						<div class="img-evidence">
								<b-img v-if="task && task.SubmittedEvidences && task.SubmittedEvidences[0] && task.SubmittedEvidences[0].uploads[0]" :src="task && task.SubmittedEvidences && task.SubmittedEvidences[0] && task.SubmittedEvidences[0].uploads[0]" fluid></b-img>
								<img v-else src="~/assets/img/vectors/evidence-placeholder.svg" width="80" />
						</div>

						<!-- evidence 2 -->
						<div class="img-evidence ml-3">
							<b-img v-if="task && task.SubmittedEvidences && task.SubmittedEvidences[0] && task.SubmittedEvidences[0].uploads[1]" :src="task && task.SubmittedEvidences && task.SubmittedEvidences[0] && task.SubmittedEvidences[0].uploads[1]" fluid></b-img>
							<img
								v-else
								src="~/assets/img/vectors/evidence-placeholder.svg"
								width="80"
							/>
						</div>
					</div>

					<!-- evidence 3 -->
					<div class="d-flex">
						<div class="img-evidence">
							<b-img v-if="task && task.SubmittedEvidences && task.SubmittedEvidences[0] && task.SubmittedEvidences[0].uploads[2]" :src="task && task.SubmittedEvidences && task.SubmittedEvidences[0] && task.SubmittedEvidences[0].uploads[2]" fluid></b-img>
							<img
								v-else
								src="~/assets/img/vectors/evidence-placeholder.svg"
								width="80"
							/>
						</div>

						<!-- evidence 4 -->
						<div class="img-evidence ml-3">
							<b-img v-if="task && task.SubmittedEvidences && task.SubmittedEvidences[0] && task.SubmittedEvidences[0].uploads[3]" :src="task && task.SubmittedEvidences && task.SubmittedEvidences[0] && task.SubmittedEvidences[0].uploads[3]" fluid></b-img>
							<img
								v-else
								src="~/assets/img/vectors/evidence-placeholder.svg"
								width="80"
							/>
						</div>
					</div>
				</div>

				<div v-if="btnStatus === true" class="d-flex buttons">
					<div class="save-btn">
						<Button
							type="submit"
							:has-icon="false"
							text="Confirm approval"
							custom-styles="height:50px;  width: 160px"
							@click="approveTask(task)"
						/>
					</div>
					<div class="save-btn px-3">
						<Button
							:has-icon="false"
							text="Reject"
							custom-styles="height:50px;  width: 100%;"
							class="border"
							@click="rejectTask"
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
import Rejected from '~/components/modals/rejected.vue'
import DisburseFunds from '~/components/modals/rejected.vue'

export default {
	components: {
		close,
		Rejected,
		DisburseFunds
	},

	props: {
		task: {
			type: Object,
			required: true,
		},
		btnStatus: {
			type: Boolean,
			required: true,
		},
		campaignId: {
			type: Number,
			required: true,
		}
	},

	data: () => ({
		loading: false,
		orgId: '',
		rejectDetails: {}
	}),

	computed: {
		...mapGetters('authentication', ['user']),
	},

	mounted() {
		this.orgId = this.user?.AssociatedOrganisations[0]?.OrganisationId;
	},

	methods: {
		// Approve Task
		approveTask(task) {
			console.log('DISBURSE', task)
			this.$bvModal.hide('check-evidence');
			this.$bvModal.show('disburse-funds');
		},

			// Reject Task
		async rejectTask() {
				try {
					this.loading = true;
					const response = await this.$axios.post(
					`cash-for-work/task/reject-submission/${this.task.id}`
			);
			if (response.status == 'success') {
				this.rejectDetails = this.task?.SubmittedEvidences[0];
				this.$bvModal.hide('check-evidence');
				this.loading = false;
				this.$bvModal.show('rejected')

				setTimeout(() => {
					this.$bvModal.hide('rejected');
				}, 3000);
			}
			} catch (error) {
				console.log('Reject Submission Error:::', error);
				this.loading = false;
			}
		},

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
	overflow: hidden;
}

.buttons {
	margin: 32px 0 16px 0;
}

.form-group {
	margin-bottom: 1.5rem;
}

.form-group > textarea {
	height: 123px;
	width: 432px;
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

textarea {
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