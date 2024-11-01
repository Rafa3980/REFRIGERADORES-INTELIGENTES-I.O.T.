import { React } from "react";
import { Link } from "react-router-dom";

import "../styles/StylesLogin.css";

function ComponentLogin() {
  return(
    <div>
      <h2 className="login-title">Entrar na conta</h2>
      <p className="login-text">
      Por favor, digite seu e-mail e senha para continuar
      </p>
      <form>
      <div className="login-forms">
        <p className="login-p">Endereço de email</p>
        <input
        className="login-input"
        type="email"
        pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
        title="Invalid email address"
        placeholder="esteban_schiller@gmail.com"
        required
        />
      </div>
      <div className="login-forms">
        <p className="login-p">Senha</p>
        <p className="login-p">
        <a href="#">Esqueceu a senha?</a>
        </p>
        <input
        className="login-input"
        type="password"
        minLength="8"
        required
         />
      </div>
      <div className="login-checkbox">
        <input type="checkbox" />
        <label className="remember" for="remember">
        Lembrar senha
        </label>
      </div>
        <button className="login-button" type="submit">
        Entrar
        </button>
        </form>
        <p className="login-text">
        Não tem uma conta? {" "}
        <Link to={"/registro"} className="create-button" href="#">
        Criar uma conta
        </Link>
        </p>
      </div>
    );
}

export default ComponentLogin;