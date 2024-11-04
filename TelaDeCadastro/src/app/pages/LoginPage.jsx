import { React } from "react";

import ComponentLogin from "../Components/ComponentLogin.jsx"
import "../styles/StylesLogin.css";

function LoginPage() {
  return (
    <>
      <div className="login-container">
       <ComponentLogin/>
      </div>
    </>
  );
}

export default LoginPage;
