<template>
  <div v-if="reportFields" class="reportComponent">
    <h1>{{ reportFields.reportName }}</h1>
    <a-table :columns="columns" :data-source="rows">
      <template #bodyCell="{ text }">
        <span>{{ text }}</span>
      </template>
    </a-table>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "ReportComponent",

  props: {
    reportFields: Object,
  },
  setup(props) {
    const columns = ref([]);
    const rows = ref([]);

    watch(
      () => props.reportFields,
      (newReportFields) => {
        if (newReportFields) {
          columns.value = newReportFields.columns.map((column) => {
            return {
              title: column.title,
              dataIndex: column.dataIndex,
              key: column.title,
            };
          });

          rows.value = newReportFields.rows.map((row) => {
            const newRow = {};
            newReportFields.columns.forEach((column) => {
              newRow[column.dataIndex] = row[column.dataIndex];
            });
            return newRow;
          });
        }
      },
      { immediate: true }
    );

    return {
      columns,
      rows,
    };
  },
});
</script>

<style>
.reportComponent {
  /* Add styles as needed */
}
</style>
