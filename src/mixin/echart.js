const colorArray = ['#cc66dd', '#77aaee', '#ccff00', '#ff7733', '#33ffff', '#33ff11', '#ff6633', '#aadd66', '#ffcc00', '#66fbbf', '#66ff66', '#ccff66', '#cc33aa', '#ccff66', '#ff66ff', '#7733ff', '#33ccff', '#99ff66', '#00aa66', '#9933ff', '#663311', '#cc00ff', '#6699ff', '#00ffcc', '#3399ff', '#aa9933', '#00ff87', '#bbcc00', '#ff9966', '#aacc33', '#6600ff', '#00aacc', '#33ffcc', '#3366ff', '#aacc88', '#0044dd', '#ff3ff3', '#ffccaa', '#9977ff', '#66ffcc', '#3377ff', '#ff00bb', '#ff3399', '#66ccff', '#00aa77', '#ff6699', '#33ff99', '#ff5533', '#006655', '#33ff66', '#ff66cc', '#ccff33', '#ff9966', '#ff6600', '#66ff33', '#ff00aa', '#99ff33', '#ffcc66', '#ff3366', '#ff2266', '#4466ff', '#66ff99', '#220011', '#ff33cc'];

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
        if(result[index].find(item => item.name === branchName)){
          result[index].find(item => item.name === branchName).data[treeIndex] = branch[1];
        } else {
          let data = Object.keys(blockSetting.chartData[0]).map(() => null);
          let obj = {
            name: branch[0].split('\x00').join('-'),
            data: data,
            type: blockSetting.chartOption[index].type,
            smooth: blockSetting.chartOption[index].smooth,
            symbol: blockSetting.chartOption[index].symbol,
            symbolSize: blockSetting.chartOption[index].symbolSize,
            axisIndex: index,
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

          data[treeIndex] = branch[1];
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

  console.log(blockSetting);
  // 橫向直向轉換調整數據順序
  result = result.map(item => {
    if(blockSetting.chartOption.axis === 'x'){
      item.yAxisIndex = item.axisIndex;
    }
    if(blockSetting.chartOption.axis === 'y'){
      item.xAxisIndex = item.axisIndex;
      item.data.reverse();
    }
    delete item.axisIndex;
    return item;
  });

  console.log(result);
  return result;
};

export const chartExport = function(block){
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
    grid: {
      left: '16px',
      right: '16px',
      top: '32px',
      bottom: '16px',
      containLabel: true
    },
    legend: {
      type: 'scroll',
    },
    xAxis: chartAxisExport('x', block),
    yAxis: chartAxisExport('y', block),
    series: chartSeriesExport(block),
  }
  console.log(res);
  return res;
}
