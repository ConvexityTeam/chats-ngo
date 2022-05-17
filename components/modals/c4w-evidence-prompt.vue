<template>
	<div>
		<b-modal id="evidence-confirmation-prompt" hide-header hide-footer>
			<div class="text-center position-relative pt-2">
				<h3 class="header font-bold primary-blue">Task approval</h3>
				<!--Close button here -->
				<button
					type="button"
					class="close-btn position-absolute pb-3"
					@click="closeModal"
				>
					<close />
				</button>
			</div>

			<div class="d-flex justify-content-center flex-column">
				<div class="d-flex justify-content-center icon">
					<approved v-if="approved" />
					<rejected v-if="rejected" />
				</div>
				<p v-if="approvalMessage" class="d-flex text-center message">
					Task submission for [beneficiary] has been successfully
					approved.
				</p>
				<p v-if="rejectedMessage" class="d-flex text-center message">
					Task submission for [beneficiary] has been rejected.
				</p>
				<div class="btn mx-auto">
					<Button
						:has-icon="false"
						:text="handleText()"
						custom-styles="height:50px;  width: 100%;"
						:loading="loading"
						:disabled="loading"
					/>
				</div>
			</div>
		</b-modal>
	</div>
</template>

<script>
import close from '~/components/icons/close';
import approved from '~/components/icons/approvedIcon';
import rejected from '~/components/icons/rejectedIcon';

export default {
	name: 'c4wPrompt',
	components: {
		close,
		approved,
		rejected,
	},

	data() {
		return {
			loading: false,
		};
	},

	props: {
		approved: {
			type: Boolean,
			default: false,
		},
		rejected: {
			type: Boolean,
			default: false,
		},
		approvalMessage: {
			type: Boolean,
			default: false,
		},
		rejectedMessage: {
			type: Boolean,
			default: false,
		},
	},
	methods: {
		closeModal() {
			this.$bvModal.hide('evidence-confirmation-prompt');
		},

		handleText(action) {
			if (approved) {
				return 'Disburse funds';
			} else {
				return 'Go to task';
			}
		},
	},
};
</script>

<style scoped>
.message {
	color: var(--secondary-black);
	padding: 0 50px;
}
.btn {
	margin-top: 6px;
	display: flex;
	justify-content: center;
	align-content: center;
}
.icon {
	margin: 22px 0 20px 0;
}
</style>
