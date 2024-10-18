import AlgorithmVisualizer, { Algorithms } from "../components/algoVisualizer";
import { useEffect, useState } from "react";
import { dijkstra } from "../algorithms/pathPlanning";
import { motion } from "framer-motion";

const PathPlanningPage = () => {
    const [selectedAlgo, setSelectedAlgo] = useState<Algorithms>("Dijkstra's Algorithm")
    const [steps, setSteps] = useState<any[]>([])

    useEffect(() => {
        if (selectedAlgo === "Dijkstra's Algorithm") {
            const dijkstraSteps = dijkstra()
            setSteps(dijkstraSteps)
        }
    }, [selectedAlgo])

    const renderDijkstraStep = (step: any) => {
        if (!step || typeof step.node === "undefined") {
            return (
                <div>
                    No data available for rendering.
                </div>
            )
        }

        const getNodeCoordinates = (index: number) => {
            const angle = (2 * Math.PI * index) / step.graph.length // Assuming 9 nodes
            const radius = 150
            const x = Math.cos(angle) * radius + 200
            const y = Math.sin(angle) * radius + 200
            return { x, y }
        }

        return (
            <div className="flex flex-col space-y-4">
                <h3 className="text-xl font-semibold">Current Node: {step.node}</h3>
                <div className="flex space-x-8">

                    <svg width="400" height="400">
                        {step.graph &&
                            step.graph.map((neighbors: number[], node: number) => (
                                neighbors.map((neighbor, index) => (
                                    neighbor !== 0 && (
                                        <motion.line
                                            key={`${node}-${index}`}
                                            x1={getNodeCoordinates(node).x}
                                            y1={getNodeCoordinates(node).y}
                                            x2={getNodeCoordinates(index).x}
                                            y2={getNodeCoordinates(index).y}
                                            stroke="gray"
                                            strokeWidth="2"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.5 }}
                                        />
                                    )
                                ))
                            ))}

                        {step.graph.map((_: any, node: number) => (
                            <motion.circle
                                key={node}
                                cx={getNodeCoordinates(node).x}
                                cy={getNodeCoordinates(node).y}
                                r={20}
                                fill={step.visited[node]
                                    ? "#34d399"
                                    : (step.node === node
                                        ? "#fbbf24"
                                        : "#fff")}
                                stroke="black"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.3 }}
                            />
                        ))}

                        {step.graph.map((_: any, node: number) => (
                            <motion.text
                                key={node}
                                x={getNodeCoordinates(node).x}
                                y={getNodeCoordinates(node).y}
                                textAnchor="middle"
                                alignmentBaseline="middle"
                                fill="black"
                                fontSize="12"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                {node}
                            </motion.text>
                        ))}
                    </svg>

                    <div>
                        <h3 className="text-lg font-semibold">Distances:</h3>
                        <ul className="space-y-2">
                            {step.distances &&
                                step.distances.map((distance: number, index: number) => (
                                    <motion.li
                                        key={index}
                                        className="text-gray-700"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        Node {index}: {distance === Infinity ? "∞" : distance}
                                    </motion.li>
                                ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold">Queue:</h3>
                        <ul className="space-y-2">
                            {step.queue &&
                                step.queue.map(([node, dist]: [number, number], index: number) => (
                                    <motion.li
                                        key={index}
                                        className="text-gray-700"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        Node {node}: {dist}
                                    </motion.li>
                                ))}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen p-8 bg-gray-50">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
                Path Planning
            </h1>

            <AlgorithmVisualizer
                algorithm={selectedAlgo}
                steps={steps}
                renderStep={renderDijkstraStep}
            />
        </div>
    )
}

export default PathPlanningPage