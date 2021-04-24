<template src='./List.html' >
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src='./List.scss' >
</style>

<script lang="ts">
import { defineComponent } from "vue";
import {ObjectList as list, ItemController as item} from "@/objects/List";

export default defineComponent({
  name: 'List',
  props: {
    id: String,
    size: Number,
  },

  data () {
    return {
      items: new list<item>(),
    }
  },

  methods: {
    len(): number {
      return this.items.len();
    },

    all(): item[] {
      return this.items.all();
    },

    get(index: number): item | undefined {
      return this.items.get(index);
    },

    push(item: item): number {
      if ((!this.size || this.size < 0) ||
          (this.items.len() < this.size)) {
        return this.items.push(item);
      }
      
      return -1;
    },
    
    pop(): item | undefined {
      return this.items.pop();
    },
  }
})
</script>
