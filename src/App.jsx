import { useContext, useState, createContext, useEffect } from 'react'
import './App.css'
import CanvasHolder from './components/containers/CanvasHolder'
import Pen from './components/drawers/Pen'
import DrawTools from './utils/DrawTools'
import { DrawStateContext } from './utils/Context'
import Shapes from './components/drawers/Shapes'
import Liner from './components/drawers/Liner'
import ToolBar from './components/containers/ToolBar'

function App() {

  const [drawState, setDrawState] = useState(DrawTools.select);

  return (
    <DrawStateContext.Provider value={drawState}>

      <ToolBar setDrawState={setDrawState}/>

      <CanvasHolder>

        {drawState === DrawTools.pen && <Pen/>}
        {drawState === DrawTools.shapes && <Shapes/>}
        {drawState === DrawTools.liner && <Liner/>}

      </CanvasHolder>
      
    </DrawStateContext.Provider>
  )
}

export default App
