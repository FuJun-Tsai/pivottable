<template>
  <div class="about">
    <h1>原始資料</h1>
    <table class="data">
      <tr>
        <th
        v-for="item in title"
        :key="item"
        style="padding: 2px 8px; border-bottom: 1px solid #333;"
        >
          {{ item }}
        </th>
      </tr>
      <tr
      v-for="column in data"
      :key="column"
      >
        <td
        v-for="(item, i) in column"
        :key="`${item}${i}`"
        style="padding: 2px 8px"
        >
          {{ item }}
        </td>
      </tr>
    </table>
  </div>
  <!-- <div>
    <h2>pivot-table</h2>
    <div class="pivot-table"></div>
  </div> -->
  <div>
    <h2>pivotUI-table</h2>
    <div class="pivotUI-table" ref="pivotUITable"></div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import $ from 'jquery';
import './../mixin/pivot.js';
import 'jquery-ui-dist/jquery-ui.js';


const title = ref(['消費日期', '顧客姓名', '商品種類', '顏色', '單品價格', '銷售數量', '銷售總額', '顧客等級', '銷售店鋪', '銷售人員']);

const data = ref([
  [ '2020/1/1', 'H',	'女包1', '紅色', '300', '2', '600', 'VIP',	'台北', 'S12' ],
  [ '2020/1/1', 'H',	'女包1', '紅色', '300', '2', '600', 'VIP',	'台北', 'S12' ],
  [ '2020/1/1', 'A',	'女鞋',  '黑色', '200', '1', '200', 'VIP',	'台中', 'S16' ],
  [ '2020/1/1', 'C',	'女鞋2', '藍色', '200', '1', '200', 'VVIP',	'台中', 'S15' ],
  [ '2020/1/2', 'I',	'女包1', '黑色', '300', '1', '300', 'VVIP',	'台中', 'S17' ],
  [ '2020/1/2', 'C',	'男包1', '黑色', '500', '1', '500', 'VVIP',	'台中', 'S15' ],
  [ '2020/1/3', 'H',	'皮夾',  '棕色', '150', '3', '450', 'VIP',	'台北', 'S12' ],
  [ '2020/1/3', 'H',	'女包1', '紅色', '300', '1', '300', 'VVIP',	'台北', 'S12' ],
  [ '2020/1/3', 'H',	'男包2', '棕色', '300', '1', '300', 'VVIP',	'台北', 'S12' ],
  [ '2020/1/3', 'F',	'皮夾',  '黃色', '150', '2', '300', 'VIP',	'台北', 'S14' ],
  [ '2020/1/4', 'D',	'皮夾',  '黑色', '150', '2', '300', 'VIP',	'台中', 'S15' ],
  [ '2020/1/4', 'D',	'男包3', '黑色', '400', '1', '400', 'VIP',	'台中', 'S15' ],
  [ '2020/1/4', 'F',	'皮夾',  '黑色', '150', '1', '150', 'VIP',	'台北', 'S13' ],
  [ '2020/1/4', 'A',	'皮夾',  '棕色', '200', '4', '800', 'VIP',	'台中', 'S16' ],
  [ '2020/1/4', 'H',	'女鞋2', '黑色', '200', '1', '200', 'VVIP',	'台北', 'S13' ],
  [ '2020/1/4', 'H',	'女鞋2', '藍色', '200', '1', '200', 'VVIP',	'台北', 'S13' ],
  [ '2020/1/4', 'H',	'女鞋2', '紅色', '200', '1', '200', 'VVIP',	'台北', 'S13' ],
  [ '2020/1/4', 'H',	'皮夾',  '黃色', '150', '2', '300', 'VVIP',	'台北', 'S13' ],
  [ '2020/1/5', 'A',	'女包1', '黑色', '300', '2', '600', 'VIP',	'台中', 'S16' ],
  [ '2020/1/6', 'A',	'女包2', '黑色', '400', '1', '400', 'VIP',	'台中', 'S17' ],
  [ '2020/1/6', 'F',	'女鞋',  '黑色', '200', '1', '200', 'VIP',	'台北', 'S14' ],
  [ '2020/1/6', 'G',	'男包2', '棕色', '300', '1', '300', 'VVIP',	'台北', 'S12' ],
  [ '2020/1/7', 'A',	'女鞋2', '黑色', '200', '1', '200', 'VIP',	'台中', 'S16' ],
  [ '2020/1/7', 'G',	'女包3', '紅色', '300', '3', '900', 'VVIP',	'台北', 'S12' ],
]);

const pivotUITable = ref(null);
onMounted(() => {
  // $('.pivot-table').pivot(
  //   [title.value, ...data.value],
  //   {
  //     cols: ["消費日期"],
  //     rows: ["顧客姓名"],
  //     aggregatorName: "Count",
  //     rendererName: "Table"
  //   },
  // );

  // let pivotTreeData = $('.pivotUI-table').dataTree(
  //   [title.value, ...data.value],
  //   {
  //     cols: ["消費日期"],
  //     rows: ["顧客姓名"],
  //     aggregatorName: "Count",
  //     rendererName: "Table"
  //   },
  // )

  $('.pivotUI-table').pivotUI(
    [title.value, ...data.value],
    {
      cols: ["消費日期"],
      rows: ["顧客等級", "顧客姓名"],
      vals: ["銷售總額", "銷售數量"],
      aggregatorName: "Sum",
      rendererName: "Table"
    }
  );

});

</script>
<style lang="scss" scoped>
@import 'jquery-ui-dist/jquery-ui.min.css';
@import 'pivottable/dist/pivot.min.css';

.data, .pivot-table, .pivotUI-table{
  display: inline-block;
  margin: 0 auto;
}

// :deep(.pvtVals), :deep(.pvtRows){
//   width: 300px;
// }
</style>
