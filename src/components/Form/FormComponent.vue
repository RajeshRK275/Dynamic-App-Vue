<template>
  <div v-if="formFields" class="formComponent">
    <a-form
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      layout="horizontal"
      style="max-width: 600px"
      @submit.prevent="handleSubmit"
    >
      <template
        v-for="field in formFields.fields"
        :key="field.name || field.type"
      >
        <a-form-item
          v-if="field.type === 'text'"
          :label="field.label || field.type"
        >
          <a-input v-model:value="form[field.name || field.type]" />
        </a-form-item>
        <a-form-item
          v-if="field.type === 'number'"
          :label="field.label || field.type"
        >
          <a-input-number v-model:value="form[field.name || field.type]" />
        </a-form-item>
        <a-form-item
          v-if="field.type === 'email'"
          :label="field.label || field.type"
        >
          <a-input
            type="email"
            v-model:value="form[field.name || field.type]"
          />
        </a-form-item>
        <a-form-item
          v-if="field.type === 'password'"
          :label="field.label || field.type"
        >
          <a-input
            type="password"
            v-model:value="form[field.name || field.type]"
          />
        </a-form-item>
        <a-form-item
          v-if="field.type === 'select'"
          :label="field.label || field.type"
        >
          <a-select v-model:value="form[field.name || field.type]">
            <a-select-option
              v-for="option in field.options"
              :key="option"
              :value="option"
            >
              {{ option }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          v-if="field.type === 'radio'"
          :label="field.label || field.type"
        >
          <a-radio-group v-model:value="form[field.name || field.type]">
            <a-radio
              v-for="option in field.options"
              :key="option"
              :value="option"
            >
              {{ option }}
            </a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          v-if="field.type === 'checkbox'"
          :label="field.label || field.type"
        >
          <a-checkbox-group v-model:value="form[field.name || field.type]">
            <a-checkbox
              v-for="option in field.options"
              :key="option"
              :value="option"
            >
              {{ option }}
            </a-checkbox>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item
          v-if="field.type === 'date'"
          :label="field.label || field.type"
        >
          <a-date-picker v-model:value="form[field.name || field.type]" />
        </a-form-item>
        <a-form-item
          v-if="field.type === 'textarea'"
          :label="field.label || field.type"
        >
          <a-textarea v-model:value="form[field.name || field.type]" />
        </a-form-item>
        <a-form-item
          v-if="field.type === 'range'"
          :label="field.label || field.type"
        >
          <a-input-number v-model:value="form[field.name || field.type]" :min="field.min" :max="field.max" :step="field.step" />
        </a-form-item>
      </template>
      <a-form-item class="button">
          <a-button html-type="submit">Submit</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { reactive, onMounted } from "vue";

export default {
  name: "FormComponent",
  props: {
    formFields: Object,
  },
  setup(props) {
    onMounted(() => {
      if (props.formFields) {
        console.log("Form Name:", props.formFields.formName);
        console.log("Form Fields:");
        props.formFields.fields.forEach((field, index) => {
          console.log(
            `Field ${index + 1}:`,
            field.type,
            field.label,
            field.name
          );
        });
      }
    });

    const labelCol = { style: { width: "150px" } };
    const wrapperCol = { span: 14 };
    const form = reactive({});

    // Initialize form reactive object based on formFields
    props.formFields &&
      props.formFields.fields.forEach((field) => {
        const fieldName = field.name || field.type;
        form[fieldName] = field.type === "checkbox" ? [] : null;
      });

    const handleSubmit = () => {
      Object.keys(form).forEach((key) => {
        console.log(`${key}: ${form[key]}`);
      });
    };

    return {
      labelCol,
      wrapperCol,
      form,
      handleSubmit,
    };
  },
};
</script>

<style>
.formComponent {
  margin-top: 30px;
}
.button{
  position: relative;
  left:100vh;
}
</style>
