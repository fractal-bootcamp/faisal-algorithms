import { useEffect, useState } from "react";
import SearchAlgorithms from "../components/searchAlgo";
import AlgorithmVisualizer from "../components/algoVisualizer";
import { linearSearch } from "../algorithms/linearSearch";
import { binarySearch } from "../algorithms/binarySearch";
import { depthFirstSearch } from "../algorithms/depthFirstSearch";
import { breadthFirstSearch } from "../algorithms/breadthFirstSearch";

const SearchPage = () => {
    const [selectedAlgo, setSelectedAlgo] = useState("")
    const [steps, setSteps] = useState<any[]>([])
    const [target, setTarget] = useState<number>(7)

    const defaultArray = [1, 3, 5, 7, 9, 11, 13, 15, 17]

    // recalculate steps whenever target or algo changes
    useEffect(() => {
        if (selectedAlgo) {
            // generate steps based on the selected algo
            if (selectedAlgo === "Linear Search") {
                setSteps(linearSearch(defaultArray, target))
            } else if (selectedAlgo === "Binary Search") {
                setSteps(binarySearch(defaultArray, target))
            } else if (selectedAlgo === "Depth-First Search") {
                setSteps(depthFirstSearch())
            } else if (selectedAlgo === "Breadth-First Search") {
                setSteps(breadthFirstSearch())
            }
        }
    }, [selectedAlgo, target])

    // functions to render each step based on algo selected
    const renderLinearSearchStep = (step: any) => {
        return (
            <div className="flex justify-center space-x-2">
                {step.array.map((value: number, index: number) => (
                    <div
                        key={index}
                        className={`px-6 py-4 border 
                        ${step.found && index === step.currentIndex
                                ? "bg-green-300"
                                : index === step.currentIndex
                                    ? "bg-yellow-300"
                                    : "bg-white"
                            }`}
                    >
                        {value}
                    </div>
                ))}
            </div>
        )
    }

    const renderBinarySearchStep = (step: any) => {
        return (
            <div className="flex flex-col space-y-2">
                {step.arrays.map((array: number[], stepIndex: number) => (
                    <div
                        key={stepIndex}
                        className="flex justify-center space-x-2"
                    >
                        {array.map((value: number, index: number) => (
                            <div
                                key={index}
                                className={`px-6 py-4 border
                                ${stepIndex === step.arrays.length - 1 && index === step.middle
                                        ? step.found
                                            ? "bg-green-300"
                                            : "bg-yellow-300"
                                        : "bg-white"
                                    }`}
                            >
                                {value}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        )
    }

    // logic for DFS/BFS
    const renderGraphSearchStep = (step: any) => {
        // ensure step.visited and step.node are defined
        if (!step || !step.visited || step.node === undefined) {
            return (
                <div>
                    No data available for rendering.
                </div>
            )
        }

        // node from 0 to maximum node number in the graph
        const graphNodes = Array.from({ length: 5 }, (_, index) => index)

        return (
            <div className="flex justify-center space-x-2">
                {graphNodes.map((value: number) => (
                    <div
                        key={value}
                        className={`px-6 py-4 border 
                    ${step.visited.includes(value)
                                ? "bg-green-300"
                                : value === step.node
                                    ? "bg-yellow-300"
                                    : "bg-white"
                            }`}
                    >
                        {value}
                    </div>
                ))}
            </div>
        )
    }

    const renderStep = (step: any) => {
        if (selectedAlgo === "Binary Search") {
            return renderBinarySearchStep(step)
        } else if (
            selectedAlgo === "Depth-First Search" ||
            selectedAlgo === "Breadth-First Search"
        ) {
            return renderGraphSearchStep(step)
        } else {
            return renderLinearSearchStep(step)
        }
    }

    return (
        <div className="min-h-screen p-8 bg-gray-50">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
                Search Algorithms
            </h1>
            <SearchAlgorithms
                onAlgorithmSelect={setSelectedAlgo}
            />
            {(selectedAlgo === "Linear Search" || selectedAlgo === "Binary Search") && (
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                        Select Target
                    </label>
                    <select
                        value={target}
                        onChange={(e) => setTarget(Number(e.target.value))}
                        className="block w-full p-2 border boder-gray-300 rounded-md"
                    >
                        {defaultArray.map((num) => (
                            <option key={num} value={num}>
                                {num}
                            </option>
                        ))}
                    </select>
                </div>

            )}
            {selectedAlgo && steps.length > 0 && (
                <div className="mt-8">
                    <AlgorithmVisualizer
                        algorithm={selectedAlgo}
                        steps={steps}
                        renderStep={renderStep}
                        target={target}
                    />
                </div>
            )}
        </div>
    )
}

export default SearchPage