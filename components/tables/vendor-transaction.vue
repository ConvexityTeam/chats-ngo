<template>
    <div>
     <div class="d-flex pt-lg-4">
        <div>
          <!-- Search Box here -->
          <input
            type="text"
            class="form-controls"
            placeholder="Search transactions"
          />
        </div>

        <div class="ml-auto">
     <button type="button" class="export-btn p-3">Export as CSV</button>
        </div>
      </div>
    </div>
</template>

<style scoped>
    .form-controls {
  height: 50px;
  width: 150%;
}
</style>