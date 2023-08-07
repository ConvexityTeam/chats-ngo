<template>
  <div class="proposal-details-holder p-4">
    <h4 class="proposal-details-header poppins pt-2">Request Summary</h4>

    <div>
      <div class="proposal-details-inner mt-4 p-4">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <h4 class="proposal-details-header pt-2">
            {{ details?.title }}
          </h4>
        </div>

        <section class="d-flex py-2 border-b">
          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3.33333 1.33203C2.32081 1.33203 1.5 2.15284 1.5 3.16536L1.5 13.832C1.5 14.8446 2.32081 15.6654 3.33333 15.6654L12.6667 15.6654C13.6792 15.6654 14.5 14.8446 14.5 13.832L14.5 5.9701C14.5 5.74909 14.4122 5.53713 14.2559 5.38085L10.4512 1.57611C10.2949 1.41983 10.0829 1.33203 9.86193 1.33203L3.33333 1.33203ZM5.33333 7.9987C5.05719 7.9987 4.83333 8.22256 4.83333 8.4987C4.83333 8.77484 5.05719 8.9987 5.33333 8.9987L10.6667 8.9987C10.9428 8.9987 11.1667 8.77484 11.1667 8.4987C11.1667 8.22256 10.9428 7.9987 10.6667 7.9987L5.33333 7.9987ZM4.83333 11.1654C4.83333 10.8892 5.05719 10.6654 5.33333 10.6654L10.6667 10.6654C10.9428 10.6654 11.1667 10.8892 11.1667 11.1654C11.1667 11.4415 10.9428 11.6654 10.6667 11.6654L5.33333 11.6654C5.05719 11.6654 4.83333 11.4415 4.83333 11.1654ZM10.5 3.03914V5.33204H12.7929L10.5 3.03914Z"
              fill="#7C8DB5"
            />
          </svg>

          <h6 class="ml-2 font-medium primary-gray">
            Proposals received:
            <span class="primary-blue">{{ totalRequests }}</span>
          </h6>
        </section>

        <!-- Details -->
        <div>
          <div class="proposal-divider details_row_desscription mb-2">
            <span class="proposal-captions mb-1 d-block">Description</span>
            <p class="proposal-answers mb-2">{{ details?.description }}</p>
          </div>

          <div class="d-flex proposal-divider mb-3">
            <p class="proposal-captions">Budget:</p>
            <div class="ml-auto">
              <p class="proposal-answers">{{ details?.budget }}</p>
            </div>
          </div>

          <div class="d-flex proposal-divider mb-3">
            <p class="proposal-captions">Location:</p>
            <div class="ml-auto">
              <p class="proposal-answers">">{{ details?.location?.country }}</p>
            </div>
          </div>

          <div class="d-flex proposal-divider mb-3">
            <p class="proposal-captions">Start date:</p>
            <div class="ml-auto">
              <p class="proposal-answers">
                {{ details?.start_date | formatDate }}
              </p>
            </div>
          </div>

          <div class="d-flex proposal-divider mb-3">
            <p class="proposal-captions">End date:</p>
            <div class="ml-auto">
              <p class="proposal-answers">
                {{ details?.end_date | formatDate }}
              </p>
            </div>
          </div>

          <div class="d-flex proposal-divider mb-3">
            <p class="proposal-captions">Created</p>
            <div class="ml-auto">
              <p class="proposal-answers">
                {{ details?.createdAt | formatDate }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    details: {
      type: Object,
      default: () => {},
    },

    totalRequests: {
      type: String | Number,
      default: "",
    },
  },
};
</script>

<style>
.proposal-details-holder {
  background: #ffffff;
  box-shadow: 0px 4px 25px rgba(174, 174, 192, 0.15);
  border-radius: 10px;
}

.proposal-details-header {
  color: #25396f;
  font-weight: bold;
  font-size: 1.125rem;
}

.proposal-details-inner {
  border: 1px solid #17ce89;
  border-radius: 10px;
  position: relative;
}

.proposal-captions {
  color: #25396f;
  font-family: "Poppins", sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
}

.proposal-answers {
  color: #25396f;
  font-size: 0.875rem;
  text-align: right;
}
.details_row_desscription .proposal-answers {
  text-align: left;
}

.proposal-divider {
  border-bottom: 1px solid #f5f6f8;
}
.el-dropdown-menu {
  padding: 1rem 0rem;
  border-radius: 0.5rem;
  width: 18rem;
}
.el-dropdown-menu > .el-dropdown-item > span {
  font-family: "DM Sans";
  width: 100%;
  display: block;
  font-size: 1rem;
  padding: 0.2rem;
  border-bottom: 0.2px solid #f5f6f8;
  color: #25396f;
  text-align: left;
  cursor: pointer;
}
</style>
