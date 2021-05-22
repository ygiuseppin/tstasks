import React, {Component} from 'react';
import Login from "./components/login"
import SingUp from "./components/singUp"

class Agenda extends Component {
  
  constructor(){
    super();
    this.state= {
      usuarioConectado: false,
    }
  }
  
  render(){
    return (
      <div >
        {(!this.state.usuarioConectado) ? <div>
                                 <Login usu />
                                 <SingUp />
                               </div>
      :<h2>Welcome!!!</h2>}
      
      </div>
    );
  }
}

export default Agenda;
