<template>
  <div>
    <h2 style="margin: 0px;">thePivottableUI</h2>
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
      <div
      style="min-height: 400px; height: 400px; flex: auto"
      v-if="chartShowing"
      >
        <v-chart
        :option="chart"
        :style="{ width: '100%', height: '100%' }"
        autoresize
        />
      </div>
      <div style="flex: 0 0 200px;">
        圖表類型
        <theDropdown
        style="margin-bottom: 8px;"
        :values="chartTypeOption"
        :value="chartType"
        @handleChange="chartTypeSelect"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, provide, computed } from 'vue';
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
  [ '2020/1/6', 'G', '男包2', '棕色', '300', '1', '300', 'VVIP', '台北', 'S12' ],
  [ '2020/1/7', 'A', '女鞋2', '黑色', '200', '1', '200', 'VIP',	'台中', 'S16' ],
  [ '2020/1/7', 'G', '女包3', '紅色', '300', '3', '900', 'VVIP', '台北', 'S12' ],
]);

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
chartPiePosition
const chartPieType = computed(() => {
  return {
    tooltip: {
      trigger: 'item',
    },
    legend: {},
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

const chartAxisType = computed(()=>{
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
    },
    legend: {},
    xAxis: {
      type: 'category',
      data: chartAxis.value
    },
    yAxis: {
      type: 'value'
    },
    series: (()=>{
      let result = [];
      Object.values(chartData.value).forEach((tree, treeIndex) => {
        Object.entries(tree).forEach((branch)=>{
          if(result.find(item => item.name === branch[0])){
            result.find(item => item.name === branch[0]).data[treeIndex] = branch[1].value();
          } else {
            let data = Object.keys(chartData.value).map(item => null);
            data[treeIndex] = branch[1].value();
            result.push({
              name: branch[0].split('\x00').join('-'),
              data: data,
              type: chartType.value,
            });
          }
        })
      });
      return result;
    })()
  }
});

const chartShowing = ref(true);
const getChartData = function(treeData){
  console.log(treeData)
  chartData.value = treeData;
  chartAxis.value = Object.keys(treeData).map(item => item.split('\x00').join('-'));
}
</script>