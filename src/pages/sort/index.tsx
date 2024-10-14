import { useState } from "react";
import SortAlgorithm from "../components/sortAlgo";
import AlgorithmVisualizer from "../components/algoVisualizer";

const SortPage = () => {
    const [selectedAlgo, setSelectedAlgo] = useState("")

    const handleSelection = (algorithm: string) => {
        setSelectedAlgo(algorithm)
    }

    return (
        <div>
            <h1>
                Sort Algorithms
            </h1>
            <SortAlgorithm
                onAlgorithmSelect={handleSelection}
            />
            {selectedAlgo && (
                <AlgorithmVisualizer
                    algorithm={selectedAlgo}
                />
            )}
        </div>
    )
}

export default SortPage