<template>
	<transition name="fade">
		<b-modal id="rejected" hide-header hide-footer>
			<div class="text-center position-relative pt-2">
				<h3 class="header font-bold primary-blue">Task Rejected</h3>
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

				<p class="d-flex justify-content-center text-center message">
					Task submission for {{ task.beneficiary_first_name === null ? 'null' : '' + ' ' + task.beneficiary_last_name === null ? 'null' : '' }} has been rejected.
				</p>
			</div>
		</b-modal>
	</transition>
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

	props: {
		task: {
			type: Object,
			required: true,
		}
	},

	data() {
		return {
			loading: false,
		};
	},
	methods: {
		closeModal() {
			console.log('close modal', this.task);
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

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
