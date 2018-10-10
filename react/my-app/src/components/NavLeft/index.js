import React from 'react'
import MenuConfig from '../../config/menuConfig.js';
export default class NavLeft extends React.Component{
    render(){
        var style = {
            backgroundColor:'red',
        }
        return (
            <div style={style}>
                This is NavLeft
            </div>
        )
    }
}
