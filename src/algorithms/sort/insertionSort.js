import { TIMEOUT_DURATION, PRIMARY_COLOUR, SECONDARY_COLOUR } from "../../utils/config";
import { temporaryButtonDisable } from "../../utils/temporaryButtonDisable";

function animateInsertionSort(array) {
    const start = window.performance.now();
    const animations = getInsertionSortAnimations(array);
    temporaryButtonDisable(animations.length, 'sort', TIMEOUT_DURATION);
    console.log(`Execution time for insertion sort: ${window.performance.now() - start}ms.`)
    for (let i = 0; i < animations.length; i++) {
        const arrayBars = document.getElementsByClassName('array-bar');
        const [operation, original, left, right] = animations[i];
        const originalStyle = arrayBars[original].style;
        const leftStyle = arrayBars[left].style;
        const rightStyle = arrayBars[right].style;
        if (operation === 0 || operation === 0.5) {
            setTimeout(() => {
                const leftHeight = leftStyle.height;
                const rightHeight = rightStyle.height;
                leftStyle.height = operation === 0 ? rightHeight : leftHeight;
                rightStyle.height = operation === 0 ? leftHeight : rightHeight;
                originalStyle.backgroundColor = SECONDARY_COLOUR;
                leftStyle.backgroundColor = operation === 0 ? SECONDARY_COLOUR : PRIMARY_COLOUR;
                rightStyle.backgroundColor = operation === 0 ? SECONDARY_COLOUR : PRIMARY_COLOUR;
            }, i * TIMEOUT_DURATION);
        } else {
            setTimeout(() => {
                originalStyle.backgroundColor = PRIMARY_COLOUR;
                leftStyle.backgroundColor = PRIMARY_COLOUR;
                rightStyle.backgroundColor = PRIMARY_COLOUR;
            }, i * TIMEOUT_DURATION);
        }
    }
}

function getInsertionSortAnimations(array) {
    const animations = [];
    if (1 >= array.length) return array;
    insertionSort(array, animations);
    return animations;
}

function insertionSort(array, animations) {
    const n = array.length;
    for (let i = 1; i < n; i++) {
        const key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            animations.push([0, i, j, j+1]);
            animations.push([0.5, i, j, j+1]);
            array[j+1] = array[j];
            array[j] = key;
            j--;
        }
        animations.push([1, i, j+1, j+2]);
    }
}

export { animateInsertionSort }
