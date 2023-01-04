import { TIMEOUT_DURATION, PRIMARY_COLOUR, SECONDARY_COLOUR, FINISHED_COLOUR } from "../../utils/config";
import { disableSortButtonsAndUpdateInformationDOM } from "../../utils/standardOperations";

function animateHeapSort(array) {
    const start = window.performance.now();
    const animations = getHeapSortAnimations(array);
    disableSortButtonsAndUpdateInformationDOM(window.performance.now() - start, 'Heap Sort ( O(nlog n) )', animations.length);
    // TODO: DOM manipulation to display execution time
    console.log(`Execution time for heap sort: ${window.performance.now() - start}ms.`)
    for (let i = 0; i < animations.length; i++) {
        const arrayBars = document.getElementsByClassName('array-bar');
        const operation = animations[i][0];
        const rootStyle = arrayBars[animations[i][1]].style;
        // Getting largest
        if (operation === 0 || operation === 0.5) {
            setTimeout(() => {
                const largestStyle = arrayBars[animations[i][2]].style;
                rootStyle.backgroundColor = operation === 0 ? SECONDARY_COLOUR : PRIMARY_COLOUR;
                largestStyle.backgroundColor = operation === 0 ? SECONDARY_COLOUR : PRIMARY_COLOUR;
            }, i * TIMEOUT_DURATION);
            // Swapping largest if required
        } else if (operation === 1) {
            setTimeout(() => {
                const largestStyle = arrayBars[animations[i][2]].style;
                const largestHeight = largestStyle.height;
                const rootHeight = rootStyle.height;
                largestStyle.height = rootHeight;
                rootStyle.height = largestHeight;
                largestStyle.backgroundColor = PRIMARY_COLOUR;
                rootStyle.backgroundColor = PRIMARY_COLOUR;
            }, i * TIMEOUT_DURATION);
        } else {
            setTimeout(() => {
                const swappedStyle = arrayBars[animations[i][2]].style;
                const swappedHeight = swappedStyle.height;
                const rootHeight = rootStyle.height;
                swappedStyle.height = rootHeight;
                rootStyle.height = swappedHeight;
                swappedStyle.backgroundColor = FINISHED_COLOUR;
                rootStyle.backgroundColor = PRIMARY_COLOUR;
            }, i * TIMEOUT_DURATION);
        }
    }
}

function getHeapSortAnimations(array) {
    const animations = [];
    if (1 >= array.length) return array;
    heapSort(array, animations);
    return animations;
}

function heapSort(array, animations) {
    const n = array.length;

    for (let i = Math.floor(n / 2); i >= 0; i--) {
        heapify(array, n, i, animations);
    }

    for (let j = n - 1; j > 0; j--) {
        animations.push([2, 0, j]);
        [array[0], array[j]] = [array[j], array[0]];
        heapify(array, j, 0, animations);
    }
}

function heapify(array, n, i, animations) {
    let largest = i;
    const left = 2 * i + 1 < n ? 2 * i + 1 : null;
    const right = 2 * i + 2 < n ? 2 * i + 2 : null;

    if (left !== null && array[largest] < array[left]) {
        largest = left;
    }

    if (right !== null && array[largest] < array[right]) {
        largest = right;
    }
    animations.push([0, i, largest]);
    animations.push([0.5, i, largest]);
    if (largest !== i) {
        animations.push([1, i, largest]);
        [array[largest], array[i]] = [array[i], array[largest]];
        heapify(array, n, largest, animations);
    }
}

export { animateHeapSort }
