import Vue from 'vue'

let $eventBus

export function initEventBus () {
  $eventBus = new Vue()
}

export {
  $eventBus
}
