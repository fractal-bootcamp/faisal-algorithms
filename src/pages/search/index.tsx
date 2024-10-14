import { useState } from "react";
import SearchAlgorithms from "../components/searchAlgo";
import AlgorithmVisualizer from "../components/algoVisualizer";

const SearchPage = () => {
    const [selectedAlgo, setSelectedAlgo] = useState("")

    const handleSelection = (algorithm: string) => {
        setSelectedAlgo(algorithm)
    }

    return (
        <div>
            <h1>
                Search Algorithms
            </h1>
            <SearchAlgorithms
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

export default SearchPage