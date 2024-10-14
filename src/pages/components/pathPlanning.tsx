
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
        <div>
            <h2>
                Dijkstra's Algorithm
            </h2>
            <div>
                <div>
                    <p>
                        Description:
                    </p>
                    <p>
                        {selectedAlgo.description}
                    </p>
                    <p>
                        Time Complexity:
                    </p>
                    <p>
                        {selectedAlgo.timeComplexity}
                    </p>
                    <p>
                        Space Complexity:
                    </p>
                    <p>
                        {selectedAlgo.spaceComplexity}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PathPlanning