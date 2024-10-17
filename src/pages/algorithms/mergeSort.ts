interface MergeSortStep {
    array: number[] //  array being searched
    leftHalf: number[] // left half being merged
    rightHalf: number[] // right half being merged
}

// helper function
const merge = (
    left: number[],// left half of the array
    right: number[], // right half of the array
    steps: MergeSortStep[] // array of steps where we record each merge operation
): number[] => {
    let result: number[] = [] // merged array result
    let leftIndex = 0 // pointer for the left half
    let rightIndex = 0 // pointer for the right half

    // merge two halves by comparing elements from both arrays
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]) // add smaller element from the left half
            leftIndex++ // move the left pointer forward
        } else {
            result.push(right[rightIndex]) // add smaller element from the right half
            rightIndex++ // move the right pointer forward
        }
    }

    // concatenate remaining elements
    result = result
        .concat(left.slice(leftIndex)) // add remaining elements from the left half
        .concat(right.slice(rightIndex)) // add remaining elements from the right half

    // record current state of the array and the two halves being merged
    steps.push({
        array: [...result], // copy of the merged array at this step
        leftHalf: [...left], // left half of the array 
        rightHalf: [...right], // right half of the array
    })
    return result // return the merged array
}

// implementation to record each step
export const mergeSort = (arr: number[] = [5, 1, 4, 2, 8, 6, 3, 7]): MergeSortStep[] => {
    const steps: MergeSortStep[] = [] // empty array to hold the steps of the algo

    // helper function for recursive merge sort
    const sort = (array: number[]): number[] => {

        // base case: if the array has one ir no elements, it's already sorted
        if (array.length <= 1) {
            return array
        }

        // split array into two halves
        const mid = Math.floor(array.length / 2) // calculate middle index
        const left = sort(array.slice(0, mid)) // sort left half of array
        const right = sort(array.slice(mid)) // sort right half of array

        // recursively sort both halves and then merge them
        return merge(left, right, steps)
    }
    sort(arr) // start the recusive sorting process
    return steps // return the list of steps recorded
}