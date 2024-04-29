<template>
  <table class="pvtUi">
    <tbody>
      <tr>
        <td class="pvtRenderers">
          <theDropdown
          :values="Object.keys(rendererOption)"
          :value="rendererName"
          @handleChange="handleChange"
          >
          </theDropdown>
        </td>
        <td class="pvtAxisContainer pvtUnused pvtHorizList">
          <VueDraggable
          style="display: flex; justify-content: center; gap: 4px;"
          v-model="titles"
          group="keys"
          >
            <DraggableAttribute
            v-for="item in titles"
            :name="item"
            :key="item"
            >
              {{ item }}
            </DraggableAttribute>
          </VueDraggable>
        </td>
      </tr>
      <tr>
        <td class="pvtAxisContainer pvtVals">
          <VueDraggable
          style="display: flex; justify-content: center; gap: 4px;"
          v-model="vals"
          group="keys"
          >
            <DraggableAttribute
            v-for="item in vals"
            :name="item"
            :key="item"
            >
              {{ item }}
            </DraggableAttribute>
          </VueDraggable>
        </td>
        <td class="pvtAxisContainer pvtHorizList pvtCols">
          <VueDraggable
          style="display: flex; justify-content: center; gap: 4px;"
          v-model="cols"
          group="keys"
          >
            <DraggableAttribute
            v-for="item in cols"
            :name="item"
            :key="item"
            :attrValues="[1, 2, 3]"
            :valueFilter="[1, 2]"
            >
              {{ item }}
            </DraggableAttribute>
          </VueDraggable>
        </td>
      </tr>
      <tr>
        <td class="pvtAxisContainer pvtVertList pvtRows">
          <VueDraggable v-model="rows" group="keys">
            <DraggableAttribute
            v-for="item in rows"
            :name="item"
            :key="item"
            :attrValues="[1, 2, 3]"
            :valueFilter="[1, 2]"
            >
              {{ item }}
            </DraggableAttribute>
          </VueDraggable>
        </td>
        <td>
          <TableRenderer
          :title="props.title"
          :data="props.data"
          :rendererName="rendererName"
          :aggregatorName="props.aggregatorName"
          :cols="props.cols"
          :rows="props.rows"
          :vals="props.vals"
          :rowTotal="props.rowTotal"
          :colTotal="props.colTotal"
          :sorters="props.sorters"
          :locales="props.locales"
          :locale="props.locale"
          >
          </TableRenderer>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script setup>
import { defineProps, ref } from 'vue';
import theDropdown from './theDropdown.vue';
import TableRenderer from './TableRenderer.vue';
import DraggableAttribute from './DraggableAttribute.vue';
import { VueDraggable } from 'vue-draggable-plus';
import { aggregators } from './../helper/utils';
import ScrollRenderer from '@/mixin/scroll-renderer';

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
    default: ()=>{aggregators}
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
});

const titles = ref([]);
titles.value = props.title.filter(item => [...props.cols, ...props.rows, ...props.vals].includes(item) === false);
const cols = ref(props.cols);
const rows = ref(props.rows);
const vals = ref(props.vals);

// rendererOption
const rendererOption = ref({
  'Table': TableRenderer.Table,
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
});

// rendererName
const rendererName = ref(props.rendererName);

const handleChange = function(val){
  rendererName.value = val;
}
</script>
<style>
.pvtUi{
  margin: 0 auto;
}
</style>