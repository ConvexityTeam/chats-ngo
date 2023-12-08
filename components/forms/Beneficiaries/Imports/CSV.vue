<template>
  <div class="mx-3">
    <section v-if="csvFile" class="mt-4 py-3 mt-1 loading_details">
      <span class="loading_details--icon">
        <IconsFile />
      </span>

      <div class="loading_details--body">
        <h6 class="loading_details--title">
          <span class="title">{{ selectedFile.name }}</span>

          <span class="close-btn" @click="clearCSV">
            <IconsClose :height="8" :width="8" />
          </span>
        </h6>

        <!-- Progress bar here -->
        <b-progress
          :value="selectedFile.loaded"
          :max="selectedFile.total"
          variant="success"
        ></b-progress>

        <p class="loading_details--details">
          <span class="details">
            {{ formatBytes(selectedFile?.loaded) }} of
            {{ formatBytes(selectedFile?.total) }} ({{
              selectedFile.percent.toFixed()
            }}%)
          </span>
          <!-- <span class="counter" v-if="selectedFile.loaded != selectedFile.total"> {{selectedFile.speed}} mb/s </span> -->
        </p>
      </div>
    </section>

    <form @submit.prevent="importViaCSV">
      <el-upload
        class="upload-demo"
        drag
        action="#"
        :class="!csvFile && 'mt-4'"
        :on-change="handleChange"
        :mulitple="false"
        :data="csvFile"
        :on-progress="onProgress"
        :before-upload="beforeAvatarUpload"
      >
        <IconsUpload />

        <div class="mb-2 mt-2 primary-blue">
          Drag & Drop or <span class="primary font-medium"> Choose </span> file
          to upload
        </div>

        <div class="primary-gray text-sm font-medium">CSV or TXT</div>
      </el-upload>
    </form>

    <div class="action-info">
      <a
        ref="noreferrer"
        href="https://chats-public-folder.s3.us-east-2.amazonaws.com/CHATS-Template.xlsx"
        target="_blank"
      >
        <button class="csv-template">
          <IconsCsvDownload />
          <span class="ml-2 d-block"> Download CSV Template </span>
        </button>
      </a>

      <p class="info">
        <IconsInfo class="mr-2" />
        <span>This is the recommended CSV template to be uploaded</span>
      </p>
    </div>

    <!--  -->
    <!-- <div class="space-divider">
      <span class="divider-dash left"></span>
      <span>OR</span>
      <span class="divider-dash  right"></span>
    </div>  -->
    <!--  -->
    <!-- <form @submit.prevent="importViaCSVurl">  
      <div class="form-group">
        <label for="import_url">Import from URL</label>

        <div class="input-wrapper"> 
          <span class="icon"> 
            <IconsLockIcon/>
          </span>
          
          <input
            id="import_url" 
            v-model="importUrl"
            type="text"
            class="form-controls"
            placeholder="add file URL" 
          />

          <span class="text">upload</span>
        </div> 
      </div>
 
      <div class="d-flex justify-content-end pb-2 my-4">
        <div>
          <Button
            text="Cancel"
            :has-icon="false"
            :isGray="true"
            :has-border="true"
            custom-styles="height: 44px; width: 6.75rem; border-radius:4px !important; color: #646A86; border: 1px solid #646A86 !important; font-size: 14px !important;"
            @click="closeModal"
          />
        </div>

        <div class="ml-3">
          <Button
            text="Import"
            type="submit"
            :has-icon="false"
            :disabled="loading"
            :class="!uploadInProgress && 'background: #A4B0CB !important;'"
            custom-styles="height: 44px; width: 6.75rem; border-radius:4px !important;  font-size: 14px;"
          />
        </div> 
      </div>
    </form> -->
  </div>
</template>

<script>
let screenLoading;

export default {
  props: {
    orgId: {
      type: [Number, String],
      default: "",
    },
  },

  data: () => ({
    loading: false,
    uploadInProgress: false,
    importUrl: "",
    csvFile: null,
    selectedFile: {
      name: "",
      speed: 0,
      percent: 0,
      loaded: 0,
      total: 0,
    },
  }),

  methods: {
    clearCSV() {
      this.csvFile = null;
      this.selectedFile = {
        name: "",
        speed: 0,
        percent: 0,
        loaded: 0,
        total: 0,
      };
    },
    beforeAvatarUpload(rawFile) {
      if (
        rawFile.type !==
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        rawFile.type === "application/vnd.ms-excel"
      ) {
        this.$toast.error("Document must be and Excel file!");
        this.clearCSV();
        return false;
      }
      // to check maximum size alowed
      // else if (rawFile.size / 1024 / 1024 > 50) {
      //   this.$toast.error('Avatar picture size can not exceed 50MB!')
      //   return false
      // }
      return true;
    },
    formatBytes(bytes) {
      if (bytes === 0) return "0 Bytes";
      const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
      const sizeIndex = Math.floor(Math.log(bytes) / Math.log(1024));

      return (
        parseFloat((bytes / Math.pow(1024, sizeIndex)).toFixed(1)) +
        " " +
        sizes[sizeIndex]
      );
    },
    onProgress(event) {
      const { loaded, total, percent } = event;
      this.selectedFile.loaded = loaded;
      this.selectedFile.total = total;
      this.selectedFile.percent = percent;

      if (percent === 100) {
        this.importViaCSV();
      }
    },
    async importViaCSV() {
      if (!this.csvFile) return this.$toast.error(`No file selected`);

      try {
        this.openScreen();

        const formData = new FormData();
        formData.append("beneficiaries_xls", this.csvFile?.raw);
        formData.append("organisationId", this.orgId);
        formData.append("campaignId", this.$route.params.id);

        const response = await this.$axios.post(
          `auth/register/beneficiaries-upload-spreadsheet/`,
          formData
        );

        if (response.status === "success") {
          this.$emit("imported", "csv");
          this.$toast.success(response.message);
        }
      } catch (error) {
        console.log("error:::", error);
      } finally {
        screenLoading.close();
      }
    },
    // async importViaCSVurl() {
    //   try {
    //     this.openScreen();
    //     this.loading = true;
    //     const response = await this.$axios.post(`beneficiaries/kobotoolbox`);
    //   } catch (error) {
    //     console.log("error:::", error);
    //   } finally {
    //     screenLoading.close();
    //     this.loading = false;
    //   }
    // },

    handleChange(event) {
      this.csvFile = event;
      this.selectedFile.name = event.name;
    },

    openScreen() {
      screenLoading = this.$loading({
        lock: true,
        spinner: "el-icon-loading",
        background: "#0000009b",
      });
    },
  },
};
</script>

<style scoped>
.primary-gray {
  font-size: 0.875rem;
}

.campaign-holder {
  height: 20rem;
  overflow-y: auto;
}

label {
  color: #222222;
  font-size: 1rem;
  font-weight: 500;
}

.form-group {
  margin-bottom: 1rem !important;
}

.input-wrapper {
  background: #f5f6f8;
  height: 52px;
  border-radius: 6px !important;
  position: relative;
}
.input-wrapper > .icon,
.input-wrapper > .text {
  height: 100%;
  position: absolute;
  top: 0;
  color: #17ce89;
  padding: 0 1.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.input-wrapper > .icon {
  left: 0;
  margin-left: -10px;
}
.input-wrapper > .text {
  right: 0;
}

.form-controls {
  border: none;
  background: #f5f6f8;
  height: 100%;
  padding: 0rem 6rem 0rem 2.5rem;
}
.form-controls::placeholder {
  color: #646a86;
  font-size: 0.875rem;
  letter-spacing: 0.01em;
}

.space-divider {
  margin: 0.675rem auto 1.2rem auto;
  width: 100%;
  display: flex;
  align-items: center;
  color: #7c8db5;
  padding: 4px 0;
}
span.divider-dash {
  height: 1px;
  background: black;
  flex: 1 1 0%;
  background: #7c8db5;
  border-radius: 4px;
}
span.divider-dash.right {
  margin-left: 1.5rem;
}
span.divider-dash.left {
  margin-right: 1.5rem;
}

.action-info {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  flex-direction: column;
  margin-top: 1.125rem;
}
.action-info .info {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  margin-top: 1rem;
  color: #7c8db5;
}
.loading_details {
  display: flex;
  align-items: flex-start;
  background: #f5f6f8;
  margin-bottom: 1.5rem;
  border-radius: 0.625rem;
  padding: 0.375rem 0.825rem;
  height: auto;
}

.loading_details > .loading_details--icon {
  margin-right: 0.5rem;
  padding: 0.475rem 0.5rem;
  border-radius: 10px;
  background: #17ce89;
  display: flex;
}

.loading_details > .loading_details--body {
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
}

.loading_details > .loading_details--body > .loading_details--title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.loading_details--title > .title {
  flex: 1 1 0%;
  color: #25396f;
  font-size: 0.875rem;
}

.loading_details--title > .close-btn {
  padding: 2px 6px;
  margin: -0.625rem -0.375rem auto auto;
  cursor: pointer;
}

.loading_details--details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  color: #7c8db5;
  margin: 4px 0 0 0;
}
.loading_details--details > details {
  flex: 1 1 0%;
  font-weight: 500;
}
.loading_details--details > .counter {
  font-style: italic;
  font-weight: 300;
}
.el-upload-list > .el-upload-list__item-name {
  display: none !important;
}
.el-upload-list > a {
  display: none !important;
}

.csv-template {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  height: 44px;
  border: 1px solid #17ce89;
  color: #17ce89;
  font-weight: 700;
  font-size: 0.875rem;
  padding: 0 32px;
  background: inherit;
}

.csv-template span {
  padding-top: 2px;
}

a {
  text-decoration: none;
}

form {
  margin-bottom: 1.5rem;
}
</style>
