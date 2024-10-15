interface Step {
    array: number[] // array being searched
    currentIndex: number // current index being checked
    found: boolean // check if target is found at current index
}

// implementation to record each step
export const linearSearch = (arr: number[], target: number): Step[] => {
    const steps: Step[] = [] // empty array to hold the steps of the algo

    // loop though the array, checking each element 
    for (let i = 0; i < arr.length; i++) {
        const currentStep: Step = {
            array: [...arr], // copy of the array at this step
            currentIndex: i, // current index being checked at this step
            found: arr[i] === target, // check if target is found at this index 
        }

        // push the current step to the steps array for visualization
        steps.push(currentStep)

        // if the target is found, break the loop early
        if (arr[i] === target) {
            break
        }
    }
    return steps // return the list of steps recorded
}