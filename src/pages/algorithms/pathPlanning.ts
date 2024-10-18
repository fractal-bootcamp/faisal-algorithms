interface DijkstraStep {
    node: number // current node being processed
    distances: number[] // distance from the start node to all other nodes
    visited: boolean[] // boolean array to keep track of the visited nodes
    queue: [number, number][] // priority queue (or min-heap) showing the node and its current distance
    graph: number[][] // adding graph for visualization
}

const defaultGraph = [
    [0, 4, 0, 0, 0, 0, 0, 8, 0],
    [4, 0, 8, 0, 0, 0, 0, 11, 0],
    [0, 8, 0, 7, 0, 4, 0, 0, 2],
    [0, 0, 7, 0, 9, 14, 0, 0, 0],
    [0, 0, 0, 9, 0, 10, 0, 0, 0],
    [0, 0, 4, 14, 10, 0, 2, 0, 0],
    [0, 0, 0, 0, 0, 2, 0, 1, 6],
    [8, 11, 0, 0, 0, 0, 1, 0, 7],
    [0, 0, 2, 0, 0, 0, 6, 7, 0],
]

// implementation to record each step
export const dijkstra = (
    graph: number[][] = defaultGraph,
    start: number = 0
): DijkstraStep[] => {
    const steps: DijkstraStep[] = [] // empty array to hold the steps of the algo
    const n = graph.length // number of nodes in the graph
    const distances: number[] = new Array(n).fill(Infinity) // initialize distances to infinity
    const visited: boolean[] = new Array(n).fill(false) // track visited nodes
    const queue: [number, number][] = [] // min-heal (priority queue) to store [node, distance]

    distances[start] = 0 // distance to the starting node is 0
    queue.push([start, 0]) // add the start node to the queue with distance 0

    // helper function to get the node with the smallest distance from the queue (priority queue)
    const getSmallestNode = (): number | null => {
        if (queue.length === 0) return null
        queue.sort((a, b) => a[1] - b[1]) // sort by distance (second element of the tuple)
        return queue.shift()![0] // remove and return the node with the smallest distance
    }

    // main dijkstra loop: continue while there are node in the queue
    while (queue.length > 0) {
        const node = getSmallestNode() // get the node with the smallest known distance
        if (node === null || visited[node]) continue // skip if the noide is already visited

        visited[node] = true // mark the node as visited

        // loop through all neighbors of the current node
        for (let neighbor = 0; neighbor < n; neighbor++) {
            const weight = graph[node][neighbor] // the weight of the edge from node to neighbor
            if (weight === 0 || visited[neighbor]) continue // skip if there's no edge or the neighbor is already visited

            const newDist = distances[node] + weight // calculate the new distance to the neighbor

            // if the new distance is shorter, update the neighbor's distance
            if (newDist < distances[neighbor]) {
                distances[neighbor] = newDist
                queue.push([neighbor, newDist]) // add the neighbor to the queue with the updated distance
            }
        }

        // record the current step
        steps.push({
            node, // node that was just processed
            distances: [...distances], // current distance array
            visited: [...visited], // visited nodes array
            queue: [...queue], // current state of the priority queue
            graph: [...graph], //current graph
        })
    }
    return steps // return the list of steps recorded
}