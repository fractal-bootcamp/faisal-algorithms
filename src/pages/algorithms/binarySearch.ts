interface Step {
    arrays: number[][] // array being searched
    left?: number // left boundary of the search range
    right?: number // right boundary of the search range
    middle: number // middle index being checked
    found: boolean // check if target is found at the middle index
}

// implementation to record each step
export const binarySearch = (
    arr: number[] = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19],
    target: number = 7
): Step[] => {
    const steps: Step[] = [] // empty array to hold the steps of the algo
    let left = 0 // initialize the left pointer to the beginning of the array
    let right = arr.length - 1 // initialize the right pointer to the end of the array
    let arrays = [arr.slice()] // start with full array

    // continue searching while the left pointer is less than or equal to the right pointer
    while (left <= right) {
        const middle = Math.floor((left + right) / 2) // calculate the middle index 
        const found = arr[middle] === target

        // push current step with current state of the array and middle value
        steps.push({
            arrays: arrays.slice(), // copy of all previous arrays
            middle: middle - left, // middle index being checked
            found, // check if target is found at the middle index
        })

        if (found) {
            break // stop when the target is found
        } else if (arr[middle] < target) {
            left = middle + 1 // search the right half
        } else {
            right = middle - 1 // search the left half
        }

        // push the new range being search to the arrays
        arrays.push(arr.slice(left, right + 1))
    }
    return steps // return the list of steps recorded
}