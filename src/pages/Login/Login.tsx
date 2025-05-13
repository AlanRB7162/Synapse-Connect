// pages/Login.tsx

import { useState, useRef, useEffect } from "react";
import './Login.css'

export function Login(){
    return (
     <div className="container" id="container">
        <div className="form-container sign-up">
            <form>
                <h1>Criar Conta</h1>
                <div className="social-icons">
                    <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
                    <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
                    <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
                    <a href="#" className="icon"><i className="fa-brands fa-linkedin"></i></a>
                </div>
                <span>ou use seu e-mail para cadastro</span>
                <div className="inputstxt">
                    <i className="fa-solid fa-address-card"></i>
                    <input required type="text" id="txtNome" placeholder=""/>
                    <label htmlFor="nome">Nome</label>
                </div>
                <div className="inputstxt">
                    <i className="fa-solid fa-user"></i>
                    <input required type="text" id="txtUsuario" placeholder=""/>
                    <label htmlFor="usuario">Usuario</label>
                </div>
                <div className="inputstxt">
                    <i className="fa-solid fa-at"></i>
                    <input required type="email" id="txtEmailUp" placeholder=""/>
                    <label htmlFor="email">E-mail</label>
                </div>
                <div className="inputstxt">
                    <i className="fa-solid fa-key"></i>
                    <input required type="password" id="txtSenhaUp" placeholder=""/>
                    <label htmlFor="senha">Senha</label>
                    <span>
                        <i className="fa-solid fa-eye" id="tpEyeUp"></i>
                    </span>
                </div>
                <button>Registre-se</button>
            </form>
        </div>

        <div className="form-container sign-in">
            <form>
                <h1>Entrar</h1>
                <div className="social-icons">
                    <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
                    <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
                    <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
                    <a href="#" className="icon"><i className="fa-brands fa-linkedin"></i></a>
                </div>
                <span>ou use seu e-mail e senha</span>
                <div className="inputstxt">
                    <i className="fa-solid fa-at"></i>
                    <input required type="email" id="txtEmailIn" placeholder=""/>
                    <label htmlFor="email">E-mail</label>
                </div>
                <div className="inputstxt">
                    <i className="fa-solid fa-key"></i>
                    <input required type="password" id="txtSenhaIn" placeholder=""/>
                    <label htmlFor="senha">Senha</label>
                    <span>
                        <i className="fa-solid fa-eye" id="tpEyeIn"></i>
                    </span>
                </div>
                <a href="#">Esqueceu sua senha?</a>
                <button>Entrar</button>
            </form>
        </div>

        <div className="toggle-container">
            <div className="toggle">
                <div className="toggle-panel toggle-left">
                    <h1>Seja bem-vindo!</h1>
                    <p>Crie sua conta agora mesmo e tenha acesso ao conhecimento!</p>
                    <p>Já possui uma conta?<br/>Entre agora mesmo!</p>
                    <button className="cssbuttons-io-button" id="login">
                        Entrar
                        <div className="icon">
                          <svg
                            height="24"
                            width="24"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M0 0h24v24H0z" fill="none"></path>
                            <path
                              d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </div>
                      </button> 
                      <p>Um clique para começar seu futuro!</p>    
                </div>
                <div className="toggle-panel toggle-right">
                    <h1>Bem-vindo de volta!</h1>
                    <p>Acesse sua conta para utilizar todos os recursos do site</p>
                    <p>Ainda não possui uma conta?<br/>Cadastre-se agora mesmo!</p>
                    <button className="cssbuttons-io-button" id="register">
                        Cadastrar-se
                        <div className="icon">
                          <svg
                            height="24"
                            width="24"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M0 0h24v24H0z" fill="none"></path>
                            <path
                              d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </div>
                      </button>
                      <p>Um clique para começar seu futuro!</p>
                </div>
            </div>
        </div>
    </div>
    );
}


