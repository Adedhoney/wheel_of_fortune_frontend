import React, { useState } from "react"
import wheelConfig from "./wheelConfig"

function WheelOfFortune() {
    const wheelOptions = wheelConfig.wheelOptions
    const wheelProbablility = wheelConfig.wheelProbablility

    const [result, setResult] = useState(["", 0])
    const [showValue, setShowValue] = useState(false)
    const [buttonType, setButtonType] = useState("spin")
    const wheelRef = React.createRef()
    const tele = window.Telegram.WebApp

    const spinWheel = () => {
        setShowValue(false)
        // setSpinning(true)

        const randomIndex = Math.floor(Math.random() * wheelProbablility.length)
        const actualIndex = wheelOptions.indexOf(wheelProbablility[randomIndex])
        const spinResult = wheelOptions[actualIndex]
        setResult([spinResult, actualIndex])
        wheelRef.current.style.transition = "transform 6s ease-in-out"
        wheelRef.current.style.transform = `rotate(
            ${720 + 45 * (8 - actualIndex)}deg
        )`

        // Simulate spinning delay (adjust as needed)
        setTimeout(() => {
            setShowValue(true)
            setButtonType("reset")
            // tele.MainButton.text = "FINISH"

            setTimeout(() => {
                tele.sendData(JSON.stringify({ spinResult }))
            }, 2000)
            // tele.MainButton.onClick(() => {})
            // tele.MainButton.show()
        }, 6000) // Adjust the timeout duration for the spinning animation
    }
    const resetWheel = () => {
        wheelRef.current.style.transition = "transform 0.5s ease-in-out"
        wheelRef.current.style.transform = `rotate(
            0deg
        )`
        setTimeout(() => {
            setButtonType("spin")
        }, 1000)
    }
    let i = 0

    return (
        <div className="container">
            <h1>Wheel of Fortune</h1>
            <div className="wheelContainer">
                {buttonType === "spin" ? (
                    <div className="spinButton" onClick={spinWheel}>
                        spin
                    </div>
                ) : (
                    <div className="spinButton" onClick={resetWheel}>
                        reset
                    </div>
                )}
                <div className="wheel" ref={wheelRef}>
                    {wheelOptions.map((value) => {
                        i = i + 1
                        return (
                            <div
                                className="value"
                                style={{
                                    "--i": i,
                                    "--clr": wheelConfig.wheelColours[i - 1],
                                }}
                            >
                                <span>{value}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="result">
                {
                    <>
                        {
                            <p>
                                You spun:
                                {result[0] && showValue && ` ${result[0]}`}
                            </p>
                        }
                    </>
                }
            </div>
        </div>
    )
}

export default WheelOfFortune
