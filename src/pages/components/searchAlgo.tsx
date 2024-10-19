import { Algorithms } from "./algoVisualizer"

interface SearchAlgorithmProps {
    onAlgorithmSelect: (algorithm: Algorithms) => void
}

const SearchAlgorithms: React.FC<SearchAlgorithmProps> = ({
    onAlgorithmSelect
}) => {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
                Select Search Algorithm:
            </label>
            <select onChange={(e) => onAlgorithmSelect(e.target.value as Algorithms)} className="block w-full p-2 border border-gray-300 rounded-md">
                <option value="">--Select--</option>
                <option value="Linear Search">Linear Search</option>
                <option value="Binary Search">Binary Search</option>
                <option value="Depth-First Search">Depth-First Search</option>
                <option value="Breadth-First Search">Breadth-First Search</option>
            </select>
        </div>
    )
}

export default SearchAlgorithms