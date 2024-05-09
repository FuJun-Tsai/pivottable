<template>
  <div
  :data-id="disabled === false ? props.name : null"
  >
    <span
    class="pvtAttr"
    :class="{
      'pvtFilteredAttribute': Object.keys(props.valueFilter).length !== 0,
      'sortonly': sortonly,
      'disabled': disabled
    }"
    >
      <span>
        {{ name }}
      </span>
      <span
      class="pvtTriangle"
      @click="toggleFilterBox($event)"
      >
        ▾
      </span>
    </span>
    <div
    v-if="filterOpening === true"
    class="pvtFilterBox"
    style="padding: 4px;"
    >
      <div
      class="pvtSearchContainer"
      style="display: flex; justify-content: center; gap: 4px; margin-bottom: 4px;"
      >
        <input
        type="text"
        class="pvtSearch"
        placeholder="文字篩選"
        v-model="filterText"
        >
        <button
        class="pvtButton"
        style="flex: 0 0 42px;"
        @click="filterText = ''"
        >
          清除
        </button>
      </div>
      <div style="display: flex; justify-content: center; gap: 4px; margin-bottom: 4px;">
        <button class="pvtButton">
          全選
        </button>
        <button class="pvtButton">
          清空
        </button>
      </div>
      <div class="pvtCheckContainer">
        <label
        v-for="(value, key) in option"
        :key="key"
        :for="key"
        style="display: block; width: 100%;"
        @click.self="valueFilterUpdate(key)"
        >
          <input
          type="checkbox"
          :id="key"
          :checked="value === false"
          @click="valueFilterUpdate(key)"
          >
          <span>{{ key }}</span>
        </label>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineProps, defineEmits, computed, ref } from 'vue';

const props = defineProps({
  sortable: {
    type: Boolean,
    default: true
  },
  draggable: {
    type: Boolean,
    default: true
  },
  name: {
    type: String,
    required: true
  },
  attrValues: {
    type: Object,
    required: false
  },
  valueFilter: {
    type: Object,
    default: function () {
      return {}
    }
  },
  sorter: {
    type: Function,
    // required: true
  },
  localeStrings: {
    type: Object,
    default: function () {
      return {
        selectAll: 'Select All',
        selectNone: 'Select None',
        tooMany: '(too many to list)', // too many values to show
        filterResults: 'Filter values',
        only: 'only'
      }
    }
  },
  menuLimit: {
    type: Number,
  },
  zIndex: {
    type: Number,
  },
  async: {
    type: Boolean,
  },
  unused: {
    type: Boolean
  },

  option: {
    type: Object
  },
  filterOpening: {
    type: Boolean
  }
});
const emits = defineEmits(['filterToggle', 'valueFilterUpdate']);

const filterText = ref('');
const option = computed(()=>{
  let result = JSON.parse(JSON.stringify(props.option));
  if(filterText.value){
    Object.keys(props.option).forEach((item) => {
      if(item.includes(filterText.value) === false){
        delete result[item];
      }
    });
  }
  return result;
});

const disabled = computed(()=>{
  return !props.sortable && !props.draggable;
});

const sortonly = computed(()=>{
  return props.sortable && !props.draggable;
});

const toggleFilterBox = function(e){
  let obj = {
    title: props.name,
    isOpen: !props.filterOpening
  }
  emits('filterToggle', obj);
  if (!props.attrValues) {
    // if (props.$attrs['no:filterbox']) {
      // emits('no:filterbox')
    // }
    return
  }
  // openFilterBox(props.name, !props.open)
  // moveFilterBoxToTop(props.name)
};

const valueFilterUpdate = function(key){
  let obj = {
    title: props.name,
    key: key
  }
  emits('valueFilterUpdate', obj);
}


// const openFilterBox = function(attribute, open){
//   emits('no:filterbox', {attribute, open})
// }

// const moveFilterBoxToTop = function(attribute) {
//   emits('moveToTop:filterbox', { attribute })
// }

</script>
<style lang="scss">
@import '@/mixin/vue-pivottable.css';
</style>