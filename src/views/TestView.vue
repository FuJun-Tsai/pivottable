<template>
  <div>
    <h2>Dropdown</h2>
    <p>value: {{ value }}</p>
    <theDropdown
    :values="values"
    :value="value"
    @handleChange="handleChange"
    />
  </div>
  <div>
    <h2>DraggableAttribute</h2>
    <DraggableAttribute
    :sortable="true"
    :draggable="true"
    :name="'a'"
    :attrValues="attrValues"
    :valueFilter="valueFilter"
    :sorter="null"
    :localeStrings="null"
    :menuLimit="100"
    :zIndex="1"
    :async="true"
    :unused="false"
    >
    </DraggableAttribute>
  </div>
  <div>
    <h2>thePivottable</h2>
    <thePivottable
    :title="pivotTitle"
    :data="pivotData"
    :rendererName="pivotRendererName"
    :aggregatorName="pivotAggregatorName"
    :cols="pivotCols"
    :rows="pivotRows"
    :vals="pivotValues"
    :sorters="sorters"
    :locales="locales"
    :locale="'en'"
    >
    </thePivottable>
  </div>
  <div>
    <h2>thePivottableUI</h2>
    <PivottableUi
    :title="pivotTitle"
    :data="pivotData"
    :rendererName="pivotRendererName"
    :aggregatorName="pivotAggregatorName"
    :cols="pivotCols"
    :rows="pivotRows"
    :vals="pivotValues"
    :sorters="sorters"
    :locales="locales"
    :locale="'en'"
    >
    </PivottableUi>
    <!-- <table class="pvtUi">
      <tbody>
        第一層
        <tr>
          <td class="pvtRenderers">
            <theDropdown
            :values="values"
            :value="value"
            @handleChange="handleChange"
            >
            </theDropdown>
          </td>
          <td class="pvtAxisContainer pvtUnused pvtHorizList">
          </td>
        </tr>

        第二層
        <tr>
          <td class="pvtVals">
            <VueDraggable v-model="vals" group="keys">
              <span v-for="item in vals" :key="item">
                {{ item }}
              </span>
            </VueDraggable>
          </td>
          <td class="pvtAxisContainer pvtHorizList pvtCols">
            <VueDraggable v-model="cols" group="keys">
              <span v-for="item in cols" :key="item">
                {{ item }}
              </span>
            </VueDraggable>
          </td>
        </tr>

        第三層
        <tr>
          <td class="pvtAxisContainer pvtVertList pvtRows">
            <VueDraggable v-model="rows" group="keys">
              <span v-for="item in rows" :key="item">
                {{ item }}
              </span>
            </VueDraggable>
          </td>
          <td>
            <thePivottable
            :data="[pivotTitle, ...pivotData]"
            :rendererName="pivotRendererName"
            :aggregatorName="pivotAggregatorName"
            :cols="pivotCols"
            :rows="pivotRows"
            :vals="pivotValues"
            :sorters="sorters"
            :locales="locales"
            :locale="'en'"
            >
            </thePivottable>
          </td>
        </tr>
      </tbody>
    </table> -->
  </div>
</template>
<script setup>
import { ref } from 'vue';
import theDropdown from '@/components/theDropdown';
import DraggableAttribute from '@/components/DraggableAttribute';
import thePivottable from '@/components/thePivottable';
import PivottableUi from '@/components/PivottableUi';
import { PivotUtilities } from '@/mixin/index';

// theDropdown
const values = ref(['a', 'b', 'c']);
const value = ref('a');
const handleChange = function(val){
  value.value = val;
}

// DraggableAttribute
const attrValues = ref(['a', 'b', 'c']);
const valueFilter = ref(['a']);

// VuePivottable
const pivotTitle = ref(['消費日期', '顧客姓名', '商品種類', '顏色', '單品價格', '銷售數量', '銷售總額', '顧客等級', '銷售店鋪', '銷售人員']);
const pivotData = ref([
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
const pivotAggregatorName = ref('Sum');

const sorters = ref({
  'Day of Week': PivotUtilities.sortAs(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])
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
})
</script>