<template>
  <div
  class="container grid h-100"
  :style="styleReturn(pageSetting[0].view)"
  >
    <CommonBlockComponent
    v-for="(block, blockIndex) in pageSetting[0].blocks"
    :key="block.title"
    :style="styleReturn(block.view, block)"
    :isShowTitle="true"
    :isShowFilter="true"
    :isShowNotice="false"
    :isAPIComplete="true"
    >
      <template #title>
        {{ block.title }}
      </template>
      <template #filter>
        <div class="d-flex" style="gap: 4px;">
          <img
          class="pointer"
          src="@/assets/icons8-chart-50.png"
          alt="圖表設定"
          @click="isShowChartSetting = true"
          >
          <img
          class="pointer"
          src="@/assets/icons8-pivot-table-50.png"
          alt="樞紐分析"
          @click="isShowPivotTable = true"
          >
          <img
          class="pointer"
          src="@/assets/icons8-table-50.png"
          alt="採計資料"
          @click="isShowDataTable = true"
          >
        </div>
      </template>
      <template #content>
        <v-chart
        :option="chartExport(block)"
        :style="{ width: '100%', height: '100%' }"
        autoresize
        />
        <!-- 樞紐分析 -->
        <CommonDialogComponent
        :isShowDialog="isShowPivotTable"
        @closeDialog="dialogClose"
        >
          <template #body>
            <PiovtTableComponent
            :pivotTitle="block.pivotOption.pivotTitle"
            :pivotData="block.pivotOption.pivotData"
            :pivotRow="block.pivotOption.pivotRow"
            :pivotSetting="block.pivotOption.pivotSetting"
            @pivotTableAdd="pivotTableAdd($event, blockIndex)"
            @pivotTableDelete="pivotTableDelete($event, blockIndex)"
            @chartDataGet="chartDataGet($event, blockIndex)"
            />
            <!-- <div class="mx-auto mb-3">
              <div class="border mb-2 p-2">
                <p class="text-center mb-0">所有欄位</p>
                <VueDraggable
                class="d-flex justify-content-center flex-wrap"
                style="gap: 4px;"
                v-model="block.pivotOption.pivotTitle"
                :group="{name: 'keys', pull: 'clone', put: false}"
                handle=".pvtAttr"
                preventOnFilter="false"
                >
                  <DraggableAttribute
                  v-for="item in block.pivotOption.pivotTitle"
                  :name="item"
                  :key="item"
                  :option="block.pivotOption.valueFilter[item]"
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
                  v-model="block.pivotOption.pivotRow"
                  group="keys"
                  handle=".pvtAttr"
                  preventOnFilter="false"
                  >
                    <DraggableAttribute
                    v-for="item in block.pivotOption.pivotRow"
                    :name="item"
                    :key="item"
                    :option="block.pivotOption.valueFilter[item]"
                    :isBtnsPanel="false"
                    @valueFilterUpdate="valueFilterUpdate"
                    @dragBtnDelete="dragBtnDelete($event, 'rows', settingIndex)"
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
                        v-model="block.pivotOption.pivotSetting[pivotTablePage - 1].pivotCol"
                        group="keys"
                        handle=".pvtAttr"
                        preventOnFilter="false"
                        >
                          <DraggableAttribute
                          v-for="item in block.pivotOption.pivotSetting[pivotTablePage - 1].pivotCol"
                          :name="item"
                          :key="item"
                          :option="block.pivotOption.valueFilter[item]"
                          :isBtnsPanel="false"
                          @valueFilterUpdate="valueFilterUpdate"
                          @dragBtnDelete="dragBtnDelete($event, 'cols')"
                          />
                        </VueDraggable>
                      </div>
                      <div class="overflow-auto">
                        <TableRenderer
                        v-for="index in block.pivotOption.pivotSetting.length"
                        v-show="index === pivotTablePage"
                        :key="index"
                        :title="block.pivotOption.pivotTitle"
                        :data="block.pivotOption.pivotData"
                        :rendererName="'scroll table'"
                        :aggregatorName="block.pivotOption.pivotSetting[index - 1].pivotAggregator"
                        :cols="block.pivotOption.pivotSetting[index - 1].pivotCol"
                        :rows="block.pivotOption.pivotRow"
                        :vals="block.pivotOption.pivotSetting[index - 1].pivotValue"
                        :valueFilter="block.pivotOption.valueFilter"
                        :rowTotal="true"
                        :colTotal="true"
                        @treeDataExport="chartDataGet($event, index - 1, block)"
                        />
                      </div>
                    </div>

                    <div style="flex: 0 0 200px">
                      <p class="text-center mb-0">統計方式</p>
                      <select class="select mb-3" v-model="block.pivotOption.pivotSetting[pivotTablePage - 1].pivotAggregator">
                        <option
                        v-for="(val, key) in aggregatorlocale"
                        :key="val"
                        :value="val"
                        >
                          {{ key }}
                        </option>
                      </select>
                      <p class="text-center mb-0">統計值</p>
                      <div class="d-flex align-items-center flex-nowrap mb-3" style="gap: 4px;">
                        <span
                        v-if="block.pivotOption.pivotSetting[pivotTablePage - 1].pivotAggregator === 'Sum over Sum'"
                        class="text-nowrap"
                        >
                          分子
                        </span>
                        <select
                        v-if="['Count as Fraction of Total', 'Count as Fraction of Rows', 'Count as Fraction of Column'].includes(block.pivotOption.pivotSetting[pivotTablePage - 1].pivotAggregator) === false"
                        class="select"
                        v-model="block.pivotOption.pivotSetting[pivotTablePage - 1].pivotValue[0]"
                        >
                          <option
                          v-for="(val) in block.pivotOption.pivotTitle"
                          :key="val"
                          :value="val">
                            {{ val }}
                          </option>
                        </select>
                      </div>

                      <div class="d-flex align-items-center flex-nowrap mb-3" style="gap: 4px;">
                        <span
                        v-if="block.pivotOption.pivotSetting[pivotTablePage - 1].pivotAggregator === 'Sum over Sum'"
                        class="text-nowrap"
                        >
                          分母
                        </span>
                        <select
                        v-if="block.pivotOption.pivotSetting[pivotTablePage - 1].pivotAggregator === 'Sum over Sum'"
                        class="select"
                        v-model="block.pivotOption.pivotSetting[pivotTablePage - 1].pivotValue[1]"
                        >
                          <option
                          v-for="(val) in block.pivotOption.pivotTitle"
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
                      v-model:page="pivotTablePage"
                      :page-count="block.pivotOption.pivotSetting.length"
                      />
                    </span>
                    <n-button
                    strong secondary type="primary" size="small"
                    @click="pivotSettingAdd(block)"
                    >
                      新增
                    </n-button>
                    <n-button
                    v-if="block.pivotOption.pivotSetting.length > 1"
                    strong secondary type="error" size="small"
                    @click="pivotSettingDelete"
                    >
                      移除
                    </n-button>
                  </div>
                </div>
              </div>
            </div> -->
          </template>
        </CommonDialogComponent>
        <!-- 圖表設定 -->
        <CommonDialogComponent
        :isShowDialog="isShowChartSetting"
        @closeDialog="dialogClose"
        >
          <template #body>
            <h4 class="text-center">圖表設定</h4>
              <ChartSettingComponent/>
          </template>
        </CommonDialogComponent>
        <!-- 採計資料 -->
        <CommonDialogComponent
        :isShowDialog="isShowDataTable"
        @closeDialog="dialogClose"
        >
          <template #body>
            <DataTableComponent
            :tableTitle="block.pivotOption.pivotTitle"
            :tableData="block.pivotOption.pivotData"
            @tableDataAdd="tableDataAdd($event, block)"
            @tableDataUpdate="tableDataUpdate($event, block)"
            @tableDataDelete="tableDataDelete($event, block)"
            />
            <!-- <div class="d-flex" style="height: calc(100% - 40px);">
              <div
              class="overflow-auto"
              style="flex: auto;"
              >
                <table class="w-100 text-center">
                  <thead class="position-sticky top-0">
                    <tr>
                      <th
                      class="text-nowrap p-2"
                      v-for="(title, titleIndex) in block.pivotOption.pivotTitle"
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
                    v-for="(data, dataIndex) in block.pivotOption.pivotData"
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
            </div> -->
          </template>
        </CommonDialogComponent>
      </template>
    </CommonBlockComponent>
  </div>
</template>
<script setup>
import { ref, computed, provide } from 'vue';
import CommonBlockComponent from '@/components/CommonBlockComponent';
import CommonDialogComponent from '@/components/CommonDialogComponent';

import PiovtTableComponent from '@/CreatePageComponents/PiovtTableComponent';
import DataTableComponent from '@/CreatePageComponents/DataTableComponent';
import ChartSettingComponent from '@/CreatePageComponents/ChartSettingComponent';


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

const colorArray = ['#cc66dd', '#77aaee', '#ccff00', '#ff7733', '#33ffff', '#33ff11', '#ff6633', '#aadd66', '#ffcc00', '#66fbbf', '#66ff66', '#ccff66', '#cc33aa', '#ccff66', '#ff66ff', '#7733ff', '#33ccff', '#99ff66', '#00aa66', '#9933ff', '#663311', '#cc00ff', '#6699ff', '#00ffcc', '#3399ff', '#aa9933', '#00ff87', '#bbcc00', '#ff9966', '#aacc33', '#6600ff', '#00aacc', '#33ffcc', '#3366ff', '#aacc88', '#0044dd', '#ff3ff3', '#ffccaa', '#9977ff', '#66ffcc', '#3377ff', '#ff00bb', '#ff3399', '#66ccff', '#00aa77', '#ff6699', '#33ff99', '#ff5533', '#006655', '#33ff66', '#ff66cc', '#ccff33', '#ff9966', '#ff6600', '#66ff33', '#ff00aa', '#99ff33', '#ffcc66', '#ff3366', '#ff2266', '#4466ff', '#66ff99', '#220011', '#ff33cc'];

const pageSetting = ref([
  {
    view: [
      {
      // RWD辨識用的，順序如下不能交換
      // normal: 通用設定
      // desktop-all: 1400px以上
      // large-desktop-all: 1800px以上
      // pad: 1040px以下
      // mobile: 820px以下
      // small-mobile: 560px以下
        size: 'normal',

        css: {
          // 各區塊的間閣
          gap: 16,
          // 垂直分布
          rows: {
            pxValue: [],
            frValue: 12,
            unit: '%',
          },
          // 水平分布
          columns: {
            pxValue: [],
            frValue: 12,
            unit: '%'
          },
        }
      },
    ],
    blocks: [
      {
        view: [
          {
            size: 'normal',
            css: {
              row: {
                start: 6,
                end: -1,
              },
              column: {
                start: 1,
                end: 8
              },
              'gridRow': '6/-1',
              'gridColumn': '1/8'
            }
          },
          {
            size: 'desktop-all',
            css: {
              row: {
                start: 5,
                end: -1,
              },
              column: {
                start: 1,
                end: 7
              },
              'gridRow': '5/-1',
              'gridColumn': '1/7'
            }
          },
          {
            size: 'pad',
            css: {
              row: {
                start: 3,
                end: 4,
              },
              column: {
                start: 1,
                end: 2
              },
              'gridRow': '3/4',
              'gridColumn': '1/2'
            }
          },
        ],
        type: 'Chart',
        title: '人力缺口分析圖表aaaaaa',
        isShowTitle: true,
        chartOption: [
          {
            // 是否啟用
            useSetting: true,

            // 圖表類型
            // bar: 長條圖
            // line: 折線圖
            // pie: 圓餅圖
            type: 'bar',

            // 數據呈現於第幾張圖表
            chartIndex: 0,
            dataIndex: 0,

            // 坐標軸
            // 圓餅圖不適用
            // 同一張圖引用第一個軸設定
            axis: 'x',
            axisPosition: 'left',
            axisName: '人數a',

            // datazoom: 數據捲動
            showDataZoomLength: [
              {
              // RWD辨識用的，順序如下不能交換
              // normal:            通用設定
              // desktop-all:       1400px以上
              // large-desktop-all: 1800px以上
              // pad:               1040px以下
              // mobile:            820px以下
              // small-mobile:      560px以下
                size: 'normal',

                // 左右延伸幾筆數據
                // 如果值為 2 ，總共顯示 5 筆 (2+1+2)
                value: 1
              },
              {
                size: 'desktop-all',
                value: 2
              }
            ],

            // 長條圖相關設定
            // barMaxWidth: 長條圖最大寬度
            barMaxWidth: 14,
            // borderRadius: 圓角設定[左上、右上、左下、右下]
            borderRadius: 8,
            // radiusAngle: 圓角指定
            // top: '頂部',
            // all: '全部',
            radiusAngle: 'top',

            // 折線圖相關設定
            smooth: 0.5,
            symbol: 'circle',
            symbolSize: 10,
          },
          {
            useSetting: true,
            type: 'line',
            chartIndex: 1,
            dataIndex: 1,
            axis: 'y',
            axisPosition: 'right',
            axisName: '人數b',
            showDataZoomLength: [
              {
              // RWD辨識用的，順序如下不能交換
              // normal: 通用設定
              // desktop-all: 1400px以上
              // large-desktop-all: 1800px以上
              // pad: 1040px以下
              // mobile: 820px以下
              // small-mobile: 560px以下
                size: 'normal',

                // 左右延伸幾筆數據
                // 如果值為 2 ，總共顯示 5 筆 (2+1+2)
                value: 1
              },
              {
                size: 'desktop-all',
                value: 2
              },
              {
                size: 'large-desktop-all',
                value: 2
              },
              {
                size: 'pad',
                value: 2
              },
              {
                size: 'small-mobile',
                value: 1
              },
            ],
            barMaxWidth: 14,
            borderRadius: 4,
            smooth: 0.5,
            symbolSize: 10,
            symbol: 'circle',
          },
          {
            useSetting: true,
            type: 'bar',
            chartIndex: 1,
            dataIndex: 1,
            axis: 'y',
            axisPosition: 'right',
            axisName: '人數b',
            showDataZoomLength: [
              {
                size: 'normal',
                value: 1
              },
            ],
            barMaxWidth: 14,
            borderRadius: 4,
            smooth: 0.5,
            symbolSize: 10,
            symbol: 'circle',
          },
        ],
        chartAxisDirection: 'x',
        chartData: [],
        chartAxis: [],
        chartStackUsing: false,
        chartStack: [[], []],
        pivotOption: {
          pivotTitle: ['員工編號', '單位名稱', '人事狀態', '中文姓名', '出生日期', '年齡', '性別', '薪資身份', '身份別', '職務', '最高學歷', '畢業學校', '主修科系', '到職日期', '離職日期', '年資', '工作地點', '工作類型', '職稱中文', '是否原住民', '原住民族', '離職種類', '離職原因'],
          pivotData: [
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
          ],
          pivotRow: ['性別'],
          pivotSetting: [
            {
              pivotCol: ['單位名稱'],
              pivotValue: ['年資', '年齡'],
              pivotAggregator: 'Sum over Sum',
            },
            {
              pivotCol: ['人事狀態'],
              pivotValue: ['單位名稱', '年齡'],
              pivotAggregator: 'Count',
            },
            {
              pivotCol: ['最高學歷'],
              pivotValue: ['年資', '年齡'],
              pivotAggregator: 'Average',
            }
          ],
          valueFilter: {},
        },
      },
    ],
    path: '/test',
    group: 'Dashboard.D',
    name: "Dashboard.D010",
    useFilter: true,
    filter: {
      // 時間顆粒度
      // y: 年
      // ym: 年月
      // ymd: 年月日
      time: 'ym',

      // single: 單一
      // double: 兩個
      timeField: 'single',

      // timeDuration: 時間篩選是否為連續區間
      // 影響到顯示文字 e.q. 起始年月or上期年月
      timeDuration: false,

      placer: false,
      department: true,

      // yearCompany: 是否使用考核篩選
      yearCompany: false,

      // focusFilter: 預設篩選器，預先顯示的篩選器
      focusFilter: 'ym'
    },
  }
]);
const pivotTableAdd = function(obj, blockIndex){
  pageSetting.value[0].blocks[blockIndex].chartOption.push({
    type: 'bar',
    borderRadius: 4,
    radiusAngle: 'top',
    smooth: 0.5,
    symbol: 'circle',
    symbolSize: 12,
    chartStackUsing: false,
    chartStack: [[]]
  });
  pageSetting.value[0].blocks[blockIndex].pivotOption.pivotSetting.push({
    pivotCol: obj.col,
    pivotValue: obj.value,
    pivotAggregator: 'Count',
  });
};
const pivotTableDelete = function(pivotTableIndex, blockIndex){
  pageSetting.value[0].blocks[blockIndex].chartOption.splice(pivotTableIndex, 1);
  pageSetting.value[0].blocks[blockIndex].pivotOption.pivotSetting.splice(pivotTableIndex, 1);
  pageSetting.value[0].blocks[blockIndex].chartData.splice(pivotTableIndex, 1);
}

const pivotTablePage = ref(1);

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

const chartDataGet = function(pivotObj, blockIndex){
  pageSetting.value[0].blocks[blockIndex].chartData[pivotObj.tableIndex] = pivotObj.value;
  pageSetting.value[0].blocks[blockIndex].chartStack = [];
  pageSetting.value[0].blocks[blockIndex].chartStack[0] = Object.values(pivotObj.value).reduce((arr, dataRow) => {
    Object.keys(dataRow).forEach(item => {
      if(arr.includes(item) === false){
        arr.push(item);
      }
    })
    return arr;
  }, []);
  pageSetting.value[0].blocks[blockIndex].chartAxis = Object.keys(pivotObj.value)
  .sort((a, b)=>{
    if(a > b){
      return 1
    } else {
      return -1
    }
  })
  .map(item => item.split('\x00').join('-'));
};

const styleReturn = computed(()=>{
  return (styleList, block)=>{
    let cssSetting = styleList.find(item => item.size === 'normal').css;

    // if(props.screenWidth > RWDSetting.xl  && styleList.find(item => item.size === 'desktop-all')){
    //   cssSetting = styleList.find(item => item.size === 'desktop-all').css;
    // }
    // if(props.screenWidth > RWDSetting.xxl && styleList.find(item => item.size === 'large-desktop-all')){
    //   cssSetting = styleList.find(item => item.size === 'large-desktop-all').css;
    // }
    // if(props.screenWidth < RWDSetting.lg  && styleList.find(item => item.size === 'pad')){
    //   cssSetting = styleList.find(item => item.size === 'pad').css;
    // }
    // if(props.screenWidth < RWDSetting.md  && styleList.find(item => item.size === 'mobile')){
    //   cssSetting = styleList.find(item => item.size === 'mobile').css;
    // }
    // if(props.screenWidth < RWDSetting.sm  && styleList.find(item => item.size === 'small-mobile')){
    //   cssSetting = styleList.find(item => item.size === 'small-mobile').css;
    // }


    let result = {};
    // 大外框格線
    if(Object.prototype.hasOwnProperty.call(cssSetting, 'rows') && Object.prototype.hasOwnProperty.call(cssSetting, 'columns')){
      result['grid-gap'] = `${cssSetting.gap}px`;
      // rows
      if( ['%', 'percent', 'Percent'].includes(cssSetting.rows.unit) ){
        result['grid-template-rows'] = cssSetting.rows.frValue === 1 ? '100%' : `repeat(${cssSetting.rows.frValue}, 1fr)`;
      }else{
        result['grid-template-rows'] = cssSetting.rows.pxValue.map(item => `${item}px`).join(' ');
      }
      // columns
      if( ['%', 'percent', 'Percent'].includes(cssSetting.columns.unit) ){
        result['grid-template-columns'] = cssSetting.columns.frValue === 1 ? '100%' : `repeat(${cssSetting.columns.frValue}, 1fr)`;
      }else{
        result['grid-template-columns'] = cssSetting.columns.pxValue.map(item => `${item}px`).join(' ');
      }
    }else{
      // 小區塊分布
      result['grid-row'] = `${cssSetting.row.start}/${cssSetting.row.end}`;
      result['grid-column'] = `${cssSetting.column.start}/${cssSetting.column.end}`;
      setTimeout(() => {
        block.isBlockComplete = true;
      }, 0);
    }
    return result;
  }
});

const chartAxisExport = function(axisSide, blockSetting){
  if(blockSetting.chartAxisDirection === axisSide){
    return {
      type: 'category',
      data: blockSetting.chartAxisDirection === 'x' ? blockSetting.chartAxis : [...blockSetting.chartAxis].reverse(),
      axisPointer: { type: 'shadow' }
    }
  } else {
    return blockSetting.pivotOption.pivotSetting.map((item, index)=>{
      return {
        type: 'value',
        gridIndex: 0,
        alignTicks: true,
        offset: 40 * Math.floor(index / 2),
      }
    })
  }
};

const chartSeriesExport = function(blockSetting){
  let result = [];
  let colorIndex = 0;
  blockSetting.chartData.forEach((item, index)=>{
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
        // 這裡
        if(result[index].find(item => item.name === branchName)){
          result[index].find(item => item.name === branchName).data[treeIndex] = branch[1].value();
        } else {
          let data = Object.keys(blockSetting.chartData[0]).map(() => null);
          let obj = {
            name: branch[0].split('\x00').join('-'),
            data: data,
            type: blockSetting.chartOption[index].type,
            smooth: blockSetting.chartOption[index].smooth,
            symbol: blockSetting.chartOption[index].symbol,
            symbolSize: blockSetting.chartOption[index].symbolSize,
            yAxisIndex: index,
            itemStyle: {
              color: colorArray[colorIndex],
              borderRadius: (()=>{
                if(blockSetting.chartOption[index].radiusAngle === 'top'){
                  if(blockSetting.chartAxisDirection === 'x'){
                    return [blockSetting.chartOption[index].borderRadius, blockSetting.chartOption[index].borderRadius, 0, 0];
                  } else {
                    return [0, blockSetting.chartOption[index].borderRadius, blockSetting.chartOption[index].borderRadius, 0];
                  }
                }
                return blockSetting.chartOption[index].borderRadius
              })(),
            }
          };

          // 數據分組
          if(blockSetting.chartStackUsing === true){
            blockSetting.chartStack.forEach((group, groupIndex) => {
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
    if(blockSetting.chartStackUsing === true){
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
    return resultItem;
  })

  // 陣列降維
  result = result.flat(1);

  // 橫向直向轉換調整數據順序
  result = result.map(item => {
    if(blockSetting.chartOption.axis === 'x'){
      item.yAxisIndex = item.axisIndex;
    }
    if(blockSetting.chartOption.axis === 'y'){
      item.xAxisIndex = item.axisIndex;
    }

    if(blockSetting.chartOption.axis === 'y'){
      item.data.reverse();
    }
    delete item.axisIndex;
    return item;
  });

  return result;
};

const chartExport = computed(() => {
  return (block) => {
    let res = {
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
      legend: {
        type: 'scroll',
      },
      grid: {
        left: '16px',
        right: '16px',
        top: '32px',
        bottom: '16px',
        containLabel: true
      },
      xAxis: chartAxisExport('x', block),
      yAxis: chartAxisExport('y', block),
      series: chartSeriesExport(block),
    }
    return res;
  }
});

const isShowChartSetting = ref(false);
const isShowPivotTable = ref(false);
const isShowDataTable = ref(false);
const dialogClose = function(){
  isShowPivotTable.value = false;
  isShowDataTable.value = false;
  isShowChartSetting.value = false;
}

// ===================

const tableDataAdd = function(dataArray, block){
  block.pivotOption.pivotData.push(dataArray);
};

const tableDataUpdate = function(obj, block){
  block.pivotOption.pivotData[obj.dataIndex] = obj.data;
};

const tableDataDelete = function(index, block){
  block.pivotOption.pivotData.splice(index, 1);
};

</script>
<style lang="scss">
.grid{
  display: grid;
  height: 100%;
  grid-gap: 16px;
  grid-template-rows: repeat(12, 1fr);
  grid-template-columns: repeat(12, 1fr);
}

.frame{
  img{
    $img-size: 16px;
    width: $img-size;
    height: $img-size;
  }
}
</style>