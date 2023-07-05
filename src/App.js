import React, { useState } from "react";
import "./index.scss";

const Modal = ({ open, setOpen }) => (
  <div className={`overlay animated ${open ? "show" : ""}`}>
    <div className="modal">
      <svg
        onClick={() => setOpen(false)}
        height="200"
        viewBox="0 0 200 200"
        width="200"
      >
        <title />
        <path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z" />
      </svg>
      <img
        alt="hello img"
        src="https://media.giphy.com/media/XO8RMtRaK73isIt0i2/giphy.gif"
      />
    </div>
  </div>
);

function App() {
  const [open, setOpen] = useState(false);
  return (
    <div className="App">
      <button onClick={() => setOpen(true)} className="open-modal-btn">
        ✨ Открыть окно
      </button>

      {/* //*-----в отдельном компоненте---//*/}
      {open && <Modal open={open} setOpen={setOpen} />}

      {/* //*-----прикрутили анимацию с помощью добавления класса show---//
     
      <div className={`overlay animated ${open? "show" : ""}`}>
        <div className="modal">
          <svg onClick = {()=> setOpen(false)} height="200" viewBox="0 0 200 200" width="200">
            <title />
            <path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z" />
          </svg>
          <img alt = "hello img" src="https://media.giphy.com/media/XO8RMtRaK73isIt0i2/giphy.gif" />
        </div>
      </div>
//*-----------------------------------------------------------------// */}

      {/* //*-----простой способ - условный рендер, его минус - нельзя прикрутить анимацию---//
{open && (<div className="overlay">
        <div className="modal">
          <svg onClick={()=>setOpen(false)} height="200" viewBox="0 0 200 200" width="200">
            <title />
            <path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z" />
          </svg>
          <img alt = "hello img" src="https://media.giphy.com/media/XO8RMtRaK73isIt0i2/giphy.gif" />
        </div>
      </div>)}
//*-----------------------------------------------------------------// */}
    </div>
  );
}

export default App;
