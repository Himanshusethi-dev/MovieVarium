import './switchTabs.css'
import { useState } from 'react'

const SwitchTabs = ({ data,onTabChange }) => {

  const [selectedTab,setSelectedTab] = useState(0);
  const [bgLayerPosition,setBgLayerPosition] = useState(10);

  const changeTab = (tab,index)=>{

    console.log(tab,index)
    setBgLayerPosition((index * 100) + 10 )
    setSelectedTab(index)

    onTabChange(tab)

  }
  return (
    <div className="switchTabs">

      <div className="tabsItems">

          {
            data.map((tab,index) =>(

                <span key={index} className={`tabItem ${   selectedTab === index ? "active" : ""   }  `} onClick={()=>changeTab(tab,index)}>
                  { tab }
                </span>

            ))
          }
          <span  className='bgLayer' style={{ left :`${bgLayerPosition}px`}}></span>

        

      </div>
      
    </div>
  )
}

export default SwitchTabs