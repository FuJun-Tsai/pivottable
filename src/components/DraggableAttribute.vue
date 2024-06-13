<template>
  <div
  class="drag-btn position-relative"
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
      @click="filterOpening = !filterOpening"
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
      <div
      class="pvtCheckContainer d-flex flex-column mb-2 pb-2"
      style="gap: 2px;"
      >
        <template
        v-for="(value, key) in option"
        :key="key">
          <n-checkbox
          v-if="optionShowing(key)"
          class="w-100"
          :label="key"
          :checked="option[key] === false"
          @update:checked="option[key] = !option[key]"
          />
        </template>
      </div>
      <div style="display: flex; justify-content: center; gap: 4px; margin-bottom: 4px;">
        <button class="pvtButton" @click="optionAllSelect">
          全選
        </button>
        <button class="pvtButton" @click="optionAllCancel">
          清空
        </button>
      </div>
    </div>
    <div
    v-if="props.isBtnsPanel === false"
    class="del position-absolute top-0 end-0 justify-content-center align-items-center pointer"
    @click="dragBtnDelete"
    >
      <img src="@/assets/trash.png" alt="">
    </div>
  </div>
</template>
<script setup>
import { defineProps, defineEmits, computed, ref, watch } from 'vue';
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
  },
  isBtnsPanel: {
    default: false,
  }
});
const emits = defineEmits(['valueFilterUpdate', 'dragBtnDelete']);

const filterText = ref('');
const option = ref(JSON.parse(JSON.stringify(props.option)));
watch(option, ()=>{
  let obj = {
    title: props.name,
    valueFilter: option.value
  }
  emits('valueFilterUpdate', obj);
}, { deep: true });

const filterOpening = ref(false);

const optionShowing = function(option){
  if(filterText.value && option.search(filterText.value) === -1){
    return false;
  }
  return true;
};
const optionAllSelect = function(){
  option.value = Object.keys(option.value).reduce((obj, option) => {
    obj[option] = false;
    return obj;
  }, {});
};
const optionAllCancel = function(){
  option.value = Object.keys(option.value).reduce((obj, option) => {
    obj[option] = true;
    return obj;
  }, {});
};

const disabled = computed(()=>{
  return !props.sortable && !props.draggable;
});

const sortonly = computed(()=>{
  return props.sortable && !props.draggable;
});

const dragBtnDelete = function(){
  emits('dragBtnDelete', props.name);
};


</script>
<style lang="scss">
@import '@/mixin/vue-pivottable.css';
@import '@/App.scss';

.pvtCheckContainer {
  text-align: left;
  white-space: nowrap;
  overflow-y: auto;
  width: 100%;
  max-height: 30vh;
  border-bottom: 1px solid #dfe8f3;
}

.drag-btn{
  &:hover .del{
    display: flex;
  }
  .del{
    display: none;
    border-radius: 50%;
    width: 12px;
    height: 12px;
    line-height: 12px;
    transform: translate(50%, -50%);
    background: red;
    color: white;
    z-index: 1;
    img{
      width: 8px;
      height: 8px;
    }
  }
}
</style>