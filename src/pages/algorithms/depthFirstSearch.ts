interface DFSNodeStep {
    node: number // node currently being visited
    visited: number[] // list of nodes visited 
}

// implementation for graph traversal to record each step
export const depthFirstSearch = (
    graph: number[][], // graph represewnted as an adjancency list
    start: number, // starting node for the DFS
    target: number, // target node to search for
): DFSNodeStep[] => {
    const steps: DFSNodeStep[] = [] // empty array to hold the steps of the algo
    const visited: boolean[] = new Array(graph.length).fill(false) // track visited nodes

    // helper function
    function dfs(node: number) {
        if (visited[node]) return; // if the node has already been visited, return early
        visited[node] = true; // mark the node as visited

        // record current step
        const currentStep: DFSNodeStep = {
            node, // current node being visited
            visited: visited.map((v, i) => (v ? i : -1)).filter(i => i !== -1) // record visited nodes
        }

        // push current step to the steps array for visualization
        steps.push(currentStep)

        // if the target node is found, exit early
        if (node === target) return

        // recursively visit all unvisited neighbors
        for (let neighbor of graph[node]) {
            if (!visited[neighbor]) {
                dfs(neighbor)
            }
        }
    }
    dfs(start) // start dfs from the starting node
    return steps // return list of stepsn recorded
}