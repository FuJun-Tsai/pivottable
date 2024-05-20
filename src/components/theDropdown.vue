<template>
  <select
  class="pvtDropdown"
  @change="handleChange(key)"
  v-model="selected"
  >
    <option
    v-for="(option, key) in props.values"
    :key="option"
    :value="option"
    >
      {{ key }}
    </option>
  </select>
</template>
<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue';

const props = defineProps({
  values: {
    type: Object
  },
  value: {
    type: String
  },
});

const selected = ref(props.value);
watch(props, ()=>{
  selected.value = props.value;
}, {immediate: true});

const emits = defineEmits(["handleChange"]);

const handleChange = function(val){
  emits('handleChange', selected.value)
}
</script>