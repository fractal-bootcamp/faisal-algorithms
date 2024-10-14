interface SortAlgorithmProps {
    onAlgorithmSelect: (algorithm: string) => void
}

const SortAlgorithms: React.FC<SortAlgorithmProps> = ({
    onAlgorithmSelect
}) => {
    return (
        <div>
            <label>
                Select Sort Algorithm:
            </label>
            <select onChange={(e) => onAlgorithmSelect(e.target.value)}>
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