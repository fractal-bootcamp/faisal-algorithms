interface InsertionSortStep {
    array: number[] // array being searched
    currentIndex: number // current index of the element being inserted
    comparedIndex: number // index of the element being compared
    inserted: boolean // check if insertion was made
}

// implementation to record each step
export const insertionSort = (arr: number[] = [5, 1, 4, 2, 8, 6, 3, 7]): InsertionSortStep[] => {
    const steps: InsertionSortStep[] = [] // empty array to hold the steps of the algo
    const array = [...arr] // create a copy of the array to sort

    // perform insertion sort
    for (let i = 1; i < array.length; i++) {
        let key = array[i] // element to be inserted
        let j = i - 1

        // record the initial step before starting the inner loop, 
        steps.push({
            array: [...array],
            currentIndex: i,
            comparedIndex: j,
            inserted: false
        })

        // shift elements to the right to make space for the key element
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j] // shift element
            steps.push({
                array: [...array], // copy of the array at this step
                currentIndex: i, // element being inserted
                comparedIndex: j, // element being compared
                inserted: false, // initially set to false
            })
            j--
        }

        // insert the element at the correct position
        array[j + 1] = key

        // push current step to the steps array for visualization
        steps.push({
            array: [...array], // copy of the array after insertion
            currentIndex: i,
            comparedIndex: j + 1, // position where the insertion was made
            inserted: true, // record that the insertion happened
        })
    }
    return steps // return the list of steps recorded
}