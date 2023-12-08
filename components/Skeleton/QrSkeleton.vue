<template>
  <div class="row">
    <div v-for="i in 6" :key="i" class="col-lg-4">
      <div class="skeleton-holder p-4">
        <div class="row">
          <!-- QR code here -->
          <div class="col-lg-6">
            <Skeleton variant="image" styles="height: 152px" />
          </div>

          <!-- Beneficiary Details here -->
          <div class="col-lg-6">
            <!-- Beneficiary -->
            <div class="mb-2 pb-1">
              <Skeleton variant="text" />
              <Skeleton variant="text" />
            </div>

            <!-- Campaign -->
            <div class="mb-2 pb-1">
              <Skeleton variant="text" />
              <Skeleton variant="text" />
            </div>

            <!-- AMOUNT -->
            <div class="mb-2">
              <Skeleton variant="text" />
              <Skeleton variant="text" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.skeleton-holder {
  background: #ffffff;
  border: 1px solid #e1e7ec;
  border-radius: 8px;
  height: 193px;
  margin-bottom: 2rem;
}

.qr-skeleton {
  border: 1px solid #f5f6f8;
  border-radius: 8px;
  height: 155px;
  justify-content: center;
  align-items: center;
}
</style>
