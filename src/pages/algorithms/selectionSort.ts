interface SelectionSortStep {
    array: number[] // array being searched
    currentIndex: number // current index in the outer loop
    minIndex: number // index of the minimum element found in the unsorted part of the array
    swapped: boolean // check for a swap at this step
}

// implementation to record each step
export const selectionSort = (arr: number[]): SelectionSortStep[] => {
    const steps: SelectionSortStep[] = [] // empty array to hold the steps of the algo
    const n = arr.length
    const array = [...arr] // create a copy of the array to sort

    // perform selection sort
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i // assume current element is the smallest
        for (let j = i + 1; j < n; j++) {
            // find the smallest element in the unsorted part of the array
            if (array[j] < array[minIndex]) {
                minIndex = j
            }
        }
        const currentStep: SelectionSortStep = {
            array: [...arr], // copy of the array at this step
            currentIndex: i, // current element being considered
            minIndex, // index of the minimum element found
            swapped: i !== minIndex // record whether a swap occured
        }

        // swap the found minimum element with the current element if necessary
        if (i !== minIndex) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]]
        }

        // push current step to the steps array for visualization
        steps.push(currentStep)
    }
    return steps // return list of steps recorded
}