<template>
  <div>
    <h2>thePivottableUI</h2>
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
    >
    </PivottableUi>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import PivottableUi from '@/components/PivottableUi';
import { PivotUtilities } from '@/mixin/index';

const pivotTitle = ref(['消費日期', '顧客姓名', '商品種類', '顏色', '單品價格', '銷售數量', '銷售總額', '顧客等級', '銷售店鋪', '銷售人員']);
const pivotData = ref([
  [ '2020/1/1', 'H',	'女包1', '紅色', '200', '2', '400', 'VIP',	'台北', 'S12' ],
  [ '2020/1/1', 'H',	'女包1', '紅色', '150', '2', '300', 'VIP',	'台北', 'S12' ],
  [ '2020/1/1', 'H',	'女包1', '紅色', '300', '2', '600', 'VIP',	'台北', 'S12' ],
  [ '2020/1/1', 'H',	'女包1', '紅色', '300', '2', '600', 'VIP',	'台北', 'S12' ],
  [ '2020/1/1', 'A',	'女鞋',  '黑色', '200', '1', '200', 'VIP',	'台中', 'S16' ],
  [ '2020/1/1', 'C',	'女鞋2', '藍色', '200', '1', '200', 'VVIP',	'台中', 'S15' ],
  [ '2020/1/4', 'F',	'皮夾',  '黑色', '150', '1', '150', 'VIP',	'台北', 'S13' ],
  [ '2020/1/4', 'A',	'皮夾',  '棕色', '200', '4', '800', 'VIP',	'台中', 'S16' ],
  [ '2020/1/4', 'H',	'女鞋2', '黑色', '200', '1', '200', 'VVIP',	'台北', 'S13' ],
  [ '2020/1/6', 'G',	'男包2', '棕色', '300', '1', '300', 'VVIP',	'台北', 'S12' ],
  [ '2020/1/7', 'A',	'女鞋2', '黑色', '200', '1', '200', 'VIP',	'台中', 'S16' ],
  [ '2020/1/7', 'G',	'女包3', '紅色', '300', '3', '900', 'VVIP',	'台北', 'S12' ],
]);

const pivotCols = ref(['消費日期', '商品種類']);
const pivotRows = ref(['顧客等級']);
const pivotValues = ref(['銷售總額']);

const pivotRendererName = ref('Table');
const pivotAggregatorName = ref('Count');

const sorters = ref({
  'Day of Week': PivotUtilities.sortAs(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])
});

const aggregatorlocale = ref({
  'Count': '筆數',
  'Count Unique Values': '不同結果的筆數',
  'List Unique Values': '列出項目',
  'Sum': '加總',
  'Integer Sum': '整數加總',
  'Average': '平均',
  'Median': '中位數',
  'Sample Variance': '樣本變異數',
  'Sample Standard Deviation': '樣本標準差',
  'Minimum': '最小值',
  'Maximum': '最大值',
  'First': '採計第一筆',
  'Last': '採計最後一筆',
  'Sum over Sum': '總和',
  'Sum as Fraction of Total': '總計百分比',
  'Sum as Fraction of Rows': '列總計百分比',
  'Sum as Fraction of Columns': '欄總計百分比',
  'Count as Fraction of Total': '筆數百分比',
  'Count as Fraction of Rows': '列筆數百分比',
  'Count as Fraction of Columns': '欄筆數百分比',
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
</script>