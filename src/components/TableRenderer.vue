<template>
  <table class="pvtTable">
    <thead>
      <tr
      v-for="(col, colIndex) in pivotData.props.cols"
      :key="col"
      >
        <th
        class="pvtAxisLabel"
        v-if="colIndex === 0 && pivotData.props.rows.length > 0"
        :colspan="pivotData.props.rows.length"
        :rowspan="pivotData.props.cols.length"
        >
        </th>
        <th class="pvtAxisLabel">
          {{ col }}
        </th>
        <template
        v-for="(colKey, colKeyIndex) in pivotData.getColKeys()"
        :key="colKey"
        >
          <th
          class="pvtColLabel"
          v-if="spanSize(pivotData.getColKeys(), colKeyIndex, colIndex) > -1"
          :colspan="spanSize(pivotData.getColKeys(), colKeyIndex, colIndex)"
          :rowSpan="colIndex === pivotData.props.cols.length - 1 && pivotData.props.rows.length !== 0 ? 2 : 1"
          >
            {{ colKey[colIndex] }}
          </th>
        </template>
        <th
        class="pvtTotalLabel"
        v-if="pivotData.props.rowTotal"
        :rowSpan="colIndex === pivotData.props.cols.length - 1 && pivotData.props.rows.length !== 0 ? 2 : 1"
        >
          total
        </th>
      </tr>
      <tr v-if="pivotData.rowKeys.length !== 0">
        <th
        class="pvtAxisLabel"
        v-for="row in pivotData.props.rows"
        :key="row"
        >
          {{ row }}
        </th>
        <th
        v-if="pivotData.props.rowTotal"
        class="pvtTotalLabel"
        >
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, rowIndex) in pivotData.rowKeys" :key="row">
        <template v-for="(text, textIndex) in row" :key="text">
          <th
          class="pvtRowLabel"
          v-if="spanSize(pivotData.rowKeys, rowIndex, textIndex) > -1"
          :rowSpan="spanSize(pivotData.rowKeys, rowIndex, textIndex)"
          :colSpan="textIndex === pivotData.props.rows.length - 1 && pivotData.props.cols.length !== 0 ? 2 : 1"
          >
            {{ text }}
          </th>
        </template>
        <td
        class="pvVal"
        v-for="col in pivotData.colKeys"
        :key="col"
        :style="valueCellColors(row, col, pivotData.getAggregator(row, col).value())"
        >
          {{ pivotData.getAggregator(row, col).format(pivotData.getAggregator(row, col).value()) }}
        </td>
        <td
        class="pvtTotal"
        v-if="pivotData.props.rowTotal"
        :style="colTotalColors(pivotData.getAggregator(row, []))"
        >
          {{ pivotData.getAggregator(row, []).format(pivotData.getAggregator(row, []).value()) }}
        </td>
      </tr>
      <tr v-if="pivotData.props.colTotal">
        <th
        class="pvtTotalLabel"
        :colSpan="pivotData.props.rows.length + (pivotData.props.cols.length === 0 ? 0 : 1)"
        >
          total
        </th>
        <td
        class="pvtTotal"
        v-for="col in pivotData.colKeys"
        :key="col"
        :style="rowTotalColors(pivotData.getAggregator([], col).value())"
        >
          {{ pivotData.getAggregator([], col).format(pivotData.getAggregator([], col).value()) }}
        </td>
        <td
        class="pvtGrandTotal"
        v-if="pivotData.props.colTotal && pivotData.props.rowTotal"
        >
          {{ pivotData.getAggregator([], []).format(pivotData.getAggregator([], []).value()) }}
        </td>
      </tr>
    </tbody>
  </table>
  <p style="padding: 12px;" v-if="props.aggregatorName !== 'List Unique Values'">
    <span class="exportBtn" @click="treeDataExport">輸出圖表</span>
  </p>
</template>
<script setup>
import { defineProps, defineEmits, computed } from 'vue';
import { PivotData } from '@/helper/utils';
import { aggregators } from './../helper/utils';

const props = defineProps({
  title: {
    type: Array,
    required: true
  },
  data: {
    type: Array,
    required: true
  },
  cols: {
    type: Array,
  },
  rows: {
    type: Array,
  },
  vals: {
    type: Array,
  },
  rowTotal: {
    type: Boolean,
    default: true
  },
  colTotal: {
    type: Boolean,
    default: true
  },
  renderers: {
    type: Object
  },
  rendererName: {
    type: String,
    default: 'Table'
  },
  aggregators: {
    type: Object,
    default: ()=>{ return aggregators}
  },
  aggregatorName: {
    type: String,
    default: 'Count'
  },
  heatmapMode: {
    type: String
  },
  sorters: {
    type: [Function, Object],
    default: function () {
      return {}
    }
  },
  tableOptions: {
    type: Object,
    default: function () {
      return {}
    }
  },
  tableColorScaleGenerator: {
    type: Function
  },
  attributes: {
    type: Array,
    default: function () {
      return []
    }
  },
  valueFilter: {
    type: Object,
    default: function () {
      return {}
    }
  },
  derivedAttributes: {
    type: [Function, Object],
    default: function () {
      return {}
    }
  },
  rowOrder: {
    type: String,
    default: 'key_a_to_z',
    validator: function (value) {
      return ['key_a_to_z', 'value_a_to_z', 'value_z_to_a'].indexOf(value) !== -1
    }
  },
  colOrder: {
    type: String,
    default: 'key_a_to_z',
    validator: function (value) {
      return ['key_a_to_z', 'value_a_to_z', 'value_z_to_a'].indexOf(value) !== -1
    }
  },
  tableMaxWidth: {
    type: Number,
    default: 0,
    validator: function (value) {
      return value >= 0
    }
  },
  colLimit: {
    type: Number,
    default: 100
  },
  rowLimit: {
    type: Number,
    default: 100
  },
  locales: {
    type: Object
  },
  locale: {
    type: String
  },
  // heatmapMode: {
  //   type: String
  // },
  // tableColorScaleGenerator: {
  //   type: Function,
  //   default: function(values) {
  //     const min = Math.min.apply(Math, values)
  //     const max = Math.max.apply(Math, values)
  //     return x => {
  //       // eslint-disable-next-line no-magic-numbers
  //       const nonRed = 255 - Math.round(255 * (x - min) / (max - min))
  //       return { backgroundColor: `rgb(255, ${nonRed}, ${nonRed})` }
  //     }
  //   }
  // },
  // tableOptions: {
  //   type: Object,
  //   default: function () {
  //     return {
  //       clickCallback: null
  //     }
  //   }
  // },
  localeStrings: {
    type: Object,
    default: function () {
      return {
        totals: 'Totals'
      }
    }
  }
});
const emits = defineEmits(['treeDataExport']);

const pivotData = computed(()=>{
  let obj = JSON.parse(JSON.stringify(props));
  obj.data = [obj.title, ...obj.data];
  obj.aggregators = aggregators;

  return new PivotData(obj);
});

const treeData = computed(()=>pivotData.value && pivotData.value.tree);
const treeDataExport = function(){
  emits('treeDataExport', treeData.value);
};

const spanSize = function(arr, i, j){
  // helper function for setting row/col-span in pivotTableRenderer
  let x
  if (i !== 0) {
    let asc, end
    let noDraw = true
    for (
      x = 0, end = j, asc = end >= 0;
      asc ? x <= end : x >= end;
      asc ? x++ : x--
    ) {
      if (arr[i - 1][x] !== arr[i][x]) {
        noDraw = false
      }
    }
    if (noDraw) {
      return -1
    }
  }
  let len = 0
  while (i + len < arr.length) {
    let asc1, end1
    let stop = false
    for (
      x = 0, end1 = j, asc1 = end1 >= 0;
      asc1 ? x <= end1 : x >= end1;
      asc1 ? x++ : x--
    ) {
      if (arr[i][x] !== arr[i + len][x]) {
        stop = true
      }
    }
    if (stop) {
      break
    }
    len++
  }
  return len
};

// eslint-disable-next-line no-unused-vars
let valueCellColors = () => { }
// eslint-disable-next-line no-unused-vars
let rowTotalColors = () => { }
// eslint-disable-next-line no-unused-vars
let colTotalColors = () => { }

</script>
<style lang="scss">
@import '@/mixin/vue-pivottable.css';
.pvtTable{
  margin: 0 auto;
}
</style>