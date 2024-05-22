<template>
  <div
  class="mx-auto"
  style="max-width: 1200px;"
  >
    <div class="border mb-2 p-2">
      <p class="text-center mb-0">所有欄位</p>
      <VueDraggable
      class="d-flex justify-content-center"
      style="gap: 4px;"
      v-model="titles"
      :group="{name: 'keys', pull: 'clone', put: false}"
      handle=".pvtAttr"
      preventOnFilter="false"
      >
        <DraggableAttribute
        v-for="item in props.title"
        :name="item"
        :key="item"
        :option="valueFilter[item]"
        :filterOpening="filterOpen[item]"
        :isBtnsPanel="true"
        @filterToggle="filterToggle"
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
        class="d-flex flex-column align-items-center"
        style="gap: 4px;"
        v-model="rows"
        group="keys"
        handle=".pvtAttr"
        preventOnFilter="false"
        >
          <DraggableAttribute
          v-for="item in rows"
          :name="item"
          :key="item"
          :option="valueFilter[item]"
          :filterOpening="filterOpen[item]"
          :isBtnsPanel="false"
          @filterToggle="filterToggle"
          @valueFilterUpdate="valueFilterUpdate"
          @dragBtnDelete="dragBtnDelete($event, 'rows')"
          >
            {{ item }}
          </DraggableAttribute>
        </VueDraggable>
      </div>

      <div class="border p-2" style="flex: 1 1 auto">
        <div class="d-flex mb-3">

          <div style="flex: 1 1 auto">
            <div class="mb-2">
              <p class="text-center mb-0">欄標籤</p>
              <VueDraggable
              class="d-flex justify-content-center h-100"
              style="gap: 4px; min-height: 36px;"
              v-model="pivottableSetting[pivottableIndex - 1].cols"
              group="keys"
              handle=".pvtAttr"
              preventOnFilter="false"
              >
                <DraggableAttribute
                v-for="item in pivottableSetting[pivottableIndex - 1].cols"
                :name="item"
                :key="item"
                :option="valueFilter[item]"
                :filterOpening="filterOpen[item]"
                :isBtnsPanel="false"
                @filterToggle="filterToggle"
                @valueFilterUpdate="valueFilterUpdate"
                @dragBtnDelete="dragBtnDelete($event, 'cols')"
                >
                  {{ item }}
                </DraggableAttribute>
              </VueDraggable>
            </div>
            <div>
              <TableRenderer
              v-for="index in pivottableSetting.length"
              v-show="index === pivottableIndex"
              :key="index"

              :title="props.title"
              :data="props.data"
              :rendererName="rendererName"
              :aggregatorName="pivottableSetting[index - 1].aggregator"
              :cols="pivottableSetting[index - 1].cols"
              :rows="rows"
              :vals="pivottableSetting[index - 1].values"
              :valueFilter="valueFilter"
              :rowTotal="props.rowTotal"
              :colTotal="props.colTotal"
              :sorters="props.sorters"
              :locales="props.locales"
              :locale="props.locale"
              @treeDataExport="treeDataExport($event, index - 1)"
              />
            </div>
          </div>

          <div style="flex: 0 0 200px">
            <p class="text-center mb-0">統計方式</p>
            <theDropdown
            style="margin-bottom: 8px;"
            :values="props.aggregatorlocale"
            :value="pivottableAggregator"
            @handleChange="aggregatorSelect"
            />
            <p class="text-center mb-0">統計值</p>
            <div class="d-flex align-items-center flex-nowrap" style="gap: 4px;">
              <span
              v-if="pivottableSetting[pivottableIndex - 1].aggregator === 'Sum over Sum'"
              class="text-nowrap"
              >
                分子
              </span>
              <theDropdown
              v-if="['Count as Fraction of Total', 'Count as Fraction of Rows', 'Count as Fraction of Column'].includes(pivottableSetting[pivottableIndex - 1].aggregator) === false"
              style="margin-bottom: 8px;"
              :values="titleOption"
              :value="pivottableSetting[pivottableIndex - 1].values[0]"
              @handleChange="titleSelect($event, 0)"
              />
            </div>

            <div class="d-flex align-items-center flex-nowrap" style="gap: 4px;">
              <span
              v-if="pivottableSetting[pivottableIndex - 1].aggregator === 'Sum over Sum'"
              class="text-nowrap"
              >
                分母
              </span>
              <theDropdown
              v-if="pivottableSetting[pivottableIndex - 1].aggregator === 'Sum over Sum'"
              style="margin-bottom: 8px;"
              :values="titleOption"
              :value="pivottableSetting[pivottableIndex - 1].values[1]"
              @handleChange="titleSelect($event, 1)"
              />
            </div>
          </div>

        </div>
        <n-pagination
        class="justify-content-center"
        v-model:page="pivottableIndex"
        :page-count="pivottableSetting.length"
        />
      </div>

    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, computed } from 'vue';
import theDropdown from './theDropdown.vue';
import TableRenderer from './TableRenderer.vue';
import DraggableAttribute from './DraggableAttribute.vue';
import { VueDraggable } from 'vue-draggable-plus';
import { aggregators } from './../helper/utils';
import ScrollRenderer from '@/mixin/scroll-renderer';
// import PlotlyRenderer from '@/mixin/plotly-renderer';

const props = defineProps({
  title: {
    type: Array,
    required: true
  },
  data: {
    type: Array,
    required: true
  },
  rows: {
    type: Array,
  },
  pivotSetting: {
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
const emits = defineEmits(['treeDataExport']);


const titleOption = props.title.reduce((obj, item) => {
  obj[item] = item;
  return obj;
}, {});
const titleSelect = function(title, index){
  pivottableSetting.value[pivottableIndex.value - 1].values[index] = title;
}

const titles = ref(props.title);
const rows = ref(props.rows);

const pivottableIndex = ref(1);
const pivottableSetting = ref(props.pivotSetting);
const pivottableAggregator = computed(() => pivottableSetting.value[pivottableIndex.value - 1].aggregator)

const filterOpen = ref({});
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
  valueFilter.value[obj.title] = obj.valueFilter;
}

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

const rendererName = ref(props.rendererName);

const rendererSelcet = function(val){
  rendererName.value = val;
}

const aggregatorSelect = function(val){
  pivottableSetting.value[pivottableIndex.value - 1].aggregator = val;
  // aggregatorName.value = val;
};

const treeDataExport = function(val, valIndex){
  let obj = {
    index: valIndex,
    value: val,
  }
  emits('treeDataExport', obj);
}

const dragBtnDelete = function(name, position){
  if(position === 'rows'){
    rows.value = rows.value.filter(item => item !== name);
  } else {
    pivottableSetting.value[pivottableIndex.value - 1].cols = pivottableSetting.value[pivottableIndex.value - 1].cols.filter(item => item !== name);
  }
}
</script>

<style>
</style>