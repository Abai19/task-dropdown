import Input from "./Input";
import {useEffect, useState} from "react";

export default function App() {
    const [options, setOptions]= useState();
    const [selectedValue, setSelectedValue] = useState([]);
    useEffect(()=>{
        fetch("http://127.0.0.1:8000/api/categories_json/")
            .then(response => response.json())
            .then(response => setOptions(response.data))
    },[])

    const sendData= ()=>{
       console.log(selectedValue)
    }
  return (
      <>
      <div className="mainBlock">
          {
              options &&
              <Input
                  isMulti
                  selectedValue={selectedValue}
                  setSelectedValue={setSelectedValue}
                  options={options}
              />
          }
            <button className="btnSend" onClick={()=>sendData()}>Отправить</button>
      </div>
    {/*{*/}
    {/*    selectedValue.length>0 &&*/}
    {/*    <div className="infoBlock">*/}
    {/*       <b> Выбранные категории:</b>*/}
    {/*        {*/}
    {/*            selectedValue.map(o => (*/}
    {/*                <div key={o} className="finalData">{o}</div>*/}
    {/*            ))*/}
    {/*        }*/}
    {/*    </div>*/}
    {/*}*/}
      </>
  );
}
