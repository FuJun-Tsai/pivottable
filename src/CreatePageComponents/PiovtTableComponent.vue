<template>
  <div
  class="d-flex"
  style="height: calc(100% - 40px); gap: 4px;"
  >
    <div
    class="overflow-auto mx-auto"
    style="flex: auto;"
    >
      <div class="border mb-2 p-2">
        <p class="text-center mb-0">所有欄位</p>
        <VueDraggable
        class="d-flex justify-content-center flex-wrap"
        style="gap: 4px;"
        v-model="pivotTitle"
        :group="{name: 'keys', pull: 'clone', put: false}"
        handle=".pvtAttr"
        preventOnFilter="false"
        >
          <DraggableAttribute
          v-for="item in pivotTitle"
          :name="item"
          :key="item"
          :option="valueFilter[item]"
          :isBtnsPanel="true"
          @valueFilterUpdate="valueFilterUpdate"
          />
        </VueDraggable>
      </div>
      <div
      class="d-flex"
      style="gap: 8px;"
      >
        <div class="border p-2">
          <p class="text-center mb-0">列標籤</p>
          <VueDraggable
          class="d-flex flex-column align-items-center h-100"
          style="gap: 4px;"
          v-model="pivotRow"
          group="keys"
          handle=".pvtAttr"
          preventOnFilter="false"
          >
            <DraggableAttribute
            v-for="item in pivotRow"
            :name="item"
            :key="item"
            :option="valueFilter[item]"
            :isBtnsPanel="false"
            @valueFilterUpdate="valueFilterUpdate"
            @dragBtnDelete="dragBtnDelete($event, 'rows', settingIndex)"
            />
          </VueDraggable>
        </div>

        <div class="border p-2" style="flex: 1 1 auto">
          <div class="d-flex mb-3" style="gap: 4px;">

            <div style="width: 100px; flex: 1 1 auto">
              <div class="mb-2">
                <p class="text-center mb-0">欄標籤</p>
                <VueDraggable
                class="d-flex justify-content-center h-100"
                style="gap: 4px; min-height: 36px;"
                v-model="pivotSetting[pivotTablePage - 1].pivotCol"
                group="keys"
                handle=".pvtAttr"
                preventOnFilter="false"
                >
                  <DraggableAttribute
                  v-for="item in pivotSetting[pivotTablePage - 1].pivotCol"
                  :name="item"
                  :key="item"
                  :option="valueFilter[item]"
                  :isBtnsPanel="false"
                  @valueFilterUpdate="valueFilterUpdate"
                  @dragBtnDelete="dragBtnDelete($event, 'cols')"
                  />
                </VueDraggable>
              </div>
              <div class="overflow-auto">
                <TableRenderer
                v-for="index in pivotSetting.length"
                :key="index"
                v-show="index === pivotTablePage"
                :title="pivotTitle"
                :data="pivotData"
                :rendererName="'scroll table'"
                :aggregatorName="pivotSetting[index - 1].pivotAggregator"
                :cols="pivotSetting[index - 1].pivotCol"
                :rows="pivotRow"
                :vals="pivotSetting[index - 1].pivotValue"
                :valueFilter="valueFilter"
                :rowTotal="true"
                :colTotal="true"
                @treeDataExport="chartDataGet($event, index - 1)"
                />
              </div>
            </div>

            <div style="flex: 0 0 200px">
              <p class="text-center mb-0">統計方式</p>
              <select class="select mb-3" v-model="pivotSetting[pivotTablePage - 1].pivotAggregator">
                <option
                v-for="(val, key) in aggregatorlocale"
                :key="val"
                :value="val"
                >
                  {{ key }}
                </option>
              </select>
              <p class="text-center mb-0">統計值</p>
              <div class="d-flex align-items-center flex-nowrap mb-3" style="gap: 4px;">
                <span
                v-if="pivotSetting[pivotTablePage - 1].pivotAggregator === 'Sum over Sum'"
                class="text-nowrap"
                >
                  分子
                </span>
                <select
                v-if="['Count as Fraction of Total', 'Count as Fraction of Rows', 'Count as Fraction of Column'].includes(pivotSetting[pivotTablePage - 1].pivotAggregator) === false"
                class="select"
                v-model="pivotSetting[pivotTablePage - 1].pivotValue[0]"
                >
                  <option
                  v-for="(val) in pivotTitle"
                  :key="val"
                  :value="val">
                    {{ val }}
                  </option>
                </select>
              </div>

              <div class="d-flex align-items-center flex-nowrap mb-3" style="gap: 4px;">
                <span
                v-if="pivotSetting[pivotTablePage - 1].pivotAggregator === 'Sum over Sum'"
                class="text-nowrap"
                >
                  分母
                </span>
                <select
                v-if="pivotSetting[pivotTablePage - 1].pivotAggregator === 'Sum over Sum'"
                class="select"
                v-model="pivotSetting[pivotTablePage - 1].pivotValue[1]"
                >
                  <option
                  v-for="(val) in pivotTitle"
                  :key="val"
                  :value="val">
                    {{ val }}
                  </option>
                </select>
              </div>
            </div>

          </div>
          <div class="d-flex justify-content-center" style="gap: 4px;">
            <span>
              <n-pagination
              v-model:page="pivotTablePage"
              :page-count="pivotSetting.length"
              />
            </span>
            <n-button
            strong secondary type="primary" size="small"
            @click="pivotTableAdd(block)"
            >
              新增
            </n-button>
            <n-button
            v-if="pivotSetting.length > 1"
            strong secondary type="error" size="small"
            @click="pivotTableDelete"
            >
              移除
            </n-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineProps, defineEmits, ref } from 'vue';
import DraggableAttribute from '@/components/DraggableAttribute.vue';
import { VueDraggable } from 'vue-draggable-plus';
import TableRenderer from '@/components/TableRenderer.vue';

const props = defineProps({
  pivotTitle: {
    type: Array,
  },
  pivotData: {
    type: Array,
  },
  pivotRow: {
    type: Array,
  },
  pivotSetting: {
    type: Array,
  },
  valueFilter: {
    type: Object,
  },
});
const emits = defineEmits(['pivotTableAdd', 'pivotTableDelete', 'chartDataGet']);

const pivotTitle = ref(props.pivotTitle);
const pivotRow = ref(props.pivotRow);
const pivotSetting = ref(props.pivotSetting);
const valueFilter = ref({});

valueFilter.value = pivotTitle.value.reduce((titleObj, title, titleIndex) => {
  titleObj[title] = props.pivotData.reduce((dataObj, data) => {
    dataObj[data[titleIndex]] = false;
    return dataObj;
  }, {});
  return titleObj;
}, {});

const aggregatorlocale = ref({
  '筆數': 'Count',
  '不同結果的筆數': 'Count Unique Values',
  '列出項目': 'List Unique Values',
  '總合': 'Sum',
  '整數加總': 'Integer Sum',
  '平均': 'Average',
  '中位數': 'Median',
  '樣本變異數': 'Sample Variance',
  '樣本標準差': 'Sample Standard Deviation',
  '最小值': 'Minimum',
  '最大值': 'Maximum',
  '採計第一筆': 'First',
  '採計最後一筆': 'Last',
  '平均總合': 'Sum over Sum',
  '總計百分比': 'Sum as Fraction of Total',
  '列總計百分比': 'Sum as Fraction of Rows',
  '欄總計百分比': 'Sum as Fraction of Columns',
  '筆數百分比': 'Count as Fraction of Total',
  '列筆數百分比': 'Count as Fraction of Rows',
  '欄筆數百分比': 'Count as Fraction of Columns'
});

const pivotTablePage = ref(1);

const chartDataGet = function(value, index){
  let obj = {
    value: value,
    tableIndex: index,
  }
  emits('chartDataGet', obj);
};

const dragBtnDelete = function(name, position){
  if(position === 'rows'){
    pivotRow.value = pivotRow.value.filter(item => item !== name);
  } else {
    pivotSetting.value[pivotTablePage.value - 1].pivotCol = pivotSetting.value[pivotTablePage.value - 1].pivotCol.filter(item => item !== name);
  }
};
const valueFilterUpdate = function(obj){
  valueFilter.value[obj.title] = obj.valueFilter;
};


const pivotTableAdd = function(){
  let obj = {
    col: [pivotTitle.value[0]],
    value: [pivotTitle.value[0], pivotTitle.value[1]]
  }
  emits('pivotTableAdd', obj);
};
const pivotTableDelete = function(){
  let delIndex = pivotTablePage.value - 1;
  if(pivotTablePage.value === pivotSetting.value.length){
    pivotTablePage.value = pivotTablePage.value - 1;
  }
  emits('pivotTableDelete', delIndex);
};

</script>
<style lang="scss">
</style>