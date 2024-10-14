const PathPlanning = () => {
    // logic for Dijkstra visualization
    const algorithmInfo = {
        description: `Dijkstra's Algorithm is used to find the shortest path from a starting 
            node to all other nodes in a weighted graph with non-negative weights. It uses a 
            priority queue to explore the nearest nodes first.`,
        timeComplexity: "0(V^2) (or 0(V + E log V) with a priority queue",
        spaceComplexity: "0(V)",
    }

    const selectedAlgo = algorithmInfo

    return (
        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Dijkstra's Algorithm
            </h2>
            <div>
                <div className="space-y-2">
                    <p className="font-semibold text-gray-700">
                        Description:
                    </p>
                    <p className="text-gray-600">
                        {selectedAlgo.description}
                    </p>
                    <p className="font-semibold text-gray-700">
                        Time Complexity:
                    </p>
                    <p className="text-gray-600">
                        {selectedAlgo.timeComplexity}
                    </p>
                    <p className="font-semibold text-gray-700">
                        Space Complexity:
                    </p>
                    <p className="text-gray-600">
                        {selectedAlgo.spaceComplexity}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PathPlanning