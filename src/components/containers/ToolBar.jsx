import { useContext, useEffect, useRef } from "react"
import "./ToolBar.css"
import { DrawStateContext } from "../../utils/Context"
import ColorIndexes from "../../utils/ColorIndexes";

export default function ToolBar({setDrawState}){

    const listRef = useRef()

    const drawState = useContext(DrawStateContext);

    useEffect(()=>{
        const list = listRef.current;

        const toolSelected = list.children[drawState];

        for (let i = 0; i < list.children.length; i++){

            if (i == drawState) continue;

            list.children[i].classList.remove('activated-tool')
            list.children[i].style.backgroundColor = "transparent";
        }

        toolSelected.style.backgroundColor = ColorIndexes[drawState];
        toolSelected.classList.add('activated-tool')        

    }, [drawState])

    useEffect(()=>{
        const childs = listRef.current.children;
        for (let i = 0; i < childs.length; i++){
            childs[i].addEventListener('click', ()=>{
                setDrawState(i);
            })
        }
    }, [])

    return (
        <div className="fixed px-4 py-2 cursor-default z-[100] bg-white rounded-full w-fit border-2 top-2 right-2">
            <ul ref={listRef} className="tools-list flex text-xl text-gray-800 gap-4">
                <li><i className="fa-solid fa-arrow-pointer"></i></li>
                <li><i className="fa-solid fa-pen"></i></li>
                <li><i className="fa-solid fa-shapes"></i></li>
                <li><i className="fa-solid fa-arrow-turn-up"></i></li>
            </ul>
        </div>
    )
}