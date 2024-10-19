import { Algorithms } from "./algoVisualizer"

interface SortAlgorithmProps {
    onAlgorithmSelect: (algorithm: Algorithms) => void
}

const SortAlgorithms: React.FC<SortAlgorithmProps> = ({
    onAlgorithmSelect
}) => {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
                Select Sort Algorithm:
            </label>
            <select onChange={(e) => onAlgorithmSelect(e.target.value as Algorithms)} className="block w-full p-2 border border-gray-300 rounded-md">
                <option value="">--Select--</option>
                <option value="Bubble Sort">Bubble Sort</option>
                <option value="Selection Sort">Selection Sort</option>
                <option value="Insertion Sort">Insertion Sort</option>
                <option value="Merge Sort">Merge Sort</option>
                <option value="Quick Sort">Quick Sort</option>
            </select>
        </div>
    )
}

export default SortAlgorithms