<template>
    <div class="slider">
        <div class="slider__bar" ref="bar">
            <div class="slider__handler" :style="handleStyle" ref="handle"/>
            <div class="slider__fill" :style="fillStyle"/>
        </div>
    </div>
</template>

<script>
import "./Slider.scss";
import throttle from "lodash/throttle";

export default {
    name: "Slider",

    props: {
        min: {
            type: Number,
            default: 0
        },

        max: {
            type: Number,
            default: 1
        },

        current_value: Number,

        disabled: Boolean
    },

    data: () => ({
        is_dragging: false,
        handle_width: 0,
        bar_width: 0
    }),


    computed: {
        delta() {
            return this.current_value / this.max;
        },

        fillStyle() {
            return {
                transformOrigin: "left center",
                transform: `scaleX(${this.delta})`
            };
        },

        handleStyle() {
            const { bar_width, delta ,handle_width } = this;

            return {
                transform: `translateX(${bar_width * delta - (handle_width * 0.5)}px)`
            };
        }

    },

    mounted() {
        this.onWindowResize = throttle(this.onWindowResize, 200);

        this.calculateDimensions();
        
        window.addEventListener('resize', this.onWindowResize);
    },

    methods: {

        calculateDimensions() {
            const { bar, handle } = this.$refs;
            
            this.handle_width = handle.offsetWidth;
            this.bar_width    = bar.offsetWidth;
        },

        onWindowResize() {
            this.calculateDimensions();

            console.log(this.bar_width, this.handle_width);
        }
    }

}
</script>
