import { useEffect, useRef, useState } from "react"
import Styles from "../../utils/Styles";
import Colors from "../../utils/ColorIndexes";

export default function SelectBox({aspects, setSize, setPosition}){

    const boxRef = useRef();
    const padding = 0;

    const [pointA, setPointA] = useState();
    const [pointB, setPointB] = useState();
    const [pointC, setPointC] = useState();
    const [pointD, setPointD] = useState();


    useEffect(()=>{
        const box = boxRef.current;

        Styles.addBorder(box, {thick: 2, type: "solid", color: Colors.darkBlue})
        Styles.resizeBox(box, {width: aspects.w+padding, height: aspects.h+padding});
        Styles.moveElement(box, {x: aspects.x-padding/2, y: aspects.y-padding/2});
        
    }, [aspects])

    useEffect(()=>{

        if (!pointD) return;

        const absolutePosition = Styles.getGlobalPosition(boxRef.current)
        let x = pointD.x - absolutePosition.x
        let y = pointD.y - absolutePosition.y

        setSize({
            w: x,
            h: y
        })

    }, [pointD])

    useEffect(()=>{
        if (!pointC) return;

        const absolutePosition = Styles.getGlobalPosition(boxRef.current)
        let x = absolutePosition.x+aspects.w - pointC.x
        let y = pointC.y - absolutePosition.y

        setSize({
            w: x,
            h: y
        })

        setPosition({
            x: pointC.x,
            y: absolutePosition.y
        })

    }, [pointC])

    useEffect(()=>{
        if (!pointB) return;

        const absolutePosition = Styles.getGlobalPosition(boxRef.current)
        let y = absolutePosition.y+aspects.h - pointB.y
        let x = pointB.x - absolutePosition.x

        setSize({
            w: x,
            h: y
        })

        setPosition({
            x: absolutePosition.x,
            y: pointB.y
        })
    }, [pointB])

    useEffect(()=>{
        if (!pointA) return;

        const absolutePosition = Styles.getGlobalPosition(boxRef.current)
        let x = absolutePosition.x+aspects.w - pointA.x
        let y = absolutePosition.y+aspects.h - pointA.y

        setSize({
            w: x,
            h: y
        })

        setPosition({
            x: pointA.x,
            y: pointA.y
        })
    }, [pointA])

    return (
        <div ref={boxRef} className="select-box absolute">

            <EdgeSelect x={0} y={0} setPartialAspect={setPointA}/>
            <EdgeSelect x={aspects.w} y={0} setPartialAspect={setPointB}/>
            <EdgeSelect x={aspects.w} y={aspects.h} setPartialAspect={setPointD}/>
            <EdgeSelect x={0} y={aspects.h} setPartialAspect={setPointC}/>

        </div>
    )
}

function EdgeSelect({x, y, setPartialAspect}){

    const ref = useRef()

    useEffect(()=>{
        Styles.moveElement(ref.current, {x: x, y: y})
    }, [x, y])

    useEffect(()=>{
        const dragger = ref.current;

        let canResize = false;

        const handleMouseDown = ()=>{
            canResize = true;
        }

        const handleMouseMove = (e)=>{
            
            if(canResize){
                setPartialAspect({
                    x: e.clientX,
                    y: e.clientY
                })
            }
        }

        const handleMouseUp = ()=>{
            canResize = false;
        }

        dragger.addEventListener('mousedown', handleMouseDown);
        addEventListener('mousemove', handleMouseMove);
        addEventListener('mouseup', handleMouseUp);

        return ()=>{
            dragger.removeEventListener('mousedown', handleMouseDown);
            removeEventListener('mousemove', handleMouseMove);
            removeEventListener('mouseup', handleMouseUp);
        }
    }, [])

    return (
        <div ref={ref} className="absolute z-30 w-3 h-3 border-[1px] border-blue-700 bg-[#3163be5d] rounded-full translate-x-[-50%] translate-y-[-50%] cursor-se-resize">

        </div>

    )
}