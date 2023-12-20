import logo from "./logo.svg"
import WheelOfFortune from "./wheelOfFortune"
import "./app.css"
import { useEffect } from "react"

const tele = window.Telegram.WebApp

function App() {
    useEffect(() => {
        tele.ready()

        console.log(tele.initData)
    })
    return (
        <div>
            <WheelOfFortune />
        </div>
    )
}

export default App
