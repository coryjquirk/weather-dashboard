import React from 'react';
import './style.css';
import Logotext from './header.png'

export default function Header(){
    return(
    <div class="header">
        <img src={Logotext} alt="header txt"/>
    </div>
    )
}