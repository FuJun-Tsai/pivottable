<template>
  <div class="dialog-back position-fixed start-0 w-100 h-100 transition"
  @click.self="closeDialog"
  :class="{
    'close': props.isShowDialog === false,
    'open': props.isShowDialog === true,
  }"
  :style="{
    top: windowScroll + 'px',
    backgroundColor: backgroundColor,
  }"
  >
    <div
    class="box-shadow position-absolute background-secondary-white rounded-3 p-3"
    :style="{
      // 'width': props.dialogWidth + 'px',
      // 'height': typeof props.dialogHeight === 'number' ? props.dialogHeight + 'px' : props.dialogHeight,
      'width': `80%`,
      'height': `80%`,
      'max-width': 'calc(100% - 32px)',
      'max-height': 'calc(100vh - 32px)',
      'top': positionStyleComputed.top,
      'left': positionStyleComputed.left,
      'transform': positionStyleComputed.transform,
    }"
    style="background: #ffffff;"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
      class="closeBtn position-absolute pointer"
      style="top: 16px; right: 16px;"
      @click="closeDialog"
      v-if="props.isShowCloseBtn === true"
      >
        <path class="transition" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"/>
      </svg>
      <p
      v-if="spacing"
      class="fs-24 fw-bolder color-black-600"
      style="min-height: 24px;"
      >
        <slot name="title"></slot>
      </p>
      <template v-else>
        <slot name="title"></slot>
      </template>
      <slot name="body"></slot>
    </div>
  </div>
</template>
<script setup>
import { defineProps, defineEmits, ref, computed } from "vue";

const props = defineProps({
  dialogWidth: {
    required: false,
    // default: 480,
  },
  dialogHeight: {
    required: false,
    // default: 420,
  },
  isShowDialog: {
    required: true,
  },
  isShowCloseBtn: {
    require: false,
    default: true,
  },
  backgroundColor: {
    required: false,
  },
  positionStyle: {
    require: false,
  },
  title: {
    require: false,
  },

  spacing: {
    require: false,
    default: true,
  }
});

// const scrollbarHeight = computed(() => {
//   if(props.isShowCloseBtn === true){
//     return {
//       height: 'calc(100% - 40px)',
//     }
//   }
//   return {
//     height: '100%',
//   }
// })

const windowScroll = ref(0);

const positionStyleComputed = computed(() => {
  if(props.positionStyle !== undefined){
    return props.positionStyle;
  }
  return {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
})

const emits = defineEmits(['closeDialog']);
const closeDialog = function(){
  emits('closeDialog');
};

</script>
<style lang="scss" scoped>
@import '@/components-scss/rwd.scss';
.box-shadow{
  box-shadow: 0px 0px 7px rgba(169, 163, 157, .3);
}

.dialog-back{
  transition-duration: .3s;
}
.close{
  display: none;
  z-index: -1;
  opacity: 0;
  background: #ffffff;
}
.open{
  z-index: 1;
  opacity: 1;
  background: #11111177;
}

.closeBtn{
  path{
    fill: #A9A39D;
  }
  &:hover{
    path{
      fill: #29180A;
    }
  }
}
</style>