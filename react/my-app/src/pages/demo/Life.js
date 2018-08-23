import React from 'react'
import Child from './Child'
import {Button} from 'antd'
import './index.css'
import 'antd/dist/antd.css'
export default class Life extends React.Component{
  constructor (props) { 
    super (props); 
		this.state = {
			count:0
		}
	}	
	handleAdd=()=>{
		this.setState({
			count:this.state.count+1
		})
	}
	handleAdd1(){
		this.setState({
			count:this.state.count
		})
	}
	
	render(){
		return <div className='content'>
			<Button onClick={this.handleAdd}>点击一下</Button>
			<p>react生命周期介绍</p>
			<button onClick={this.handleAdd}>点击一下</button>
			<p>{this.state.count}</p>
			<Child name={this.state.count}></Child>
		</div>
	}
}