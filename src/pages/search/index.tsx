import { useEffect, useState } from "react";
import SearchAlgorithms from "../components/searchAlgo";
import AlgorithmVisualizer from "../components/algoVisualizer";
import { linearSearch } from "../algorithms/linearSearch";
import { binarySearch } from "../algorithms/binarySearch";
import { depthFirstSearch } from "../algorithms/depthFirstSearch";
import { breadthFirstSearch } from "../algorithms/breadthFirstSearch";
import { n } from "@clerk/clerk-react/dist/controlComponents-CByvIpDK";

const SearchPage = () => {
    const [selectedAlgo, setSelectedAlgo] = useState("")
    const [steps, setSteps] = useState<any[]>([])
    const [target, setTarget] = useState<number>(7)

    const defaultArray = [1, 3, 5, 7, 9]

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

    // render each step
    const renderStep = (step: any) => {
        return (
            <div className="flex justify-center space-x-2">
                {step.array.map((value: number, index: number) => (
                    <div
                        key={index}
                        className={`p-4 border 
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

    return (
        <div className="min-h-screen p-8 bg-gray-50">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
                Search Algorithms
            </h1>
            <SearchAlgorithms
                onAlgorithmSelect={setSelectedAlgo}
            />
            {selectedAlgo && (
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