import { useContext, useEffect } from "react"
import { SetDrawStateContext, SetLayersContext } from "../../utils/Context"
import DrawTools from "../../utils/DrawTools";

export default function ClearAll(){

    const setLayer = useContext(SetLayersContext);
    const setDrawState = useContext(SetDrawStateContext);

    useEffect(()=>{
        setLayer([])
        setDrawState(DrawTools.select)
    }, [])

    return(
        <></>
    )
}