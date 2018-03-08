import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(){
    super();
    this.state={name:'',club:[]
    };
  }
  click(){
    this.setState({name: this.refs.name.value})
  }
  searching(){
    const search=this.state.name;
    axios.get('https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?t='+search)
    .then((getdata)=>{
      console.log(getdata.data.player);
      this.setState({
        club:getdata.data.player,
      })
    })
  };
  render() {
    const data = this.state.club.map((item, index)=>{
      var name = item.strPlayer;
      var pos = item.strPosition;
      var pic = item.strThumb;
      var dsc = item.strDescriptionEN;
      return <div className="row">
                  <div className="col-xs-12 col-lg-12">
                      <div className="panel panel-primary">
                          <div className="panel-heading">
                              <h4><b>{name} ({pos})</b></h4>
                          </div>
                              <div className="panel-body">
                                  <div className="col-lg-4">
                                      <img src={pic} alt="ok"/>
                                    </div>
                                        <div className="col-lg-8">
                                            <p>{dsc}</p>
                                        </div>
                              </div>
                      </div>
                  </div>
              </div>
    })
    return (
      <div>
        <div className="container">
           <center>
              <h1>Daftar Pemain {this.state.name}</h1>
                  <div className="row">
                      <div className="col-md-6">
                          <input className="form-control" ref="name" type="text" style={{width:'550px'}} onInput={()=>{this.click();}}/>
                      </div>
                      <div className="col-md-4">
                          <button type="submit" className="btn btn-success btn-block" style={{width:'250px'}} onClick={()=>{this.searching();}}>Search</button>
                      </div>
                  </div>
            </center>
              <br/>
              {data} 
        </div>
      </div>
    );
  }
}

export default App;
