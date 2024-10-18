import { useEffect, useState } from "react";
import SearchAlgorithms from "../components/searchAlgo";
import AlgorithmVisualizer from "../components/algoVisualizer";
import { Algorithms } from "../components/algoVisualizer";
import { linearSearch } from "../algorithms/linearSearch";
import { binarySearch } from "../algorithms/binarySearch";
import { depthFirstSearch } from "../algorithms/depthFirstSearch";
import { breadthFirstSearch } from "../algorithms/breadthFirstSearch";
import { dijkstra } from "../algorithms/pathPlanning";
import { motion } from "framer-motion";

const SearchPage = () => {
    const [selectedAlgo, setSelectedAlgo] = useState<Algorithms>("")
    const [steps, setSteps] = useState<any[]>([])
    const [target, setTarget] = useState<number>(7)
    const [allStacks, setAllStacks] = useState<any[]>([])

    const defaultArray = [1, 3, 5, 7, 9, 11, 13, 15, 17]

    // recalculate steps whenever target or algo changes
    useEffect(() => {
        if (selectedAlgo) {
            // generate steps based on the selected algo
            if (selectedAlgo === "Linear Search") {
                setSteps(linearSearch(defaultArray, target))
            } else if (selectedAlgo === "Binary Search") {
                setSteps(binarySearch(defaultArray, target))
            } else if (selectedAlgo === "Depth-First Search") {
                const dfsSteps = depthFirstSearch() // Call the function to get the steps
                setSteps(dfsSteps)
                setAllStacks(dfsSteps.map((step: any) => step.stack)) // extract stacks for each step
            } else if (selectedAlgo === "Breadth-First Search") {
                const bfsSteps = breadthFirstSearch()
                setSteps(bfsSteps)
            }
        }
    }, [selectedAlgo, target])

    // functions to render each step based on algo selected
    const renderLinearSearchStep = (step: any) => {
        return (
            <div className="flex justify-center space-x-2">
                {step.array.map((value: number, index: number) => (
                    <div
                        key={index}
                        className={`px-6 py-4 border 
                        ${step.found && index === step.currentIndex
                                ? "bg-green-300"
                                : index === step.currentIndex
                                    ? "bg-yellow-300"
                                    : "bg-white"
                            }`}
                    >
                        {value}
                    </div>
                ))}
            </div>
        )
    }

    const renderBinarySearchStep = (step: any) => {
        return (
            <div className="flex flex-col space-y-2">
                {step.arrays.map((array: number[], stepIndex: number) => (
                    <div
                        key={stepIndex}
                        className="flex justify-center space-x-2"
                    >
                        {array.map((value: number, index: number) => (
                            <div
                                key={index}
                                className={`px-6 py-4 border
                                ${stepIndex === step.arrays.length - 1 && index === step.middle
                                        ? step.found
                                            ? "bg-green-300"
                                            : "bg-yellow-300"
                                        : "bg-white"
                                    }`}
                            >
                                {value}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        )
    }

    // function to calculate coordinates of noces in a circle
    const getNodeCoordinates = (index: number, totalNodes: number, radius: number) => {
        const angle = (2 * Math.PI * index) / totalNodes
        const x = Math.cos(angle) * radius + 200 // shift to center
        const y = Math.sin(angle) * radius + 200 // shift to center
        return { x, y }
    }

    // logic for DFS/BFS
    const renderDFSStep = (step: any, allStacks: any[]) => {
        // ensure step.visited and step.node are defined
        if (!step || !step.visited || step.node === undefined || !step.stack || !step.graph) {
            return (
                <div>
                    No data available for rendering.
                </div>
            )
        }

        const totalNodes = 5 // total number of nodes
        const radius = 150 // radius of the circle for nodes

        // node from 0 to maximum node number in the graph
        const nodeCoordinates = Array.from({ length: totalNodes }, (_, index) =>
            getNodeCoordinates(index, totalNodes, radius)
        )

        // color palette to assign unique colors for each line/path
        const pathColors = ["#f87171", "#60a5fa", "#34d399", "#fbbf24", "#a78bfa", "#f472b6"]
        let pathCounter = 0

        return (
            <div className="flex flex-col items-center space-y-4">
                <svg width="400" height="400">
                    {step.graph.map((neighbors: number[], node: number) => {
                        const { x: x1, y: y1 } = nodeCoordinates[node]
                        return neighbors.map((neighbor) => {
                            const { x: x2, y: y2 } = nodeCoordinates[neighbor]
                            const isTraversed =
                                step.visited.includes(node) && step.visited.includes(neighbor) // check if the line has been traversed

                            const strokeColor = isTraversed
                                ? pathColors[pathCounter % pathColors.length]
                                : "gray"
                            pathCounter++ // increment the counter for each line

                            return (
                                <motion.line
                                    key={`${node}-${neighbor}`}
                                    x1={x1}
                                    y1={y1}
                                    x2={x2}
                                    y2={y2}
                                    stroke={strokeColor}
                                    strokeWidth={2}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                />
                            )
                        })
                    })}

                    {nodeCoordinates.map((coords, index) => (
                        <motion.circle
                            key={index}
                            cx={coords.x}
                            cy={coords.y}
                            r={20}
                            fill={
                                step.visited.includes(index)
                                    ? "#86efac" // bg-green-300 equivalent
                                    : index === step.node
                                        ? "fcd34d" // bg-yellow-300 equivalent
                                        : "white"
                            }
                            stroke="black"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 100, damping: 10 }}
                        />
                    ))}

                    {nodeCoordinates.map((coords, index) => (
                        <motion.text
                            key={index}
                            x={coords.x}
                            y={coords.y}
                            textAnchor="middle"
                            alignmentBaseline="middle"
                            fill="black"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            {index}
                        </motion.text>
                    ))}
                </svg>

                <div className="flex flex-col items-center space-y-4">
                    <div className="flex justify-center space-x-8">
                        {allStacks.length > 0 && (
                            <div className="flex flex-col items-center">
                                <div className="text-gray-600 font-semibold mb-2">
                                    Final Stack 1:
                                </div>
                                <div className="flex justify-center space-x-2">
                                    {allStacks[3].map((value: number, index: number) => (
                                        <motion.div
                                            key={index}
                                            className="w-12 h-12 bg-blue-100 border rounded-full flex items-center justify-center"
                                            initial={{ opacity: 0, y: -20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.1 }}
                                        >
                                            {value}
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {allStacks.length > 1 && (
                            <div className="flex flex-col items-center">

                                <div className="text-gray-600 font-semibold mb-2">
                                    Final Stack 2:
                                </div>
                                <div className="flex justify-center space-x-2">
                                    {allStacks[4].map((value: number, index: number) => (
                                        <motion.div
                                            key={index}
                                            className="w-12 h-12 bg-blue-100 border rounded-full flex items-center justify-center"
                                            initial={{ opacity: 0, y: -20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.1 }}
                                        >
                                            {value}
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    const renderBFSStep = (step: any, dequeuedNodes: number[]) => {
        if (!step || !step.visited || step.node === undefined || !step.queue || !step.graph) {
            return (
                <div>
                    No data available for rendering.
                </div>
            )
        }

        const totalNodes = 5 // total number of nodes
        const radius = 150 // radius of the circle for nodes

        // node from 0 to maximum node number in the graph
        const nodeCoordinates = Array.from({ length: totalNodes }, (_, index) =>
            getNodeCoordinates(index, totalNodes, radius)
        )

        // color palette to assign unique colors for each line/path
        const pathColors = ["#f87171", "#60a5fa", "#34d399", "#fbbf24", "#a78bfa", "#f472b6"]
        let pathCounter = 0

        return (
            <div className="flex flex-col items-center space-y-4">
                <svg width="400" height="400">
                    {step.graph.map((neighbors: number[], node: number) => {
                        const { x: x1, y: y1 } = nodeCoordinates[node]
                        return neighbors.map((neighbor) => {
                            const { x: x2, y: y2 } = nodeCoordinates[neighbor]
                            const isTraversed =
                                step.visited.includes(node) && step.visited.includes(neighbor) // check if the line has been traversed

                            const strokeColor = isTraversed
                                ? pathColors[pathCounter % pathColors.length]
                                : "gray"
                            pathCounter++ // increment the counter for each line

                            return (
                                <motion.line
                                    key={`${node}-${neighbor}`}
                                    x1={x1}
                                    y1={y1}
                                    x2={x2}
                                    y2={y2}
                                    stroke={strokeColor}
                                    strokeWidth={2}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                />
                            )
                        })
                    })}

                    {nodeCoordinates.map((coords, index) => (
                        <motion.circle
                            key={index}
                            cx={coords.x}
                            cy={coords.y}
                            r={20}
                            fill={
                                step.visited.includes(index)
                                    ? "#86efac" // bg-green-300 equivalent
                                    : index === step.node
                                        ? "fcd34d" // bg-yellow-300 equivalent
                                        : "white"
                            }
                            stroke="black"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 100, damping: 10 }}
                        />
                    ))}

                    {nodeCoordinates.map((coords, index) => (
                        <motion.text
                            key={index}
                            x={coords.x}
                            y={coords.y}
                            textAnchor="middle"
                            alignmentBaseline="middle"
                            fill="black"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            {index}
                        </motion.text>
                    ))}
                </svg>

                <div className="flex flex-col items-center space-y-4">
                    <div className="flex justify-center space-x-8">
                        <div className="flex flex-col items-center">
                            <div className="text-gray font-semibold mb-2">
                                Queue:
                            </div>
                            <div className="flex justify-center space-x-2">
                                {step.queue.map((value: number, index: number) => (
                                    <motion.div
                                        key={index}
                                        className="w-12 h-12 bg-blue-100 border rounded-full flex items-center justify-center"
                                        initial={{ opacity: 0, x: 100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        {value}
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="text-gray font-semibold mb-2">
                                Porcessed Nodes:
                            </div>
                            <div className="flex justify-center space-x-2">
                                {dequeuedNodes.map((value: number, index: number) => (
                                    <motion.div
                                        key={index}
                                        className="w-12 h-12 bg-green-200 border rounded-full flex items-center justify-center"
                                        initial={{ opacity: 0, x: -100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 100 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        {value}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const renderStep = (step: any) => {
        if (selectedAlgo === "Binary Search") {
            return renderBinarySearchStep(step)
        } else if (selectedAlgo === "Depth-First Search") {
            return renderDFSStep(step, allStacks)
        } else if (selectedAlgo === "Breadth-First Search") {
            return renderBFSStep(step, step.dequeuedNodes)
        } else {
            return renderLinearSearchStep(step)
        }
    }

    return (
        <div className="min-h-screen p-8 bg-gray-50">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
                Search Algorithms
            </h1>
            <SearchAlgorithms
                onAlgorithmSelect={(algo) => setSelectedAlgo(algo)}
            />
            {(selectedAlgo === "Linear Search" || selectedAlgo === "Binary Search") && (
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                        Select Target
                    </label>
                    <select
                        value={target}
                        onChange={(e) => setTarget(Number(e.target.value))}
                        className="block w-full p-2 border boder-gray-300 rounded-md"
                    >
                        {defaultArray.map((num) => (
                            <option key={num} value={num}>
                                {num}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            {selectedAlgo && steps.length > 0 && (
                <div className="mt-8">
                    <AlgorithmVisualizer
                        algorithm={selectedAlgo}
                        steps={steps}
                        renderStep={renderStep}
                        target={target}
                    />
                </div>
            )}
        </div>
    )
}

export default SearchPage