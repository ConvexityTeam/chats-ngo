<template>
	<div class="container">
		<div class="d-flex col-lg-12  w-full h-5">
			<newSubadmin />
			<!-- Transactions Table here -->
			<div class="holder">
				<div class="child-holder">
					<table class="table table-borderless">
						<thead class="primary-blue">
							<tr>
								<th>
									<p class="primary-blue font-bold">Team Members</p>
									<div class="ml-auto">
										<Button
											text="Add Subadmin"
											custom-styles="height:50px"
											v-b-modal.new-subadmin
										/>
									</div>
								</th>
							</tr>
						</thead>
						<tbody class="text-left primary-blue">
							<tr class="d-flex sub-heading font-medium pr-3">
								<td class="col-2 ">First Name</td>
								<td class="col-2">Last Name</td>
								<td class="col-3">Email</td>
								<td class="col-2">Role</td>
								<td class="col-2">Phone</td>
								<td class="col-1 action">Action</td>
							</tr>
							<tr
								class="d-flex table-body pr-2"
								v-for="(member, i) in payload.members"
								:key="i"
							>
								<td class="col-2">
									{{ member.User.first_name }}
								</td>
								<td class="col-2">
									{{ member.User.last_name }}
								</td>
								<td class="col-3">
									{{ member.User.email }}
								</td>
								<td class="col-2">
									<span class="text-xs" :class="{pill: true}">{{ member.role }}</span>
								</td>
								<td class="col-2">
									{{ member.User.phone }}
								</td>
								<td class="col-1 text-right">
									<button type="button" class="more-btn"><dot /></button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import dot from '~/components/icons/dot';
import rightArrow from '~/components/icons/right-arrow';
import leftArrow from '~/components/icons/left-arrow';
import newSubadmin from '~/components/modals/new-subadmin';
import { mapGetters, mapActions } from 'vuex';

export default {
	components: {
		dot,
		rightArrow,
		leftArrow,
		newSubadmin,
	},
	data() {
		return {
			orgId: '',
			payload: {
				members: [],
			},
		};
	},

	computed: {
		...mapGetters('authentication', ['user']),
	},

	mounted() {
		this.orgId = this.user?.AssociatedOrganisations[0]?.OrganisationId;
		this.getMembers();
	},

	methods: {
		async getMembers() {
			try {
				const response = await this.$axios.get(`ngos/${this.orgId}/members`);

				console.log('Members:::', response);

				if (response.status == 'success') {
					this.payload.members = response.data;
				}
				console.log('MOUNTED MEMBERS', this.payload.members);

				console.log('Get Members:::', response);
				this.loading = false;
			} catch (err) {
				this.loading = false;
				console.log('GET MEMBERS::', err);
				this.$toast.error(err.response?.data?.message);
			}
		},

		openScreen() {
			screenLoading = this.$loading({
				lock: true,
				spinner: 'el-icon-loading',
				background: '#0000009b',
			});
		},
	},
};
</script>

<style scoped>
.container {
	margin-left: -30px;
}

.holder {
	background: #ffffff;
	box-shadow: 0px 4px 30px rgba(174, 174, 192, 0.2);
	border-radius: 10px;
	width: 100%;
	height: auto;
	padding: 30px;
}

.child-holder {
	background: #ffffff;
	box-shadow: 0px 4px 30px rgba(201, 201, 211, 0.2);
	border-radius: 10px;
	width: 100%;
	height: auto;
	padding: 10px 0;
}

.table thead tr th {
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: inherit;
}

.sub-heading {
	font-weight: 500;
	background: #f5f5f5;
	color: var(--primary-text-color);
}
.sub-heading > .action {
	display: flex;
	align-items: center;
	justify-content: center;
}

.text-xs {
	font-size: 0.8rem;
}

.pill {
	background-color: #f5f5f5f5;
	border-radius: 50px;
	padding: 0.313rem 0.5rem;
	color: #7A809B;
}

.table-body > .col-2 {
	text-align: left;

}
</style>
