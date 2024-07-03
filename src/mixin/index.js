import VuePivottable from '@/../vue2-pivot/Pivottable'
import VuePivottableUi from '@/../vue2-pivot/PivottableUi'
import TableRenderer from '@/../vue2-pivot/TableRenderer'

import {
  aggregatorTemplates,
  aggregators,
  derivers,
  locales,
  naturalSort,
  numberFormat,
  getSort,
  sortAs,
  PivotData
} from '../helper/utils'

const PivotUtilities = {
  aggregatorTemplates,
  aggregators,
  derivers,
  locales,
  naturalSort,
  numberFormat,
  getSort,
  sortAs,
  PivotData
}

const Renderer = {
  TableRenderer
}

const components = {
  VuePivottable,
  VuePivottableUi
}

if (typeof window !== 'undefined' && window.Vue) window.Vue.use(VuePivottable)

export {
  VuePivottable,
  VuePivottableUi,
  PivotUtilities,
  Renderer
}

export default (Vue) => {
  for (const key in components) {
    Vue.component(components[key].name, components[key])
  }
}