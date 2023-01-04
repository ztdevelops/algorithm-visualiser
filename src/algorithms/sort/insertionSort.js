export function getInsertionSortAnimations(array) {
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
