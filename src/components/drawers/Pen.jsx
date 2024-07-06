import { useContext, useEffect, useRef, useState } from "react"
import Brush from "../../utils/drawObjects/Brush";
import { MathPhy } from "../../utils/MathPhy";
import BrushData from "../../utils/CanvasData/BrushData";
import { SetLayersContext } from "../../utils/Context";

export default function Pen(){

    const setLayers = useContext(SetLayersContext);

    const toolRef = useRef()
    const canvaRef = useRef();

    const [thickness, setThickness] = useState(2);
    const [color, setColor] = useState("#000000");

    useEffect(()=>{

        const canvas = canvaRef.current;
        canvas.width = innerWidth;
        canvas.height = innerHeight;

        const ctx = canvas.getContext('2d');

        const brush = new Brush({thick: thickness, color: color});
        let brushData;
        
        const tool = toolRef.current;
        let canDraw = false;
        let init = false;
        let prev = {};
        const mouse = {x: undefined, y: undefined};

        function HandleMouseMove(e){
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            tool.style.left = mouse.x + 'px';
            tool.style.top = (mouse.y-20) + 'px';

            if (!init){
                brush.start(ctx, mouse.x, mouse.y);
                prev = {x: mouse.x, y: mouse.y};
            }
            else{
                if (canDraw){

                    let vf = MathPhy.lerp(prev, {x: mouse.x, y: mouse.y}, 0.3);

                    brushData?.addVertex(vf.x, vf.y);
                    brush.realTimeDraw(ctx, vf.x, vf.y);

                    prev = vf;

                }
            }
        }

        function HandleMouseDown(){
            canDraw = true;
            init = true;
            brushData = new BrushData({thick: thickness, color: color, xo: mouse.x, yo: mouse.y})
        }
        
        function HandleMouseUp(){
            canDraw = false;
            init = false;
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            setLayers((layers)=> [...layers, brushData]);

            console.log(brushData);
            brushData = null;
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
        <div>
            <div ref={toolRef} className="absolute z-20">
                <i className="fa-solid fa-pen text-xl"></i>
            </div>

            <canvas className="absolute top-0 left-0 z-20" ref={canvaRef}></canvas>
        </div>
    )
}    