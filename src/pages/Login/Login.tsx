//src/pages/Login/Login.tsx

import { Button, Input } from "@chakra-ui/react";
import { useRef, useState } from "react";
import useLoginToggle from "./toggle-script";
import './CSS/Login.css'  
import './CSS/input-style.css'
import './CSS/social-icons-style.css'   
import './CSS/toggle-button-style.css' 
import { loginUser, registerUser } from '../../services/api'  
import { useNavigate } from "react-router-dom";
import { CustomGoogleButton } from "./GoogleLogin";
import { useAuth } from "../../contexts/AuthContext";
import { CustomGithubButton } from "./GithubLogin";
    
const handleRegister = async (e: React.FormEvent, nome: string, email: string, usuario: string, senha: string) => {
    e.preventDefault();
    try {
        await registerUser(nome, email, usuario, senha);
        console.log("User registered successfully", { nome, email, usuario });
    } catch (error) {
        console.error("Error registering user:", error);
    }
}

export function Login(){
    const loginContainerRef = useRef<HTMLDivElement>(null);
    const { handleSignUpClick, handleSignInClick } = useLoginToggle(loginContainerRef);
    const [nome, setNome] = useState("");
    const [usuario, setUsuario] = useState("");
    const [loginInput, setLoginInput] = useState("");
    const [email, setEmail] = useState("");
    const [senhaRegistro, setSenhaRegistro] = useState("");
    const [senhaLogin, setSenhaLogin] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
        const userData = await loginUser(loginInput, senhaLogin);
        console.log("User logged in successfully: ", userData);

        const rawUser = userData.user;

        const user = {
            name: rawUser.nome,
            email: rawUser.email,
            picture: rawUser.picture
        };

        login(user);
    
        navigate("/");
        } catch (error) {
            console.error("Error logging in: ", error);
        }
    };

    return(
        <div className="login-container" ref={loginContainerRef} >
            <div className="form-container sign-up">
                <form>
                    <h1>Criar Conta</h1>
                    <div className="social-icons">
                        <Button id="microsoft-icon-up"><i className="fa-brands fa-microsoft"/></Button>
                        <Button id="github-icon-up"><i className="fa-brands fa-github"/></Button>
                        <Button id="linkedin-icon-up"><i className="fa-brands fa-linkedin"/></Button>
                    </div>    
                    <span>ou use seu e-mail para cadastro</span>
                    <div className="inputstxt">
                        <i className="fa-solid fa-address-card"/>
                        <Input id="inpNome-up" required type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder=""/>
                        <label htmlFor="inpNome-up">Nome</label>
                    </div>
                    <div className="inputstxt">
                        <i className="fa-solid fa-user"/>
                        <Input id="inpUser-up" required type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} placeholder=""/>
                        <label htmlFor="inpUser-up">Usuário</label>
                    </div>
                    <div className="inputstxt">
                        <i className="fa-solid fa-at"/>
                        <Input id="inpEmail-up" required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder=""/>
                        <label htmlFor="inpEmail-up">E-mail</label>
                    </div>
                    <div className="inputstxt">
                        <i className="fa-solid fa-key"/>
                        <Input id="inpSenha-up" required type="password" value={senhaRegistro} onChange={(e) => setSenhaRegistro(e.target.value)} placeholder=""/>
                        <label htmlFor="inpSenha-up">Senha</label>
                        <span>
                            <i className="fa-solid fa-eye" id="tpEyeUp"/>
                        </span>
                    </div>
                    <Button
                        id="btSign-up"
                        className="button"
                        onClick={(e) => handleRegister(e, nome, email, usuario, senhaRegistro)}
                    >
                        Registre-se
                    </Button>
                </form>  
            </div>

            <div className="form-container sign-in">
                <form>
                    <h1>Entrar</h1>
                    <div className="social-icons">
                        <CustomGoogleButton/>
                        <Button id="microsoft-icon-in"><i className="fa-brands fa-microsoft"/></Button>
                        <CustomGithubButton/>
                        <Button id="linkedin-icon-in"><i className="fa-brands fa-linkedin"/></Button>
                    </div>
                    <span>ou use seu e-mail e senha</span>
                    <div className="inputstxt">
                        <i className="fa-solid fa-at"/>
                        <Input id="inpEmail-in" required type="text" placeholder="" value={loginInput} onChange={(e) => setLoginInput(e.target.value)}/>
                        <label htmlFor="inpEmail-in">Usuário/E-mail</label>
                    </div>
                    <div className="inputstxt">
                        <i className="fa-solid fa-key"/>
                        <Input id="inpSenha-in" required type="password" placeholder="" value={senhaLogin} onChange={(e) => setSenhaLogin   (e.target.value)}/>
                        <label htmlFor="inpSenha-in">Senha</label>
                        <span>
                            <i className="fa-solid fa-eye" id="tpEyeIn"/>
                        </span>
                    </div>
                        <Button id="btFgtPass" className="forgot">Esqueceu sua senha?</Button>
                        <Button id="btSign-in" className="button" onClick = {(e) => handleLogin(e)}>Entrar</Button>
                </form>
            </div>

            <div className="toggle-container">
                <div className="toggle">
                    <div className="toggle-panel toggle-left">
                        <h1>Seja bem-vindo</h1>
                        <p className="p1">Crie sua conta agora mesmo e tenha acesso ao conhecimento!</p>
                        <p className="p2">Já possui uma conta?<br/>Entre agora mesmo!</p>
                        <Button className="toggle-button" id="btToggle-in" onClick={handleSignInClick}>
                            ENTRAR
                            <div className="icon">
                                <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor"/>
                                </svg>
                            </div>
                        </Button>
                        <p>Um clique para começar seu futuro!</p>
                    </div>
                    <div className="toggle-panel toggle-right">
                        <h1>Bem-vindo de volta!</h1>
                        <p className="p1">Acesse sua conta para utilizar todos os recursos do site</p>
                        <p className="p2">Ainda não possui uma conta?<br/>Cadastre-se agora mesmo!</p>
                        <Button className="toggle-button" id="btToggle-up" onClick={handleSignUpClick}>
                            CADASTRAR-SE
                            <div className="icon">
                                <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor"/>
                                </svg> 
                            </div>
                        </Button>
                        <p>Um clique para começar seu futuro!</p>
                    </div>
                </div>
            </div>
        </div>
    )
}