import React, { createRef, useEffect, useRef } from "react"
import { Link } from "gatsby"
import { useQueryParam, StringParam } from "use-query-params"
import { useCollection, useDoc } from "../firebase"

const Result = () => {
  const [task, setTask] = useQueryParam("task", StringParam)
  const { data } = useDoc(`track/${task}`)
  const canvasRef = createRef(null)
  let { data: points } = useCollection(`track/${task}/points`)
  useEffect(() => {
    let canvas = canvasRef.current
    var context = canvas.getContext("2d")
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    canvas.style.background=`url(${data.picture})`
    canvas.style.backgroundRepeat=`no-repeat`
    context.fillStyle = "#03fc17"
    context.shadowBlur = 8
    context.shadowColor = "#f5d142"
    points.map(({ x, y }) => {
      context.fillRect(x, y, 5, 5)
    })
  }, [data, points])
  return <canvas ref={canvasRef}></canvas>
}

export default Result
