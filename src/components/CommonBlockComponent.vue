<template>
  <div
  class="frame d-flex flex-column"
  :class="{'frame-scroll': props.isScrollType}"
  :style="{backgroundColor: props.backgroundColor,}"
  >
    <div
    class="d-flex justify-content-between flex-wrap"
    style="gap: 4px;"
    :class="{'mb-3': props.isShowTitle === true}"
    >
      <!-- title -->
      <p
      class="title flex-fill mb-0"
      :class="{'block-loading': props.isAPIComplete === false}"
      v-if="props.isShowTitle"
      >
        <template
        v-if="props.isAPIComplete === true"
        >
          <slot name="title"></slot>
        </template>
      </p>

      <!-- filter -->
      <template v-if="props.isShowFilter && props.isAPIComplete === true">
        <div class="filter d-sm-none" >
          <n-popover trigger="click" :show-arrow="false" placement="bottom-end">
            <template #trigger>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <g>
                  <path d="M6 10.5C4.9 10.5 4 11.4 4 12.5C4 13.6 4.9 14.5 6 14.5C7.1 14.5 8 13.6 8 12.5C8 11.4 7.1 10.5 6 10.5ZM18 10.5C16.9 10.5 16 11.4 16 12.5C16 13.6 16.9 14.5 18 14.5C19.1 14.5 20 13.6 20 12.5C20 11.4 19.1 10.5 18 10.5ZM12 10.5C10.9 10.5 10 11.4 10 12.5C10 13.6 10.9 14.5 12 14.5C13.1 14.5 14 13.6 14 12.5C14 11.4 13.1 10.5 12 10.5Z" fill="#A9A39D"/>
                </g>
              </svg>
            </template>
            <slot name="filter"></slot>
          </n-popover>
        </div>
        <div class="filter d-none d-sm-block">
          <slot name="filter"></slot>
        </div>
      </template>
    </div>

    <!-- notice -->
    <div
    class="notice"
    style="z-index: 1;"
    :style="props.noticeStyle"
    v-if="props.isShowNotice && props.isAPIComplete === true"
    >
      <slot name="notice"></slot>
    </div>

    <!-- content normal type -->
    <div
    class="content"
    :class="{
      'block-loading': props.isAPIComplete === false
    }"
    >
      <!-- top -->
      <div
      class="top-area"
      ref="topAreaRef"
      v-if="props.isShowTop && props.isAPIComplete === true"
      >
        <slot name="top"></slot>
      </div>

      <!-- content scroll type -->
      <template v-if="props.isAPIComplete === true">
        <div
        v-if="props.isScrollType"
        class="overflow-auto flex-fill"
        >
          <slot name="content"></slot>
        </div>
        <slot v-else name="content"></slot>
      </template>
    </div>
  </div>
</template>
<script setup>
import { defineProps, ref, onMounted } from 'vue';
const props = defineProps({
  backgroundColor: {
    type: String,
    require: false,
    default: '#ffffff',
  },
  isAPIComplete: {
    type: Boolean,
    require: false,
    default: false,
  },
  isShowTitle: {
    type: Boolean,
    require: false,
    default: true,
  },
  isShowFilter: {
    type: Boolean,
    require: false,
    default: false,
  },
  isShowNotice: {
    type: Boolean,
    require: false,
    default: false,
  },
  // Scroller
  isScrollType: {
    type: Boolean,
    require: false,
    default: false,
  },
  xScrollable: {
    type: Boolean,
    require: false,
    default: false,
  },
  // notice{
  noticeStyle: {
    type: Object,
    require: true,
    default: ()=>{},
  },
  // other area
  isShowTop:{
    type: Boolean,
    require: false,
    default: false,
  },
});

const topAreaRef = ref(null);
const scrollerHieght = ref(0);
const settingScrollerHieght = function(){
  scrollerHieght.value = topAreaRef.value && topAreaRef.value.clientHeight;
};
onMounted(()=>{
  settingScrollerHieght();
});
window.addEventListener('resize', settingScrollerHieght);
</script>
<style lang="scss" scoped>
@import '@/components-scss/block-setting.scss';
@import '@/components-scss/color-setting.scss';
.mt-24{
  margin-top: 24px;
}

.title{
  text-overflow: ellipsis;
  overflow: hidden;
}

.content{
  height: 100%;
  display: flex;
  flex-direction: column
}
</style>