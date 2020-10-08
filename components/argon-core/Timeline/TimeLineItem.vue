<template>
  <div class="timeline-block" :class="{ 'timeline-inverted': inverted }">
    <slot name="badge">
      <span class="timeline-step" :class="`badge-${badgeType}`">
        <i :class="badgeIcon" />
      </span>
    </slot>
    <div class="timeline-content">
      <slot />
    </div>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  name: 'TimeLineItem',
  props: {
    inverted: Boolean,
    title: String,
    badgeType: {
      type: String,
      default: 'success'
    },
    badgeIcon: {
      type: String,
      default: ''
    }
  }
}
</script>
<style></style>
