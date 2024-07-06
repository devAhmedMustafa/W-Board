import { useContext, useEffect, useRef, useState } from "react"
import LineLayer from "../layers/LineLayer";
import Line from "../../utils/drawObjects/Line";
import { LayersContext, SetDrawStateContext, SetLayersContext } from "../../utils/Context";
import LineData from "../../utils/CanvasData/LineData";

export default function Liner(){

    const [layers, setLayers] = [useContext(LayersContext), useContext(SetLayersContext)];

    const toolRef = useRef()
    const [lines, setLines] = useState([])
    const [thickness, setThickness] = useState(2);
    const [color, setColor] = useState("#000000");

    const lineCanvasRef = useRef(); 
    
    useEffect(()=>{

        const lineCanvas = lineCanvasRef.current;
        lineCanvas.width = window.innerWidth;
        lineCanvas.height = window.innerHeight;

        const tool = toolRef.current;
        const mouse = {x: 0, y: 0};
        const start = {x: 0, y: 0};
        let isDrawing = false;

        const ctx = lineCanvas.getContext('2d')

        let line ;

        addEventListener('mousemove', (e)=>{
            
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            tool.style.left = (mouse.x-10) + 'px';
            tool.style.top = (mouse.y-15) + 'px';

            if (isDrawing){
                if (line){
                    ctx.clearRect(0, 0, lineCanvas.width, lineCanvas.height);
                    line.update(ctx, mouse.x, mouse.y);
                }
                
            }
            
        })

        window.addEventListener('mousedown', ()=>{
            
            start.x = mouse.x;
            start.y = mouse.y;
            
            isDrawing = true;
            
            line = new Line({xo: start.x, yo: start.y, x: mouse.x, y: mouse.y, thick: thickness, color: color})

        })

        window.addEventListener('mouseup', ()=>{

            const newLine = new LineData(
                {
                    xo: start.x, yo: start.y, 
                    x: mouse.x, y: mouse.y,
                }
            )
            
            isDrawing = false;
            ctx.clearRect(0, 0, lineCanvas.width, lineCanvas.height);
            
            setLayers((layers) => [...layers, newLine])

        });
    }, [])

    return (
        <div className="z-50">

            {
                lines.map((l, i)=> <LineLayer start={{
                    x: l.xo,
                    y: l.yo,
                }} end={{
                    x: l.x,
                    y: l.y,
                }} key={i}/>)
            }

            <div ref={toolRef} className="absolute z-20">
                <i className="fa-solid fa-plus text-2xl font-thin"></i>
            </div>

            <canvas className="absolute top-0 left-0 z-20" ref={lineCanvasRef}>

            </canvas>
        </div>
    )
}