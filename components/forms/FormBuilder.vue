<template>
  <div>
    <!-- Title Region Here -->
    <div class="mt-4 pt-3">
      <label for="title" class="primary-blue font-medium">Form Title</label>
      <div>
        <input
          type="text"
          class="form-controls px-3"
          placeholder="Enter form title"
          id="title"
          v-model="payload.title"
        />
      </div>
    </div>

    <!-- Form Builder Here -->
    <section class="mt-4">
      <!-- Cards Here -->
      <div
        class="d-flex position-relative mb-4 pb-1"
        v-for="(question, i) in payload.questions"
        :key="i"
      >
        <div class="question-config p-4">
          <p class="primary-blue font-bold">Question Configuration</p>

          <!-- type -->
          <div class="mt-3">
            <label class="font-medium primary-blue">Type</label>
            <div id="campaign-form" class="w-100">
              <el-select v-model="question.type" placeholder="Select">
                <el-option
                  v-for="kind in types"
                  :key="kind"
                  :label="handleLabel(kind)"
                  :value="kind"
                >
                </el-option>
              </el-select>
            </div>
          </div>

          <!-- Value -->
          <div class="mt-3" v-if="question.type == 'short'">
            <div class="d-flex">
              <label
                class="font-medium primary-blue"
                for="value"
                style="margin-top: 1px"
                >Reward</label
              >

              <span class="ml-2">
                <Tooltip :content="tooltipContent" />
              </span>
            </div>

            <CurrencyInput
              id="value"
              :customStyles="customStyles"
              :placeholder="`${$currency}0.00`"
              v-model="question.value"
            />
          </div>

          <!-- Required -->
          <div class="mt-3 d-flex align-items-center">
            <Toggle
              :value="question.required"
              @input="question.required = $event"
            />
            <label class="ml-2 pl-1 required">Required question?</label>
          </div>
        </div>

        <!-- Question Display Here -->
        <div class="question-holder p-4">
          <label for="question_1" class="primary-blue font-medium"
            >Question {{ i + 1 }}</label
          >

          <!-- Form Setup -->
          <section>
            <div>
              <input
                id="question_1"
                type="text"
                class="form-controls px-3"
                :placeholder="`Question ${i + 1}`"
                v-model="question.question.title"
              />
            </div>

            <template
              v-if="
                question.type === 'multiple' || question.type === 'optional'
              "
            >
              <!-- Option region -->
              <div
                class="mt-3 d-flex align-items-center"
                v-for="(option, index) in question.question.options"
                :key="index"
              >
                <input
                  type="text"
                  class="form-controls line px-2"
                  :class="{
                    error:
                      $v.payload.questions.$each[i].question.options.$each[
                        index
                      ].$error,
                  }"
                  :placeholder="`Option ${index + 1}`"
                  v-model="question.question.options[index].option"
                  @blur="
                    $v.payload.questions.$each[i].question.options.$each[
                      index
                    ].$touch()
                  "
                />

                <!-- Reward Here -->
                <div class="d-flex align-items-end ml-2">
                  <label for="reward" class="font-medium primary-blue"
                    >Reward</label
                  >
                  <div class="ml-2 reward-holder">
                    <CurrencyInput
                      id="value"
                      :customStyles="rewardStyles"
                      :placeholder="`${$currency}0.00`"
                      v-model="option.reward"
                      :disabled="!question.question.options[index].option"
                    />
                  </div>

                  <div class="ml-3 mt-1 pointer" @click="deleteOption(i)">
                    <img
                      src="~/assets/img/vectors/delete-icon-2.svg"
                      alt="delete-icon"
                    />
                  </div>
                </div>
              </div>

              <!-- Add another here -->
              <span
                class="pt-3 primary font-bold pointer d-block w-25"
                @click="addOption(i)"
                >+ Add another</span
              >
            </template>
          </section>
        </div>

        <!-- Delete icon -->
        <div class="position-absolute delete-icon" @click="deleteQuestion(i)">
          <img src="~/assets/img/vectors/delete-icon.svg" alt="delete-icon" />
        </div>
      </div>
    </section>

    <!-- Add icon -->
    <div class="mt-4 pt-1">
      <div class="icon-holder" @click="addQuestion">
        <img src="~/assets/img/vectors/add-icon.svg" alt="add-icon" />
      </div>
    </div>

    <!-- button region here -->
    <div class="d-flex justify-content-end mt-4 pt-2 pb-4">
      <Button
        v-if="!isPreview"
        :has-icon="false"
        :has-border="true"
        text="Preview"
        fontSize="1rem"
        custom-styles="height: 50px; border-radius: 8px; font-weight: 600; padding: 0 1.25rem !important"
        @click="previewForm"
        :disabled="disabled"
      />

      <div class="ml-3">
        <Button
          :has-icon="false"
          :text="buttonText"
          fontSize="1rem"
          custom-styles="height: 50px; border-radius: 8px; font-weight: 600; padding: 0 1.25rem !important"
          :disabled="disabled"
          @click="submitForm"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";

export default {
  name: "FormBuilder",
  layout: "dashboard",

  props: {
    isPreview: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    types: ["multiple", "optional", "short"],
    tooltipContent:
      "Enter the amount you want the Beneficiary to receive if the answer falls within expected response",

    payload: {
      title: "",
      questions: [
        {
          type: "multiple",
          value: "",
          required: false,
          question: {
            title: "",
            options: [
              {
                option: "",
                reward: "",
              },

              {
                option: "",
                reward: "",
              },
            ],
          },
        },

        {
          type: "optional",
          value: "",
          required: false,
          question: {
            title: "",
            options: [
              {
                option: "",
                reward: "",
              },
              {
                option: "",
                reward: "",
              },
            ],
          },
        },

        {
          type: "short",
          value: "",
          required: false,
          question: {
            title: "",
            options: [],
          },
        },
      ],
    },
  }),

  validations: {
    payload: {
      questions: {
        $each: {
          question: {
            title: { required },
            options: {
              $each: {
                option: { required, minLength: minLength(1) },
              },
            },
          },
        },
      },
    },
  },

  // watch: {
  //   payload: {
  //     handler: function (newVal, oldVal) {
  //       localStorage.setItem("campaignForm", JSON.stringify(newVal));
  //     },
  //     deep: true,
  //   },
  // },

  computed: {
    isEdit() {
      return !!this.$route.params.id;
    },

    buttonText() {
      return this.isEdit ? "Update form" : "Create form";
    },

    customStyles() {
      return "height: 38px; border: 1px solid #17CE89; border-radius: 8px; background: #FFFFFF; padding: 1rem";
    },

    rewardStyles() {
      return "height: 38px; border: 1px solid #C4CDD4; border-radius: 8px; background: #FFFFFF; padding: 1rem";
    },

    disabled() {
      // check that each of the title property in question is not empty
      const isEmptyQuestion = this.payload.questions.some(
        (question) => !question.question?.title
      );
      const isEmptyTitle = !this.payload.title;

      return isEmptyQuestion || isEmptyTitle;
    },
  },

  mounted() {
    const campaignForm = localStorage.getItem("campaignForm");
    if (campaignForm) {
      this.payload = JSON.parse(campaignForm);
    }
  },

  methods: {
    handleLabel(label) {
      return label == "multiple"
        ? "Multiple Choice"
        : label == "optional"
        ? "Optional"
        : "Short Answer";
    },

    deleteQuestion(index) {
      const { questions } = this.payload;

      if (questions.length > 1) {
        questions.splice(index, 1);
      } else {
        this.$toast.error("You need at least one question");
      }
    },

    addQuestion() {
      this.payload.questions.push({
        type: "multiple",
        value: "",
        required: false,
        question: {
          title: "",
          options: ["", ""],
        },
      });
    },

    addOption(index) {
      this.payload.questions[index]?.question?.options?.push({
        option: "",
        reward: "",
      });
    },

    deleteOption(index) {
      const { options } = this.payload.questions[index]?.question;

      if (options.length > 2) {
        options.splice(index, 1);
      } else {
        this.$toast.error("You need at least two options");
      }
    },

    previewForm() {
      this.$router.push({
        path: "/campaigns/forms/new",
        query: { preview: true, id: this.isEdit ? this.$route.params.id : "" },
      });
    },

    submitForm() {
      this.$v.payload.$touch();
      let hasEmptyOption;

      //   check if any $model is empty
      Object.values(this.$v.payload.questions.$each.$iter).forEach((item) => {
        // check if any of the options is empty
        const type = item.$model.type;
        if (type == "multiple" || type == "optional") {
          const isEmpty = Object.values(item.question.options.$each.$iter).some(
            (option) => {
              return option.$error;
            }
          );

          if (isEmpty) {
            hasEmptyOption = true;
          }
        }
      });

      if (hasEmptyOption) {
        this.$toast.error("Please fill all the options");
        return;
      }

      localStorage.setItem("campaignForm", JSON.stringify(this.payload));

      // Set the reward to type number
      this.payload.questions.forEach((question) => {
        if (question.type === "multiple" || question.type === "optional") {
          question.question.options.forEach((option) => {
            if (option.reward && option.reward.length)
              option.reward = +option.reward.replace(/[^0-9]/g, "");
          });
        }

        if (question.type === "short") {
          if (question.value && question.value.length)
            question.value = +question.value.replace(/[^0-9]/g, "");
        }
      });

      this.$emit("submit", this.payload);
    },
  },
};
</script>

<style scoped>
.question-config {
  background: #edf9f5;
  border-radius: 8px 0px 0px 8px;
}

.question-holder {
  background: #ffffff;
  box-shadow: 0px 4px 25px rgba(174, 174, 192, 0.15);
  border-radius: 8px;
  width: 80%;
}

.form-controls {
  height: 49px;
  border-radius: 8px;
}

.form-controls.line {
  border: none;
  border-bottom: 1px solid #eceff1;
  background: inherit;
  border-radius: 0px;
  width: 55%;
}

.line.error {
  border: none !important;
  border-bottom: 1px solid #ee3934 !important;
}

.line:focus {
  border: none !important;
  border-bottom: 1px solid #eceff1 !important;
}

.form-controls::placeholder {
  font-size: 1rem;
  color: #646a86;
  font-weight: normal;
}

.required {
  color: #646a86;
  font-size: 1rem;
}

.icon-holder {
  background: #17ce89;
  box-shadow: 0px 25px 50px rgba(23, 206, 137, 0.15);
  border-radius: 100px;
  height: 64px;
  width: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.delete-icon {
  cursor: pointer;
  right: -60px;
}

.reward-holder {
  width: 55%;
}

.reward-holder > label {
  font-size: 1rem;
}
</style>
