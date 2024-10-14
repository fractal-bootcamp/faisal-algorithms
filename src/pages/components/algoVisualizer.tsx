import { useEffect } from "react";

interface AlgorithmVisualizerProps {
    algorithm: string
}

const algorithmInfo: Record<string, {
    description: string,
    timeComplexity: string,
    spaceComplexity: string,
}> = {
    "Linear Search": {
        description: `Linear Search scans each element of the array 
        one by one until the target value is found. It works for 
        both sorted and unsorted arrays.`,
        timeComplexity: "0(n)",
        spaceComplexity: "0(1)",
    },
    "Binary Search": {
        description: `Binary Search works by repeatedly dividing a 
        sorted array in half and comparing the middle element with
        the target value. If the target is smaller, the left half 
        is considered; if larger, the right half is considered.`,
        timeComplexity: "0(log n)",
        spaceComplexity: "0(1)",
    },
    "Depth-First Search": {
        description: `Depth-First Search (DFS) explores as far as 
        possible along a branch before backtracking. It's commonly 
        used for tree and graph traversals.`,
        timeComplexity: "0(V + E) (V: vertices, E: edges)",
        spaceComplexity: "0(V) for recursive DFS due to the call stack",
    },
    "Breadth-First Search": {
        description: `Breadth-First Search (BFS) explores all the neighbor 
        nodes at the present depth before moving on to nodes at the next depth 
        level. It's often used for shortest path problems in unweighted graphs.`,
        timeComplexity: "0(V + E) (V: vertices, E: edges)",
        spaceComplexity: "0(V) for storing nodes in the queue",
    },
    "Bubble Sort": {
        description: `Bubble Sort compares adjacent elements in an array and 
        swaps them if they are in the wrong order. It repeats this process 
        until the array is sorted.`,
        timeComplexity: "0(n^2)",
        spaceComplexity: "0(1)",
    },
    "Selection Sort": {
        description: `Selection Sort repeatedly finds the minimum element from 
        the unsorted part of the array and swaps it with the first unsorted element, 
        moving the boundary of the sorted part.`,
        timeComplexity: "0(n^2)",
        spaceComplexity: "0(1)",
    },
    "Insertion Sort": {
        description: `Insertion Sort builds the sorted array one element at a time 
        by picking elements and inserting them into their correct position in the 
        already sorted part.`,
        timeComplexity: "0(n^2)",
        spaceComplexity: "0(1)",
    },
    "Merge Sort": {
        description: `Merge Sort divides the array into two halves, 
        recursively sorts each half, and then merges the two halves 
        back together in sorted order.`,
        timeComplexity: "0(n log n)",
        spaceComplexity: "0(n) due to the extra space for the temporary arrays used during merging",
    },
    "Quick Sort": {
        description: `Quick Sort picks a pivot element, partitions the array around the pivot, 
        and recursively sorts the partitions. It works efficiently in average cases but can 
        degrade in performance in certain cases.`,
        timeComplexity: "0(n log n) (average), 0(n^2) (worst case)",
        spaceComplexity: "0(log n) for the recursion stack (best case), 0(n) (worst case)",
    },
}

const AlgorithmVisualizer: React.FC<AlgorithmVisualizerProps> = ({ algorithm }) => {
    useEffect(() => {
        // logic to animate the selected algo
    }, [algorithm])

    const selectedAlgo = algorithmInfo[algorithm]
    return (
        <div>
            <h2>
                Visualization for {algorithm}
            </h2>
            <div>
                {selectedAlgo
                    ? (
                        <div>
                            <p>
                                Description:
                            </p>
                            <p>
                                {selectedAlgo.description}
                            </p>
                            <p>
                                Time Complexity:
                            </p>
                            <p>
                                {selectedAlgo.timeComplexity}
                            </p>
                            <p>
                                Space Complexity:
                            </p>
                            <p>
                                {selectedAlgo.spaceComplexity}
                            </p>
                        </div>
                    ) : (
                        <p>
                            Select an algorithm to visualize.
                        </p>
                    )
                }
            </div>
        </div>
    )
}

export default AlgorithmVisualizer