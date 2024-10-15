interface Step {
    array: number[] // array being search
    left: number // left boundary of the search range
    right: number // right boundary of the search range
    middle: number // middle index being checked
    found: boolean // check if target is found at the middle index
}

// implementation to record each step
export const binarySearch = (arr: number[], target: number): Step[] => {
    const steps: Step[] = [] // empty array to hold the steps of the algo
    let left = 0 // initialize the left pointer to the beginning of the array
    let right = arr.length - 1 // initialize the right pointer to the end of the array

    // continue searching while the left pointer is less than or equal to the right pointer
    while (left <= right) {
        const middle = Math.floor((left + right) / 2) // calculate the middle index 
        const currentStep: Step = {
            array: [...arr], // copy of the array at this step
            left, // current left boundary of the search
            right, // current right boundary of the search
            middle, // middle index being checked
            found: arr[middle] === target, // check if target is found at the middle index
        }

        // push current step to the steps array for visualization
        steps.push(currentStep)

        // if the target is found, break the loop early
        if (arr[middle] === target) {
            break
        }
        // if middle element is less than the target, search the right half
        else if (arr[middle] < target) {
            left = middle + 1
        }
        // if middle element is greater than the target, search the left half
        else {
            right = middle - 1
        }
    }
    // return the list of steps recorded
    return steps
}