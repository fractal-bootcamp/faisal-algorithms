interface QuickSortStep {
    array: number[] // array being sorted at the current step
    pivotIndex: number // index of the pivot element
    leftPartition: number[] // elements less than the pivot
    rightPartition: number[] // elements greater than the pivot
}

// implementation to record each step
export const quickSort = (arr: number[]): QuickSortStep[] => {
    const steps: QuickSortStep[] = [] // empty array to hold the steps of the algo
    const array = [...arr] // create a copy of the array to sort

    // helper function to perform partition and record steps
    const partition = (low: number, high: number): number => {
        const pivot = arr[high] // choose the last element as the pivot
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
            array: [...arr], // copy of the array at this step
            pivotIndex: i + 1, // index of the pivot element
            leftPartition, // elements smaller than pivot
            rightPartition, // elements greater than pivot
        })
        return i + 1 // return final pivot position
    }

    // helper function for recursive quickSort
    const quickSortRecursive = (low: number, high: number) => {
        if (low < high) {
            const pivotIndex = partition(low, high) // perform partitioning and get the pivot index

            // recursively apply quickSort to the left and right subarrays
            quickSortRecursive(low, pivotIndex - 1) // sort the left side of the pivot
            quickSortRecursive(pivotIndex + 1, high) // sort the right side of the pivot
        }
    }
    quickSortRecursive(0, array.length - 1) // start the quickSort process
    return steps // return the list of steps recorded
}