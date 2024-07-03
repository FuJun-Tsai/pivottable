<template>
  <div
  class="d-flex w-100 mx-auto"
  style="max-width: 1200px; height: calc(100% - 40px);"
  >
    <div
    style="flex: auto"
    >
      <v-chart
      :option="chartExport(block)"
      :style="{ width: '100%', height: '100%' }"
      autoresize
      />
    </div>
    <div
    class="overflow-auto"
    style="flex: 0 0 200px;"
    >
      <!-- 長條、折線 -->
      <p class="mb-0">圖表軸</p>
      <div class="mb-3">
        <n-radio-group
        v-model:value="block.chartAxisDirection"
        name="radiogroup"
        >
          <n-space>
            <n-radio
            v-for="option in chartAxisDirectionOption"
            :key="option.value"
            :value="option.value"
            >
              {{ option.label }}
            </n-radio>
          </n-space>
        </n-radio-group>
      </div>
      <hr>
      <p class="mb-0">資料選取</p>
      <n-space vertical class="mb-3">
        <n-select
        :options="chartSettingOption"
        v-model:value="chartSettingSelected"
        />
      </n-space>
      <p class="mb-0">數據分組</p>
      <div class="mb-3">
        <div class="d-flex justify-content-between">
          <div class="d-flex align-items-center" style="gap: 4px;">
            <span>啟用</span>
            <n-switch v-model:value="chartStackUsing" />
          </div>
          <n-button
          type="success"
          size="small"
          @click="chartStack.push([])"
          >
            新增分組
          </n-button>
        </div>
        <template v-if="chartStackUsing === true">
          <template
          v-for="(arr, arrIndex) in chartStack"
          :key="arr"
          >
            <p class="mb-0 fs-12">分組 {{ arrIndex + 1 }}</p>
            <VueDraggable
            class="d-flex flex-wrap border p-2 mb-2"
            style="gap: 4px;"
            v-model="chartStack[arrIndex]"
            group="data"
            preventOnFilter="false"
            >
              <span
              class="pvtAttr"
              v-for="item in arr"
              :key="item"
              >
                {{ item }}
              </span>
            </VueDraggable>
          </template>
        </template>
      </div>
      <p class="mb-0">圖表類型</p>
      <select class="select mb-3" v-model="chartTypeSelected">
        <option
        v-for="(val, key) in chartTypeOption"
        :key="val"
        :value="val">
          {{ key }}
        </option>
      </select>
      <!-- 折線 -->
      <template v-if="['line'].includes(chartTypeSelected)">
        <p class="mb-0">線條彎曲</p>
        <n-slider
        class="mb-3"
        v-model:value="lineSmooth"
        :step="0.1"
        :max="1"
        :min="0"
        />
        <p class="mb-0">圖標樣式</p>
        <select class="select mb-3" v-model="lineSymbol">
          <option
          v-for="(val, key) in chartLineSymbolOption"
          :key="val"
          :value="val">
            {{ key }}
          </option>
        </select>
        <p class="mb-0">圖標大小</p>
        <n-input-number
        class="mb-3"
        v-model:value="lineSymbolSize"
        />
      </template>
      <!-- 長條、圓餅 -->
      <template v-if="['bar', 'pie'].includes(chartTypeSelected)">
        <p class="mb-0">圓角幅度</p>
        <n-input-number
        class="mb-3"
        v-model:value="borderRadius"
        />
        <p class="mb-0">指定圓角</p>
        <n-radio-group
        class="mb-3"
        v-model:value="radiusAngle"
        name="radiogroup"
        >
          <n-space>
            <n-radio
            v-for="option in chartRadiusAngleOption"
            :key="option.value"
            :value="option.value"
            >
              {{ option.label }}
            </n-radio>
          </n-space>
        </n-radio-group>
      </template>
      <div class="position-sticky bottom-0 bg-white pt-1">
        <n-button
        class="w-100"
        type="success"
        size="small"
        @click="chartSettingUpdate"
        >
          確定更改
        </n-button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineProps, defineEmits, ref, computed } from 'vue';
import { chartExport } from '@/mixin/echart';
import { VueDraggable } from 'vue-draggable-plus';

const props = defineProps({
  block: {
    type: Object
  },
});
const emits = defineEmits(['chartSettingUpdate']);

const block = ref(props.block);

const chartAxisDirection = ref(block.value.chartAxisDirection);
const chartAxisDirectionOption = ref([
  {
    label: '橫軸',
    value: 'x'
  },
  {
    label: '縱軸',
    value: 'y'
  },
]);

const chartSettingOption = computed(()=>{
  return block.value.chartOption.map((item, index)=>{
    return {
      label: index + 1,
      value: index
    }
  });
});
const chartSettingSelected = ref(0);

const chartStackUsing = ref(block.value.chartStackUsing);
const chartStack = ref(block.value.chartStack);

const chartTypeSelected = ref(block.value.chartOption[chartSettingSelected.value].type);
const chartTypeOption = ref({
  '長條圖': 'bar',
  '折線圖': 'line',
  '圓餅圖': 'pie'
});

const lineSmooth = ref(block.value.chartOption[chartSettingSelected.value].lineSmooth);
const lineSymbol = ref(block.value.chartOption[chartSettingSelected.value].lineSymbol);
const lineSymbolSize = ref(block.value.chartOption[chartSettingSelected.value].chartLineSymbolSize);
const barMaxWidth = ref(block.value.chartOption[chartSettingSelected.value].barMaxWidth);
const borderRadius = ref(block.value.chartOption[chartSettingSelected.value].borderRadius);
const radiusAngle = ref(block.value.chartOption[chartSettingSelected.value].radiusAngle);

const chartRadiusAngleOption = ref([
  {
    label: '頂部',
    value: 'top',
  },
  {
    label: '全部',
    value: 'all',
  },
]);

const chartLineSymbolOption = ref({
  '空心圓': 'emptyCircle',
  '圓形': 'circle',
  '直角方形': 'rect',
  '圓角方形': 'roundRect',
  '三角形': 'triangle',
  '菱形': 'diamond',
  '錨點': 'pin',
  '向上箭頭': 'arrow',
  '無': 'none',
});

const chartSettingUpdate = function(){
}

</script>
<style lang="scss">
</style>