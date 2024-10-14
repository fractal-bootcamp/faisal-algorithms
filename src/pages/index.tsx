import Link from "next/link"

const Home = () => {
    return (
        <div>
            <h1>
                Algorithm Visualization
            </h1>
            <ul>
                <li><Link href="/search">
                    Search Algorithms
                </Link></li>
                <li><Link href="/sort">
                    Sort Algorithms
                </Link></li>
                <li><Link href="/path-planning">
                    Path Planning
                </Link></li>
            </ul>
        </div>
    )
}

export default Home