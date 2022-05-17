<template>
	<div class="mt-4 px-4">
		<!-- campaign details   here -->
		<div class="mt-4">
			<span class="tertiary-black font-medium"
				>Cash for work details</span
			>

			<div class="detail-holder mt-2 mb-4 p-3">
				<div class="row mb-2">
					<!-- campaign name -->
					<div class="col-6">
						<span class="header"> CASH FOR WORK NAME </span>

						<h6 class="tertiary-black font-medium">
							{{ c4w.title || '' | capitalize }}
						</h6>
					</div>

					<!-- campaign Budget -->
					<div class="col-6">
						<span class="header"> BUDGET </span>

						<h6 class="tertiary-black font-medium">
							NGN{{ c4w.budget || 0 | formatCurrency }}
						</h6>
					</div>
				</div>
			</div>
		</div>

		<div class="d-flex py-2">
			<div>
				<Button
					type="button"
					:has-icon="false"
					text="Fund and Activate"
					custom-styles="height:41px; border-radius: 5px; width: 100%"
					@click="sendAmount"
				/>
			</div>

			<div class="ml-3">
				<Button
					type="button"
					:has-icon="false"
					text="Cancel"
					:hasBorder="true"
					custom-styles="height:41px; border-radius: 5px; width: 100%; border:1px solid #17ce89 !important"
					@click="closeModal"
				/>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		c4w: {
			type: Object,
			required: true,
			default: () => {},
		},
	},

	computed: {
		share() {
			const result =
				this.c4w?.budget / this.c4w?.beneficiaries_count || 0;

			if (result == Infinity) {
				return 0;
			}
			return result;
		},
	},

	methods: {
		closeModal() {
			this.$bvModal.hide('fund-cash-for-work');
		},

		sendAmount() {
			console.log('C4W', this.c4w);
			this.$emit('fundCashForWork');
			this.closeModal();
		},
	},
};
</script>

<style scoped>
.detail-holder {
	border: 1px dashed #7c8db5;
	border-radius: 5px;
	background: #fafafa;
}

.header {
	font-size: 0.75rem;
	color: #7c8db5;
}

h6 {
	word-wrap: break-word;
	max-width: 11rem;
	width: 11rem;
}
</style>