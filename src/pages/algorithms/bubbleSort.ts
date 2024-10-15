interface BubbleSortStep {
    array: number[] // array being searched
    comparedIndices: [number, number] // two indices being compared at each step
    swapped: boolean // check for a swap at this step
}

// implementation to record each step
export const bubbleSort = (arr: number[] = [5, 1, 4, 2, 8]): BubbleSortStep[] => {
    const steps: BubbleSortStep[] = [] // empty array to hold the steps of the algo
    const n = arr.length
    const array = [...arr] // create a copy of the array to sort

    // perform bubble sort
    for (let i = 0; n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            const currentStep: BubbleSortStep = {
                array: [...arr], // copy of the array at this step
                comparedIndices: [j, j + 1], // indices being compared
                swapped: false, // intially set to false
            }

            // if current element is greater than the next, swap them
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]] // swap elements
                currentStep.swapped = true // record that a swap occured
            }

            // push current step to the steps array for visualization
            steps.push(currentStep)
        }
    }
    return steps // return list of steps recorded
}
