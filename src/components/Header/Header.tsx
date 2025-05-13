// components/Header.tsx

import { Button, Input } from '@chakra-ui/react';
import CircularText from './CircularText.js';
import './Header.css'

export function Header(){
    return(
        <header className="header" >
            <div className="logo" id='logo'>
                <CircularText
                    text="SYNAPSE ♦ CONNECT ♦ "
                    onHover="speedUp"
                    spinDuration={20}
                    className="custom-class"
                />
                <i className="fa-solid fa-brain"></i>
                <div className="header-title">
                    <h2 className="gradient-text">SYNAPSE</h2>
                    <h2 className="gradient-text">CONNECT</h2>
                </div>
            </div>

            <div className="input-pesquisar">
                <i className="fa-solid fa-magnifying-glass"></i>  
                <input required type="text" id="pesquisar"/>
                <label htmlFor="pesquisar">Pesquisar</label>
                <button className="button-x" id='x-pesquisar'>
                    <i className="fa-solid fa-xmark fa-xl"></i>
                </button>
            </div>
        </header>
    );
}