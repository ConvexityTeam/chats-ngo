<template>
  <div>
    <!-- Error Display -->
    <div v-if="cameraError">
      <div class="col-12 mt-4 p-2 text-sm alert-danger d-none">
        Failed to start camera, please allow permision to access camera. <br />
        If you are browsing through social media built in browsers, you would
        need to open the page in Sarafi (iPhone)/ Chrome (Android)
      </div>
      <div class="mt-4">
        <Button
          :has-icon="false"
          text="OK"
          custom-styles="height:42px; width: 100%; font-weight: 600!important; padding:0 1.5rem !important;"
          @click="$bvModal.hide('camera-modal')"
        />
      </div>
    </div>

    <!-- Main Content -->
    <div>
      <!-- Holder Text here -->
      <p class="text-center text-sm w-75 m-auto primary-gray poppins">
        This will only take a few moment. Ensure to keep your face within the
        frame.
      </p>

      <!-- Camera Region -->
      <div class="d-flex justify-content-center mt-3 pt-2">
        <div
          v-if="isCameraOpen"
          class="cam-holder"
          :class="{ taken: isPhotoTaken }"
        >
          <!-- Shutter -->
          <div
            v-if="!isPhotoTaken"
            class="camera-shutter"
            :class="{ flash: isShotPhoto }"
          >
            <audio
              v-if="isShotPhoto"
              id="snapSound"
              :src="require('~/assets/audio/snap.wav')"
              preload="auto"
            ></audio>
          </div>

          <video
            v-if="!isPhotoTaken"
            ref="camera"
            :width="408"
            :height="304"
            autoplay
          ></video>

          <canvas
            v-show="isPhotoTaken"
            id="photoTaken"
            ref="canvas"
            :width="408"
            :height="304"
            class="d-none"
          ></canvas>

          <!-- Image -->
          <div v-if="isPhotoTaken" class="image-border">
            <img :src="image" alt="Image" />
          </div>
        </div>
      </div>

      <!-- Buttons -->
      <div>
        <!-- Take Photo Btn -->
        <div v-if="!isPhotoTaken" class="m-4 p-1">
          <Button
            :has-icon="false"
            text="Capture image"
            custom-styles="height:42px; width: 100%; font-weight: 600!important; padding:0 1.5rem !important;"
            :disabled="isShotPhoto"
            @click="takePhoto"
          />
        </div>

        <!-- Re-capture Buttons -->
        <div
          v-if="isPhotoTaken"
          class="d-flex justify-content-center my-4 py-1"
        >
          <!-- Recapture -->
          <div>
            <Button
              :has-icon="false"
              :has-border="true"
              text="Re-capture"
              custom-styles="height:42px; width: 100%; font-weight: 600!important; padding:0 2.5rem !important;"
              @click="recapture"
            />
          </div>

          <!-- Save -->
          <div class="ml-4">
            <Button
              :has-icon="false"
              text="Save and continue"
              custom-styles="height:42px; width: 100%; font-weight: 600!important; padding:0 1.5rem !important;"
              @click="savePhoto"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";

export default {
  name: "ChatsCam",
  // components: { VueCropper },

  data: () => ({
    isCameraOpen: true,
    isPhotoTaken: false,
    isShotPhoto: false,
    isLoading: false,
    cameraError: false,
    image: null,
    streamList: [],
  }),

  mounted() {
    this.createCameraElement();
  },

  methods: {
    createCameraElement() {
      this.isLoading = true;

      const constraints = (window.constraints = {
        audio: false,
        video: true,
      });

      navigator.mediaDevices
        .getUserMedia(constraints)

        .then((stream) => {
          this.$refs.camera.srcObject = stream;
          this.streamList.push(stream);
        })

        .catch((_error) => {
          this.cameraError = true;
          this.$toast.error(
            "An error occurred! Failed to start camera, please allow permision to access camera. If you are browsing through social media built in browsers, you would need to open the page in Sarafi (iPhone)/ Chrome (Android) "
          );
        })

        .finally(() => {
          this.isLoading = false;
        });
    },

    stopCameraStream() {
      this.streamList.forEach((stream) => {
        stream.getTracks().forEach((track) => {
          track.stop();
        });
      });
    },
    takePhoto() {
      if (!this.isPhotoTaken) {
        this.isShotPhoto = true;

        setTimeout(() => {
          this.isShotPhoto = false;
        }, 50);
      }

      this.isPhotoTaken = !this.isPhotoTaken;

      const context = this.$refs.canvas.getContext("2d");
      context.drawImage(this.$refs.camera, 0, 0, 408, 304);

      console.log("context:::", context);

      const canvas = document
        .getElementById("photoTaken")
        .toDataURL("image/png");
      this.image = canvas;
      console.log("canvas:::", canvas);
      console.log("isPhotoTaken:::", this.isPhotoTaken);
    },

    recapture() {
      this.isPhotoTaken = false;
      this.isShotPhoto = false;
      this.image = null;
      this.createCameraElement();
    },

    savePhoto() {
      this.stopCameraStream();
      this.$emit("hanldeNinData", this.image);
    },
  },
};
</script>

<style scoped>
.cam-holder {
  opacity: 1;
  width: 408px;
  height: 304px;
  border-radius: 4px;
}
.cam-holder.taken {
  width: auto;
  height: auto;
}

.camera-shutter {
  opacity: 0;
  width: 450px;
  height: 337.5px;
  background-color: #fff;
  position: absolute;
}

.camera-shutter.flash {
  opacity: 1;
}

.image-border {
  border: 2px dashed #27c079;
  height: 225px;
  width: 225px;
  padding: 12px;
  margin: auto;
  border-radius: 50%;
}

.image-border img {
  object-fit: cover;
  border-radius: 50%;
  height: 100%;
  width: 100%;
}
</style>
