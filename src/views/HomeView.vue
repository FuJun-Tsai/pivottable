<template>
  <div class="home">
    <HelloWorld msg="Hello World Component"/>
    <vue-pivottable-ui
    v-model="config"
    :data="[pivotTitle, ...pivotData]"
    :locale="locale"
    :locales="locales"
    :renderers="renderers"
    :aggregatorName="aggregatorName"
    :tableColorScaleGenerator="colorScaleGenerator"
    :attributes="attributes"
    :valueFilter="valueFilter"
    :rows="rows"
    :cols="cols"
    :vals="vals"
    :colLimit="100"
    :rowLimit="100"
    :async="false"
    :disabledFromDragDrop="disabledFromDragDrop"
    :sortonlyFromDragDrop="sortonlyFromDragDrop"
    :hiddenFromDragDrop="hiddenFromDragDrop"
    :sorters="sorters"
    rowOrder="key_a_to_z"
    :tableOptions="tableOptions"
    :menuLimit="10000"
    @no:filterbox="noFilterbox"
    >
      <!-- Slot ColGroup -->
      <!-- <template v-slot:colGroup>
        <colgroup>
          <col :width="300">
          <col>
        </colgroup>
      </template> -->
      <template #colGroup>
        <colgroup>
          <col :width="300">
          <col>
        </colgroup>
      </template>

      <!-- Slot Output -->
      <!-- <div v-if="loading" slot="output">
        loading...
      </div> -->
      <template #output v-if="loading">
      </template>

      <!-- Scoped Slot PvtAttr -->
      <template v-slot:pvtAttr="{ name }">
        {{ name }}
      </template>
    </vue-pivottable-ui>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { VuePivottableUi, PivotUtilities, Renderer } from '@/mixin/index.js';
import ScrollRenderer from '@/mixin/scroll-renderer';
// import PlotlyRenderer from '@/mixin/plotly-renderer'

// component
import HelloWorld from '@/components/HelloWorld.vue';

const pivotTitle = ref(['消費日期', '顧客姓名', '商品種類', '顏色', '單品價格', '銷售數量', '銷售總額', '顧客等級', '銷售店鋪', '銷售人員']);
const pivotData = ref([
  [ '2020/1/1', 'H',	'女包1', '紅色', '300', '2', '600', 'VIP',	'台北', 'S12' ],
  [ '2020/1/1', 'H',	'女包1', '紅色', '300', '2', '600', 'VIP',	'台北', 'S12' ],
  [ '2020/1/1', 'A',	'女鞋',  '黑色', '200', '1', '200', 'VIP',	'台中', 'S16' ],
  [ '2020/1/1', 'C',	'女鞋2', '藍色', '200', '1', '200', 'VVIP',	'台中', 'S15' ],
  [ '2020/1/2', 'I',	'女包1', '黑色', '300', '1', '300', 'VVIP',	'台中', 'S17' ],
  [ '2020/1/2', 'C',	'男包1', '黑色', '500', '1', '500', 'VVIP',	'台中', 'S15' ],
  [ '2020/1/3', 'H',	'皮夾',  '棕色', '150', '3', '450', 'VIP',	'台北', 'S12' ],
  [ '2020/1/3', 'H',	'女包1', '紅色', '300', '1', '300', 'VVIP',	'台北', 'S12' ],
  [ '2020/1/3', 'H',	'男包2', '棕色', '300', '1', '300', 'VVIP',	'台北', 'S12' ],
  [ '2020/1/3', 'F',	'皮夾',  '黃色', '150', '2', '300', 'VIP',	'台北', 'S14' ],
  [ '2020/1/4', 'D',	'皮夾',  '黑色', '150', '2', '300', 'VIP',	'台中', 'S15' ],
  [ '2020/1/4', 'D',	'男包3', '黑色', '400', '1', '400', 'VIP',	'台中', 'S15' ],
  [ '2020/1/4', 'F',	'皮夾',  '黑色', '150', '1', '150', 'VIP',	'台北', 'S13' ],
  [ '2020/1/4', 'A',	'皮夾',  '棕色', '200', '4', '800', 'VIP',	'台中', 'S16' ],
  [ '2020/1/4', 'H',	'女鞋2', '黑色', '200', '1', '200', 'VVIP',	'台北', 'S13' ],
  [ '2020/1/4', 'H',	'女鞋2', '藍色', '200', '1', '200', 'VVIP',	'台北', 'S13' ],
  [ '2020/1/4', 'H',	'女鞋2', '紅色', '200', '1', '200', 'VVIP',	'台北', 'S13' ],
  [ '2020/1/4', 'H',	'皮夾',  '黃色', '150', '2', '300', 'VVIP',	'台北', 'S13' ],
  [ '2020/1/5', 'A',	'女包1', '黑色', '300', '2', '600', 'VIP',	'台中', 'S16' ],
  [ '2020/1/6', 'A',	'女包2', '黑色', '400', '1', '400', 'VIP',	'台中', 'S17' ],
  [ '2020/1/6', 'F',	'女鞋',  '黑色', '200', '1', '200', 'VIP',	'台北', 'S14' ],
  [ '2020/1/6', 'G',	'男包2', '棕色', '300', '1', '300', 'VVIP',	'台北', 'S12' ],
  [ '2020/1/7', 'A',	'女鞋2', '黑色', '200', '1', '200', 'VIP',	'台中', 'S16' ],
  [ '2020/1/7', 'G',	'女包3', '紅色', '300', '3', '900', 'VVIP',	'台北', 'S12' ],
]);

const sorters = computed(() => {
  return {
    'Day of Week': PivotUtilities.sortAs(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])
  }
});

const locales = computed(() => {
  return {
    fr: PivotUtilities.locales.fr,
    en: PivotUtilities.locales.en,
    ko: {
      aggregators: aggregators.value,
      localeStrings: {
        renderError: '피벗 테이블 결과를 렌더링하는 동안 오류가 발생 했습니다.',
        computeError: '피벗 테이블 결과를 계산하는 동안 오류가 발생 했습니다.',
        uiRenderError: '피벗 테이블 UI를 렌더링하는 동안 오류가 발생 했습니다.',
        selectAll: '모두 선택',
        selectNone: '선택 안함',
        tooMany: '표시 할 값이 너무 많습니다.',
        filterResults: '값 필터링',
        totals: '합계',
        only: '단독',
        vs: 'vs',
        by: 'by'
      }
    }
  }
});

const aggregators = computed(() => {
  const usFmt = PivotUtilities.numberFormat()
  const usFmtInt = PivotUtilities.numberFormat({ digitsAfterDecimal: 0 })
  const usFmtPct = PivotUtilities.numberFormat({
    digitsAfterDecimal: 1,
    scaler: 100,
    suffix: '%'
  })

  return {
    Count: PivotUtilities.aggregatorTemplates.count(usFmtInt),
    'Count Unique Values': PivotUtilities.aggregatorTemplates.countUnique(usFmtInt),
    'List Unique Values': PivotUtilities.aggregatorTemplates.listUnique(', '),
    Sum: PivotUtilities.aggregatorTemplates.sum(usFmt),
    'Integer Sum': PivotUtilities.aggregatorTemplates.sum(usFmtInt),
    Average: PivotUtilities.aggregatorTemplates.average(usFmt),
    Median: PivotUtilities.aggregatorTemplates.median(usFmt),
    'Sample Variance': PivotUtilities.aggregatorTemplates.var(1, usFmt),
    'Sample Standard Deviation': PivotUtilities.aggregatorTemplates.stdev(1, usFmt),
    Minimum: PivotUtilities.aggregatorTemplates.min(usFmt),
    Maximum: PivotUtilities.aggregatorTemplates.max(usFmt),
    First: PivotUtilities.aggregatorTemplates.first(usFmt),
    Last: PivotUtilities.aggregatorTemplates.last(usFmt),
    'Sum over Sum': PivotUtilities.aggregatorTemplates.sumOverSum(usFmt),
    'Sum as Fraction of Total': PivotUtilities.aggregatorTemplates.fractionOf(PivotUtilities.aggregatorTemplates.sum(), 'total', usFmtPct),
    'Sum as Fraction of Rows': PivotUtilities.aggregatorTemplates.fractionOf(PivotUtilities.aggregatorTemplates.sum(), 'row', usFmtPct),
    'Sum as Fraction of Columns': PivotUtilities.aggregatorTemplates.fractionOf(PivotUtilities.aggregatorTemplates.sum(), 'col', usFmtPct),
    'Count as Fraction of Total': PivotUtilities.aggregatorTemplates.fractionOf(PivotUtilities.aggregatorTemplates.count(), 'total', usFmtPct),
    'Count as Fraction of Rows': PivotUtilities.aggregatorTemplates.fractionOf(PivotUtilities.aggregatorTemplates.count(), 'row', usFmtPct),
    'Count as Fraction of Columns': PivotUtilities.aggregatorTemplates.fractionOf(PivotUtilities.aggregatorTemplates.count(), 'col', usFmtPct)
  }
});

const renderers = computed(() => {
  const TableRenderer = Renderer.TableRenderer;
  return {
    Table: TableRenderer.Table,
    'Scroll Table': ScrollRenderer.Table,
    'Table Heatmap': ScrollRenderer['Table Heatmap'],
    'Table Col Heatmap': TableRenderer['Table Col Heatmap'],
    'Table Row Heatmap': TableRenderer['Table Row Heatmap'],
    'Export Table TSV': TableRenderer['Export Table TSV'],
    // 'Grouped Column Chart': PlotlyRenderer['Grouped Column Chart'],
    // 'Stacked Column Chart': PlotlyRenderer['Stacked Column Chart'],
    // 'Grouped Bar Chart': PlotlyRenderer['Grouped Bar Chart'],
    // 'Stacked Bar Chart': PlotlyRenderer['Stacked Bar Chart'],
    // 'Line Chart': PlotlyRenderer['Line Chart'],
    // 'Dot Chart': PlotlyRenderer['Dot Chart'],
    // 'Area Chart': PlotlyRenderer['Area Chart'],
    // 'Scatter Chart': PlotlyRenderer['Scatter Chart'],
    // 'Multiple Pie Chart': PlotlyRenderer['Multiple Pie Chart']
  }
});
</script>
<style lang="scss" scoped>
@import '@/mixin/vue-pivottable.css';
</style>
