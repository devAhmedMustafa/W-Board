import {createContext, createRef, useContext, useEffect, useRef, useState } from "react"
import Particle from "../../utils/drawObjects/Particle";
import DrawTools from "../../utils/DrawTools";
import { DrawStateContext } from "../../utils/Context";

export default function CanvasHolder({children}){

    const drawState = useContext(DrawStateContext)

    const ctxRef = createRef()

    const cellSize = 80;
    const canvasRef = useRef(null);

    const initialization = ()=>{
        const canvas = document.querySelector('#canv');
        const ctx = canvas.getContext('2d');
        ctxRef.current = ctx;
    }

    const resizeCanvas = ()=>{
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
    }

    const drawBackground = ()=>{

        const ctx = ctxRef.current;

        const particleColor = 'gray';
        const particleRadius = 1;
        const cellsCount = Math.round(canvasRef.current.width * canvasRef.current.height / 20);

        const position = {x: 0, y: 0};
        for (let i = 0; i < cellsCount; i++){
            const particle = new Particle(position.x, position.y, particleRadius, particleColor);
            particle.draw(ctx);
            position.x += cellSize;
            if (position.x >= canvasRef.current.width){
                position.x = 50;
                position.y += cellSize;
            }
        }

    }

    useEffect(()=>{

        initialization();

        resizeCanvas();
        drawBackground();
        
        addEventListener('resize', ()=>{
            resizeCanvas();
            drawBackground();
        })

    }, [])

    // Change cursor according to draw state
    useEffect(()=>{
        document.body.style.cursor = drawState === DrawTools.select ? 'default' : 'none';
    }, [drawState])

    return (
        <div id="main-canva" className="canvas-holder">
            <canvas id="canv" ref={canvasRef} className="bg-neutral-100"></canvas>
            {children}
        </div>

    )
}
