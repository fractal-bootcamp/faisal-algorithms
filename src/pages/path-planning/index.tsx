import PathPlanning from "../components/pathPlanning";

const PathPlanningPage = () => {
    return (
        <div className="min-h-screen p-8 bg-gray-50">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
                Path Planning
            </h1>
            <PathPlanning />
        </div>
    )
}

export default PathPlanningPage