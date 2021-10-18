import { clamp } from "lodash";

export function offsetX(target) {
    const { left }       = target.getBoundingClientRect();
    const { scrollLeft } = document.documentElement;

    return left + scrollLeft;
}

export function getRelativeXPosition(ev, target) {
    const elementOffsetX = offsetX(target);
    const elementWidth   = target.offsetWidth;
    const value          = ev.pageX - elementOffsetX;

    return clamp(value, 0, elementWidth);
}
