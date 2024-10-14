import { useEffect } from "react";

interface AlgorithmVisualizerProps {
    algorithm: string
}

const AlgorithmVisualizer: React.FC<AlgorithmVisualizerProps> = ({ algorithm }) => {
    useEffect(() => {
        // logic to animate the selected algo
    }, [algorithm])

    return (
        <div>
            <h2>
                Visualization for {algorithm}
            </h2>
            <div>

            </div>
        </div>
    )
}

export default AlgorithmVisualizer