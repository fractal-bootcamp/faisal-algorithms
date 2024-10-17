import { useState } from "react";
import SortAlgorithm from "../components/sortAlgo";
import AlgorithmVisualizer from "../components/algoVisualizer";
import { bubbleSort } from "../algorithms/bubbleSort";
import { selectionSort } from "../algorithms/selectionSort";
import { insertionSort } from "../algorithms/insertionSort";
import { mergeSort } from "../algorithms/mergeSort";
import { quickSort } from "../algorithms/quickSort";

const SortPage = () => {
    const [selectedAlgo, setSelectedAlgo] = useState("")
    const [steps, setSteps] = useState<any[]>([])

    const handleSelection = (algorithm: string) => {
        setSelectedAlgo(algorithm)
        // generate steps for selection sort
        if (algorithm === "Bubble Sort") {
            setSteps(bubbleSort())
        } else if (algorithm === "Selection Sort") {
            setSteps(selectionSort())
        } else if (algorithm === "Insertion Sort") {
            setSteps(insertionSort())
        } else if (algorithm === "Merge Sort") {
            setSteps(mergeSort())
        } else if (algorithm === "Quick Sort") {
            setSteps(quickSort())
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

    const renderInsertionSortStep = (step: any, isSorted: boolean) => {
        return (
            <div className="flex justify-center spaxe-x-2">
                {step.array.map((value: number, index: number) => (
                    <div
                        key={index}
                        className={`w-16 bg-white border
                    ${isSorted
                                ? "bg-green-300"
                                : index === step.currentIndex
                                    ? "bg-yellow-300"
                                    : index === step.comparedIndex
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

    const renderMergeSortStep = (step: any, isSorted: boolean) => {
        return (
            <div className="flex flex-col items-center space-y-4">
                <div className="flex justify-center space-x-2">
                    {step.array.map((value: number, index: number) => (
                        <div
                            key={index}
                            className={`w-16 bg-white border
                    ${isSorted
                                    ? "bg-green-300"
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

                <div className="flex space-x-2">
                    <div className="text-gray-600 font-semibold">
                        Merging:
                    </div>
                </div>

                <div className="flex justify-center items-start space-x-8">
                    <div className="flex flex-col items-center">
                        <div className="text-gray-600 font-semibold">
                            Left:
                        </div>
                        <div className="flex space-x-2">
                            {step.leftHalf.map((value: number, index: number) => (
                                <div
                                    key={`left-${index}`}
                                    className="w-16 bg-blue-100 border"
                                    style={{ height: `${value * 20}px` }} // each value is visualized as a bar with dynamic height  
                                >
                                    <div className="text-center text-sm text-gray-700 font-semibold">
                                        {value}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="text-gray-600 font-semibold">
                            Right:
                        </div>
                        <div className="flex space-x-2">
                            {step.rightHalf.map((value: number, index: number) => (
                                <div
                                    key={`right-${index}`}
                                    className="w-16 bg-blue-100 border"
                                    style={{ height: `${value * 20}px` }} // each value is visualized as a bar with dynamic height  
                                >
                                    <div className="text-center text-sm text-gray-700 font-semibold">
                                        {value}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const renderQuickSortStep = (step: any, isSorted: boolean) => {
        return (
            <div className="flex flex-col items-center space-y-4">
                <div className="flex justify-center space-x-2">
                    {step.array.map((value: number, index: number) => (
                        <div
                            key={index}
                            className={`w-16 bg-white border
                    ${isSorted
                                    ? "bg-green-300"
                                    : index === step.pivotIndex
                                        ? "bg-yellow-300"
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

                {!isSorted && (
                    <div className="flex justify-center items-start space-x-8">
                        <div className="flex flex-col items-center">
                            <div className="text-gray-600 font-semibold">
                                Left Partition:
                            </div>
                            <div className="flex space-x-2">
                                {step.leftPartition.map((value: number, index: number) => (
                                    <div
                                        key={`left-${index}`}
                                        className="w-16 bg-blue-100 border"
                                        style={{ height: `${value * 20}px` }} // each value is visualized as a bar with dynamic height  
                                    >
                                        <div className="text-center text-sm text-gray-700 font-semibold">
                                            {value}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="text-gray-600 font-semibold">
                                Right Partition:
                            </div>
                            <div className="flex space-x-2">
                                {step.rightPartition.map((value: number, index: number) => (
                                    <div
                                        key={`right-${index}`}
                                        className="w-16 bg-blue-100 border"
                                        style={{ height: `${value * 20}px` }} // each value is visualized as a bar with dynamic height  
                                    >
                                        <div className="text-center text-sm text-gray-700 font-semibold">
                                            {value}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }

    const renderStep = (step: any, currentStepIndex: number, totalSteps: number) => {
        const isSorted = currentStepIndex === totalSteps - 1 // check if we are at the last step
        if (selectedAlgo === "Bubble Sort") {
            return renderBubbleSortStep(step, isSorted)
        } else if (selectedAlgo === "Selection Sort") {
            return renderSelectionSortStep(step, isSorted)
        } else if (selectedAlgo === "Insertion Sort") {
            return renderInsertionSortStep(step, isSorted)
        } else if (selectedAlgo === "Merge Sort") {
            return renderMergeSortStep(step, isSorted)
        } else if (selectedAlgo === "Quick Sort") {
            return renderQuickSortStep(step, isSorted)
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