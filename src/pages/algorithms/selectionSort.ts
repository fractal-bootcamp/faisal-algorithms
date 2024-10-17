interface SelectionSortStep {
    array: number[] // array being searched
    currentIndex: number // current index in the outer loop
    minIndex: number // index of the minimum element found in the unsorted part of the array
    swapped: boolean // check for a swap at this step
}

// implementation to record each step
export const selectionSort = (arr: number[] = [5, 1, 4, 2, 8, 6, 3, 7]): SelectionSortStep[] => {
    const steps: SelectionSortStep[] = [] // empty array to hold the steps of the algo
    const array = [...arr] // create a copy of the array to sort
    const n = arr.length

    // perform selection sort
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i // assume current element is the smallest
        for (let j = i + 1; j < n; j++) {
            // find the smallest element in the unsorted part of the array
            if (array[j] < array[minIndex]) {
                minIndex = j
            }
        }

        // push current step before the swap
        steps.push({
            array: [...array], // copy of the array at this step
            currentIndex: i, // current element being considered
            minIndex, // min index that was swapped
            swapped: i !== minIndex, // record wether a swap occured
        })

        // swap the found minimum element with the current element if necessary
        if (i !== minIndex) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]]
        }

        // push the step after the swap
        steps.push({
            array: [...array], // array after the swap
            currentIndex: i, // still the current index
            minIndex, // min index that was swapped
            swapped: i !== minIndex, // ensure we show the swap
        })
    }
    return steps // return list of steps recorded
}