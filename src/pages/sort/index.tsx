import { useState } from "react";
import SortAlgorithm from "../components/sortAlgo";
import AlgorithmVisualizer from "../components/algoVisualizer";
import { bubbleSort } from "../algorithms/bubbleSort";
import { selectionSort } from "../algorithms/selectionSort";

const SortPage = () => {
    const [selectedAlgo, setSelectedAlgo] = useState("")
    const [steps, setSteps] = useState<any[]>([])

    const handleSelection = (algorithm: string) => {
        setSelectedAlgo(algorithm)

        if (algorithm === "Bubble Sort") {
            setSteps(bubbleSort()) // generate steps for bubble sort
        } else if (algorithm === "Selection Sort") {
            setSteps(selectionSort()) // generate steps for selection sort
        }
    }

    // functions to render each step based on algo selected
    const renderBubbleSortStep = (step: any, isSorted: boolean) => {
        return (
            <div className="flex justify-center space-x-2">
                {step.array.map((value: number, index: number) => (
                    <div
                        key={index}
                        className={`w-16 bg-white border
                        ${isSorted
                                ? "bg-green-300"
                                : step.comparedIndices.includes(index)
                                    ? step.swapped
                                        ? "bg-yellow-300"
                                        : "bg-blue-300"
                                    : "bg-white"
                            }`}
                        style={{ height: `${value * 20}px` }} // each value is visualized as a bar with dynamic height
                    >
                        <div className="text-center text-sm text-gray-700 font-semibold">
                            {value}
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    const renderSelectionSortStep = (step: any, isSorted: boolean) => {
        return (
            <div className="flex justify-center space-x-2">
                {step.array.map((value: number, index: number) => (
                    <div
                        key={index}
                        className={`w-16 bg-white border
                        ${isSorted
                                ? "bg-green-300"
                                : index === step.currentIndex
                                    ? "bg-yellow-300"
                                    : index === step.minIndex
                                        ? "bg-blue-300"
                                        : "bg-white"
                            }`}
                        style={{ height: `${value * 20}px` }} // each value is visualized as a bar with dynamic height
                    >
                        <div className="text-center text-sm text-gray-700 font-semibold">
                            {value}
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    const renderStep = (step: any, currentStepIndex: number, totalSteps: number) => {
        const isSorted = currentStepIndex === totalSteps - 1 // check if we are at the last step
        if (selectedAlgo === "Bubble Sort") {
            return renderBubbleSortStep(step, isSorted)
        } else if (selectedAlgo === "Selection Sort") {
            return renderSelectionSortStep(step, isSorted)
        }
        return (
            <div>
                No Sorting algorithm selected.
            </div>
        )
    }

    return (
        <div className="min-h-screen p-8 bg-gray-50">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
                Sort Algorithms
            </h1>
            <SortAlgorithm
                onAlgorithmSelect={handleSelection}
            />
            {selectedAlgo && steps.length > 0 && (
                <div className="mt-8">
                    <AlgorithmVisualizer
                        algorithm={selectedAlgo}
                        steps={steps}
                        renderStep={renderStep}
                    />
                </div>
            )}
        </div>
    )
}

export default SortPage