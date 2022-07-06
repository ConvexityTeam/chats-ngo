<template>
    <div>
        <b-modal id="disburse-funds" hide-header hide-footer>
            <div class="text-center position-relative pt-2">
                <h3 class="header font-bold primary-blue">Task approved</h3>
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
                    <approved />
                </div>
                <p class="text-center message">
                    Task submission for
                    <span class=" font-medium"
                        >{{
                            task.beneficiary_first_name +
                                " " +
                                task.beneficiary_last_name
                        }}
                    </span>
                    has been successfully approved.
                </p>
                <div class="btn mx-auto">
                    <Button
                        :has-icon="false"
                        text="Disburse"
                        custom-styles="height:50px;  width: 100%;"
                        :loading="loading"
                        :disabled="loading"
                        @click="disburseFunds"
                    />
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import close from "~/components/icons/close";
import approved from "~/components/icons/approvedIcon";
import rejected from "~/components/icons/rejectedIcon";

export default {
    name: "DisburseFund",
    components: {
        close,
        approved,
        rejected,
    },

    data() {
        return {
            loading: false,
            orgId: null,
        };
    },

    props: {
        task: {
            type: Object,
            required: true,
        },
        campaignId: {
            type: Number,
            required: true,
        },
    },

    computed: {
        ...mapGetters("authentication", ["user"]),
    },

    mounted() {
        this.orgId = this.user?.AssociatedOrganisations[0]?.OrganisationId;
    },

    methods: {
        // Funds Disbursed
        async disburseFunds() {
            console.log("DISBURSE TASK RECEived and CampaignId", this.task);
            console.log({
                beneficiaryId: this.task.beneficiaryId,
                taskAssignmentId: this.task.TaskAssignmentId,
            });
            try {
                const response = await this.$axios.post(
                    `organisations/${this.orgId}/task/${this.campaignId}/fund_beneficiary`,
                    {
                        beneficiaryId: this.task.beneficiaryId,
                        taskAssignmentId: this.task.TaskAssignmentId,
                    }
                );

                if (response.status == "success") {
                    setTimeout(() => {
                        this.$bvModal.hide("disburse-funds");
                    }, 3000);
                }
                this.loading = false;
            } catch (error) {
                console.log("Disburse Funds Error:::", error);
                this.$bvModal.hide("disburse-funds");
            }
        },

        closeModal() {
            this.$bvModal.hide("disburse-funds");
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
