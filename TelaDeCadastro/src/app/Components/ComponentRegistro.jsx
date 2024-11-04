import { React } from "react";
import { Link } from "react-router-dom";

import "../styles/StylesRegistro.css";

function ComponentRegistro() {
    return(
        <div>
            <h2 className="register-title">
            Criar uma conta
            </h2>
            <p className="register-subtitle">
                Crie uma conta para continuar
            </p>
            <form>
                <div className="register-forms">
                    <p className="register-p">Endereço de email</p>
                    <input 
                    className="email-input"
                    type="email"
                    pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                    title="Invalid email address"
                    placeholder="esteban_schiller@gmail.com"
                    required
                    />
                </div>
                <div className="register-forms">
                    <p className="register-p">Nome de usuário</p>
                    <input 
                    className="username-input"
                    type="text" 
                    minLength="8"
                    placeholder="Nome de usuário"
                    required
                     />
                </div>
                <div className="register-forms">
                    <p className="register-p">Senha</p>
                    <input 
                    className="password-input"
                    type="password"
                    minLength="8"
                    required
                     />
                </div>
                <div className="register-checkbox">
                    <input type="checkbox" />
                    <label className="terms" htmlFor="accept">
                    Aceito os termos e condições
                    </label>
                </div>
                <button className="register-button" type="submit">
                Entrar
                </button>
                </form>
                <p className="register-text">
                já tem uma conta? {" "} 
                <Link to={"/"} className="register-login" href="#">
                Entrar
                </Link>
                </p>
        </div>
    );
}

export default ComponentRegistro;