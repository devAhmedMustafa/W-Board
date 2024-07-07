import { useRef, useState, useEffect, useContext } from "react";
import Styles from "../../utils/Styles";
import DrawTools from "../../utils/DrawTools";
import { DrawStateContext, LayersContext, SetDrawStateContext, SetLayersContext } from "../../utils/Context";
import "@styles/Sliders.css"
import Brush from "../../utils/drawObjects/Brush";

export default function HandWriteLayer({layer, idx}){

    const setDrawState = useContext(SetDrawStateContext);
    const drawState = useContext(DrawStateContext);
    const [layers, setLayers] = [useContext(LayersContext), useContext(SetLayersContext)];

    const mainRef = useRef();
    const canvRef = useRef();
    const optionsRef = useRef();

    const [position, setPosition] = useState(layer.min);
    const staticPosition = layer.staticPosition?layer.staticPosition:position;
    
    const [size, setSize] = useState({
        w: layer.max.x - layer.min.x,
        h: layer.max.y - layer.min.y
    });

    const [thickness, setThickness] = useState(layer.thick);
    const [color, setColor] = useState(layer.color);

    const [selected, setSelected] = useState(false);

    // Initialize
    useEffect(()=>{
        setDrawState(DrawTools.select);
        drawRect()
    }, [])

    useEffect(()=>{

        drawRect()

        let layersItems = [...layers];
        let layerItem = {...layers[idx]};
        layerItem.thick = thickness;
        layerItem.color = color;
        layerItem.min = position;
        layerItem.max = {...position, x: position.x + size.w, y: position.y + size.h};
        layerItem.staticPosition = staticPosition; 

        layersItems[idx] = layerItem;
        setLayers(layersItems);

    }, [position, size, color, thickness])
    
    // Update cursor
    useEffect(()=>{
        if (drawState == DrawTools.select){
            Styles.setCursor(canvRef.current, 'move');
        }
        else{
            Styles.setCursor(canvRef.current, 'none');
        }

    }, [drawState])

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

    function drawRect(){
        
        const canvas = canvRef.current;
        const main = mainRef.current;
        
        Styles.moveElement(main, position);
        
        canvas.width = size.w;
        canvas.height = size.h;
        canvas.style.zIndex = 30;

        const ctx = canvas.getContext('2d');

        const brush = new Brush({thick: thickness, color: color, shift: staticPosition})
        brush.start(ctx, layer.xo, layer.yo);
        brush.x = layer.x;
        brush.y = layer.y;

        brush.drawOnce(ctx);
    }

    const strokeSliderRef = useRef()
    useEffect(()=>{
        strokeSliderRef.current?.style.setProperty('--thumb-color', color)
    }, [color])

    return (
        <div ref={mainRef} className="absolute z-20">

            <canvas ref={canvRef} onClick={()=> setSelected(true)} className="absolute z-20"></canvas>

            {
                selected &&

                <>
                    <div ref={optionsRef} className="flex items-center absolute -top-20 w-fit origin-center z-10 p-4 rounded-md bg-white">

                        <div className="flex gap-2 border-r-[1px] pr-3">
                            <label className="fill-color-in" htmlFor="fill-color"></label>
                            <input id="fill-color" type="color" onChange={(e)=>setColor(e.target.value)}/>
                        </div>

                        <div className="flex gap-3 px-3 items-center ">
                            <input id="thickness" type="range" min="0" max="20" step="1"
                            onChange={(e)=>setThickness(e.target.value)} value={thickness} ref={strokeSliderRef}/>
                            <label className="thickness-in selection:bg-none" htmlFor="thickness">{thickness}px</label>
                        </div>
                    </div>
                </>
            }


        </div>
    )
}