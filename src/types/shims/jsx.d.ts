import Vue, { VNode } from 'vue'

declare global {
  namespace JSX {
    interface Element extends VNode {}
    interface ElementClass extends Vue {}
    // interface IntrinsicElements {
    //   [element: string]: any
    // }
  }
}
