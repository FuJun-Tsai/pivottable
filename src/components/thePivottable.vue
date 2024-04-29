<template>
  <div
  style="display: block; width: 100%; overflow-x: auto"
  :style="{
    'max-width': this.tableMaxWidth ? `${this.tableMaxWidth}px` : undefined
  }"
  >
    <TableRenderer
    :title="props.title"
    :data="props.data"
    :rendererName="props.rendererName"
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
  </div>
</template>
<script setup>
import { defineProps, ref } from 'vue';
import TableRenderer from './TableRenderer.vue';
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

</script>