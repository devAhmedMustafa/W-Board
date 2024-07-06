import { useEffect, useState } from "react"
import RectLayer from "./RectLayer"
import LineLayer from "./LineLayer"
import { LayersContext, SetLayersContext } from "../../utils/Context"
import RectData from "../../utils/CanvasData/RectData.js"
import LineData from "../../utils/CanvasData/LineData.js"
import BrushData from "../../utils/CanvasData/BrushData.js"
import HandWriteLayer from "./HandWriteLayer.jsx"

export default function DrawLayer({children}){

    const [layers, setLayers] = useState([])

    useEffect(()=>{
        if (localStorage['layers']){
            setLayers(JSON.parse(localStorage['layers']))
        }
    }, [])

    useEffect(()=>{
        localStorage['layers'] = JSON.stringify(layers)
    }, [layers])


    return (
        <SetLayersContext.Provider value={setLayers}>

            <div className="draw-layer">
                {children}

                <LayersContext.Provider value={layers}>

                {
                    layers.map((l, id)=> { 
                        if (l.type == RectData.type) return <RectLayer idx={id} key={id} layer={l} />
                        if (l.type == LineData.type) return <LineLayer idx={id} key={id} layer={l}/>
                        if (l.type == BrushData.type) return <HandWriteLayer idx={id} key={id} layer={l}/>
                    }
                    )
                }
                </LayersContext.Provider>
            </div>

        </SetLayersContext.Provider>
    )
}