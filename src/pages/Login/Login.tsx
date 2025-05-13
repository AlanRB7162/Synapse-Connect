// pages/Login.tsx

import { useState, useRef, useEffect } from "react";
import './Login.css'

export function Login(){

    const [isActive, setIsActive] = useState(false);
    const [showPasswordUp, setShowPasswordUp] = useState(false);
    const [showPasswordIn, setShowPasswordIn] = useState(false);
    const nomeRef = useRef<HTMLInputElement>(null);
    const usuarioRef = useRef<HTMLInputElement>(null);
    const emailUpRef = useRef<HTMLInputElement>(null);
    const senhaUpRef = useRef<HTMLInputElement>(null);
    const emailInRef = useRef<HTMLInputElement>(null);
    const senhaInRef = useRef<HTMLInputElement>(null);

    const toggleContainer = () => setIsActive(!isActive);
    const togglePasswordUp = () => setShowPasswordUp(!showPasswordUp);
    const togglePasswordIn = () => setShowPasswordIn(!showPasswordIn);

    useEffect(() => {
        const inputs = [nomeRef, usuarioRef, emailUpRef, senhaUpRef, emailInRef, senhaInRef];
    
        inputs.forEach(inputRef => {
          if (!inputRef.current) return;
          const input = inputRef.current;
          const icon = input.closest(".inputstxt")?.querySelector("i") as HTMLElement;
    
          if (icon) {
            input.addEventListener("input", () => {
              icon.style.color = input.value.length > 0 ? "black" : "#919191";
            });
          }
        });
    
        return () => {
          inputs.forEach(inputRef => {
            if (!inputRef.current) return;
            const input = inputRef.current;
            input.removeEventListener("input", () => {});
          });
        };
      }, []);

    function cadastrarUsuario() {
        if (!nomeRef.current?.value) {
            alert("O NOME DEVE SER PREENCHIDO!");
            return;
        }
        if (!usuarioRef.current?.value) {
            alert("O USUÁRIO DEVE SER PREENCHIDO!");
            return;
        }
        if (!emailUpRef.current?.value) {
            alert("O EMAIL DEVE SER PREENCHIDO!");
            return;
        }
        if (!senhaUpRef.current?.value) {
            alert("A SENHA DEVE SER PREENCHIDA!");
            return;
        }
        alert("Usuário cadastrado com sucesso!");
    }

    function logarUsuario() {
        if (!emailInRef.current?.value) {
            alert("O EMAIL DEVE SER PREENCHIDO!");
            return;
        }
        if (!senhaInRef.current?.value) {
            alert("A SENHA DEVE SER PREENCHIDA!");
            return;
        }
        alert("Login realizado com sucesso!");
    }

    return (
        <div className={`container ${isActive ? "active" : ""}`}>
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
                    <input ref={nomeRef} required type="text" id="txtNome" placeholder=""/>
                    <label htmlFor="nome">Nome</label>
                </div>
                <div className="inputstxt">
                    <i className="fa-solid fa-user"></i>
                    <input ref={usuarioRef} required type="text" id="txtUsuario" placeholder=""/>
                    <label htmlFor="usuario">Usuario</label>
                </div>
                <div className="inputstxt">
                    <i className="fa-solid fa-at"></i>
                    <input ref={emailUpRef} required type="email" id="txtEmailUp" placeholder=""/>
                    <label htmlFor="email">E-mail</label>
                </div>
                <div className="inputstxt">
                    <i className="fa-solid fa-key"></i>
                    <input ref={senhaUpRef} required type={showPasswordUp ? "text" : "password"} placeholder=""/>
                    <label htmlFor="senha">Senha</label>
                    <span onClick={togglePasswordUp}>
                        <i className={`fa-solid ${showPasswordUp ? "fa-eye-slash" : "fa-eye"}`}></i>
                    </span>
                </div>
                <button type="button" onClick={cadastrarUsuario}>Registre-se</button>
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
                    <input ref={emailInRef} required type="email" id="txtEmailIn" placeholder=""/>
                    <label htmlFor="email">E-mail</label>
                </div>
                <div className="inputstxt">
                    <i className="fa-solid fa-key"></i>
                    <input ref={senhaInRef} required type={showPasswordIn ? "text" : "password"} placeholder=""/>
                    <label htmlFor="senha">Senha</label>
                    <span onClick={togglePasswordIn}>
                        <i className={`fa-solid ${showPasswordIn ? "fa-eye-slash" : "fa-eye"}`}></i>
                    </span>
                </div>
                <a href="#">Esqueceu sua senha?</a>
                <button type="button" onClick={logarUsuario}>Entrar</button>
            </form>
        </div>

        <div className="toggle-container">
            <div className="toggle">
                <div className="toggle-panel toggle-left">
                    <h1>Seja bem-vindo!</h1>
                    <p id="">Crie sua conta agora mesmo e tenha acesso ao conhecimento!</p>
                    <p id="">Já possui uma conta?<br/>Entre agora mesmo!</p>
                    <button className="cssbuttons-io-button" onClick={toggleContainer} id="login">
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
                    <p id="">Acesse sua conta para utilizar todos os recursos do site</p>
                    <p id="">Ainda não possui uma conta?<br/>Cadastre-se agora mesmo!</p>
                    <button className="cssbuttons-io-button" onClick={toggleContainer} id="register">
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


