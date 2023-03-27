import "./style.css";

import LoginForm from "../../components/login/LoginForm";
import Footer from "../../components/login/Footer";
export default function Login() {
  return (
    <div className="login">
      <div className="login_wrapper">
        <LoginForm></LoginForm>
        <div className="register"></div>
        <Footer></Footer>
      </div>
    </div>
  );
}
