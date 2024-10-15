interface InsertionSortStep {
    array: number[] // array being searched
    currentIndex: number // current index of the element being inserted
    comparedIndex: number // index of the element being compared
    inserted: boolean // check if insertion was made
}

// implementation to record each step
export const insertionSort = (arr: number[] = [5, 1, 4, 2, 8]): InsertionSortStep[] => {
    const steps: InsertionSortStep[] = [] // empty array to hold the steps of the algo
    const array = [...arr] // create a copy of the array to sort

    // perform insertion sort
    for (let i = 1; i < array.length; i++) {
        let key = array[i] // element to be inserted
        let j = i - 1

        while (j >= 0 && array[j] > key) {
            const currentStep: InsertionSortStep = {
                array: [...arr], // copy of the array at this step
                currentIndex: i, // element being inserted
                comparedIndex: j, // element being compared
                inserted: false, // initially set to false
            }

            array[j + 1] = array[j] // shift the element to the right
            steps.push(currentStep) // push current step to the steps array for visualization
            j--
        }

        // insert the element at the correct position
        array[j + 1] = key

        const finalStep: InsertionSortStep = {
            array: [...arr], // copy of the array after insertion
            currentIndex: i,
            comparedIndex: j + 1, // position where the insertion was made
            inserted: true, // record that the insertion happened
        }

        // push current step to the steps array for visualization
        steps.push(finalStep)
    }
    return steps // return the list of steps recorded
}