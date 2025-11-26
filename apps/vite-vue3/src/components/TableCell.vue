<script setup>
import { ref, computed } from "vue";

const data = ref([
  {
    subject: "英语",
    course: "KB1",
    class: "KB12025",
    name: "张三",
    name1: "李四",
  },
  {
    subject: "英语",
    course: "KB1",
    class: "KB12025",
    name1: "李四",
    name: "张三",
  },
  {
    subject: "数学",
    course: "KB2",
    class: "KB12025",
    name: "lisi",
    name1: "李四",
  },
  {
    subject: "英语",
    course: "KB1",
    class: "KB1202501",
    name1: "李四",
    name: "张三1",
  },
  {
    subject: "英语",
    course: "KB1",
    class: "KB1202501",
    name1: "李四",
    name: "张三1",
  },
  {
    subject: "数学",
    course: "KB1",
    class: "KB12025",
    name1: "李四",
    name: "张三2",
  },
  {
    subject: "数学",
    course: "KB1",
    name1: "李四",
    class: "数学一",
    name: "张三",
  },
  {
    subject: "数学",
    course: "KB1",
    class: "数学二",
    name1: "李四",
    name: "张三",
  },
]);
const needSpanList = computed(() => {
  let needSpan = ["subject", "course", "class", "name", "name1"];
  // return Object.keys(this.tableColumns)
  return needSpan;
});
const columns = ["subject", "course", "class", "name"];
const dataMap = {};
const dataTotal = data.value.length;
const projectNoGroups = (() => {
  const groups = {};
  let needSpan = needSpanList.value;

  for (let i = 0; i < needSpan.length; i++) {
    let pos = 0;
    groups[needSpan[i]] = [];
    data.value.forEach((item, index) => {
      if (index === 0) {
        groups[needSpan[i]][index] = [1, index];
      } else {
        const prevItem = data.value[index - 1];
        const preNeedSpan = needSpan.slice(0, i + 1);
        const result = preNeedSpan.reduce(
          (acc, curr) => acc && item[curr] === prevItem[curr],
          true
        );
        if (result) {
          pos++;
          groups[needSpan[i]][index - pos][0] = pos + 1;
          groups[needSpan[i]][index - pos][1] = index - pos;
          groups[needSpan[i]][index] = [0, 0];
        } else {
          pos = 0;
          groups[needSpan[i]][index] = [1, index];
        }
      }
    });
  }
  console.log(groups);

  return groups;
})();

function objectSpanMethod({ row, column, rowIndex, columnIndex }) {
  // 只对ID列进行合并
  let needSpan = needSpanList.value;
  if (
    needSpan.includes(column.property) &&
    ["subject", "course", "class", "name"].includes(column.property)
  ) {
    const group = projectNoGroups[column.property];

    if (rowIndex === group[rowIndex][1]) {
      return {
        rowspan: group[rowIndex][0],
        colspan: 1,
      };
    } else {
      return {
        rowspan: 0,
        colspan: 0,
      };
    }
  }
  //   if (needSpan.includes(column.property) && ["name"].includes(column.property)) {
  //     const group = projectNoGroups[column.property];
  //     if (rowIndex === group[rowIndex][1]) {
  //       return {
  //         rowspan: group[rowIndex][0],
  //         colspan: 1,
  //       };
  //     }
  //     if (group[rowIndex][0] === 0) {
  //       return {
  //         rowspan: 0,
  //         colspan: 0,
  //       };
  //     }
  //   }
}
</script>
<template>
  <div style="display: flex">
    <ElTable :data="data" border>
      <ElTableColumn prop="subject" width="150" label="学科" />
      <ElTableColumn prop="course" width="150" label="课程" />
      <ElTableColumn prop="class" width="150" label="班级" />
      <ElTableColumn prop="name" width="150" label="姓名" />
      <ElTableColumn prop="name1" width="150" label="姓名" />
    </ElTable>
    <div style="width: fit-content; flex: none">----</div>
    <ElTable :data="data" :span-method="objectSpanMethod" border>
      <ElTableColumn type="index" />

      <ElTableColumn prop="subject" width="150" label="学科" />
      <ElTableColumn prop="course" width="150" label="课程" />
      <ElTableColumn prop="class" width="150" label="班级" />
      <ElTableColumn prop="name" width="150" label="姓名" />
      <!-- <ElTableColumn prop="name1" width="150" label="姓名" /> -->
    </ElTable>
  </div>
</template>
