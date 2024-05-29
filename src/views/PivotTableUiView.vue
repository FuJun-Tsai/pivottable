<template>
  <div
  class="mx-auto mb-3"
  style="max-width: 1200px;"
  >
    <div class="border mb-2 p-2">
      <p class="text-center mb-0">所有欄位</p>
      <VueDraggable
      class="d-flex justify-content-center flex-wrap"
      style="gap: 4px;"
      v-model="pivotTitle"
      :group="{name: 'keys', pull: 'clone', put: false}"
      handle=".pvtAttr"
      preventOnFilter="false"
      >
        <DraggableAttribute
        v-for="item in pivotTitle"
        :name="item"
        :key="item"
        :option="valueFilter[item]"
        :isBtnsPanel="true"
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
        class="d-flex flex-column align-items-center h-100"
        style="gap: 4px;"
        v-model="pivotRows"
        group="keys"
        handle=".pvtAttr"
        preventOnFilter="false"
        >
          <DraggableAttribute
          v-for="item in pivotRows"
          :name="item"
          :key="item"
          :option="valueFilter[item]"
          :isBtnsPanel="false"
          @valueFilterUpdate="valueFilterUpdate"
          @dragBtnDelete="dragBtnDelete($event, 'rows')"
          />
        </VueDraggable>
      </div>

      <div class="border p-2" style="flex: 1 1 auto">
        <div class="d-flex mb-3" style="gap: 4px;">

          <div style="width: 100px; flex: 1 1 auto">
            <div class="mb-2">
              <p class="text-center mb-0">欄標籤</p>
              <VueDraggable
              class="d-flex justify-content-center h-100"
              style="gap: 4px; min-height: 36px;"
              v-model="pivotSetting[pivottableIndex - 1].cols"
              group="keys"
              handle=".pvtAttr"
              preventOnFilter="false"
              >
                <DraggableAttribute
                v-for="item in pivotSetting[pivottableIndex - 1].cols"
                :name="item"
                :key="item"
                :option="valueFilter[item]"
                :isBtnsPanel="false"
                @valueFilterUpdate="valueFilterUpdate"
                @dragBtnDelete="dragBtnDelete($event, 'cols')"
                />
              </VueDraggable>
            </div>
            <div class="overflow-auto">
              <TableRenderer
              v-for="index in pivotSetting.length"
              v-show="index === pivottableIndex"
              :key="index"
              :title="pivotTitle"
              :data="pivotData"
              :rendererName="'scroll table'"
              :aggregatorName="pivotSetting[index - 1].aggregator"
              :cols="pivotSetting[index - 1].cols"
              :rows="pivotRows"
              :vals="pivotSetting[index - 1].values"
              :valueFilter="valueFilter"
              :rowTotal="true"
              :colTotal="true"
              @treeDataExport="chartDataGet($event, index - 1)"
              />
            </div>
          </div>

          <div style="flex: 0 0 200px">
            <p class="text-center mb-0">統計方式</p>
            <select class="select mb-3" v-model="pivotSetting[pivottableIndex - 1].aggregator">
              <option
              v-for="(val, key) in aggregatorlocale"
              :key="val"
              :value="val">
                {{ key }}
              </option>
            </select>
            <p class="text-center mb-0">統計值</p>
            <div class="d-flex align-items-center flex-nowrap mb-3" style="gap: 4px;">
              <span
              v-if="pivotSetting[pivottableIndex - 1].aggregator === 'Sum over Sum'"
              class="text-nowrap"
              >
                分子
              </span>
              <select
              v-if="['Count as Fraction of Total', 'Count as Fraction of Rows', 'Count as Fraction of Column'].includes(pivotSetting[pivottableIndex - 1].aggregator) === false"
              class="select"
              v-model="pivotSetting[pivottableIndex - 1].values[0]"
              >
                <option
                v-for="(val) in pivotTitle"
                :key="val"
                :value="val">
                  {{ val }}
                </option>
              </select>
            </div>

            <div class="d-flex align-items-center flex-nowrap mb-3" style="gap: 4px;">
              <span
              v-if="pivotSetting[pivottableIndex - 1].aggregator === 'Sum over Sum'"
              class="text-nowrap"
              >
                分母
              </span>
              <select
              v-if="pivotSetting[pivottableIndex - 1].aggregator === 'Sum over Sum'"
              class="select"
              v-model="pivotSetting[pivottableIndex - 1].values[1]"
              >
                <option
                v-for="(val) in pivotTitle"
                :key="val"
                :value="val">
                  {{ val }}
                </option>
              </select>
            </div>
          </div>

        </div>
        <div class="d-flex justify-content-center" style="gap: 4px;">
          <span>
            <n-pagination
            v-model:page="pivottableIndex"
            :page-count="pivotSetting.length"
            />
          </span>
          <n-button
          strong secondary type="primary" size="small"
          @click="pivotSettingAdd"
          >
            新增
          </n-button>
          <n-button
          v-if="pivotSetting.length > 1"
          strong secondary type="error" size="small"
          @click="pivotSettingDelete"
          >
            移除
          </n-button>
        </div>
      </div>

    </div>
  </div>
  <div
  class="d-flex w-100 mx-auto"
  style="max-width: 1200px;"
  >
    <div
    style="min-height: 400px; height: 400px; flex: auto"
    >
      <v-chart
      :option="chart"
      :style="{ width: '100%', height: '100%' }"
      autoresize
      />
    </div>
    <div style="flex: 0 0 200px;">
      <!-- 長條、折線 -->
      <p class="mb-0">圖表軸</p>
      <div class="mb-3">
        <n-radio-group
        v-model:value="chartAxisDirection"
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
            <n-switch v-model:value="pivotSetting[chartSettingSelected].chartStackUsing" />
          </div>
          <n-button
          type="success"
          size="small"
          @click="pivotSetting[chartSettingSelected].chartStack.push([])"
          >
            新增分組
          </n-button>
        </div>
        <template v-if="pivotSetting[chartSettingSelected].chartStackUsing === true">
          <template
          v-for="(arr, arrIndex) in pivotSetting[chartSettingSelected].chartStack"
          :key="arr"
          >
            <p class="mb-0 fs-12">分組 {{ arrIndex + 1 }}</p>
            <VueDraggable
            class="d-flex flex-wrap border p-2"
            style="gap: 4px;"
            v-model="pivotSetting[chartSettingSelected].chartStack[arrIndex]"
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
      <select class="select mb-3" v-model="pivotSetting[chartSettingSelected].chartType">
        <option
        v-for="(val, key) in chartTypeOption"
        :key="val"
        :value="val">
          {{ key }}
        </option>
      </select>
      <!-- 折線 -->
      <template v-if="['line'].includes(pivotSetting[chartSettingSelected].chartType)">
        <p class="mb-0">線條彎曲</p>
        <n-slider
        class="mb-3"
        v-model:value="pivotSetting[chartSettingSelected].chartLineSmooth"
        :step="0.1"
        :max="1"
        :min="0"
        />
        <p class="mb-0">圖標樣式</p>
        <select class="select mb-3" v-model="pivotSetting[chartSettingSelected].chartLineSymbol">
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
        v-model:value="pivotSetting[chartSettingSelected].chartLineSymbolSize"
        />
      </template>
      <!-- 長條、圓餅 -->
      <template v-if="['bar', 'pie'].includes(pivotSetting[chartSettingSelected].chartType)">
        <p class="mb-0">圓角幅度</p>
        <n-input-number
        class="mb-3"
        v-model:value="pivotSetting[chartSettingSelected].chartRadius"
        />
        <p class="mb-0">指定圓角</p>
        <n-radio-group
        class="mb-3"
        v-model:value="pivotSetting[chartSettingSelected].chartRadiusAngle"
        name="radiogroup"
        >
          <n-space>
            <n-radio
            v-for="option in chartRadiusAngleOption" :key="option.value" :value="option.value">
              {{ option.label }}
            </n-radio>
          </n-space>
        </n-radio-group>
      </template>
    </div>
  </div>
  <!-- 側邊欄互動 -->
  <div class="fix-buttons position-fixed top-50 end-0 translate-middle-y bg-white">
    <div
    class="fix-button pointer p-2"
    @click="dialogShowing = true"
    >
      採計資料
    </div>
  </div>
  <!-- 彈跳窗 -->
  <div
  class="dialog position-fixed top-0 start-0"
  :class="{'open': dialogShowing}"
  @click.self="dialogShowing = false"
  >
    <div
    class="position-absolute top-50 start-50 translate-middle d-flex flex-column p-2"
    v-if="dialogShowing"
    >
      <h4 class="text-center">採計資料</h4>
      <div
      class="overflow-auto"
      style="flex: auto;"
      >
        <table class="w-100 text-center">
          <thead class="position-sticky top-0">
            <tr>
              <th
              class="text-nowrap p-2"
              v-for="(title, titleIndex) in pivotTitle"
              :key="title"
              >
                <span
                v-if="pivotTitleTempIndex !== titleIndex"
                @click="pivotTitleSelect(title, titleIndex)"
                >
                  {{ title }}
                </span>
                <div
                class="d-flex flex-row"
                style="gap: 4px;"
                v-if="pivotTitleTempIndex === titleIndex"
                >
                  <n-input
                  v-model:value="pivotTitleTemp"
                  type="text"
                  :placeholder="title"
                  />
                  <n-button
                  quaternary
                  type="warning"
                  @click="pivotTitleUpdate"
                  >
                    更新
                  </n-button>
                </div>
              </th>
              <th class="action position-sticky end-0">
                操作
              </th>
            </tr>
          </thead>
          <tbody class="overflow-auto">
            <tr
            v-for="(data, dataIndex) in pivotData"
            :class="{ 'selected': pivotDataTempIndex === dataIndex }"
            :key="data"
            >
              <td
              class="px-2 py-2"
              style="vertical-align: middle;"
              v-for="item in data"
              :key="`${dataIndex}-${item}`"
              >
                <span>
                  {{ item }}
                </span>
              </td>
              <td class="action position-sticky end-0 px-2 py-2">
                <n-button
                quaternary
                type="warning"
                @click="pivotDataSelect(dataIndex)"
                >
                  編輯
                </n-button>
                <n-button
                quaternary
                type="error"
                @click="pivotDataDelete(dataIndex)"
                >
                  刪除
                </n-button>
              </td>
            </tr>
            <tr class="updateTemp position-sticky bottom-0 bg-white">
              <td
              class="px-2 py-2"
              v-for="(item, index) in pivotTitle" :key="item" style="vertical-align: middle;"
              >
                <n-input
                v-model:value="pivotDataTemp[index]"
                type="text"
                :placeholder="pivotTitle[index]"
                @paste="()=>{console.log(123)}"
                />
              </td>
              <td class="action position-sticky end-0 bg-white px-2 py-2">
                <n-button
                quaternary
                type="success"
                v-if="pivotDataTempIndex === -1"
                @click="pivotDataAdd"
                >
                  新增
                </n-button>
                <n-button
                quaternary
                type="warning"
                v-if="pivotDataTempIndex > -1"
                @click="pivotDataUpdate"
                >
                  更新
                </n-button>
                <n-button
                quaternary
                type="error"
                @click="pivotDataTempReset"
                >
                  還原
                </n-button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, provide, computed, watch } from 'vue';
import { PivotUtilities } from '@/mixin/index';
import TableRenderer from '@/components/TableRenderer.vue';
import DraggableAttribute from '@/components/DraggableAttribute.vue';
import { VueDraggable } from 'vue-draggable-plus';

// echart
import { use } from 'echarts/core';
import {
  TitleComponent,
  TooltipComponent,
  ToolboxComponent,
  GridComponent,
  LegendComponent,
  DataZoomComponent,
} from 'echarts/components';
import { BarChart, LineChart, PieChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import VChart , { THEME_KEY } from 'vue-echarts';

use([
  TitleComponent,
  TooltipComponent,
  ToolboxComponent ,
  GridComponent,
  LegendComponent,
  DataZoomComponent,
  BarChart,
  LineChart,
  PieChart,
  CanvasRenderer,
]);

provide([THEME_KEY]);

const pivotTitle = ref(['員工編號', '單位名稱', '人事狀態', '中文姓名', '出生日期', '年齡', '性別', '薪資身份', '身份別', '職務', '最高學歷', '畢業學校', '主修科系', '到職日期', '離職日期', '年資', '工作地點', '工作類型', '職稱中文', '是否原住民', '原住民族', '離職種類', '離職原因']);
const pivotTitleTemp = ref('');
const pivotTitleTempIndex = ref(-1);
const pivotTitleSelect = function(word, index){
  pivotTitleTemp.value = word;
  pivotTitleTempIndex.value = index;
};
const pivotTitleUpdate = function(){
  pivotTitle.value[pivotTitleTempIndex.value] = pivotTitleTemp.value;
  pivotTitleTemp.value = '';
  pivotTitleTempIndex.value = -1;
};

const pivotData = ref([
  [1, '社長辦公室', '在職', '賴○○', '1975/4/16', 49, '女性', '正式人員', '正式人員', '', '學士', '淡江大學', '電子計算機科學學系', '2022/6/20', '', 1.926, '', '間接人員', '幕僚經理', 'N', '', '', ''],
  [2, '社長辦公室', '離職', '張○○', '1996/8/5', 27, '女性', '正式人員', '正式人員', '', '學士', '淡江大學', '資訊工程學系', '2023/1/9', '2025/11/29', 2.888, '', '間接人員', '總部人員', 'N', '', '個人因素', '身體因素'],
  [3, '社長辦公室', '在職', '陳○○', '1980/6/11', 43, '男性', '正式人員', '正式人員', '', '學士', '朝陽科技大學', '資訊管理(學)系', '2022/11/8', '', 1.54, '', '間接人員', '資深幕僚協理', 'N', '', '', ''],
  [4, '社長辦公室', '離職', '賴○○', '2005/7/18', 18, '女性', '正式人員', '兼職人員', '', '碩士', '淡江大學', '資訊工程學系', '2023/4/10', '2023/10/8', 0.496, '', '間接人員', '兼職人員', 'N', '', '個人因素', '就學'],
  [5, '社長辦公室', '在職', '龔○○', '1973/6/13', 50, '男性', '正式人員', '正式人員', '', '學士', '大華技術學院', '資訊管理(學)系', '2024/1/31', '', 0.31, '', '間接人員', '幕僚協理', 'N', '', '', ''],
  [6, '社長辦公室', '在職', '廖○○', '1971/10/12', 52, '男性', '正式人員', '正式人員', '', '學士', '淡江大學', '電子計算機應用學系', '2024/3/31', '', 0.145, '', '間接人員', '一級幕僚副理', 'N', '', '', ''],
  [7, '社長辦公室', '在職', '賴○○', '1974/6/3', 49, '女性', '正式人員', '正式人員', '', '碩士', '世新大學', '企業管理(學)系', '2023/12/25', '', 0.411, '', '間接人員', '總部人員', 'N', '', '', ''],
  [8, '社長辦公室', '在職', '賴○○', '1985/5/27', 38, '男性', '正式人員', '正式人員', '', '專科', '台灣觀光學院', '資訊管理(學)系', '2006/4/2', '', 18.14, '', '間接人員', '社長', 'N', '', '', ''],
  [9, '社長辦公室', '在職', '羅○○', '1984/3/24', 40, '女性', '正式人員', '正式人員', '', '學士', '龍華科技大學', '企業管理(學)系', '2005/12/19', '', 18.427, '', '間接人員', '總經理', 'N', '', '', ''],
  [10, '物流處', '離職', '劉○○', '1986/12/24', 37, '男性', '正式人員', '正式人員', '', '碩士', '國立中興大學', '應用數學系', '2020/6/20', '2025/1/20', 4.586, '', '間接人員', '總部人員', 'Y', '', '其他', '其他'],
  [11, '物流處', '在職', '李○○', '1968/2/4', 56, '男性', '正式人員', '正式人員', '', '高中(職)', '羅東高商', '會計統計學系', '2022/7/17', '', 1.852, '', '間接人員', '處長', 'N', '', '', ''],
  [12, '物流處', '離職', '劉○○', '1992/8/1', 31, '男性', '正式人員', '正式人員', '', '專科', '景文技術學院', '資訊管理(學)系', '2022/11/18', '2023/8/18', 0.748, '', '間接人員', '外場副手', 'N', '', '工作內容', '職務內容'],
  [13, '物流處', '資遣', '蘇○○', '1985/12/31', 38, '男性', '正式人員', '正式人員', '', '學士', '淡江大學', '資訊工程學系', '2022/12/17', '2023/9/18', 0.753, '', '間接人員', '總部人員', 'N', '', '資遣', '勞工對於所擔任之工作確不能勝任'],
  [14, '物流處', '在職', '徐○○', '1975/1/9', 49, '男性', '正式人員', '正式人員', '', '專科', '華夏技術學院', '資訊管理(學)系', '2022/12/7', '', 1.46, '', '間接人員', '物流組長(副理)', 'N', '', '', ''],
  [15, '物流處', '在職', '林○○', '1997/1/21', 27, '男性', '正式人員', '正式人員', '', '學士', '德明財經科技大學', '資訊科技系', '2023/1/14', '', 1.356, '', '間接人員', '物流副手', 'N', '', '', ''],
  [16, '物流處', '在職', '李○○', '1981/11/28', 42, '男性', '正式人員', '正式人員', '', '學士', '銘傳大學', '風險管理與保險學系', '2024/3/3', '', 0.222, '', '間接人員', '物流專員', 'N', '', '', ''],
  [17, '作業中心', '在職', '黃○○', '1995/7/15', 28, '男性', '正式人員', '正式人員', '', '學士', '大華技術學院', '資訊管理(學)系', '2020/7/9', '', 3.874, '', '間接人員', '生產副手', 'N', '', '', ''],
  [18, '資訊處', '離職', '莊○○', '1974/10/22', 49, '男性', '正式人員', '正式人員', '', '學士', '德明技術學院', '資訊科技系', '2023/10/15', '2024/1/30', 0.293, '', '間接人員', '幕僚經理', 'N', '', '職涯發展', '生涯規劃'],
  [19, '作業中心', '在職', '劉○○', '1989/5/18', 35, '男性', '正式人員', '正式人員', '', '高中(職)', '國立中央大學', '人力資源發展系', '2023/9/29', '', 0.649, '', '間接人員', '生產專員', 'N', '', '', ''],
  [20, '財務部', '在職', '陳○○', '1977/10/21', 46, '女性', '正式人員', '正式人員', '', '學士', '中國科技大學', '國際商務學系', '2019/3/23', '', 5.167, '', '間接人員', '幕僚經理', 'N', '', '', ''],
  [21, '財務部', '離職', '張○○', '1964/6/7', 59, '男性', '正式人員', '正式人員', '', '碩士', '佛光大學', '管理研究所', '2023/4/15', '2024/3/1', 0.879, '', '間接人員', '幕僚協理', 'N', '', '個人因素', '主管/同事因素'],
  [22, '財務部', '在職', '胡○○', '1976/3/13', 48, '男性', '正式人員', '正式人員', '', '學士', '德霖技術學院', '土木工程(學)系', '2023/11/28', '', 0.485, '', '間接人員', '幕僚經理', 'N', '', '', ''],
  [23, '財務部', '在職', '許○○', '1997/7/5', 26, '女性', '正式人員', '正式人員', '', '學士', '聖約翰科技大學', '電腦與通訊(信)工程學系', '2023/12/13', '', 0.444, '', '間接人員', '總部人員', 'N', '', '', ''],
  [24, '客戶服務處', '在職', '賴○○', '1979/5/24', 44, '女性', '正式人員', '正式人員', '', '學士', '國立台灣科技大學', '資訊管理(學)系', '2016/3/2', '', 8.225, '', '間接人員', '一級幕僚副理', 'N', '', '', ''],
  [25, '行銷企劃處', '在職', '楊○○', '1997/12/29', 26, '女性', '正式人員', '正式人員', '', '學士', '明新科技大學', '電子工程(學)系', '2021/3/25', '', 3.162, '', '間接人員', '一級幕僚副理', 'N', '', '', ''],
  [26, '行銷企劃處', '在職', '黃○○', '1981/5/14', 43, '男性', '正式人員', '正式人員', '', '學士', '國立金門技術學院', '電子工程(學)系', '2021/5/1', '', 3.06, '', '間接人員', '幕僚協理', 'N', '', '', ''],
  [27, '行銷企劃處', '離職', '陳○○', '1999/9/27', 24, '女性', '正式人員', '正式人員', '', '學士', '華夏技術學院', '資訊管理(學)系', '2022/1/30', '2024/6/12', 2.367, '', '間接人員', '總部副理', 'N', '', '其他', '自行創業'],
  [28, '行銷企劃處', '在職', '尹○○', '1995/1/7', 29, '女性', '正式人員', '正式人員', '', '學士', '淡江大學', '電子計算機科學學系', '2023/6/17', '', 0.934, '', '間接人員', '總部人員', 'N', '', '', ''],
  [29, '人資部', '離職', '王○○', '1999/4/25', 25, '女性', '正式人員', '正式人員', '', '學士', '健行科技大學(原-清雲科技大學)', '電子工程(學)系', '2022/1/23', '2025/2/16', 3.066, '', '間接人員', '總部副理', 'N', '', '公司╱管理類', '公司因素/管理制度/輪班制度'],
  [30, '人資部', '在職', '陳○○', '1990/1/24', 34, '女性', '正式人員', '正式人員', '', '學士', '東海大學', '工業工程與經營資訊學系', '2022/11/17', '', 1.515, '', '間接人員', '幕僚經理', 'N', '', '', ''],
  [31, '人資部', '在職', '李○○', '1991/8/19', 32, '男性', '正式人員', '正式人員', '', '學士', '國立台灣藝術大學', '視覺傳達設計學系', '2023/8/5', '', 0.8, '', '間接人員', '總部人員', 'N', '', '', ''],
  [32, '人資部', '在職', '林○○', '1973/3/27', 51, '女性', '正式人員', '正式人員', '', '學士', '聖約翰科技大學', '國際商務學系', '2023/9/4', '', 0.718, '', '間接人員', '幕僚經理', 'N', '', '', ''],
  [33, '人資部', '在職', '黃○○', '1993/9/1', 30, '女性', '正式人員', '正式人員', '', '學士', '大仁科技大學', '資訊管理(學)系', '2023/10/24', '', 0.581, '', '間接人員', '總部副理', 'N', '', '', ''],
  [34, 'B1青島店', '在職', '郭○○', '1948/7/17', 75, '女性', '正式人員', '兼職人員', '', '學士', '中華大學', '工程科學系', '2013/10/31', '', 10.562, '', '間接人員', '兼職人員', 'N', '', '', ''],
  [35, 'B1青島店', '在職', '李○○', '1958/3/23', 66, '女性', '正式人員', '兼職人員', '', '專科', '景文技術學院', '資訊管理(學)系', '2014/7/15', '', 9.858, '', '間接人員', '兼職人員', 'N', '', '', ''],
  [36, 'B1青島店', '在職', '謝○○', '1962/11/25', 61, '女性', '正式人員', '正式人員', '', '學士', '亞東技術學院', '工業工程(學)系', '2017/7/24', '', 6.833, '', '間接人員', '廚務專員', 'N', '', '', ''],
  [37, 'B1青島店', '在職', '孫○○', '1995/4/23', 29, '男性', '正式人員', '正式人員', '', '碩士', '銘傳大學', '企業管理(學)系', '2018/3/10', '', 6.203, '', '間接人員', '廚務專員', 'N', '', '', ''],
  [38, 'B1青島店', '在職', '吳○○', '1977/2/23', 47, '男性', '正式人員', '正式人員', '', '學士', '德明財經科技大學', '資訊管理(學)系', '2019/10/16', '', 4.603, '', '間接人員', '內場副手', 'N', '', '', ''],
  [39, 'B1青島店', '離職', '張○○', '1994/3/23', 30, '女性', '正式人員', '正式人員', '', '碩士', '國立台中技術學院', '資訊管理(學)系', '2020/6/20', '2024/7/18', 4.077, '', '間接人員', '外場副手', 'N', '', '其他', '其他因素'],
  [40, 'B1青島店', '離職', '鄭○○', '1982/1/13', 42, '男性', '正式人員', '正式人員', '', '學士', '建國科技大學', '資訊管理(學)系', '2022/1/29', '2023/3/11', 1.112, '', '間接人員', '外場副手', 'Y', '', '職涯發展', '生涯規劃']
]);
const pivotDataTemp = ref([]);
const pivotDataTempReset = function(){
  pivotDataTemp.value = pivotDataTemp.value.map(() => '');
  pivotDataTempIndex.value = -1;
};
watch(pivotTitle, ()=>{
  pivotDataTemp.value = pivotTitle.value.map(() => '');
}, { immediate: true });
const pivotDataTempIndex = ref(-1);
const pivotDataDelete = function(index){
  pivotData.value.splice(index, 1);
};
const pivotDataSelect = function(index){
  pivotDataTempIndex.value = index;
  pivotDataTemp.value = [...pivotData.value[index]];
};
const pivotDataAdd = function(){
  pivotData.value.push(pivotDataTemp.value);
  pivotDataTemp.value = pivotDataTemp.value.map(() => '');
  pivotDataTempIndex.value = -1;
};
const pivotDataUpdate = function(){
  pivotData.value[pivotDataTempIndex.value] = pivotDataTemp.value;
  pivotDataTemp.value = pivotDataTemp.value.map(() => '');
  pivotDataTempIndex.value = -1;
};

const pivotRows = ref(['性別']);
const pivotSetting = ref([
  {
    cols: ['單位名稱'],
    values: ['年資', '年齡'],
    aggregator: 'Sum over Sum',
    chartType: 'bar',
    chartRadius: 4,
    chartRadiusAngle: 'top',
    chartLineSmooth: 0.5,
    chartLineSymbol: 'circle',
    chartLineSymbolSize: 12,
    chartStackUsing: false,
    chartStack: [[]],
  },
  {
    cols: ['人事狀態'],
    values: ['人事狀態'],
    aggregator: 'Count',
    chartType: 'line',
    chartRadius: 4,
    chartRadiusAngle: 'top',
    chartLineSmooth: 0.5,
    chartLineSymbol: 'circle',
    chartLineSymbolSize: 12,
    chartStackUsing: false,
    chartStack: [[]]
  },
]);
const pivotSettingAdd = function(){
  let defaultCols = [pivotTitle.value[0]];
  let defaultValues = [pivotTitle.value[0], pivotTitle.value[1]];
  pivotSetting.value.push({
    cols: defaultCols,
    values: defaultValues,
    aggregator: 'Count',
    chartType: 'bar',
    chartRadius: 4,
    chartRadiusAngle: 'top',
    chartLineSmooth: 0.5,
    chartLineSymbol: 'circle',
    chartLineSymbolSize: 12,
    chartStackUsing: false,
    chartStack: [[]]
  });
};
const pivotSettingDelete = function(){
  let deleteIndex = pivottableIndex.value - 1;
  if((pivotSetting.value.length - 1) === deleteIndex){
    pivottableIndex.value = pivotSetting.value.length - 1;
  }
  chartData.value.splice(deleteIndex, 1);
  pivotSetting.value.splice(deleteIndex, 1);
};
const pivottableIndex = ref(1);

const dragBtnDelete = function(name, position){
  if(position === 'rows'){
    pivotRows.value = pivotRows.value.filter(item => item !== name);
  } else {
    pivotSetting.value[pivottableIndex.value - 1].cols = pivotSetting.value[pivottableIndex.value - 1].cols.filter(item => item !== name);
  }
};

const valueFilter = ref({});
valueFilter.value = pivotTitle.value.reduce((titleObj, title, titleIndex) => {
  titleObj[title] = pivotData.value.reduce((dataObj, data) => {
    dataObj[data[titleIndex]] = false;
    return dataObj;
  }, {});
  return titleObj;
}, {});
const valueFilterUpdate = function(obj){
  valueFilter.value[obj.title] = obj.valueFilter;
};

const sorters = ref({
  'Day of Week': PivotUtilities.sortAs(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])
});

const aggregatorlocale = ref({
  '筆數': 'Count',
  '不同結果的筆數': 'Count Unique Values',
  '列出項目': 'List Unique Values',
  '總合': 'Sum',
  '整數加總': 'Integer Sum',
  '平均': 'Average',
  '中位數': 'Median',
  '樣本變異數': 'Sample Variance',
  '樣本標準差': 'Sample Standard Deviation',
  '最小值': 'Minimum',
  '最大值': 'Maximum',
  '採計第一筆': 'First',
  '採計最後一筆': 'Last',
  '平均總合': 'Sum over Sum',
  '總計百分比': 'Sum as Fraction of Total',
  '列總計百分比': 'Sum as Fraction of Rows',
  '欄總計百分比': 'Sum as Fraction of Columns',
  '筆數百分比': 'Count as Fraction of Total',
  '列筆數百分比': 'Count as Fraction of Rows',
  '欄筆數百分比': 'Count as Fraction of Columns'
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
});

const chartAxis = ref([]);
const chartData = ref([]);
const chartDataGet = function(val, valIndex){
  chartData.value[valIndex] = val;
  pivotSetting.value[valIndex].chartStack = [];
  pivotSetting.value[valIndex].chartStack[0] = Object.values(val).reduce((arr, dataRow) => {
    Object.keys(dataRow).forEach(item => {
      if(arr.includes(item) === false){
        arr.push(item);
      }
    })
    return arr;
  }, [])
  chartAxis.value = Object.keys(val)
  .sort((a, b)=>{
    if(a > b){
      return 1
    } else {
      return -1
    }
  })
  .map(item => item.split('\x00').join('-'));
};

const chartSettingOption = computed(()=>{
  return pivotSetting.value.map((item, index)=>{
    return {
      label: index + 1,
      value: index
    }
  });
});
const chartSettingSelected = ref(0);

const chartTypeOption = ref({
  '長條圖': 'bar',
  '折線圖': 'line',
  '圓餅圖': 'pie'
});

const chart = computed(() => {
  // if(chartType.value === 'pie'){
  //   return chartPieType.value;
  // }
  return chartAxisType.value;
});

const chartAxisDirection = ref('x');
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

const chartGridBuilding = function(){};
const chartLegendBuilding = function(){};
const chartDataZoomBuilding = function(){};
const chartAxisBuilding = function(){};
const chartSeriesBuilding = function(){};

const chartAxisExport = function(axisSide){
  if(chartAxisDirection.value === axisSide){
    return [{
      type: 'category',
      data: chartAxisDirection.value === 'x' ? chartAxis.value : [...chartAxis.value].reverse(),
      axisPointer: { type: 'shadow' }
    }]
  } else {
    return pivotSetting.value.map((item, index)=>{
      return {
        type: 'value',
        gridIndex: 0,
        alignTicks: true,
      }
    })
  }
};

const colorArray = ['#cc66dd', '#77aaee', '#ccff00', '#ff7733', '#33ffff', '#33ff11', '#ff6633', '#aadd66', '#ffcc00', '#66fbbf', '#66ff66', '#ccff66', '#cc33aa', '#ccff66', '#ff66ff', '#7733ff', '#33ccff', '#99ff66', '#00aa66', '#9933ff', '#663311', '#cc00ff', '#6699ff', '#00ffcc', '#3399ff', '#aa9933', '#00ff87', '#bbcc00', '#ff9966', '#aacc33', '#6600ff', '#00aacc', '#33ffcc', '#3366ff', '#aacc88', '#0044dd', '#ff3ff3', '#ffccaa', '#9977ff', '#66ffcc', '#3377ff', '#ff00bb', '#ff3399', '#66ccff', '#00aa77', '#ff6699', '#33ff99', '#ff5533', '#006655', '#33ff66', '#ff66cc', '#ccff33', '#ff9966', '#ff6600', '#66ff33', '#ff00aa', '#99ff33', '#ffcc66', '#ff3366', '#ff2266', '#4466ff', '#66ff99', '#220011', '#ff33cc'];
const chartSeriesExport = function(){
  let result = [];
  let colorIndex = 0;
  chartData.value.forEach((item, index)=>{
    result.push([]);
    Object.entries(item)
    .sort((a, b) => {
      if(a[0] > b[0]){
        return 1
      } else {
        return -1
      }
    })
    .forEach((tree, treeIndex) => {
      Object.entries(tree[1]).forEach((branch, branchIndex)=>{
        let branchName = branch[0].split('\x00').join('-');
        if(result[index].find(item => item.name === branchName)){
          result[index].find(item => item.name === branchName).data[treeIndex] = branch[1].value();
        } else {
          let data = Object.keys(chartData.value[0]).map(() => null);
          let obj = {
            name: branch[0].split('\x00').join('-'),
            data: data,
            type: pivotSetting.value[index].chartType,
            smooth: pivotSetting.value[index].chartLineSmooth,
            symbol: pivotSetting.value[index].chartLineSymbol,
            symbolSize: pivotSetting.value[index].chartLineSymbolSize,
            axisIndex: index,
            itemStyle: {
              color: colorArray[colorIndex],
              borderRadius: (()=>{
                if(pivotSetting.value[index].chartRadiusAngle === 'top'){
                  if(chartAxisDirection.value === 'x'){
                    return [pivotSetting.value[index].chartRadius, pivotSetting.value[index].chartRadius, 0, 0];
                  } else {
                    return [0, pivotSetting.value[index].chartRadius, pivotSetting.value[index].chartRadius, 0];
                  }
                }
                return pivotSetting.value[index].chartRadius
              })(),
            }
          };

          // 數據分組
          if(pivotSetting.value[index].chartStackUsing === true){
            pivotSetting.value[index].chartStack.forEach((group, groupIndex) => {
              if(group.includes(branch[0]) === true){
                obj.stack = `分組${index}${groupIndex + 1}`;
              }
            });
          }

          data[treeIndex] = branch[1].value();
          result[index].push(obj);
        }
        colorIndex += 1;
      });
    });

  });

  // 調整排序
  result = result.map((resultItem, resultIndex) => {
    if(pivotSetting.value[resultIndex].chartStackUsing === true){
      // 啟用數據分組時，按分組排序
      resultItem.sort((a, b) => {
        if(a.stack > b.stack){
          return 1;
        } else {
          return -1;
        }
      });
    } else {
      // 數據順序同樞紐分析表
      resultItem.sort((a, b) => {
        if(a.axisIndex > b.axisIndex){
          return 1;
        }
        if(a.name > b.name){
          return 1;
        }
        return -1;
      });
    }
    console.log(resultItem);
    return resultItem;
  })

  // 陣列降維
  result = result.flat(1);

  // 橫向直向轉換調整數據順序
  result = result.map(item => {
    if(chartAxisDirection.value === 'x'){
      item.yAxisIndex = item.axisIndex;
    }
    if(chartAxisDirection.value === 'y'){
      item.xAxisIndex = item.axisIndex;
    }

    if(chartAxisDirection.value === 'y'){
      item.data.reverse();
    }
    delete item.axisIndex;
    return item;
  });

  return result;
};
const chartAxisType = computed(()=>{
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
      formatter: (arr)=>{
        let html = `<p class='mb-0'>${arr[0].axisValue}</p>`;
        html += '<table>';
        html += arr.map(item => {
          return `
            <tr>
              <td>${item.marker} ${item.seriesName}</td>
              <td style='width: 12px;'></td>
              <td class='text-end fw-bolder'>${
                item.data === null ? '-' : (Math.round(item.data * 100) / 100)
              }</td>
            </tr>
          `
        }).join('');
        html += '</table>';
        return html;
      }
    },
    legend: {},
    grid: {
      left: '16px',
      right: '16px',
      top: '32px',
      bottom: '16px',
      containLabel: true
    },
    xAxis: chartAxisExport('x'),
    yAxis: chartAxisExport('y'),
    series: chartSeriesExport(),
  }
});
const chartPiePosition = ref([
  {
    center: [['50%', '50%']],
    radius: ['90%', 0]
  },
  {
    center: [['25%', '50%'], ['75%', '50%']],
    radius: ['90%', 0]
  },
  {
    center: [['25%', '50%'], ['75%', '50%']],
    radius: ['90%', 0]
  },
]);

const chartPieType = computed(() => {
  return {
    tooltip: {
      trigger: 'item',
    },
    legend: {},
    grid: {},
    xAxis: { show: false },
    yAxis: { show: false },
    series: (()=>{
      let result = [];
      chartData.value.forEach(item => {
        Object.entries(item).forEach((tree, treeIndex) => {
          result.push({
            name: tree[0],
            data: Object.entries(tree[1]).map(item => {
              return{
                name: item[0],
                value: item[1].value()
              }
            }),
            center: chartPiePosition.value[Object.keys(chartData.value).length - 1].center[treeIndex],
            radius: chartPiePosition.value[Object.keys(chartData.value).length - 1].radius,
            type: 'pie'
          })
        })
      });
      return result;
    })()
  }
});

const dialogShowing = ref(false);
</script>

<style lang="scss">
@import '@/App.scss';

.fix-buttons {
  box-shadow: 0px 0px 8px #a2b1c6, 0px 0px 8px #a2b1c6;
  border-radius: 8px 0px 0px 8px;
  .fix-button {
    transition-duration: .3s;
    color: #111;
    user-select: none;
    border-radius: 8px 0px 0px 8px;
    &:hover {
      background: #ebf0f8;
      color: #2a3f5f;
    }
  }
}

.dialog {
  background: #fff;
  >div{
    overflow: hidden;
    z-index: -1;
  }
  &.open{
    width: 100vw;
    height: 100vh;
    z-index: 10;
    background: #00000099;
    >div{
      display: block;
      height: 80vh;
      width: 80vw;
      background: #fff;
      border-radius: 4px;
    }
  }
}

.dialog{
  table{
    $border-color: #a2b1c6;
    // table-layout: fixed;
    border-collapse: separate;
    border-spacing: 0;
    thead{
      z-index: 1;
      tr{
        th{
          border-top: 1px solid $border-color;
          border-bottom: 1px solid $border-color;
          background: #ebf0f8;
          &:first-of-type{
            border-left: 1px solid $border-color;
          }
          &:last-of-type{
            border-right: 1px solid $border-color;
          }
          &.action{
            width: 128px;
          }
          &:last-of-type{
            position: relative;
            &:after{
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              height: 100%;
              width: 12px;
              transform: translate(-100%, 0);
              box-shadow: inset -16px 0 8px -12px #a6c7fdcc;
            }
          }
        }
      }
    }
    tbody{
      tr{
        &.selected td{
          background-color: #becfe7 !important;
        }
        &:not(.selected ,.updateTemp):hover td{
          background-color: #ebf0f8 !important;
        }
        td{
          transition-duration: .3s;
          background-color: #fff;
          border-bottom: 1px solid #dde5f1;
          &:last-of-type{
            position: relative;
            background: white;
            &:after{
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              height: 100%;
              width: 12px;
              transform: translate(-100%, 0);
              box-shadow: inset -16px 0 8px -12px rgba(0, 0, 0, .18);;
            }
          }
        }
      }
    }
    .updateTemp{
      td{
        border-top: 1px solid $border-color;
        border-bottom: 1px solid $border-color;
        &:first-of-type{
          border-left: 1px solid $border-color;
        }
        &:last-of-type{
          border-right: 1px solid $border-color;
        }
        &.action{
          width: 132px;
        }
      }
    }
  }
}
</style>