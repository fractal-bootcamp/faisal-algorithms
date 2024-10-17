interface BFSNodeStep {
    node: number // node currently being processed
    queue: number[] // queue of nodes to visit
    visited: number[] // list of nodes visited
}

// implementation for graph traversal to record each step
export const breadthFirstSearch = (
    graph: number[][] = [
        [1, 2], // node 0 connects to 1 and 2
        [0, 3], // node 1 connects to 0 and 3
        [0],    // node 2 connects to 0
        [1, 4], // node 3 connects to 1 and 4
        [3],    // node 4 connects to 3
    ], // graph represented as an adjacency list
    start: number = 0, // starting node for the BFS
    target: number = 4, // target node to search for
): BFSNodeStep[] => {
    const steps: BFSNodeStep[] = [] // empty array to hold the steps of the algo
    const queue: number[] = [start] // initialize the queue with the starting node
    const visited: boolean[] = new Array(graph.length).fill(false) // track visited nodes
    visited[start] = true // mark the starting node as visited

    // continue processing nodes while there are still nodes in the queue
    while (queue.length > 0) {
        const node = queue.shift()! // dequeue the next node

        // push current step to the steps array for visualization
        steps.push({
            node, // current node being processed
            queue: [...queue], // copy of the current queue state
            visited: visited.map((v, i) => (v ? i : -1)).filter(i => i !== -1), // record visited nodes
        })

        // if the target node is found, exit the loop
        if (node === target) break

        // visit all the unvisited neighbors
        for (let neighbor of graph[node]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true
                queue.push(neighbor) // enqueuq the neighbor for future processing
            }
        }
    }
    return steps // return list of steps recorded
}