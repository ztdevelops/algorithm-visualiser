import { TIMEOUT_DURATION, PRIMARY_COLOUR, SECONDARY_COLOUR, FINISHED_COLOUR } from "../../utils/config";
import { disableSortButtonsAndUpdateInformationDOM } from "../../utils/standardOperations";

function animateBubbleSort(array) {
    const start = window.performance.now();
    const animations = getBubbleSortAnimations(array);
    disableSortButtonsAndUpdateInformationDOM(window.performance.now() - start, 'Bubble Sort <br>O(n<sup>2</sup>)', animations.length);
    console.log(`Execution time for bubble sort: ${window.performance.now() - start}ms.`)
    for (let i = 0; i < animations.length; i++) {
        const arrayBars = document.getElementsByClassName('array-bar');
        const [operation, left, right] = animations[i];
        const leftStyle = arrayBars[left].style;
        const rightStyle = arrayBars[right].style;
        // Checking
        if (operation === 0 || operation === 0.5) {
            setTimeout(() => {
                leftStyle.backgroundColor = operation === 0 ? SECONDARY_COLOUR : PRIMARY_COLOUR;
                rightStyle.backgroundColor = operation === 0 ? SECONDARY_COLOUR : PRIMARY_COLOUR;
            }, i * TIMEOUT_DURATION);
            // Swapping
        } else if (operation === 1) {
            setTimeout(() => {
                const leftHeight = leftStyle.height;
                const rightHeight = rightStyle.height;
                leftStyle.height = rightHeight;
                rightStyle.height = leftHeight;
            }, i * TIMEOUT_DURATION);
            // Reached the end
        } else {
            setTimeout(() => {
                rightStyle.backgroundColor = FINISHED_COLOUR;
            }, i * TIMEOUT_DURATION);
        }
    }
}


function getBubbleSortAnimations(array) {
    const animations = [];
    if (1 >= array.length) return array;
    bubbleSort(array, animations);
    return animations;
}

function bubbleSort(array, animations) {
    const n = array.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            animations.push([0, j, j + 1]);
            animations.push([0.5, j, j + 1]);
            if (array[j + 1] < array[j]) {
                animations.push([1, j, j + 1]);
                const tmp = array[j + 1];
                array[j + 1] = array[j];
                array[j] = tmp;
            }
            if (j === n - i - 2) {
                animations.push([2, j, j + 1]);
            }
        }
    }
}

export { animateBubbleSort }
