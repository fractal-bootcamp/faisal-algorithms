interface SearchAlgorithmProps {
    onAlgorithmSelect: (algorithm: string) => void
}

const SearchAlgorithms: React.FC<SearchAlgorithmProps> = ({
    onAlgorithmSelect
}) => {
    return (
        <div>
            <label>
                Select Search Algorithm:
            </label>
            <select onChange={(e) => onAlgorithmSelect(e.target.value)}>
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