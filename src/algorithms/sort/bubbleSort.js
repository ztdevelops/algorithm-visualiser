export function getBubbleSortAnimations(array) {
    const animations = [];
    if (1 >= array.length) return array;
    bubbleSort(array, animations);
    return animations;
}

function bubbleSort(array, animations) {
    const n = array.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n-i-1; j++) {
            animations.push([0, j, j+1]);
            animations.push([0.5, j, j+1]);
            if (array[j+1] < array[j]) {
                animations.push([1, j, j+1]);
                const tmp = array[j+1];
                array[j+1] = array[j];
                array[j] = tmp;
            }
            if (j === n-i-2) {
                animations.push([2, j, j+1]);
            }
        }
    }
}
