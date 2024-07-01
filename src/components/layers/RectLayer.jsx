import { useRef, useState, useEffect } from "react";
import Rectangular from "../../utils/drawObjects/Rectangular";

export default function RectLayer({position, dimensions, radius}){

    const canvRef = useRef();

    const [thickness, setThickness] = useState(2);
    const [color, setColor] = useState("#000000");

    useEffect(()=>{
        drawRect();
    }, [])

    function drawRect(){

        const canvas = canvRef.current;
        
        canvas.style.top = `${position.y}px`
        canvas.style.left = `${position.x}px`
        canvas.width = Math.abs(dimensions.w);
        canvas.height = Math.abs(dimensions.h);
        canvas.style.zIndex = 10;

        const ctx = canvas.getContext('2d');
        
        const rect = new Rectangular({x: 0,y: 0, width: canvas.width, height: canvas.height, color: color, radii: [radius]});

        rect.draw(ctx);

    }

    return (
        <canvas ref={canvRef} className="absolute z-20 bg-slate-400">

        </canvas>
    )
}