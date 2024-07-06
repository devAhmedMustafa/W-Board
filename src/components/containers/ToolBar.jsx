import { useContext, useEffect, useRef } from "react"
import "./ToolBar.css"
import { DrawStateContext } from "../../utils/Context"
import Colors from "../../utils/ColorIndexes"

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

        toolSelected.style.backgroundColor = Colors.ColorIndexes[drawState];
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
        <div className="flex gap-1 justify-center items-center fixed cursor-default z-[100] top-2 right-2">
            <ul ref={listRef} className="tools-list flex text-xl bg-white rounded-full w-fit border-2 px-2 py-1 text-gray-800 gap-4">
                <li><i className="fa-solid fa-arrow-pointer"></i></li>
                <li><i className="fa-solid fa-pen"></i></li>
                <li><i className="fa-solid fa-shapes"></i></li>
                <li><i className="fa-solid fa-grip-lines-vertical"></i></li>
                <li><i className="fa-solid fa-trash"></i></li>

            </ul>
        </div>
    )
}