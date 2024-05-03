<template>
  <table class="pvtUi">
    <tbody>
      <tr>
        <td
        class="pvtRenderers"
        @click.self="filterAllClose"
        >
          <!-- rendererName -->
          <template v-if="false">
            <span>呈現方式</span>
            <theDropdown
            :values="Object.keys(rendererOption)"
            :value="rendererName"
            @handleChange="rendererSelcet"
            >
            </theDropdown>
          </template>
        </td>
        <td
        class="pvtAxisContainer pvtUnused pvtHorizList"
        @click.self="filterAllClose"
        >
          <span>欄位</span>
          <VueDraggable
          style="display: flex; justify-content: center; gap: 4px;"
          v-model="titles"
          group="keys"
          filter=".pvtFilterBox"
          preventOnFilter="false"
          >
            <DraggableAttribute
            v-for="item in titles"
            :name="item"
            :key="item"
            :option="valueFilter[item]"
            :filterOpening="filterOpen[item]"
            @filterToggle="filterToggle"
            @valueFilterUpdate="valueFilterUpdate"
            >
              {{ item }}
            </DraggableAttribute>
          </VueDraggable>
        </td>
      </tr>
      <tr>
        <td
        class="pvtAxisContainer pvtVals"
        @click.self="filterAllClose"
        >
          <!-- aggregatorName -->
          <span>統計方式</span>
          <theDropdown
          style="margin-bottom: 8px;"
          :values="Object.keys(aggregators)"
          :value="aggregatorName"
          :locale="props.aggregatorlocale"
          @handleChange="aggregatorSelect"
          >
          </theDropdown>
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
        <td
        class="pvtAxisContainer pvtHorizList pvtCols"
        @click.self="filterAllClose"
        >
          <span>欄標籤</span>
          <VueDraggable
          style="display: flex; justify-content: center; gap: 4px;"
          v-model="cols"
          group="keys"
          >
            <DraggableAttribute
            v-for="item in cols"
            :name="item"
            :key="item"
            :option="valueFilter[item]"
            :filterOpening="filterOpen[item]"
            @filterToggle="filterToggle"
            >
              {{ item }}
            </DraggableAttribute>
          </VueDraggable>
        </td>
      </tr>
      <tr>
        <td
        class="pvtAxisContainer pvtVertList pvtRows"
        @click.self="filterAllClose"
        >
          <span>列標籤</span>
          <VueDraggable
          style="display: flex; flex-direction: column; justify-content: center; gap: 4px;"
          v-model="rows"
          group="keys"
          >
            <DraggableAttribute
            v-for="item in rows"
            :name="item"
            :key="item"
            :option="valueFilter[item]"
            :filterOpening="filterOpen[item]"
            @filterToggle="filterToggle"
            >
              {{ item }}
            </DraggableAttribute>
          </VueDraggable>
        </td>
        <td
        style="border: 1px solid #a2b1c6;"
        @click.self="filterAllClose"
        >
          <TableRenderer
          :title="props.title"
          :data="props.data"
          :rendererName="rendererName"
          :aggregatorName="aggregatorName"
          :cols="props.cols"
          :rows="props.rows"
          :vals="props.vals"
          :valueFilter="valueFilter"
          :filterOpen="props.filterOpen"
          :rowTotal="props.rowTotal"
          :colTotal="props.colTotal"
          :sorters="props.sorters"
          :locales="props.locales"
          :locale="props.locale"
          @treeDataExport="treeDataExport"
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
  aggregatorlocale: {
    type: Object,
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

const filterOpen = ref({});
filterOpen.value = {};
filterOpen.value = props.title.reduce((obj, title) => {
  obj[title] = false;
  return obj
}, {});
const filterToggle = function(obj){
  filterOpen.value[obj.title] = obj.isOpen;
}
const filterAllClose = function(){
  for(let title in filterOpen.value){
    filterOpen.value[title] = false;
  }
}

const valueFilter = ref({});
valueFilter.value = props.title.reduce((titleObj, title, titleIndex) => {
  titleObj[title] = props.data.reduce((dataObj, data) => {
    dataObj[data[titleIndex]] = false;
    return dataObj;
  }, {});
  return titleObj;
}, {});
const valueFilterUpdate = function(obj){
  valueFilter.value[obj.title][obj.key] = !valueFilter.value[obj.title][obj.key];
}

const rendererOption = ref({
  // 'Table': TableRenderer.Table,
  'Scroll Table': ScrollRenderer.Table,
  'Table Heatmap': ScrollRenderer['Table Heatmap'],
  // 'Table Col Heatmap': TableRenderer['Table Col Heatmap'],
  // 'Table Row Heatmap': TableRenderer['Table Row Heatmap'],
  // 'Export Table TSV': TableRenderer['Export Table TSV'],
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

const rendererName = ref(props.rendererName);

const aggregatorName = ref(props.aggregatorName);

const rendererSelcet = function(val){
  rendererName.value = val;
}

const aggregatorSelect = function(val){
  aggregatorName.value = val;
}

const treeDataExport = function(val){
  console.log(val);
}

</script>
<style>
.pvtUi{
  margin: 0 auto;
}
</style>