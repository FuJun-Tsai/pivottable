<template>
  <div
  class="container grid"
  :style="styleReturn(pageSetting[0].view)"
  >
    <div
    v-for="setting in pageSetting[0].blocks"
    :key="setting.title"
    :style="styleReturn(setting.view, setting)"
    >
      <CommonBlockComponent
      :isShowTitle="false"
      :isShowFilter="false"
      :isShowNotice="false"
      :isAPIComplete="true"
      >
        <template #content>
          12312312312
        </template>
      </CommonBlockComponent>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import CommonBlockComponent from '@/components/CommonBlockComponent';

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
        // 畫面布局
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
              row: {
                start: 1,
                end: 6,
              },
              column: {
                start: 1,
                end: 6
              },
              // gridRow: 搭配外層的 grid-template-rows 使用
              // gridColumn: 搭配外層的 grid-template-columns 使用
              // 'gridRow': '1/6',
              // 'gridColumn': '1/6'
            }
          },
          {
            size: 'desktop-all',
            css: {
              row: {
                start: 1,
                end: 5,
              },
              column: {
                start: 1,
                end: 6
              },
              // 'gridRow': '1/5',
              // 'gridColumn': '1/6'
            }
          },
          {
            size: 'pad',
            css: {
              row: {
                start: 1,
                end: 2,
              },
              column: {
                start: 1,
                end: 2
              },
            }
          },
        ],
        // type: 顯示類型
        // DOM: HTML結構
        // Chart: echart結構
        type: 'DOM',

        // title: 區塊標題，也被用來當作區塊的id
        title: '測試一',

        // isShowTitle: 是否顯示區塊標題
        isShowTitle: true,

        // api路徑，回傳內容存於data
        api: 'RecruitShortage/ShortageTotalInfo',
        data: '',

        // HTML結尾的是用來輸出HTML的變數
        // 表頭區塊
        topHTML: '',

        // topHTMLInit 必須是具名函式，提供一個參數，取得當前的物件(block)
        // topHTMLInit 不使用的時候以 null 作為值。
        // {*TRANS-xxx*T} => 帶入api資料，xxx為翻譯字串，xxx前後不得有空格
        topHTMLInit: null,
        // topHTMLInit: function topHTMLInit(){},

        // 是否顯示提示
        isShowNotice: true,

        // 提示icon的位子
        noticePosition: {
          topBottom: {
            cssKey: 'top',
            value: 16,
            unit: 'px'
          },
          leftRight: {
            cssKey: 'right',
            value: 16,
            unit: 'px'
          }
        },

        // HTML結尾的是用來輸出HTML的變數
        // 提示區塊
        noticeHTML: '',

        // noticeHTMLInit 必須是具名函式，提供一個參數，取得當前的物件(block)
        // topHTMLInit 不使用的時候以 null 作為值。
        // {*TRANS-xxx*T} => 帶入api資料，xxx為翻譯字串，xxx前後不得有空格
        // noticeHTMLInit: null
        noticeHTMLInit: function noticeHTML(block){
          return `
          <div class="d-flex flex-column justify-content-between h-100">
            <div class="d-flex flex-column justify-content-between color-black-400">
              <p class="fs-14 mb-0">
                {*TRANS-編制人數*T}：${block.data.planPeople}x人x
              </p>
              <p class="fs-14 mb-0">
                {*TRANS-目前人數*T}：${block.data.currrentPeople}人
              </p>
              <p class="fs-14 mb-0">
                {*TRANS-相差人數*T}：${block.data.differPeople}人
              </p>
            </div>
          </div>
        `
        },

        // HTML結尾的是用來輸出HTML的變數
        // 內容區塊
        // type為chart的時候不使用
        // {*TRANS-xxx*T} => 帶入api資料，xxx為翻譯字串，xxx前後不得有空格
        contentHTML: '',

        // contentHTMLInit 必須是具名函式，提供一個參數，取得當前的物件(block)
        // contentHTMLInit 不使用的時候以 null 作為值。
        // {*TRANS-xxx*T} => 帶入api資料，xxx為翻譯字串，xxx前後不得有空格
        // contentHTMLInit: null
        contentHTMLInit: function contentHTML(block){
          return `
        <div class="d-flex flex-column justify-content-between h-100">
          <p class="fs-24 fw-bold mb-0"></p>
          <div class="d-flex justify-content-between">
            <div class="d-flex flex-column justify-content-between color-black-400">
              <p class="fs-14 mb-0">
                {*TRANS-編制人數*T}：${block.data.planPeople}人
              </p>
              <p class="fs-14 mb-0">
                {*TRANS-目前人數*T}：${block.data.currrentPeople}人
              </p>
              <p class="fs-14 mb-0">
                {*TRANS-相差人數*T}：${block.data.differPeople}人
              </p>
            </div>
            <div class="text-center">
              <span class="color-secondary-orange mx-auto rounded-2" style="background: #FAE1D2; padding: 2px 4px;">
                {*TRANS-缺口比率*T}
              </span>
              <div class="color-black-500 text-end">
                <span class="fs-48 fw-bold"> ${block.data.shortageRate} </span>
                <span>%</span>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <span class="color-black-500 fs-14 fw-bold">
              {*TRANS-招聘預估成本*T}
            </span>
            <span class="color-secondary-orange fw-bold">
              <span class="fs-28"> ${block.data.budget} </span>
              <span class="fs-16"> {*TRANS-元*T} </span>
            </span>
          </div>
        </div>
        `
        },

        // type為DOM的時候不使用
        chartOption:{},

        // 區塊篩選器
        filter: [],

        // scrollType: 內部是否滾動
        isScrollType: false,
      },
      {
        view: [
          {
            size: 'normal',
            css: {
              row: {
                start: 1,
                end: 6,
              },
              column: {
                start: 6,
                end: -1
              },
              // 'gridRow': '1/6',
              // 'gridColumn': '6/-1',
            }
          },
          {
            size: 'desktop-all',
            css: {
              row: {
                start: 1,
                end: 5,
              },
              column: {
                start: 6,
                end: -1
              },
              // 'gridRow': '1/5',
              // 'gridColumn': '6/-1'
            }
          },
          {
            size: 'pad',
            css: {
              row: {
                start: 2,
                end: 3,
              },
              column: {
                start: 1,
                end: 2
              },
              // 'gridRow': '2/3',
              // 'gridColumn': '1/2'
            }
          },
        ],
        type: 'DOM',
        title: '招募天數資訊',
        isShowTitle: true,
        component: 'TextComponent2',
        api: 'RecruitDays/FinishList',
        data: '',
        isShowNotice: true,
        noticePosition: {
          topBottom: {
            cssKey: 'top',
            value: 16,
            unit: 'px'
          },
          leftRight: {
            cssKey: 'right',
            value: 16,
            unit: 'px'
          }
        },
        noticeHTML: '',
        noticeHTMLInit: function noticeHTMLInit(){
          return `
        <div class="color-black-400 p-1">
          <div class="row mb-2">
            <div class="col-6">
              <div class="d-inline-block circle background-secondary-green"></div>
              <span>：標準值</span>
            </div>
            <div class="col-6">
              <div class="d-inline-block circle background-secondary-red"></div>
              <span>：需關注</span>
            </div>
          </div>
          <p class="line-height-1 mb-1">以18天為標準值界線；</p>
          <p class="line-height-1 mb-0">天數小於18為標準值，大於等於18天需關注。</p>
        </div>
        `
        },
        contentHTML: '',
        contentHTMLInit: function(block){
          return `
        <div class="row h-100 w-100">
          <div class="col-6 h-100">
            <div class="d-flex flex-column flex-md-row flex-lg-column justify-content-center justify-content-md-evenly justify-content-lg-center align-items-center h-100 box-shadow rounded-3 p-3">
              <p class="mb-0 fs-18 fw-bolder">
                {*TRANS-總平均天數*T}
              </p>
              <p class="color-secondary-green fs-60 mb-0">
                ${block.data.averageDay}
              </p>
            </div>
          </div>
          <div class="col-6 h-100">
            <div class="h-100 d-flex flex-column justify-content-evenly line-height-1">
              <div class="d-flex justify-content-between align-items-center">
                <div class="fw-bolder">
                  <p class="line-height-1 fs-14 mb-1">
                    {*TRANS-單筆*T}
                  </p>
                  <p class="line-height-1 fs-14 mb-0">
                    {*TRANS-最大天數*T}
                  </p>
                </div>
                <div class="color-secondary-red fs-32 p-2">
                  ${block.data.maxDay}
                </div>
              </div>
              <div class="spacing background-black-400" style="flex: 0 0 2px;"></div>
              <div class="d-flex justify-content-between align-items-center">
                <div class="fw-bolder">
                  <p class="line-height-1 fs-14 mb-0"> {*TRANS-結案筆數*T} </p>
                </div>
                <div class="fs-32 p-2">
                  ${block.data.dataCount}
                </div>
              </div>
            </div>
          </div>
        </div>
        `
        },
        filter: [],
        isScrollType: false,
      },
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
            type: 'pie',

            // 數據呈現於第幾張圖表
            chartIndex: 0,
            dataIndex: 0,

            // 坐標軸
            // 圓餅圖不適用
            // 同一張圖引用第一個軸設定
            axis: 'x',
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
            symbolSize: 10,
            symbol: 'circle',
          },
          {
            // 是否啟用
            useSetting: true,

            // 圖表類型
            type: 'pie',

            // 數據呈現於第幾張圖表
            chartIndex: 1,
            dataIndex: 1,

            // 坐標軸
            axis: 'y',
            axisName: '人數b',

            // datazoom: 數據捲動
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


            // 長條圖相關設定
            // barMaxWidth: 長條圖最大寬度
            barMaxWidth: 14,
            // borderRadius: [左上、右上、左下、右下]
            borderRadius: 4,

            // 折線圖相關設定
            smooth: 0.5,
            symbolSize: 10,
            symbol: 'circle',
          },
        ],
        api: 'RecruitShortage/ShortageDepartmentChart',
        data: '',
        isShowNotice: true,
        noticePosition: {
          topBottom: {
            cssKey: 'top',
            value: 16,
            unit: 'px'
          },
          leftRight: {
            cssKey: 'right',
            value: 16,
            unit: 'px'
          }
        },
        noticeHTML: '',
        noticeHTMLInit: function(block){
          return `
            <div class="d-flex flex-column justify-content-between h-100">
              <p class="fs-14 mb-0">
                使用 ${block.chartOption.filter(item => item.useSetting).length} 個圖表設定
              </p>
            </div>
          `;
        },
        contentHTML: '',
        contentHTMLInit: null,
        filter: [],
        isScrollType: false,
      },
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
                start: 8,
                end: -1
              },
              // 'gridRow': '6/-1',
              // 'gridColumn': '8/-1',
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
                start: 7,
                end: -1
              },
              // 'gridRow': '5/-1',
              // 'gridColumn': '7/-1'
            }
          },
          {
            size: 'pad',
            css: {
              row: {
                start: 4,
                end: 5,
              },
              column: {
                start: 1,
                end: 2
              },
              // 'gridRow': '4/5',
              // 'gridColumn': '1/2'
            }
          },
        ],
        type: 'DOM',
        title: '部門招聘進度cc',
        isShowTitle: true,
        component: 'TextComponent3',
        api: 'RecruitShortage/ShortageSchedule',
        data: '',
        topHTML: '',
        topHTMLInit: function topHTMLInit(){
          return `
        <div class="d-flex line-height-1 text-center mb-2 mx-2">
          <span class="color-black-400" style="flex: 0 0 25%">
            {*TRANS-部門名稱*T}
          </span>
          <span class="color-black-400" style="flex: 0 0 25%">
            {*TRANS-缺口比率*T}
          </span>
          <span class="color-black-400" style="flex: 0 0 25%">
            {*TRANS-履歷回應率*T}
          </span>
          <span class="color-black-400" style="flex: 0 0 25%">
            {*TRANS-面試比率*T}
          </span>
        </div>
        <hr class="my-0 mx-2">
        `
        },
        isShowNotice: false,
        noticePosition: {
          topBottom: {
            cssKey: 'top',
            value: 16,
            unit: 'px'
          },
          leftRight: {
            cssKey: 'right',
            value: 200,
            unit: 'px'
          }
        },
        noticeHTML: '',
        noticeHTMLInit: null,
        contentHTML: '',
        contentHTMLInit: function contentHTMLInit(block){
          let result = block.data.data
          .filter(item => block.filter[0].selected.includes(item.depKey))
          .sort((a, b) => {
            let sortColumn = block.filter[1].selected;
            let sortDirection = block.filter[2].selected;
            if(sortDirection === 'descending'){
            // 降冪排序
              return a[sortColumn] - b[sortColumn];
            }
            return b[sortColumn] - a[sortColumn];
          })
          .map((item, index) => {
            return `
          <div class="px-2 pb-2 ${index === 0 ? 'mt-2' : ''} ">
            <div
            class="box-shadow d-flex align-items-center text-center rounded-3 py-3
            ${item.lackRate < 0.6 && item.replyRate > 0.6 && item.interviewRate > 0.6 ? 'color-secondary-green' : ''}
            "
            style="height: 60px"
            >
              <span
              class="fs-14 color-black-600"
              style="flex: 0 0 25%"
              >
                ${item.depFullName}
              </span>
              <span
              class="fs-14
              ${item.lackRate >= 0.6 ? 'color-secondary-red fs-32 fw-bold' : ''}
              "
              style="flex: 0 0 25%"
              >
                ${item.lackRate * 100}%
              </span>
              <span
              style="flex: 0 0 25%"
              class="fs-14
              ${item.replyRate < 0.6 ? 'color-secondary-red fs-32 fw-bold' : ''}
              "
              >
                ${item.replyRate * 100}%
              </span>
              <span
              style="flex: 0 0 25%"
              class="fs-14
              ${item.interviewRate < 0.6 ? 'color-secondary-red fs-32 fw-bold' : ''}
              "
              >
                ${item.interviewRate * 100}%
              </span>
            </div>
          </div>
          `
          }).join('');
          return result;
        },
        filter: [
          {
            // type: 篩選器類型
            type: 'checkbox',
            buttonText: '',
            buttonTextInit: function buttonTextInit(){
              return '部門名稱';
            },
            buttonTextInitError: '',
            option: [],
            optionInit: function optionInit(block){
              return block.data.data.map(item => {
                return {
                  name: item.depFullName,
                  value: item.depKey
                }
              });
            },
            optionInitError: '',
            selected: [],
            selectedInit: function selectedInit(block){
              return block.data.data.map(item => item.depKey);
            },
            selectedInitError: '',
          },
          {
            type: 'radio',
            buttonText: '排序欄位',
            buttonTextInit: function(block){
              return block.filter[1].option.find(item => item.value === block.filter[1].selected).name;
            },
            option: [],
            optionInit: function(){
              return [
                {
                  name: '缺口比率',
                  value: 'lackRate',
                },
                {
                  name: '履歷回應率',
                  value: 'replyRate',
                },
                {
                  name: '面試比率',
                  value: 'interviewRate',
                }
              ]
            },
            selected: '',
            selectedInit: function(block){
              return block.filter[1].option[0].value;
              // return 'lackRate';
            }
          },
          {
            type: 'button',
            buttonText: '排序方式',
            option: [],
            optionInit: function(){
              return [
                {
                  name: '降冪',
                  value: 'descending',
                },
                {
                  name: '升冪',
                  value: 'increasing',
                },
              ]
            },
            selected: '',
            selectedInit: function(){
              return 'descending';
            }
          },
        ],
        isScrollType: true,
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
</script>
<style lang="scss">
.grid{
  display: grid;
  height: 100%;
  grid-gap: 16px;
  grid-template-rows: repeat(12, 1fr);
  grid-template-columns: repeat(12, 1fr);
}
</style>