
// this function returns a random integer greater than offset
function getRandomInt(offset: number) {
    return Math.floor(Math.random() * 10) + offset
}

const randArray = Array(1000).fill(null).map((e, index) => {
    const offset = index * 10 // offset of at least 100 per index so the numbers differ in size a lot
    return getRandomInt(offset)
})

console.log(randArray)

// const array = [40, 44, 78, 96, 105, 216, 1117]

// indexOffset exits to keep track of the GLOBAL position that we are in for this particular recursive step
// so we can reconstruct the original index in the original array.
// we specifically need to keep track of HOW MANY indicies we've sliced from the left side
export function binarysearch(target: number, array: number[], indexOffset: number = 0): number {
    if (array.length == 0) return -1

    const middleIndex = Math.floor(array.length / 2)

    // if we found the target, return its index (the index from the original array)
    if (array[middleIndex] === target) return middleIndex + indexOffset // return the middleIndex + OFFSET to account for any left slicing

    if (target < array[middleIndex]) {
        const left = array.slice(0, middleIndex)
        return binarysearch(target, left, indexOffset + 0)
    } else {
        const right = array.slice(middleIndex + 1)
        // we increase the indexOffset by the position that we sliced from. To keep track of how many indices have been sliced off the left side.
        return binarysearch(target, right, indexOffset + middleIndex + 1)
    }
}

console.log(binarysearch(96, randArray))