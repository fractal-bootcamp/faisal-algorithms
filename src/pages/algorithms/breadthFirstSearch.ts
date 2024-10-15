interface BFSNodeStep {
    node: number // node currently being processed
    queue: number[] // queue of nodes to visit
    visited: number[] // list of nodes visited
}

// implementation for graph traversal to record each step
export const breadthFirstSearch = (
    graph: number[][], // graph represented as an adjacency list
    start: number, // starting node for the BFS
    target: number, // target node to search for
): BFSNodeStep[] => {
    const steps: BFSNodeStep[] = [] // empty array to hold the steps of the algo
    const queue: number[] = [start] // initialize the queue with the starting node
    const visited: boolean[] = new Array(graph.length).fill(false) // track visited nodes
    visited[start] = true // mark the starting node as visited

    // continue processing nodes while there are still nodes in the queue
    while (queue.length > 0) {
        const node = queue.shift()! // dequeue the next node

        // record the current step
        const currentStep: BFSNodeStep = {
            node, // current node being processed
            queue: [...queue], // copy of the current queue state
            visited: visited.map((v, i) => (v ? i : -1)).filter(i => i !== -1), // record visited nodes
        }
        steps.push(currentStep)

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
    return steps // return list of stepsn recorded
}