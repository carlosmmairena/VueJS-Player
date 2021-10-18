<template>
    <div :class="class_slider" @mousedown="onSliderMouseDown" @click="onSliderClick">
        <div class="slider__bar" ref="bar">
            <div class="slider__handler" :style="handleStyle" ref="handle"/>
            <div class="slider__fill" :style="fillStyle"/>
        </div>
    </div>
</template>

<script>
import "./Slider.scss";
import { throttle } from "lodash";
import { getRelativeXPosition } from "@/utils/helpers";
const lerp = require("lerp");

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
        bar_width: 0,

        dragTimeout: null,
    }),


    computed: {
        class_slider() {
            return {
                "slider": true,
                "slider--dragging": this.is_dragging,
                "slider--disabled": this.disabled
            };
        },

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
        document.addEventListener('mouseup', this.onDocumentMouseUp);
        document.addEventListener('mousemove', this.onDocumentMousemove);
    },

    beforeDestroy() {
        window.removeEventListener('resize', this.onWindowResize);
        document.removeEventListener('mouseup', this.onDocumentMouseUp);
        document.removeEventListener('mousemove', this.onDocumentMousemove);
    },

    methods: {

        onDocumentMousemove(ev) {
            if (this.disabled || !this.is_dragging) return;

            this.calculate(ev);
        },

        onSliderClick(ev) {
            if (this.disabled) return;

            this.calculate(ev)
        },

        onDocumentMouseUp(){
            if (this.disabled) return;

            if (this.dragTimeout) {

                clearTimeout(this.dragTimeout);
                this.$emit("click");

            } else {

                this.is_dragging = false;
                this.$emit("dragend");
            }
        },

        onSliderMouseDown() {
            if (this.disabled) return;

            this.dragTimeout = setTimeout(() => {
                this.is_dragging = true;
                this.dragTimeout = null;
                this.$emit("dragstart");

            }, 100);
        },

        calculateDimensions() {
            const { bar, handle } = this.$refs;
            
            this.handle_width = handle.offsetWidth;
            this.bar_width    = bar.offsetWidth;
        },

        calculate(ev) {
            const { bar }       = this.$refs;
            const { bar_width } = this;
            const relativeX     = getRelativeXPosition(ev, bar);
            const delta         = relativeX / bar_width;

            this.$emit("input", lerp(this.min, this.max, delta));
        },

        onWindowResize() {
            this.calculateDimensions();
        }
    }

}
</script>
