import Link from "next/link"

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-100">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">
                Algorithm Visualization
            </h1>
            <ul className="flex flex-row">
                <li>
                    <Link href="/search" className="text-lg font-semibold text-blue-600 hover:text-blue-800 mr-4">
                        Search Algorithms
                    </Link>
                </li>
                <li>
                    <Link href="/sort" className="text-lg font-semibold text-blue-600 hover:text-blue-800 mr-4">
                        Sort Algorithms
                    </Link>
                </li>
                <li>
                    <Link href="/path-planning" className="text-lg font-semibold text-blue-600 hover:text-blue-800 mr-4">
                        Path Planning
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Home