import '../Style/App.css';
import ImagenReact from '../static/undraw_real_time_collaboration_c62i.svg'
import {useState, useEffect, useRef} from 'react'
import Axios from 'axios'

function App() {
  //const [count, setCount] = useState(0);
  const [message, setmessage] = useState([]);
 
  const byId = useRef('linux');

  function CLICKME() {
    
    byId.current.focus();

  }

useEffect(() => {
  fetch('http://localhost:8080/AllData')
    .then((response) => {
      return response.json()
    })
    .then((articulos) => {
      setmessage(articulos)
    })
}, []);

  return (
    <>
      <div className='Contenido'>
        <picture className='Imagen'>  
           <img className='ImagenSVG' src={ImagenReact}  alt="description"/>
        </picture>
        <div className='ContenidoMessage'>
            <h5>
              You can type your message here
            </h5>
            <form>
              <label>
                Message:
                <input type="text" name="name" />
              </label>
              <input type="submit" value="Enviar" />
            </form>
            {message.map(art => {
            return (
              <tr key={art.codigo}>
                <td>{art.MENSAJE}</td>
              </tr>
            );
          })}
          {console.log("mensaje" +message)}
          <input ref={byId} type="text"/>
          <button onClick={CLICKME}>CLIQUEAME</button>
        </div>
      </div>
    </>
  );
}

export default App;
