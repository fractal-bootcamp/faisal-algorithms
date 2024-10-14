import { AppProps } from "next/app"
import "../pages/styles/globals.css"

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <Component {...pageProps} />
    )
}

export default MyApp