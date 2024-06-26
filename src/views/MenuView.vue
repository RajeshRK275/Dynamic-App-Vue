<template>
  <MenuComponent />
  <FormComponent :formFields="null" />
  <ReportComponent :reportField="null"/>
</template>

<script>
import FormComponent from "@/components/Form/FormComponent.vue";
import MenuComponent from "../components/Menu/MenuComponent.vue";
import ReportComponent from '@/components/Record/ReportComponent.vue';
export default {
  name: "MenuView",
  components: {
    MenuComponent,
    FormComponent,
    ReportComponent,
  },
};
</script>

<style>
</style>
