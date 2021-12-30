
import React, { Component } from 'react'
import Web3 from 'web3'
import logo from './logo.svg';
import './App.css';


class App extends Component {

	state = { account: '',
		  votes: '',
		  contract: '',
		  data: '',
		  web3: '',
		  taskCount: 0,
		  tasks: [],
		  loading: true
	 }
	componentWillMount(){
		this.loadBlockchainData()
	}

	async loadBlockchainData(){
		//const web3 = new Web3(new Web3.providers.HttpProvider("http://ec2-54-184-221-155.us-west-2.compute.amazonaws.com:8545"))
		//const network = await web3.eth.net.getNetworkType()
		//console.log(network)
		//const accounts = await web3.eth.getAccounts()
		//console.log(accounts)
		//this.setState({account: accounts[0]})



		const web3 = new Web3(new Web3.providers.HttpProvider("http://ec2-54-149-209-27.us-west-2.compute.amazonaws.com:8545"))


		this.setState({ web3 : web3 })
		//var account;
		//web3.eth.getAccounts().then((f) => {
 		//	account = f[0];
		//})
		const accounts = await web3.eth.getAccounts()
		console.log("account", accounts[0])
		this.setState({ account: accounts[0] })

		const abi = JSON.parse('[{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]')

		const contract = new web3.eth.Contract(abi);


		this.setState({ data: contract })
		this.setState({ contract: contract })

		// deployed via the web3 console interface...
		//contract.options.address = "0x7Ce283138b1489907Aa6Ba4601Eb08AcdDBA1892";

		contract.options.address = "0x6002249f26F5B0d2213F6A522e43dc6e993aC003";

		//contract.options.address = "0x71789831d83d4C8325b324eA9B5fFB27525480b5";

		const candidates = {"Rama": "candidate-1", "Nick": "candidate-2", "Jose": "candidate-3"}

		contract.methods.totalVotesFor(web3.utils.asciiToHex('Rama')).call(console.log)

		//https://codeburst.io/what-are-three-dots-in-javascript-6f09476b03e1

	//	const taskCount = await contract.methods.taskCount().call()


	//	console.log("taskCount", taskCount)
	
	//	this.setState( {taskCount} )

		// this code pulled a list from the contract..... ( the 'todo' list )

	//	for (var i = 1;i <= taskCount; i++){
			
	//		const task = await contract.methods.tasks(i).call()
	//		this.setState({
	//			tasks: [...this.state.tasks,task]
	//		})
	//}





	}
		
        test(){
		console.log("just a test")
	}

	voteForCandidate(){
		this.test()
		const name =  this.state.web3.utils.asciiToHex('Rama')
		this.state.contract.methods.totalVotesFor(name).call(console.log)
		this.state.data.methods.totalVotesFor(name).call(console.log)
		// this.state.account    ? 
		this.state.data.methods.voteForCandidate(name).send({from: '0xA24B4a82d330Fdc6961d55589E500b70501dEC77'}).then((f) => console.log(f))
		this.state.data.methods.voteForCandidate(name).send({from: this.state.account}).then((f) => console.log(f))




	}





//	<button onClick={() => voteForCandidate()}> vote Again! </button>
render(){
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

<button onClick={() => this.voteForCandidate()}> vote Again! </button>
      </header>
    </div>
  );
}
}
export default App;
