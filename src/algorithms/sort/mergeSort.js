export function getMergeSortAnimations(array) {
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

function pushTwice(animations, i, j) {
    animations.push([i, j]);
    animations.push([i, j]);
}
