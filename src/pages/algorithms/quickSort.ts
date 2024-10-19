interface QuickSortStep {
    array: number[] // array being sorted at the current step
    pivotIndex: number // index of the pivot element
    leftPartition: number[] // elements less than the pivot
    rightPartition: number[] // elements greater than the pivot
}

// helper function to perform partition and record steps
const partition = (
    array: number[],
    low: number,
    high: number,
    steps: QuickSortStep[]
): number => {
    const pivot = array[high] // choose the last element as the pivot
    let i = low - 1 // index of the smaller elemenet

    // partitioning process: elements smaller than the pivot move to the left, larger elementto the right
    for (let j = low; j < high; j++) {
        if (array[j] < pivot) {
            i++
            [array[i], array[j]] = [array[j], array[i]] // swap elements
        }
    }

    // place the pivot element in its correct position
    [array[i + 1], array[high]] = [array[high], array[i + 1]]

    // record the current step
    const leftPartition = array.slice(low, i + 1) // elements less than pivot
    const rightPartition = array.slice(i + 2, high + 1) // elements greater than pivot

    steps.push({
        array: [...array], // copy of the array at this step
        pivotIndex: i + 1, // index of the pivot element
        leftPartition, // elements smaller than pivot
        rightPartition, // elements greater than pivot
    })
    return i + 1 // return final pivot position
}

// helper function for recursive quickSort
const quickSortRecursive = (
    array: number[],
    low: number,
    high: number,
    steps: QuickSortStep[]
) => {
    if (low < high) {
        const pivotIndex = partition(array, low, high, steps) // perform partitioning and get the pivot index

        // recursively apply quickSort to the left and right subarrays
        quickSortRecursive(array, low, pivotIndex - 1, steps) // sort the left side of the pivot
        quickSortRecursive(array, pivotIndex + 1, high, steps) // sort the right side of the pivot
    }
}

// implementation to record each step
export const quickSort = (arr: number[] = [5, 1, 4, 2, 8, 6, 3, 7]): QuickSortStep[] => {
    const steps: QuickSortStep[] = [] // empty array to hold the steps of the algo
    const array = [...arr] // create a copy of the array to sort

    quickSortRecursive(array, 0, array.length - 1, steps) // start the quickSort process

    // add final step to make sure to render array when fuly sorted
    steps.push({
        array: [...array], // final sorted array
        pivotIndex: -1, // no pivot in the final sorted array
        leftPartition: [], // no left partition
        rightPartition: [], // no right partition
    })
    return steps // return the list of steps recorded
}