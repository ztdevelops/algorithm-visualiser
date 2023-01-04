import { TIMEOUT_DURATION, PRIMARY_COLOUR, SECONDARY_COLOUR, MAX_BAR_HEIGHT, MAX_BAR_MULTIPLIER } from "../../utils/config";
import { disableSortButtonsAndUpdateInformationDOM } from "../../utils/standardOperations";

function animateMergeSort(array) {
    const start = window.performance.now();
    const animations = getMergeSortAnimations(array);
    disableSortButtonsAndUpdateInformationDOM(window.performance.now() - start, 'Merge Sort ( O(nlog n) )', animations.length);
    // TODO: DOM manipulation to display execution time
    console.log(`Execution time for merge sort: ${window.performance.now() - start}ms.`)
    for (let i = 0; i < animations.length; i++) {
        const arrayBars = document.getElementsByClassName('array-bar');
        const change = i % 3 !== 2;
        const [leftIdx, rightIdx] = animations[i];
        const leftStyle = arrayBars[leftIdx].style;
        if (change) {
            const rightStyle = arrayBars[rightIdx].style;
            const color = i % 3 === 0 ? SECONDARY_COLOUR : PRIMARY_COLOUR;
            setTimeout(() => {
                leftStyle.backgroundColor = color;
                rightStyle.backgroundColor = color;
            }, i * TIMEOUT_DURATION);
        } else {
            setTimeout(() => {
                // rightIdx represents height when i % 3 == 2
                leftStyle.height = `${rightIdx / MAX_BAR_HEIGHT * MAX_BAR_MULTIPLIER}vh`;
            }, i * TIMEOUT_DURATION);
        }
    }
}

function getMergeSortAnimations(array) {
    const animations = [];
    if (1 >= array.length) return array;
    const copy = array.slice();
    mergeSort(array, 0, array.length - 1, copy, animations);
    return animations;
}

function mergeSort(array, start, end, copy, animations) {
    if (start === end) return;
    const mid = Math.floor((start + end) / 2);
    mergeSort(copy, start, mid, array, animations);
    mergeSort(copy, mid + 1, end, array, animations);
    merge(array, start, mid, end, copy, animations);
}

function merge(array, start, mid, end, copy, animations) {
    let i = start;
    let j = mid + 1;
    let k = start;

    while (i <= mid && j <= end) {
        animations.push([i, j]);
        animations.push([i, j]);
        if (copy[i] >= copy[j]) {
            animations.push([k, copy[j]]);
            array[k] = copy[j];
            j++;
        } else {
            animations.push([k, copy[i]]);
            array[k] = copy[i];
            i++;
        }
        k++;
    }

    while (i <= mid) {
        animations.push([i, i]);
        animations.push([i, i]);
        animations.push([k, copy[i]]);
        array[k] = copy[i];
        k++; i++;
    }
    while (j <= end) {
        animations.push([j, j]);
        animations.push([j, j]);
        animations.push([k, copy[j]]);
        array[k] = copy[j];
        k++; j++;
    }
}

export { animateMergeSort }
