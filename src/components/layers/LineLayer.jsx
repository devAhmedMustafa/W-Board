import { useRef, useState, useEffect, useContext } from "react";
import Line from "../../utils/drawObjects/Line";
import { SetDrawStateContext, DrawStateContext } from "../../utils/Context";
import DrawTools from "../../utils/DrawTools";
import { LayersContext, SetLayersContext } from "../../utils/Context";
import SelectBox from "../over_layers/SelectBox";
import Styles from "../../utils/Styles";

export default function LineLayer({layer, idx}){

    const setDrawState = useContext(SetDrawStateContext);
    const drawState = useContext(DrawStateContext);
    const [layers, setLayers] = [useContext(LayersContext), useContext(SetLayersContext)];

    const mainRef = useRef();
    const canvRef = useRef();
    const optionsRef = useRef();

    const [position, setPosition] = useState(layer.position);
    
    const [points, setPoints] = useState({
        xo: Math.max(0, layer.xo-layer.x),
        yo: Math.max(0, layer.yo-layer.y),
        x: Math.max(0, layer.x - layer.xo),
        y: Math.max(0, layer.y - layer.yo),
    });

    const [thickness, setThickness] = useState(layer.thick);
    const [color, setColor] = useState(layer.color);

    const [selected, setSelected] = useState(false);

    useEffect(()=>{
        setDrawState(DrawTools.select)
        drawLine();
    }, [])

    function drawLine(){

        const canvas = canvRef.current;

        let width = Math.abs(points.x - points.xo);
        let height = Math.abs(points.y - points.yo);
        
        Styles.moveElement(mainRef.current, position)
        
        canvas.width = width;
        canvas.height = height;
        canvas.style.zIndex = 30;

        const ctx = canvas.getContext('2d');

        const lineDim = {
            xo: points.xo,
            yo: points.yo,
            x: points.x,
            y: points.y,
        };
        
        const line = new Line({...lineDim, thick: thickness, color: color});

        line.draw(ctx);

    }

    useEffect(()=>{

        drawLine()

        let layersItems = [...layers];
        let layerItem = {...layers[idx]};
        layerItem.xo = points.xo;
        layerItem.yo = points.yo;
        layerItem.x = points.x;
        layerItem.y = points.y;
        layerItem.thick = thickness;
        layerItem.color = color;
        layerItem.position = position;

        layersItems[idx] = layerItem;
        setLayers(layersItems);
    }, [position, points, color, thickness])
    // Update cursor

    useEffect(()=>{
        if (drawState == DrawTools.select){
            Styles.setCursor(canvRef.current, 'move');
        }
        else{
            Styles.setCursor(canvRef.current, 'none');
        }

    }, [drawState])

    // Stroke Settings
    const strokeSliderRef = useRef()
    useEffect(()=>{
        strokeSliderRef.current?.style.setProperty('--thumb-color', color)
    }, [color])

    // Add Listeners
    useEffect(()=>{

        let canDrag = false;
        const offset = {x: undefined, y: undefined}
        const mouse = {}
        let pos = Styles.getPosition(mainRef.current);

        const moveCanvas = (e)=>{

            mouse.x = e.clientX;
            mouse.y = e.clientY;

            if (canDrag){

                setPosition({
                    x: mouse.x + (pos.x - offset.x),
                    y: mouse.y + (pos.y - offset.y)
                })

                // Styles.moveElement(mainRef.current, {
                //     x: mouse.x + (pos.x - offset.x),
                //     y: mouse.y + (pos.y - offset.y)
                // });
            }
        }

        const enableDragging = ()=>{
            if (!selected) return;

            const pad = {x: 20, y: 20};

            const dimenstions = Styles.getDimensions(canvRef.current);
            pos = Styles.getPosition(mainRef.current);
            
            if (
                mouse.x > pos.x+pad.x && mouse.x < dimenstions.width + pos.x -pad.x &&
                mouse.y > pos.y+pad.y && mouse.y < dimenstions.height + pos.y - pad.y
            ){
                canDrag = true;
                offset.x = mouse.x;
                offset.y = mouse.y;
            }
            
        }
        const disableDraggin = ()=>{
            if (!selected) return;
            canDrag = false;
        }

        addEventListener('mousemove', moveCanvas);
        addEventListener('mousedown', enableDragging)
        addEventListener('mouseup', disableDraggin)
        addEventListener('click', (e)=>{
            if (e.target.tagName == 'CANVAS' && e.target != canvRef.current){
                setSelected(false)
            }
        })

        return ()=>{
            removeEventListener('mousemove', moveCanvas);
            removeEventListener('mousedown', enableDragging)
            removeEventListener('mouseup', disableDraggin)

        }

    }, [selected])

    return (
        <div ref={mainRef} className="absolute z-20">

            <canvas ref={canvRef} onClick={()=> setSelected(true)} className="absolute z-20"></canvas>

            {
                selected &&

                <>
                    <div ref={optionsRef} className="flex items-center absolute -top-20 w-fit origin-center z-10 p-4 rounded-md bg-white">

                        <div className="flex gap-2 border-r-[1px] px-3">
                            <label className="fill-color-in" htmlFor="fill-color"></label>
                            <input id="fill-color" type="color" onChange={(e)=>setColor(e.target.value)}/>
                        </div>

                        <div className="flex gap-3 px-3 items-center border-r-[1px] ">
                            <input id="thickness" type="range" min="0" max="20" step="1"
                            onChange={(e)=>setThickness(e.target.value)} value={thickness} ref={strokeSliderRef}/>
                            <label className="thickness-in selection:bg-none" htmlFor="thickness">{thickness}px</label>
                        </div>
                    </div>

                    {/* <SelectBox aspects={{
                        w: endPoint.w,
                        h: endPoint.h,
                        x: 0,
                        y: 0,
                    }}
                    setPosition={setPosition}
                    /> */}
                </>
            }


        </div>
    )
}