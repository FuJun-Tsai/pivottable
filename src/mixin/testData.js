export default {
  "data": [
      {
        '消費日期': '2020/1/1',
        '顧客姓名': 'H',
        '商品種類': '女包1',
        '顏色': '紅色',
        '單品價格': '300',
        '銷售數量': '2',
        '銷售總額': '600',
        '顧客等級': 'VIP',
        '銷售店鋪': '台北',
        '銷售人員': 'S12'
      },
      {
        '消費日期': '2020/1/3',
        '顧客姓名': 'F',
        '商品種類': '皮夾',
        '顏色': '黃色',
        '單品價格': '150',
        '銷售數量': '2',
        '銷售總額': '300',
        '顧客等級': 'VVIP',
        '銷售店鋪': '台北',
        '銷售人員': 'S14'
      }
  ],
  "aggregators": {},
  "aggregatorName": "Sum",
  "tableOptions": {},
  "renderers": {
      "Table": {
          "name": "vue-table",
          "mixins": [
              {
                  "props": {
                      "data": {
                          "type": [
                              null,
                              null,
                              null
                          ],
                          "required": true
                      },
                      "aggregators": {},
                      "aggregatorName": {
                          "default": "Count"
                      },
                      "heatmapMode": {},
                      "tableColorScaleGenerator": {},
                      "tableOptions": {},
                      "renderers": {},
                      "rendererName": {
                          "default": "Table"
                      },
                      "locale": {
                          "default": "en"
                      },
                      "locales": {},
                      "rowTotal": {
                          "default": true
                      },
                      "colTotal": {
                          "default": true
                      },
                      "cols": {},
                      "rows": {},
                      "vals": {},
                      "attributes": {},
                      "valueFilter": {},
                      "sorters": {
                          "type": [
                              null,
                              null
                          ]
                      },
                      "derivedAttributes": {
                          "type": [
                              null,
                              null
                          ]
                      },
                      "rowOrder": {
                          "default": "key_a_to_z"
                      },
                      "colOrder": {
                          "default": "key_a_to_z"
                      },
                      "tableMaxWidth": {
                          "default": 0
                      },
                      "colLimit": {
                          "default": 100
                      },
                      "rowLimit": {
                          "default": 100
                      }
                  },
                  "methods": {}
              }
          ],
          "props": {
              "heatmapMode": {},
              "tableColorScaleGenerator": {},
              "tableOptions": {},
              "localeStrings": {}
          },
          "methods": {},
          "_Ctor": {}
      },
      "Scroll Table": {
          "name": "vue-table",
          "mixins": [
              {
                  "props": {
                      "data": {
                          "type": [
                              null,
                              null,
                              null
                          ],
                          "required": true
                      },
                      "aggregators": {},
                      "aggregatorName": {
                          "default": "Count"
                      },
                      "tableColorScaleGenerator": {},
                      "tableOptions": {},
                      "rendererName": {
                          "default": "Table"
                      },
                      "locale": {
                          "default": "en"
                      },
                      "locales": {},
                      "rowTotal": {
                          "default": true
                      },
                      "colTotal": {
                          "default": true
                      },
                      "cols": {},
                      "rows": {},
                      "vals": {},
                      "attributes": {},
                      "valueFilter": {},
                      "sorters": {
                          "type": [
                              null,
                              null
                          ]
                      },
                      "derivedAttributes": {
                          "type": [
                              null,
                              null
                          ]
                      },
                      "rowOrder": {
                          "default": "key_a_to_z"
                      },
                      "colOrder": {
                          "default": "key_a_to_z"
                      },
                      "colLimit": {
                          "default": 100
                      },
                      "rowLimit": {
                          "default": 100
                      }
                  },
                  "methods": {}
              }
          ],
          "props": {
              "colLimit": {
                  "default": 100
              },
              "rowLimit": {
                  "default": 100
              },
              "tableColorScaleGenerator": {},
              "tableOptions": {},
              "localeStrings": {}
          },
          "computed": {},
          "methods": {}
      },
      "Table Heatmap": {
          "name": "vue-table-heatmap",
          "mixins": [
              {
                  "props": {
                      "data": {
                          "type": [
                              null,
                              null,
                              null
                          ],
                          "required": true
                      },
                      "aggregators": {},
                      "aggregatorName": {
                          "default": "Count"
                      },
                      "tableColorScaleGenerator": {},
                      "tableOptions": {},
                      "rendererName": {
                          "default": "Table"
                      },
                      "locale": {
                          "default": "en"
                      },
                      "locales": {},
                      "rowTotal": {
                          "default": true
                      },
                      "colTotal": {
                          "default": true
                      },
                      "cols": {},
                      "rows": {},
                      "vals": {},
                      "attributes": {},
                      "valueFilter": {},
                      "sorters": {
                          "type": [
                              null,
                              null
                          ]
                      },
                      "derivedAttributes": {
                          "type": [
                              null,
                              null
                          ]
                      },
                      "rowOrder": {
                          "default": "key_a_to_z"
                      },
                      "colOrder": {
                          "default": "key_a_to_z"
                      },
                      "colLimit": {
                          "default": 100
                      },
                      "rowLimit": {
                          "default": 100
                      }
                  },
                  "methods": {}
              }
          ],
          "props": {
              "colLimit": {
                  "default": 100
              },
              "rowLimit": {
                  "default": 100
              },
              "tableColorScaleGenerator": {},
              "tableOptions": {},
              "localeStrings": {}
          },
          "computed": {},
          "methods": {}
      },
      "Table Col Heatmap": {
          "name": "vue-table-col-heatmap",
          "mixins": [
              {
                  "props": {
                      "data": {
                          "type": [
                              null,
                              null,
                              null
                          ],
                          "required": true
                      },
                      "aggregators": {},
                      "aggregatorName": {
                          "default": "Count"
                      },
                      "heatmapMode": {},
                      "tableColorScaleGenerator": {},
                      "tableOptions": {},
                      "renderers": {},
                      "rendererName": {
                          "default": "Table"
                      },
                      "locale": {
                          "default": "en"
                      },
                      "locales": {},
                      "rowTotal": {
                          "default": true
                      },
                      "colTotal": {
                          "default": true
                      },
                      "cols": {},
                      "rows": {},
                      "vals": {},
                      "attributes": {},
                      "valueFilter": {},
                      "sorters": {
                          "type": [
                              null,
                              null
                          ]
                      },
                      "derivedAttributes": {
                          "type": [
                              null,
                              null
                          ]
                      },
                      "rowOrder": {
                          "default": "key_a_to_z"
                      },
                      "colOrder": {
                          "default": "key_a_to_z"
                      },
                      "tableMaxWidth": {
                          "default": 0
                      },
                      "colLimit": {
                          "default": 100
                      },
                      "rowLimit": {
                          "default": 100
                      }
                  },
                  "methods": {}
              }
          ],
          "props": {
              "tableColorScaleGenerator": {},
              "tableOptions": {},
              "localeStrings": {}
          },
          "methods": {}
      },
      "Table Row Heatmap": {
          "name": "vue-table-col-heatmap",
          "mixins": [
              {
                  "props": {
                      "data": {
                          "type": [
                              null,
                              null,
                              null
                          ],
                          "required": true
                      },
                      "aggregators": {},
                      "aggregatorName": {
                          "default": "Count"
                      },
                      "heatmapMode": {},
                      "tableColorScaleGenerator": {},
                      "tableOptions": {},
                      "renderers": {},
                      "rendererName": {
                          "default": "Table"
                      },
                      "locale": {
                          "default": "en"
                      },
                      "locales": {},
                      "rowTotal": {
                          "default": true
                      },
                      "colTotal": {
                          "default": true
                      },
                      "cols": {},
                      "rows": {},
                      "vals": {},
                      "attributes": {},
                      "valueFilter": {},
                      "sorters": {
                          "type": [
                              null,
                              null
                          ]
                      },
                      "derivedAttributes": {
                          "type": [
                              null,
                              null
                          ]
                      },
                      "rowOrder": {
                          "default": "key_a_to_z"
                      },
                      "colOrder": {
                          "default": "key_a_to_z"
                      },
                      "tableMaxWidth": {
                          "default": 0
                      },
                      "colLimit": {
                          "default": 100
                      },
                      "rowLimit": {
                          "default": 100
                      }
                  },
                  "methods": {}
              }
          ],
          "props": {
              "tableColorScaleGenerator": {},
              "tableOptions": {},
              "localeStrings": {}
          },
          "methods": {}
      },
      "Export Table TSV": {
          "name": "tsv-export-renderers",
          "mixins": [
              {
                  "props": {
                      "data": {
                          "type": [
                              null,
                              null,
                              null
                          ],
                          "required": true
                      },
                      "aggregators": {},
                      "aggregatorName": {
                          "default": "Count"
                      },
                      "heatmapMode": {},
                      "tableColorScaleGenerator": {},
                      "tableOptions": {},
                      "renderers": {},
                      "rendererName": {
                          "default": "Table"
                      },
                      "locale": {
                          "default": "en"
                      },
                      "locales": {},
                      "rowTotal": {
                          "default": true
                      },
                      "colTotal": {
                          "default": true
                      },
                      "cols": {},
                      "rows": {},
                      "vals": {},
                      "attributes": {},
                      "valueFilter": {},
                      "sorters": {
                          "type": [
                              null,
                              null
                          ]
                      },
                      "derivedAttributes": {
                          "type": [
                              null,
                              null
                          ]
                      },
                      "rowOrder": {
                          "default": "key_a_to_z"
                      },
                      "colOrder": {
                          "default": "key_a_to_z"
                      },
                      "tableMaxWidth": {
                          "default": 0
                      },
                      "colLimit": {
                          "default": 100
                      },
                      "rowLimit": {
                          "default": 100
                      }
                  },
                  "methods": {}
              }
          ]
      },
      "Grouped Column Chart": {
          "name": "vue-grouped-column-chart",
          "mixins": [
              {
                  "props": {
                      "data": {
                          "type": [
                              null,
                              null,
                              null
                          ],
                          "required": true
                      },
                      "aggregators": {},
                      "aggregatorName": {
                          "default": "Count"
                      },
                      "tableColorScaleGenerator": {},
                      "tableOptions": {},
                      "rendererName": {
                          "default": "Table"
                      },
                      "locale": {
                          "default": "en"
                      },
                      "locales": {},
                      "rowTotal": {
                          "default": true
                      },
                      "colTotal": {
                          "default": true
                      },
                      "cols": {},
                      "rows": {},
                      "vals": {},
                      "attributes": {},
                      "valueFilter": {},
                      "sorters": {
                          "type": [
                              null,
                              null
                          ]
                      },
                      "derivedAttributes": {
                          "type": [
                              null,
                              null
                          ]
                      },
                      "rowOrder": {
                          "default": "key_a_to_z"
                      },
                      "colOrder": {
                          "default": "key_a_to_z"
                      },
                      "tableMaxWidth": {
                          "default": 0
                      }
                  },
                  "methods": {}
              }
          ],
          "props": {
              "plotlyOptions": {}
          }
      },
      "Stacked Column Chart": {
          "name": "vue-stacked-column-chart",
          "mixins": [
              {
                  "props": {
                      "data": {
                          "type": [
                              null,
                              null,
                              null
                          ],
                          "required": true
                      },
                      "aggregators": {},
                      "aggregatorName": {
                          "default": "Count"
                      },
                      "tableColorScaleGenerator": {},
                      "tableOptions": {},
                      "rendererName": {
                          "default": "Table"
                      },
                      "locale": {
                          "default": "en"
                      },
                      "locales": {},
                      "rowTotal": {
                          "default": true
                      },
                      "colTotal": {
                          "default": true
                      },
                      "cols": {},
                      "rows": {},
                      "vals": {},
                      "attributes": {},
                      "valueFilter": {},
                      "sorters": {
                          "type": [
                              null,
                              null
                          ]
                      },
                      "derivedAttributes": {
                          "type": [
                              null,
                              null
                          ]
                      },
                      "rowOrder": {
                          "default": "key_a_to_z"
                      },
                      "colOrder": {
                          "default": "key_a_to_z"
                      },
                      "tableMaxWidth": {
                          "default": 0
                      }
                  },
                  "methods": {}
              }
          ],
          "props": {
              "plotlyOptions": {}
          }
      },
      "Grouped Bar Chart": {
          "name": "groupd-bar-chart",
          "mixins": [
              {
                  "props": {
                      "data": {
                          "type": [
                              null,
                              null,
                              null
                          ],
                          "required": true
                      },
                      "aggregators": {},
                      "aggregatorName": {
                          "default": "Count"
                      },
                      "tableColorScaleGenerator": {},
                      "tableOptions": {},
                      "rendererName": {
                          "default": "Table"
                      },
                      "locale": {
                          "default": "en"
                      },
                      "locales": {},
                      "rowTotal": {
                          "default": true
                      },
                      "colTotal": {
                          "default": true
                      },
                      "cols": {},
                      "rows": {},
                      "vals": {},
                      "attributes": {},
                      "valueFilter": {},
                      "sorters": {
                          "type": [
                              null,
                              null
                          ]
                      },
                      "derivedAttributes": {
                          "type": [
                              null,
                              null
                          ]
                      },
                      "rowOrder": {
                          "default": "key_a_to_z"
                      },
                      "colOrder": {
                          "default": "key_a_to_z"
                      },
                      "tableMaxWidth": {
                          "default": 0
                      }
                  },
                  "methods": {}
              }
          ],
          "props": {
              "plotlyOptions": {}
          }
      },
      "Stacked Bar Chart": {
          "name": "vue-stacked-bar-chart",
          "mixins": [
              {
                  "props": {
                      "data": {
                          "type": [
                              null,
                              null,
                              null
                          ],
                          "required": true
                      },
                      "aggregators": {},
                      "aggregatorName": {
                          "default": "Count"
                      },
                      "tableColorScaleGenerator": {},
                      "tableOptions": {},
                      "rendererName": {
                          "default": "Table"
                      },
                      "locale": {
                          "default": "en"
                      },
                      "locales": {},
                      "rowTotal": {
                          "default": true
                      },
                      "colTotal": {
                          "default": true
                      },
                      "cols": {},
                      "rows": {},
                      "vals": {},
                      "attributes": {},
                      "valueFilter": {},
                      "sorters": {
                          "type": [
                              null,
                              null
                          ]
                      },
                      "derivedAttributes": {
                          "type": [
                              null,
                              null
                          ]
                      },
                      "rowOrder": {
                          "default": "key_a_to_z"
                      },
                      "colOrder": {
                          "default": "key_a_to_z"
                      },
                      "tableMaxWidth": {
                          "default": 0
                      }
                  },
                  "methods": {}
              }
          ],
          "props": {
              "plotlyOptions": {}
          }
      },
      "Line Chart": {
          "name": "vue-line-chart",
          "mixins": [
              {
                  "props": {
                      "data": {
                          "type": [
                              null,
                              null,
                              null
                          ],
                          "required": true
                      },
                      "aggregators": {},
                      "aggregatorName": {
                          "default": "Count"
                      },
                      "tableColorScaleGenerator": {},
                      "tableOptions": {},
                      "rendererName": {
                          "default": "Table"
                      },
                      "locale": {
                          "default": "en"
                      },
                      "locales": {},
                      "rowTotal": {
                          "default": true
                      },
                      "colTotal": {
                          "default": true
                      },
                      "cols": {},
                      "rows": {},
                      "vals": {},
                      "attributes": {},
                      "valueFilter": {},
                      "sorters": {
                          "type": [
                              null,
                              null
                          ]
                      },
                      "derivedAttributes": {
                          "type": [
                              null,
                              null
                          ]
                      },
                      "rowOrder": {
                          "default": "key_a_to_z"
                      },
                      "colOrder": {
                          "default": "key_a_to_z"
                      },
                      "tableMaxWidth": {
                          "default": 0
                      }
                  },
                  "methods": {}
              }
          ],
          "props": {
              "plotlyOptions": {}
          }
      },
      "Dot Chart": {
          "name": "vue-dot-chart",
          "mixins": [
              {
                  "props": {
                      "data": {
                          "type": [
                              null,
                              null,
                              null
                          ],
                          "required": true
                      },
                      "aggregators": {},
                      "aggregatorName": {
                          "default": "Count"
                      },
                      "tableColorScaleGenerator": {},
                      "tableOptions": {},
                      "rendererName": {
                          "default": "Table"
                      },
                      "locale": {
                          "default": "en"
                      },
                      "locales": {},
                      "rowTotal": {
                          "default": true
                      },
                      "colTotal": {
                          "default": true
                      },
                      "cols": {},
                      "rows": {},
                      "vals": {},
                      "attributes": {},
                      "valueFilter": {},
                      "sorters": {
                          "type": [
                              null,
                              null
                          ]
                      },
                      "derivedAttributes": {
                          "type": [
                              null,
                              null
                          ]
                      },
                      "rowOrder": {
                          "default": "key_a_to_z"
                      },
                      "colOrder": {
                          "default": "key_a_to_z"
                      },
                      "tableMaxWidth": {
                          "default": 0
                      }
                  },
                  "methods": {}
              }
          ],
          "props": {
              "plotlyOptions": {}
          }
      },
      "Area Chart": {
          "name": "vue-area-chart",
          "mixins": [
              {
                  "props": {
                      "data": {
                          "type": [
                              null,
                              null,
                              null
                          ],
                          "required": true
                      },
                      "aggregators": {},
                      "aggregatorName": {
                          "default": "Count"
                      },
                      "tableColorScaleGenerator": {},
                      "tableOptions": {},
                      "rendererName": {
                          "default": "Table"
                      },
                      "locale": {
                          "default": "en"
                      },
                      "locales": {},
                      "rowTotal": {
                          "default": true
                      },
                      "colTotal": {
                          "default": true
                      },
                      "cols": {},
                      "rows": {},
                      "vals": {},
                      "attributes": {},
                      "valueFilter": {},
                      "sorters": {
                          "type": [
                              null,
                              null
                          ]
                      },
                      "derivedAttributes": {
                          "type": [
                              null,
                              null
                          ]
                      },
                      "rowOrder": {
                          "default": "key_a_to_z"
                      },
                      "colOrder": {
                          "default": "key_a_to_z"
                      },
                      "tableMaxWidth": {
                          "default": 0
                      }
                  },
                  "methods": {}
              }
          ],
          "props": {
              "plotlyOptions": {}
          }
      },
      "Scatter Chart": {
          "name": "vue-scatter-chart",
          "mixins": [
              {
                  "props": {
                      "data": {
                          "type": [
                              null,
                              null,
                              null
                          ],
                          "required": true
                      },
                      "aggregators": {},
                      "aggregatorName": {
                          "default": "Count"
                      },
                      "tableColorScaleGenerator": {},
                      "tableOptions": {},
                      "rendererName": {
                          "default": "Table"
                      },
                      "locale": {
                          "default": "en"
                      },
                      "locales": {},
                      "rowTotal": {
                          "default": true
                      },
                      "colTotal": {
                          "default": true
                      },
                      "cols": {},
                      "rows": {},
                      "vals": {},
                      "attributes": {},
                      "valueFilter": {},
                      "sorters": {
                          "type": [
                              null,
                              null
                          ]
                      },
                      "derivedAttributes": {
                          "type": [
                              null,
                              null
                          ]
                      },
                      "rowOrder": {
                          "default": "key_a_to_z"
                      },
                      "colOrder": {
                          "default": "key_a_to_z"
                      },
                      "tableMaxWidth": {
                          "default": 0
                      }
                  },
                  "methods": {}
              }
          ],
          "props": {
              "plotlyOptions": {}
          }
      },
      "Multiple Pie Chart": {
          "name": "vue-multiple-pie-chart",
          "mixins": [
              {
                  "props": {
                      "data": {
                          "type": [
                              null,
                              null,
                              null
                          ],
                          "required": true
                      },
                      "aggregators": {},
                      "aggregatorName": {
                          "default": "Count"
                      },
                      "tableColorScaleGenerator": {},
                      "tableOptions": {},
                      "rendererName": {
                          "default": "Table"
                      },
                      "locale": {
                          "default": "en"
                      },
                      "locales": {},
                      "rowTotal": {
                          "default": true
                      },
                      "colTotal": {
                          "default": true
                      },
                      "cols": {},
                      "rows": {},
                      "vals": {},
                      "attributes": {},
                      "valueFilter": {},
                      "sorters": {
                          "type": [
                              null,
                              null
                          ]
                      },
                      "derivedAttributes": {
                          "type": [
                              null,
                              null
                          ]
                      },
                      "rowOrder": {
                          "default": "key_a_to_z"
                      },
                      "colOrder": {
                          "default": "key_a_to_z"
                      },
                      "tableMaxWidth": {
                          "default": 0
                      }
                  },
                  "methods": {}
              }
          ],
          "props": {
              "plotlyOptions": {}
          }
      }
  },
  "rendererName": "Table",
  "locale": "en",
  "locales": {
      "fr": {
          "frAggregators": {},
          "localeStrings": {
              "renderError": "Une erreur est survenue en dessinant le tableau croisé.",
              "computeError": "Une erreur est survenue en calculant le tableau croisé.",
              "uiRenderError": "Une erreur est survenue en dessinant l'interface du tableau croisé dynamique.",
              "selectAll": "Sélectionner tout",
              "selectNone": "Ne rien sélectionner",
              "tooMany": "(trop de valeurs à afficher)",
              "filterResults": "Filtrer les valeurs",
              "totals": "Totaux",
              "vs": "sur",
              "by": "par",
              "apply": "Appliquer",
              "cancel": "Annuler",
              "only": "seul"
          }
      },
      "en": {
          "aggregators": {},
          "localeStrings": {
              "renderError": "An error occurred rendering the PivotTable results.",
              "computeError": "An error occurred computing the PivotTable results.",
              "uiRenderError": "An error occurred rendering the PivotTable UI.",
              "selectAll": "Select All",
              "selectNone": "Select None",
              "tooMany": "(too many to list)",
              "filterResults": "Filter values",
              "totals": "Totals",
              "vs": "vs",
              "by": "by",
              "cancel": "Cancel",
              "only": "only"
          }
      },
      "ko": {
          "aggregators": {},
          "localeStrings": {
              "renderError": "피벗 테이블 결과를 렌더링하는 동안 오류가 발생 했습니다.",
              "computeError": "피벗 테이블 결과를 계산하는 동안 오류가 발생 했습니다.",
              "uiRenderError": "피벗 테이블 UI를 렌더링하는 동안 오류가 발생 했습니다.",
              "selectAll": "모두 선택",
              "selectNone": "선택 안함",
              "tooMany": "표시 할 값이 너무 많습니다.",
              "filterResults": "값 필터링",
              "totals": "합계",
              "only": "단독",
              "vs": "vs",
              "by": "by"
          }
      }
  },
  "rowTotal": true,
  "colTotal": true,
  "cols": [
      "消費日期"
  ],
  "rows": [
      "顧客等級"
  ],
  "vals": [
      "銷售總額"
  ],
  "attributes": [
      '消費日期',
      '顧客姓名',
      '商品種類',
      '顏色',
      '單品價格',
      '銷售數量',
      '銷售總額',
      '顧客等級',
      '銷售店鋪',
      '銷售人員'
  ],
  "valueFilter": {
    '消費日期': {},
    '顧客姓名': {},
    '商品種類': {},
    '顏色': {},
    '單品價格': {},
    '銷售數量': {},
    '銷售總額': {},
    '顧客等級': {},
    '銷售店鋪': {},
    '銷售人員': {}
  },
  "sorters": {},
  "rowOrder": "key_a_to_z",
  "colOrder": "key_a_to_z",
  "tableMaxWidth": 0,
  "colLimit": 100,
  "rowLimit": 100,
  "localeStrings": {
      "renderError": "An error occurred rendering the PivotTable results.",
      "computeError": "An error occurred computing the PivotTable results.",
      "uiRenderError": "An error occurred rendering the PivotTable UI.",
      "selectAll": "Select All",
      "selectNone": "Select None",
      "tooMany": "(too many to list)",
      "filterResults": "Filter values",
      "totals": "Totals",
      "vs": "vs",
      "by": "by",
      "cancel": "Cancel",
      "only": "only"
  }
}