<template>
  <select
  class="pvtDropdown"
  @change="handleChange(selected)"
  v-model="selected"
  >
    <option
    v-for="(option, key) in props.values"
    :key="option"
    :value="option"
    :selected="option === props.value"
    >
      {{ key }}
    </option>
  </select>
</template>
<script setup>
import { defineProps, defineEmits, ref } from 'vue';

const props = defineProps({
  values: {
    type: Array
  },
  value: {
    type: String
  },
});

const selected = ref(props.value);

const emits = defineEmits(["handleChange"]);

const handleChange = function(selected){
  emits('handleChange', selected)
}
</script>