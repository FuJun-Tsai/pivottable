<template>
  <h2 class="text-center" style="margin: 0px;">thePivottableUI</h2>
  <PivottableUi
  :title="pivotTitle"
  :data="pivotData"
  :rendererName="pivotRendererName"
  :aggregatorName="pivotAggregatorName"
  :aggregatorlocale="aggregatorlocale"
  :cols="pivotCols"
  :rows="pivotRows"
  :vals="pivotValues"
  :sorters="sorters"
  :locales="locales"
  :locale="'tw'"
  @treeDataExport="getChartData"
  >
  </PivottableUi>
  <div style="display: flex; max-width: 1000px; width: 100%; margin: 0 auto;">
    <div style="min-height: 400px; height: 400px; flex: auto">
      <v-chart
      :option="chart"
      :style="{ width: '100%', height: '100%' }"
      autoresize
      />
    </div>
    <div style="flex: 0 0 200px;">
      <p class="mb-0">圖表類型</p>
      <theDropdown
      style="margin-bottom: 8px;"
      :values="chartTypeOption"
      :value="chartType"
      @handleChange="chartTypeSelect"
      />
      <p class="mb-0">圖表軸</p>
      <div style="margin-bottom: 8px;">
        <n-radio-group
        v-model:value="chartAxisDirection"
        name="radiogroup"
        >
          <n-space>
            <n-radio
            v-for="option in chartAxisDirectionOption"
            :key="option.value"
            :value="option.value"
            >
              {{ option.label }}
            </n-radio>
          </n-space>
        </n-radio-group>
      </div>
      <p class="mb-0">線條彎曲</p>
      <n-slider
      style="margin-bottom: 8px;"
      v-model:value="chartLineSmooth"
      :step="0.1"
      :max="1"
      :min="0"
      />
      <p class="mb-0">圖標樣式</p>
      <theDropdown
      style="margin-bottom: 8px;"
      :values="chartLineSymbolOption"
      :value="chartLineSymbol"
      @handleChange="chartLineSymbolSelect"
      />
      <p class="mb-0">圖標大小</p>
      <n-input-number
      style="margin-bottom: 8px;"
      v-model:value="chartLineSymbolSize"
      />
      <p class="mb-0">圓角幅度</p>
      <n-input-number
      style="margin-bottom: 8px;"
      v-model:value="chartRadius"
      />
      <p class="mb-0">指定圓角</p>
      <div>
        <n-radio-group
        v-model:value="chartRadiusAngle"
        name="radiogroup"
        >
          <n-space>
            <n-radio
            v-for="option in chartRadiusAngleOption" :key="option.value" :value="option.value">
              {{ option.label }}
            </n-radio>
          </n-space>
        </n-radio-group>
      </div>
    </div>
  </div>
  <div class="fix-buttons position-fixed top-50 end-0 translate-middle-y">
    <div
    class="fix-button pointer p-2"
    @click="dialogShowing = true"
    >
      採計資料
    </div>
  </div>
  <div
  class="dialog position-fixed top-0 start-0"
  :class="{'open': dialogShowing}"
  @click.self="dialogShowing = false"
  >
    <div
    class="position-absolute top-50 start-50 translate-middle d-flex flex-column p-2"
    v-if="dialogShowing"
    >
      <h4 class="text-center">採計資料</h4>
      <div
      class="overflow-auto"
      style="flex: auto;"
      >
        <table class="w-100 text-center">
          <thead class="position-sticky top-0">
            <tr>
              <th
              class="p-2"
              v-for="(title, titleIndex) in pivotTitle"
              :key="title"
              >
                <span
                v-if="pivotTitleTempIndex !== titleIndex"
                @click="pivotTitleSelect(titleIndex)"
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
              <th>
                操作
              </th>
            </tr>
          </thead>
          <tbody class="overflow-auto">
            <tr
            v-for="(data, dataIndex) in pivotData"
            :class="{'selected': pivotDataTempIndex === dataIndex }"
            :key="data"
            >
              <td
              class="px-2 py-3"
              style="vertical-align: middle;"
              v-for="item in data"
              :key="`${dataIndex}-${item}`"
              >
                <span>
                  {{ item }}
                </span>
              </td>
              <td class="px-2 py-3">
                <n-button
                quaternary
                type="warning"
                @click="pivotDataSelect(dataIndex)"
                >
                  編輯
                </n-button>
                <n-button
                quaternary
                type="error"
                @click="pivotDataDelete(dataIndex)"
                >
                  刪除
                </n-button>
              </td>
            </tr>
            <tr class="updateTemp position-sticky bottom-0 bg-white">
              <td
              class="px-2 py-3"
              v-for="(item, index) in pivotTitle" :key="item" style="vertical-align: middle;"
              >
                <n-input
                v-model:value="pivotDataTemp[index]"
                type="text"
                :placeholder="pivotTitle[index]"
                />
              </td>
              <td class="px-2 py-3">
                <n-button
                quaternary
                type="success"
                v-if="pivotDataTempIndex === -1"
                @click="pivotDataAdd"
                >
                  新增
                </n-button>
                <n-button
                quaternary
                type="warning"
                v-if="pivotDataTempIndex > -1"
                @click="pivotDataUpdate"
                >
                  更新
                </n-button>
                <n-button
                quaternary
                type="error"
                @click="pivotDataTempReset"
                >
                  還原
                </n-button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, provide, computed, watch } from 'vue';
import PivottableUi from '@/components/PivottableUi';
import { PivotUtilities } from '@/mixin/index';
import theDropdown from '@/components/theDropdown';

// echart
import { use } from 'echarts/core';
import {
  TitleComponent,
  TooltipComponent,
  ToolboxComponent,
  GridComponent,
  LegendComponent,
  DataZoomComponent,
} from 'echarts/components';
import { BarChart, LineChart, PieChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import VChart , { THEME_KEY } from 'vue-echarts';

use([
  TitleComponent,
  TooltipComponent,
  ToolboxComponent ,
  GridComponent,
  LegendComponent,
  DataZoomComponent,
  BarChart,
  LineChart,
  PieChart,
  CanvasRenderer,
]);

provide([THEME_KEY]);

const pivotTitle = ref(['消費日期', '顧客姓名', '商品種類', '顏色', '單品價格', '銷售數量', '銷售總額', '顧客等級', '銷售店鋪', '銷售人員']);
const pivotTitleTemp = ref('');
const pivotTitleTempIndex = ref(-1);
const pivotTitleSelect = function(index){
  pivotTitleTempIndex.value = index;
};
const pivotTitleUpdate = function(){
  pivotTitle.value[pivotTitleTempIndex.value] = pivotTitleTemp.value;
  pivotTitleTemp.value = '';
  pivotTitleTempIndex.value = -1;
}

const pivotData = ref([
  [ '2020/1/1', 'H', '女包1', '紅色', '200', '2', '400', 'VIP',	'台北', 'S12' ],
  [ '2020/1/1', 'H', '女包1', '紅色', '150', '2', '300', 'VIP',	'台北', 'S12' ],
  [ '2020/1/1', 'H', '女包1', '紅色', '300', '2', '600', 'VIP',	'台北', 'S12' ],
  [ '2020/1/1', 'H', '女包1', '紅色', '300', '2', '600', 'VIP',	'台北', 'S12' ],
  [ '2020/1/1', 'A', '女鞋', '黑色', '200', '1', '200', 'VIP', '台中', 'S16' ],
  [ '2020/1/1', 'C', '女鞋2', '藍色', '200', '1', '200', 'VVIP', '台中', 'S15' ],
  [ '2020/1/4', 'F', '皮夾', '黑色', '150', '1', '150', 'VIP', '台北', 'S13' ],
  [ '2020/1/4', 'A', '皮夾', '棕色', '200', '4', '800', 'VIP', '台中', 'S16' ],
  [ '2020/1/4', 'H', '女鞋2', '黑色', '200', '1', '200', 'VVIP', '台北', 'S13' ],
  [ '2020/1/6', 'G', '男包2', '棕色', '300', '2', '600', 'VVIP', '台北', 'S12' ],
  [ '2020/1/6', 'A', '女鞋2', '藍色', '300', '1', '300', 'VVIP', '台中', 'S12' ],
  [ '2020/1/6', 'C', '男包2', '棕色', '300', '2', '600', 'VVIP', '台中', 'S12' ],
  [ '2020/1/6', 'F', '皮夾', '藍色', '300', '1', '300', 'VVIP', '台北', 'S12' ],
  [ '2020/1/7', 'A', '女鞋2', '黑色', '200', '1', '200', 'VIP',	'台中', 'S16' ],
  [ '2020/1/7', 'G', '女包3', '紅色', '300', '3', '900', 'VVIP', '台北', 'S12' ],
]);
const pivotDataTemp = ref([]);
const pivotDataTempReset = function(){
  pivotDataTemp.value = pivotDataTemp.value.map(() => '');
  pivotDataTempIndex.value = -1;
};
watch(pivotTitle, ()=>{
  pivotDataTemp.value = pivotTitle.value.map(() => '');
}, { immediate: true });
const pivotDataTempIndex = ref(-1);
const pivotDataDelete = function(index){
  pivotData.value.splice(index, 1);
};
const pivotDataSelect = function(index){
  pivotDataTempIndex.value = index;
  pivotDataTemp.value = [...pivotData.value[index]];
};
const pivotDataAdd = function(){
  pivotData.value.push(pivotDataTemp.value);
  pivotDataTemp.value = pivotDataTemp.value.map(() => '');
  pivotDataTempIndex.value = -1;
};
const pivotDataUpdate = function(){
  pivotData.value[pivotDataTempIndex.value] = pivotDataTemp.value;
  pivotDataTemp.value = pivotDataTemp.value.map(() => '');
  pivotDataTempIndex.value = -1;
};

const pivotCols = ref(['商品種類']);
const pivotRows = ref(['顧客等級']);
const pivotValues = ref(['銷售總額', '消費日期']);

const pivotRendererName = ref('Table');
const pivotAggregatorName = ref('Sum over Sum');

const sorters = ref({
  'Day of Week': PivotUtilities.sortAs(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])
});

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

const locales = ref({
  en: {
    localeStrings: {
      renderError: 'An error occurred rendering the PivotTable results.',
      computeError: 'An error occurred computing the PivotTable results.',
      uiRenderError: 'An error occurred rendering the PivotTable UI.',
      selectAll: 'Select All',
      selectNone: 'Select None',
      tooMany: '(too many to list)',
      filterResults: 'Filter values',
      totals: 'Totals',
      vs: 'vs',
      by: 'by',
      cancel: 'Cancel',
      only: 'only'
    }
  }
});

const chartAxis = ref([]);
const chartData = ref({});
const chartType = ref('bar');
const chartTypeOption = ref({
  '長條圖': 'bar',
  '折線圖': 'line',
  '圓餅圖': 'pie'
});
const chartTypeSelect = function(val){
  chartType.value = val;
}

const chart = computed(() => {
  if(chartType.value === 'pie'){
    return chartPieType.value;
  }
  return chartAxisType.value;
});

const chartAxisDirection = ref('x');
const chartAxisDirectionOption = ref([
  {
    label: '橫軸',
    value: 'x'
  },
  {
    label: '縱軸',
    value: 'y'
  },
]);

const chartRadius = ref(4);
const chartRadiusAngle = ref('top');
const chartRadiusAngleOption = ref([
  {
    label: '頂部',
    value: 'top',
  },
  {
    label: '全部',
    value: 'all',
  },
]);

const chartLineSmooth = ref(0.5);
const chartLineSymbol = ref('circle');
const chartLineSymbolOption = ref({
  '空心圓': 'emptyCircle',
  '圓形': 'circle',
  '直角方形': 'rect',
  '圓角方形': 'roundRect',
  '三角形': 'triangle',
  '菱形': 'diamond',
  '錨點': 'pin',
  '向上箭頭': 'arrow',
  '無': 'none',
});
const chartLineSymbolSelect = function(val){
  chartLineSymbol.value = val;
};

const chartLineSymbolSize = ref(12);

const chartAxisExport = function(axisSide){
  if(chartAxisDirection.value === axisSide){
    return {
      type: 'category',
      data: chartAxis.value
    }
  } else {
    return {
      type: 'value'
    }
  }
}
const chartAxisType = computed(()=>{
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
    },
    legend: {},
    grid: {
      left: '16px',
      right: '16px',
      top: '32px',
      bottom: '16px',
      containLabel: true
    },
    xAxis: chartAxisExport('x'),
    yAxis: chartAxisExport('y'),
    series: (()=>{
      let result = [];
      Object.values(chartData.value).forEach((tree, treeIndex) => {
        Object.entries(tree).forEach((branch)=>{
          let branchName = branch[0].split('\x00').join('-');
          if(result.find(item => item.name === branchName)){
            result.find(item => item.name === branchName).data[treeIndex] = branch[1].value();
          } else {
            let data = Object.keys(chartData.value).map(item => null);
            data[treeIndex] = branch[1].value();
            result.push({
              name: branch[0].split('\x00').join('-'),
              data: data,
              type: chartType.value,
              smooth: chartLineSmooth.value,
              symbol: chartLineSymbol.value,
              symbolSize: chartLineSymbolSize.value,
              itemStyle: {
                borderRadius: (()=>{
                  if(chartRadiusAngle.value === 'top'){
                    if(chartAxisDirection.value === 'x'){
                      return [chartRadius.value, chartRadius.value, 0, 0];
                    } else {
                      return [0, chartRadius.value, chartRadius.value, 0];
                    }
                  }
                  return chartRadius.value
                })(),
              }
            });
          }
        })
      });
      return result;
    })()
  }
});

const chartPiePosition = ref([
  {
    center: [['50%', '50%']],
    radius: ['90%', 0]
  },
  {
    center: [['25%', '50%'], ['75%', '50%']],
    radius: ['90%', 0]
  },
  {
    center: [['25%', '50%'], ['75%', '50%']],
    radius: ['90%', 0]
  },
]);

const chartPieType = computed(() => {
  return {
    tooltip: {
      trigger: 'item',
    },
    legend: {},
    grid: {
      left: '16px',
      right: '16px',
      top: '32px',
      bottom: '16px',
      containLabel: true
    },
    xAxis: { show: false },
    yAxis: { show: false },
    series: (()=>{
      return Object.entries(chartData.value).reduce((arr, tree, treeIndex)=>{
        arr.push({
          name: tree[0],
          data: Object.entries(tree[1]).map(item => {
            return{
              name: item[0],
              value: item[1].value()
            }
          }),
          center: chartPiePosition.value[Object.keys(chartData.value).length - 1].center[treeIndex],
          radius: chartPiePosition.value[Object.keys(chartData.value).length - 1].radius,
          type: 'pie'
        })
        return arr;
      }, []);
    })()
  }
});

const getChartData = function(treeData){
  chartData.value = treeData;
  chartAxis.value = Object.keys(treeData)
  .map(item => item.split('\x00').join('-'))
  // .sort((a, b) => {
  //   if(a > b){
  //     return 1
  //   } else {
  //     return -1
  //   }
  // });
}

const dialogShowing = ref(true);

</script>

<style lang="scss">
.fix-buttons {
  box-shadow: 0px 0px 8px #a2b1c6, 0px 0px 8px #a2b1c6;
  border-radius: 8px 0px 0px 8px;
  .fix-button {
    transition-duration: .3s;
    color: #111;
    user-select: none;
    border-radius: 8px 0px 0px 8px;
    &:hover {
      background: #ebf0f8;
      color: #2a3f5f;
    }
  }
}

.dialog {
  background: #fff;
  >div{
    overflow: hidden;
    z-index: -1;
  }
  &.open{
    width: 100vw;
    height: 100vh;
    z-index: 10;
    background: #00000099;
    >div{
      display: block;
      height: 600px;
      width: 80vw;
      background: #fff;
      border-radius: 4px;
    }
  }
}

.dialog{
  table{
    $border-color: #a2b1c6;
    table-layout: fixed;
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
        }
      }
    }
    tbody{
      tr{
        transition-duration: .3s;
        &.selected{
          background-color: #becfe7;
        }
        &:hover{
          background-color: #ebf0f8;
        }
        td{
          border-bottom: 1px solid $border-color;
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
      }
    }
  }
}
</style>