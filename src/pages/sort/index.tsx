import { useState } from "react";
import SortAlgorithm from "../components/sortAlgo";
import AlgorithmVisualizer, { Algorithms } from "../components/algoVisualizer";
import SortingBar from "../components/SortingBar";
import { bubbleSort } from "../algorithms/bubbleSort";
import { selectionSort } from "../algorithms/selectionSort";
import { insertionSort } from "../algorithms/insertionSort";
import { mergeSort } from "../algorithms/mergeSort";
import { quickSort } from "../algorithms/quickSort";

const SortPage = () => {
    const [selectedAlgo, setSelectedAlgo] = useState<Algorithms>("")
    const [steps, setSteps] = useState<any[]>([])

    const handleSelection = (algo: Algorithms) => {
        setSelectedAlgo(algo)
        // generate steps for selection sort
        if (algo === "Bubble Sort") {
            setSteps(bubbleSort())
        } else if (algo === "Selection Sort") {
            setSteps(selectionSort())
        } else if (algo === "Insertion Sort") {
            setSteps(insertionSort())
        } else if (algo === "Merge Sort") {
            setSteps(mergeSort())
        } else if (algo === "Quick Sort") {
            setSteps(quickSort())
        }
    }

    // functions to render each step based on algo selected
    const renderBubbleSortStep = (step: any, isSorted: boolean) => {
        return (
            <div className="flex justify-center space-x-2">
                {step.array.map((value: number, index: number) => (
                    <SortingBar
                        key={index}
                        value={value}
                        isSorted={isSorted}
                        isCompared={step.comparedIndices.includes(index)}
                        isSwapped={step.comparedIndices.includes(index) && step.swapped}
                    />
                ))}
            </div>
        )
    }

    const renderSelectionSortStep = (step: any, isSorted: boolean) => {
        return (
            <div className="flex justify-center space-x-2">
                {step.array.map((value: number, index: number) => (
                    <SortingBar
                        key={index}
                        value={value}
                        isSorted={isSorted}
                        isCurrentIndex={index === step.currentIndex}
                        isMinIndex={index === step.isMinIndex}
                    />
                ))}
            </div>
        )
    }

    const renderInsertionSortStep = (step: any, isSorted: boolean) => {
        return (
            <div className="flex justify-center spaxe-x-2">
                {step.array.map((value: number, index: number) => (
                    <SortingBar
                        key={index}
                        value={value}
                        isSorted={isSorted}
                        isCurrentIndex={index === step.currentIndex}
                        isCompared={index === step.comparedIndex}
                    />
                ))}
            </div>
        )
    }

    const renderMergeSortStep = (step: any, isSorted: boolean) => {
        return (
            <div className="flex flex-col items-center space-y-4">
                <div className="flex justify-center space-x-2">
                    {step.array.map((value: number, index: number) => (
                        <SortingBar
                            key={index}
                            value={value}
                            isSorted={isSorted}
                        />
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
                                <SortingBar
                                    key={`left-${index}`}
                                    value={value}
                                    className="bg-blue-100"
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="text-gray-600 font-semibold">
                            Right:
                        </div>
                        <div className="flex space-x-2">
                            {step.rightHalf.map((value: number, index: number) => (
                                <SortingBar
                                    key={`right-${index}`}
                                    value={value}
                                    className="bg-blue-100"
                                />
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
                        <SortingBar
                            key={`left-${index}`}
                            value={value}
                            isSorted={isSorted}
                            isPivot={index === step.isPivotIndex}
                        />
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
                                    <SortingBar
                                        key={`left-${index}`}
                                        value={value}
                                        className="bg-blue-100"
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="text-gray-600 font-semibold">
                                Right Partition:
                            </div>
                            <div className="flex space-x-2">
                                {step.rightPartition.map((value: number, index: number) => (
                                    <SortingBar
                                        key={`right-${index}`}
                                        value={value}
                                        className="bg-blue-100"
                                    />
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

        switch (selectedAlgo) {
            case "Bubble Sort":
                return renderBubbleSortStep(step, isSorted)
            case "Selection Sort":
                return renderSelectionSortStep(step, isSorted)
            case "Insertion Sort":
                return renderInsertionSortStep(step, isSorted)
            case "Merge Sort":
                return renderMergeSortStep(step, isSorted)
            case "Quick Sort":
                return renderQuickSortStep(step, isSorted)
            default:
                return (
                    <div>
                        No Sorting algorithm selected.
                    </div>
                )
        }
    }

    return (
        <div className="min-h-screen p-8 bg-gray-50">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
                Sort Algorithms
            </h1>
            <SortAlgorithm
                onAlgorithmSelect={(algo) => handleSelection(algo)}
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