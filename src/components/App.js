import React, { Component } from 'react';
import Web3 from 'web3'
//import logo from '../logo.png';
import './App.css';
import SearchDPL from '../abis/SearchDPL.json';
import Navbar from './Navbar'
import Main from './Main'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {

    const web3 = window.web3

    // Load Account

    const accounts = await web3.eth.getAccounts()    
    this.setState({account : accounts[0]}) 
    const networkId = await web3.eth.net.getId()     
    const networkData = SearchDPL.networks[networkId]    
    if (networkData)  {
      const verifydpl = web3.eth.Contract(SearchDPL.abi, networkData.address)            
      this.setState({verifydpl})      
      // const dplCount =await verifydpl.methods.dplCount().call()
              
      // this.setState({dplCount})
      // console.log(dplCount.toNumber())
      
      // for( var i = 1; i <= dplCount; i++) {
      //   console.log(i)
      //   const dpl =await verifydpl.methods.dpls(i).call()
      //   console.log(dpl) 
      //   this.setState({
      //   dpls :[...this.state.dpls, dpl]
      //   })
      // }   
      this.setState({loading : false})      
    } else {
        window.alert('SearchDPL contract not deployed to detected network.')
    }    
    
       
  }

  constructor(props){
    super(props)  
    this.state = {
      account:'',
      dplCount : 0,
      dpls : [],
      loading: true
    }

    this.createDPL= this.createDPL.bind(this)
    this.searchDpl= this.searchDpl.bind(this)
  }

  createDPL(name, country, addr, street, city) {
    this.setState({loading : true})
    this.state.verifydpl.methods.createDPL(name, country, addr, street, city).send({from : this.state.account})
    .once('receipt',(receipt) => {
      this.setState({loading :false})
    })
  }
  searchDpl(name) {
    this.setState({loading : true})
    this.state.verifydpl.methods.searchDpl(name).send({from :this.state.account})    
    .once('receipt',(receipt) => {
      this.setState({loading :false})
    }) 
    
  }
  render() {
    return (
      <div>
        <Navbar account={this.state.account}/>
        <div className ="container-fluid mt-5">
          <div className = "row">
            <main role="main" className="col-lg-12 d-flex">
              {this.state.loading 
                ? <div id="loader" className="text-center"><p className="text-center">Loading... </p> </div>
                : <Main 
                  dpls ={this.state.dpls} 
                  createDPL ={this.createDPL}
                  searchDpl ={this.searchDpl} />
              }              
            </main>
          </div>        
        </div>
      </div>
    );
  }
}

export default App;
