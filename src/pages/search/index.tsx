import { useState } from "react";
import SearchAlgorithms from "../components/searchAlgo";
import AlgorithmVisualizer from "../components/algoVisualizer";

const SearchPage = () => {
    const [selectedAlgo, setSelectedAlgo] = useState("")

    const handleSelection = (algorithm: string) => {
        setSelectedAlgo(algorithm)
    }

    return (
        <div className="min-h-screen p-8 bg-gray-50">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
                Search Algorithms
            </h1>
            <SearchAlgorithms
                onAlgorithmSelect={handleSelection}
            />
            {selectedAlgo && (
                <div className="mt-8">
                    <AlgorithmVisualizer
                        algorithm={selectedAlgo}
                    />

                </div>
            )}
        </div>
    )
}

export default SearchPage