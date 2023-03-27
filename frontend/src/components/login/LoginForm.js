import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import { useState } from "react";
import LoginInput from "../../components/inputs/loginInput";
import * as Yup from "yup";
//////in code comments
//line 55 start
//enable reinitialize here allows reinitialize email and password variable instead of making new local variable
// within this function, now, it takes them from loginInfos(@ line 18) array
//line 55 ends
//line 56 start
//initialValues maps values within this array to formik inputs
//line 56 ends
//////in code comments end

//declaring loginInfos array to initialize email and password variable which we will use in a state so that we can use them in our Login components
const loginInfos = {
  email: "",
  password: "",
};
//we use liberary Yup to validate our inputs
const loginValidation = Yup.object({
  email: Yup.string()
    .required("Email Required")
    .email("Must be a valid Email")
    .max(100),
  password: Yup.string().required("Password Required"), //this will popup errors if this validation fails, and error div will be defined in the component
});

export default function LoginForm() {
  //here we are delcaring a variable by the name "login" and a method to change it by the name "setLogin" with login's properties being defined
  //by loginInfos os login -> {email, password} also, setLogin("newloginvalues"); can be used like that to change login value
  //useState is the most commonly used react hook, it is used to assign state to variables within component
  const [login, setLogin] = useState(loginInfos);
  //here we are extracting the properties of login to be used in our form and these properties will be reinitialize in our form
  const { email, password } = login;
  const handleLoginChange = (e) => {
    //here we will extract values and name of the property being changed from even.target
    //in name it will store password or email if either of them are changed
    //and in value it will store its new value
    const { name, value } = e.target;

    //after storing the name of the property and its value we will call fucntion setLogin to update the new login information
    // here we are only changing one property of login array so we need to make sure other property does not change
    // thats why we change it this way {....login} ->the property which is not changed will retains its old values
    //while [name] : values only changes the updated part of login array
    setLogin({ ...login, [name]: value });
    console.log(login);
  };
  return (
    <div className="login_wrap">
      <div className="login_1">
        <img src="../../icons/facebook.svg" alt="" />
        <span>
          Facebook helps you connect and share with the people in your life.
        </span>
      </div>
      <div className="login_2">
        <div className="login_2_wrap">
          <Formik
            enableReinitialize
            initialValues={{
              email,
              password,
            }}
            validationSchema={loginValidation}
          >
            {(formik) => (
              <Form>
                <LoginInput
                  type="email"
                  name="email" //formik bind the variable to the input with name field.
                  placeholder="Email address or phone number"
                  //whenever the value for this input is changed this fucntion will be called
                  onChange={handleLoginChange}
                />
                <LoginInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  //whenever the value for this input is changed this fucntion will be called
                  onChange={handleLoginChange}
                  bottom
                />
                <button type="submit" className="blue_btn">
                  Log In
                </button>
              </Form>
            )}
          </Formik>
          <Link to="/forgot" className="forgot_password">
            Forgotten password ?
          </Link>
          <div className="sign_splitter"></div>
          <button className="blue_btn open_signup">Create Account</button>
        </div>
        <Link to="/" className="sign_extra">
          <b>Create a Page </b>
          for a celebrity, brand or business.
        </Link>
      </div>
    </div>
  );
}
