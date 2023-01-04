export function getQuickSortAnimations(array) {
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
