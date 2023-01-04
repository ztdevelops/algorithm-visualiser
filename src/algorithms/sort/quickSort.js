import { TIMEOUT_DURATION, PRIMARY_COLOUR, SECONDARY_COLOUR } from "../../utils/config";
import { disableSortButtonsAndUpdateInformationDOM } from "../../utils/standardOperations";

function animateQuickSort(array) {
    const start = window.performance.now();
    const animations = getQuickSortAnimations(array);
    disableSortButtonsAndUpdateInformationDOM(window.performance.now() - start, 'Quick Sort <br>O(nlog n)', animations.length);
    // TODO: DOM manipulation to display execution time
    console.log(`Execution time for quick sort: ${window.performance.now() - start}ms.`)
    for (let i = 0; i < animations.length; i++) {
        const arrayBars = document.getElementsByClassName('array-bar');
        const [operation, pivot, left, right] = animations[i];
        const pivotStyle = arrayBars[pivot].style;
        const rightStyle = arrayBars[right].style;

        if (operation === 0 || operation === 0.5) {
            // Checking values
            setTimeout(() => {
                pivotStyle.backgroundColor = 'purple';
                rightStyle.backgroundColor = operation === 0 ? SECONDARY_COLOUR : PRIMARY_COLOUR;
                // pIdx might still be -1 if there are no values that are
                // smaller than or equal to pivot yet. Given this, we do
                // not want to display the indication if it does not exist
                // yet.
                if (left !== -1) {
                    const leftStyle = arrayBars[left].style;
                    leftStyle.backgroundColor = operation === 0 ? SECONDARY_COLOUR : PRIMARY_COLOUR;
                }
            }, i * TIMEOUT_DURATION);
        }
        else if (operation === 1) {
            // Swapping values
            setTimeout(() => {
                const leftStyle = arrayBars[left].style;
                const leftHeight = leftStyle.height;
                const rightHeight = rightStyle.height;
                leftStyle.height = rightHeight;
                rightStyle.height = leftHeight;
            }, i * TIMEOUT_DURATION);

        } else {
            // Swapping pivot with right + 1
            setTimeout(() => {
                const pivotHeight = pivotStyle.height;
                const swapHeight = rightStyle.height;
                pivotStyle.height = swapHeight;
                rightStyle.height = pivotHeight;
                rightStyle.backgroundColor = PRIMARY_COLOUR;
                pivotStyle.backgroundColor = PRIMARY_COLOUR;
            }, i * TIMEOUT_DURATION);
        }
    }
}

function getQuickSortAnimations(array) {
    const animations = [];
    if (1 >= array.length) return array;
    quickSort(array, 0, array.length - 1, animations);
    return animations;
}

function quickSort(array, low, high, animations) {
    if (low < high) {
        const pIdx = partition(array, low, high, animations);
        quickSort(array, low, pIdx - 1, animations);
        quickSort(array, pIdx + 1, high, animations);
    }
}

function partition(array, low, high, animations) {
    const pivot = array[high];
    let pIdx = low - 1;

    for (let i = low; i < high; i++) {
        animations.push([0, high, pIdx, i]);
        animations.push([0.5, high, pIdx, i]);
        if (array[i] <= pivot) {
            pIdx++;
            animations.push([1, high, pIdx, i]);
            [array[pIdx], array[i]] = [array[i], array[pIdx]];
        }
    }

    animations.push([3, high, null, pIdx+1]);
    [array[pIdx+1], array[high]] = [array[high], array[pIdx+1]]
    return pIdx + 1
}

export { animateQuickSort }
