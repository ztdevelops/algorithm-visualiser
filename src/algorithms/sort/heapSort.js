export function getHeapSortAnimations(array) {
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
