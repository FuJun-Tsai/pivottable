<template>
  <div class="d-flex" style="height: calc(100% - 40px);">
    <div
    class="overflow-auto"
    style="flex: auto;"
    >
      <table class="w-100 text-center">
        <thead class="position-sticky top-0">
          <tr>
            <th
            class="text-nowrap px-4 py-1"
            v-for="(title, titleIndex) in tableTitle"
            :key="title"
            >
              <span
              v-if="pivotTitleTempIndex !== titleIndex"
              @click="pivotTitleSelect(title, titleIndex)"
              >
                {{ title }}
              </span>
              <div
              class="d-flex flex-row"
              style="gap: 4px;"
              v-if="pivotTitleTempIndex === titleIndex"
              >
                <n-input
                v-model:value="pivotTitleTemp"
                type="text"
                :placeholder="title"
                />
                <n-button
                quaternary
                type="warning"
                @click="pivotTitleUpdate"
                >
                  更新
                </n-button>
              </div>
            </th>
            <th class="action position-sticky end-0">
              操作
            </th>
          </tr>
        </thead>
        <tbody class="overflow-auto">
          <tr
          v-for="(data, dataIndex) in tableData"
          :class="{ 'selected': tableDataTempIndex === dataIndex }"
          :key="data"
          >
            <td
            class="py-1"
            style="vertical-align: middle;"
            v-for="item in data"
            :key="`${dataIndex}-${item}`"
            >
              <span>
                {{ item }}
              </span>
            </td>
            <td class="action position-sticky end-0 px-2 py-2">
              <n-button
              quaternary
              type="warning"
              @click="tableDataSelect(dataIndex)"
              >
                編輯
              </n-button>
              <n-button
              quaternary
              type="error"
              @click="tableDataDelete(dataIndex)"
              >
                刪除
              </n-button>
            </td>
          </tr>
          <tr class="updateTemp position-sticky bottom-0 bg-white">
            <td
            class="px-2 py-2"
            v-for="(item, index) in tableTitle" :key="item" style="vertical-align: middle;"
            >
              <n-input
              v-model:value="tableDataTemp[index]"
              type="text"
              :placeholder="tableTitle[index]"
              @paste="()=>{console.log(123)}"
              />
            </td>
            <td class="action position-sticky end-0 bg-white px-2 py-2">
              <n-button
              quaternary
              type="success"
              v-if="tableDataTempIndex === -1"
              @click="tableDataAdd"
              >
                新增
              </n-button>
              <n-button
              quaternary
              type="warning"
              v-if="tableDataTempIndex > -1"
              @click="tableDataUpdate"
              >
                更新
              </n-button>
              <n-button
              quaternary
              type="error"
              @click="tableDataTempReset"
              >
                還原
              </n-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue';

const props = defineProps({
  tableTitle: {
    type: Array,
  },
  tableData: {
    type: Array,
  }
});
const emits = defineEmits(['tableDataAdd', 'tableDataUpdate', 'tableDataDelete']);

const tableTitle = ref(props.tableTitle);
const tableData = ref(props.tableData);

const tableTitleTempIndex = ref(-1);
const tableDataTemp = ref([]);
watch(tableTitle, ()=>{
  tableDataTemp.value = tableTitle.value.map(() => '');
}, { immediate: true });
const tableDataTempIndex = ref(-1);

const tableDataSelect = function(dataIndex){
  tableDataTempIndex.value = dataIndex;
  tableDataTemp.value = [...tableData.value[dataIndex]];
};
const tableDataDelete = function(dataIndex){
  emits('tableDataDelete', dataIndex);
};
const tableDataAdd = function(){
  emits('tableDataAdd', tableDataTemp.value);
  tableDataTempReset();
};
const tableDataUpdate = function(){
  let obj = {
    dataIndex: tableDataTempIndex.value,
    data: tableDataTemp.value,
  }
  emits('tableDataUpdate', obj);
  tableDataTempReset();
};
const tableDataTempReset = function(){
  tableDataTemp.value = tableTitle.value.map(() => '');
  tableDataTempIndex.value = -1;
};


</script>
<style lang="scss" scoped>
table{
  $border-color: #a2b1c6;
  // table-layout: fixed;
  border-collapse: separate;
  border-spacing: 0;
  thead{
    z-index: 1;
    tr{
      th{
        border-top: 1px solid $border-color;
        border-bottom: 1px solid $border-color;
        background: #ebf0f8;
        &:first-of-type{
          border-left: 1px solid $border-color;
        }
        &:last-of-type{
          border-right: 1px solid $border-color;
        }
        &.action{
          width: 128px;
        }
        &:last-of-type{
          position: relative;
          &:after{
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 12px;
            transform: translate(-100%, 0);
            box-shadow: inset -16px 0 8px -12px #a6c7fdcc;
          }
        }
      }
    }
  }
  tbody{
    tr{
      &.selected td{
        background-color: #becfe7 !important;
      }
      &:not(.selected ,.updateTemp):hover td{
        background-color: #ebf0f8 !important;
      }
      td{
        transition-duration: .3s;
        background-color: #fff;
        border-bottom: 1px solid #dde5f1;
        &:last-of-type{
          position: relative;
          background: white;
          &:after{
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 12px;
            transform: translate(-100%, 0);
            box-shadow: inset -16px 0 8px -12px rgba(0, 0, 0, .18);;
          }
        }
      }
    }
  }
  .updateTemp{
    td{
      border-top: 1px solid $border-color;
      border-bottom: 1px solid $border-color;
      &:first-of-type{
        border-left: 1px solid $border-color;
      }
      &:last-of-type{
        border-right: 1px solid $border-color;
      }
      &.action{
        z-index: 1;
        width: 132px;
      }
    }
  }
}
</style>