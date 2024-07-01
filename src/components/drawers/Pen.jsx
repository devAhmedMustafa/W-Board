import { useEffect, useRef, useState } from "react"
import Brush from "../../utils/drawObjects/Brush";
import { MathPhy } from "../../utils/MathPhy";

export default function Pen(){

    const toolRef = useRef()
    const [thickness, setThickness] = useState(2);
    const [color, setColor] = useState("#000000");

    useEffect(()=>{

        const ctx = document.querySelector('#canv').getContext('2d')

        const brush = new Brush(thickness, color);
        
        const tool = toolRef.current;
        let canDraw = false;
        let init = false;
        let prev = {};

        function HandleMouseMove(e){
            const x = e.clientX;
            const y = e.clientY;
            tool.style.left = x + 'px';
            tool.style.top = (y-20) + 'px';

            if (!init){
                brush.start(ctx, x, y);
                prev = {x: x, y: y};
            }
            else{
                if (canDraw){

                    let vf = MathPhy.lerp(prev, {x: x, y: y}, 0.3);

                    brush.draw(ctx, vf.x, vf.y);

                    prev = vf;

                }
            }
        }

        function HandleMouseDown(){
            canDraw = true;
            init = true;
        }
        
        function HandleMouseUp(){
            canDraw = false;
            init = false;
        }

        addEventListener('mousemove', HandleMouseMove)

        addEventListener('mousedown', HandleMouseDown)

        addEventListener('mouseup', HandleMouseUp)

        return ()=>{
            removeEventListener('mousemove', HandleMouseMove);
            removeEventListener('mousedown', HandleMouseDown);
            removeEventListener('mouseup', HandleMouseUp)
        }


    }, []);

    return(
        <div ref={toolRef} className="absolute z-20">
            <i className="fa-solid fa-pen text-xl"></i>
        </div>
    )
}    