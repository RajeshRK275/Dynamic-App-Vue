<template>
  <div class="container">
    <div class="sidebar">
      <a-menu
        :default-selected-keys="selectedMenuKeys"
        mode="inline"
        theme="dark"
      >
        <a-menu-item-group v-for="(menu, menuKey) in menus" :key="menuKey">
          <!-- Main Menu Item -->
          <a-menu-item @click="toggleSubMenu(menuKey)">
            {{ menu.menuName }}
          </a-menu-item>

          <!-- Conditionally display Forms and Reports options -->
          <template v-if="menuExpanded[menuKey]">
            <a-menu-item @click="selectMenuItem(menuKey, 'forms')">
              Forms
            </a-menu-item>
            <template v-if="subMenuSelected[menuKey] === 'forms'">
              <a-menu-item-group>
                <a-menu-item
                  v-for="(form, formKey) in menu.forms"
                  :key="formKey"
                  @click="selectForm(menuKey, formKey)"
                >
                  {{ form.formName }}
                </a-menu-item>
              </a-menu-item-group>
            </template>

            <a-menu-item @click="selectMenuItem(menuKey, 'reports')">
              Reports
            </a-menu-item>
            <template v-if="subMenuSelected[menuKey] === 'reports'">
              <a-menu-item-group>
                <a-menu-item
                  v-for="(report, reportKey) in menu.reports"
                  :key="reportKey"
                  @click="selectReport(menuKey, reportKey)"
                >
                  {{ report.reportName }}
                </a-menu-item>
              </a-menu-item-group>
            </template>
          </template>
        </a-menu-item-group>
      </a-menu>
    </div>
    <div class="contentArea">
      <template v-if="selectedForm">
        <FormComponent :formFields="selectedForm" />
      </template>
      <template v-else-if="selectedReport">
        <ReportComponent :reportFields="selectedReport" />
      </template>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import FormComponent from "../Form/FormComponent.vue";
import ReportComponent from "../Record/ReportComponent.vue";

export default {
  name: "MenuComponent",
  components: { FormComponent, ReportComponent },
  data() {
    return {
      menus: null,
      selectedMenuKeys: [],
      subMenuSelected: {},
      menuExpanded: {},
      selectedForm: null,
      selectedReport: null,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get("/inputJSON1.json");
        console.log("Data ->", response);
        this.menus = response.data.menus;
      } catch (error) {
        console.error("Error fetching JSON data:", error);
      }
    },
    toggleSubMenu(menuKey) {
      // Collapse all menus
      for (const key in this.menuExpanded) {
        if (key !== menuKey) {
          this.menuExpanded[key] = false;
          this.subMenuSelected[key] = null;
        }
      }
      // Toggle the selected menu
      this.menuExpanded[menuKey] = !this.menuExpanded[menuKey];
      if (!this.menuExpanded[menuKey]) {
        this.subMenuSelected[menuKey] = null;
      }
    },
    selectMenuItem(menuKey, subMenu) {
      this.subMenuSelected[menuKey] =
        this.subMenuSelected[menuKey] === subMenu ? null : subMenu;
    },
    selectForm(menuKey, formKey) {
      this.selectedForm = this.menus[menuKey].forms[formKey];
      this.selectedReport = null; // Reset selected report
      console.log("Selected Form:", this.selectedForm);
    },
    selectReport(menuKey, reportKey) {
      this.selectedReport = this.menus[menuKey].reports[reportKey];
      this.selectedForm = null; // Reset selected form
      console.log("Selected Report:", this.selectedReport);
    },
  },
};
</script>

<style scoped>
.container {
  height: 100vh;
  margin: -1%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: rgb(229, 240, 237);
}

.sidebar {
  width: 220px;
  height: 100vh;
  background-color: #605d5d;
  box-sizing: border-box;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  overflow-y: auto;
}
.contentArea {
  flex: 1;
  height: 100vh;
  box-sizing: border-box;
  overflow-y: auto;
}
</style>
