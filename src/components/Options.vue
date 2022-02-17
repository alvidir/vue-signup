<template>
    <div>
        <a  :href="secondaryHref">{{secondary}}</a>
        <i v-if="hasBothOptions" class="separator">&#124;</i>
        <a class="primary" :href="primaryHref">{{primary}}</a>
    </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Options',

    props: {
        primary: String,
        secondary: String,
        primaryHref: {
            type: String,
            default: "#"
        },
        secondaryHref: {
            type: String,
            default: "#"
        }
    },

    computed: {
        hasBothOptions() {
            return !!this.primary && !!this.secondary
        }
    }
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

a {
    &:not(:hover) {
        text-decoration: none;
    }

    &.primary {
        font-weight: 600;
    }
  
    font-size: $fib-6 * 1px;
    text-align: center;
}
</style>