export function mergeSort(array, start, end, copy, animations) {
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
        pushTwice(animations, i, j);
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
        pushTwice(animations, i, i);
        animations.push([k, copy[i]]);
        array[k] = copy[i];
        k++; i++;
    }
    while (j <= end) {
        pushTwice(animations, j, j);
        animations.push([k, copy[j]]);
        array[k] = copy[j];
        k++; j++;
    }
}

export function quickSort(array, low, high, animations) {
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

export function heapSort(array, animations) {
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

function pushTwice(animations, i, j) {
    animations.push([i, j]);
    animations.push([i, j]);
}