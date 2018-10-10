import React from 'react'
import { Row, Col } from '../node_modules/antd';
import Header from './components/Header'
import Footer from './components/Footer'
import NavLeft from './components/NavLeft'
import './style/commont.less'
export default class Admin extends React.Component{
    render(){
        return (
            <Row className='container'>
                <Col span='3' className='nav_left'>
                    <NavLeft/>
                </Col>
                <Col span='21' className='main'>
                    <Header/>
                    <Row className='content'>
                        content
                        // {this.props.children}
                    </Row>
                    <Footer/>
                </Col>
            </Row>
        )
    }
}
