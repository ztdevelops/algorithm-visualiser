import './algorithms'
import * as algorithms from './algorithms';

export function getMergeSortAnimations(array) {
    const animations = [];
    if (1 >= array.length) return array;
    const copy = array.slice();
    algorithms.mergeSort(array, 0, array.length - 1, copy, animations);
    return animations;
}

export function getQuickSortAnimations(array) {
    const animations = [];
    if (1 >= array.length) return array;
    algorithms.quickSort(array, 0, array.length - 1, animations);
    return animations;
}

export function getHeapSortAnimations(array) {
    const animations = [];
    if (1 >= array.length) return array;
    algorithms.heapSort(array, animations);
    return animations;
}

export function getBubbleSortAnimations(array) {
    const animations = [];
    if (1 >= array.length) return array;
    algorithms.bubbleSort(array, animations);
    return animations;
}

export function getInsertionSortAnimations(array) {
    const animations = [];
    if (1 >= array.length) return array;
    algorithms.insertionSort(array, animations);
    return animations;
}