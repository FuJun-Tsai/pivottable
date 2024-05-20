import { ref } from "vue";
import { defineStore } from 'pinia';

export const pivottableStore = defineStore('PivottableUi', () => {
  const pivotTitle = ref(['消費日期', '顧客姓名', '商品種類', '顏色', '單品價格', '銷售數量', '銷售總額', '顧客等級', '銷售店鋪', '銷售人員']);
  const pivotData = ref([
    [ '2020/1/1', 'H', '女包1', '紅色', '200', '2', '400', 'VIP',	'台北', 'S12' ],
    [ '2020/1/1', 'H', '女包1', '紅色', '150', '2', '300', 'VIP',	'台北', 'S12' ],
    [ '2020/1/1', 'H', '女包1', '紅色', '300', '2', '600', 'VIP',	'台北', 'S12' ],
    [ '2020/1/1', 'H', '女包1', '紅色', '300', '2', '600', 'VIP',	'台北', 'S12' ],
    [ '2020/1/1', 'A', '女鞋', '黑色', '200', '1', '200', 'VIP', '台中', 'S16' ],
    [ '2020/1/1', 'C', '女鞋2', '藍色', '200', '1', '200', 'VVIP', '台中', 'S15' ],
    [ '2020/1/4', 'F', '皮夾', '黑色', '150', '1', '150', 'VIP', '台北', 'S13' ],
    [ '2020/1/4', 'A', '皮夾', '棕色', '200', '4', '800', 'VIP', '台中', 'S16' ],
    [ '2020/1/4', 'H', '女鞋2', '黑色', '200', '1', '200', 'VVIP', '台北', 'S13' ],
    [ '2020/1/6', 'G', '男包2', '棕色', '300', '2', '600', 'VVIP', '台北', 'S12' ],
    [ '2020/1/6', 'A', '女鞋2', '藍色', '300', '1', '300', 'VVIP', '台中', 'S12' ],
    [ '2020/1/6', 'C', '男包2', '棕色', '300', '2', '600', 'VVIP', '台中', 'S12' ],
    [ '2020/1/6', 'F', '皮夾', '藍色', '300', '1', '300', 'VVIP', '台北', 'S12' ],
    [ '2020/1/7', 'A', '女鞋2', '黑色', '200', '1', '200', 'VIP',	'台中', 'S16' ],
    [ '2020/1/7', 'G', '女包3', '紅色', '300', '3', '900', 'VVIP', '台北', 'S12' ],
  ]);

  const pivotRows = ref(['顧客等級']);
  const pivotSetting = ref([
    {
      cols: ['商品種類'],
      values: ['銷售總額', '消費日期'],
      aggregator: 'Sum over Sum',
    },
    {
      cols: ['消費日期'],
      values: ['銷售總額'],
      aggregator: 'Count',
    },
  ]);

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

  const aggregatorSelect = function(aggregator, index){
    pivotSetting.value[index].aggregator = aggregator;
  }

  return {
    pivotTitle,
    pivotData,

    pivotRows,
    pivotSetting,

    valueFilter,
    valueFilterUpdate,

    aggregatorSelect
  }
})