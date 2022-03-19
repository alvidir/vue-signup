<template>
    <div>
    </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Footer',

    props: {},

    computed: {}
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "fibonacci-styles";
.separator {
    margin-left: $fib-5 * 1px;
    margin-right: $fib-5 * 1px;
}

div {
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>