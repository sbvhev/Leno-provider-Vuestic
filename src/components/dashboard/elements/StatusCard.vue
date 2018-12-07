<template>
  <div class="col-md-6 col-xl-3">
    <vuestic-widget class="info-widget brand-primary">
      <div class="info-widget-inner">
        <div class="stats">
          <h1 class="stats-number">{{ data.value }}</h1>
          <div class="stats-title pb-3">{{ data.description }}</div>
        </div>
      </div>
    </vuestic-widget>
  </div>
</template>

<script>
export default {
  name: 'statusCard',
  props: ['data']
}
</script>

<style>
</style>
