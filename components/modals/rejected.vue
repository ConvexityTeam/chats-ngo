<template>
	<div>
		<b-modal id="rejected" hide-header hide-footer>
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
					<rejected />
				</div>

				<p class="d-flex text-center message">
					Task submission for [beneficiary] has been rejected.
				</p>
			</div>
		</b-modal>
	</div>
</template>

<script>
import close from '~/components/icons/close';
import rejected from '~/components/icons/rejectedIcon';

export default {
	name: 'Rejected',
	components: {
		close,
		rejected,
	},

	data() {
		return {
			loading: false,
		};
	},

	props: {
	},
	methods: {
		closeModal() {
			this.$bvModal.hide('rejected');
		}
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
