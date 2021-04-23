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
    get(index: number): item | undefined {
      return this.items.get(index);
    },

    len(): number {
      return this.items.len();
    },

    add(item: item): number {
      if ((!this.size || this.size < 0) ||
          (this.items.len() < this.size)) {
        return this.items.add(item);
      }
      
      return -1;
    },
    
    remove(item: item): boolean {
      return this.items.remove(item)
    },

    removeByIndex(index: number): item | undefined {
      return this.items.removeByIndex(index);
    },

    all(): item[] {
      return this.items.all();
    }
  }
})
</script>
