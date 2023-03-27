import "./style.css";
import { ErrorMessage, useField } from "formik";
import { useMediaQuery } from "react-responsive";
export default function LoginInput({ placeholder, bottom, ...props }) {
  const [field, meta] = useField(props);
  const desktopView = useMediaQuery({
    query: "(min-width : 850px)",
  });
  console.log(desktopView);
  return (
    <div className="input_wrap">
      {meta.touched && meta.error && !bottom && (
        <div
          className={
            desktopView ? "input_error input_error_desktop" : "input_error"
          }
        >
          {
            //meta.touched -> we are using touched property because when validation fails in yup/formik entire validation schema will
            //run and it will show errors for every fields
            // even the fields which user has not touched yet, its a bad user design and experience, so we only show errors for fields with which
            //user has interacted only by using touched.
            meta.touched && meta.error && <ErrorMessage name={field.name} /> //this div relates to error message only (text) and not the div
            //so even if we conditionalize this it will just hide the text and not the "red" div for error which is hidden by condition written above its parent div
          }
          {meta.touched && meta.error && (
            <div
              className={desktopView ? "error_arrow_left" : "error_arrow_top"}
            ></div>
          )}
        </div>
      )}

      <input
        className={meta.touched && meta.error ? "input_error_border" : ""}
        type={field.type}
        name={field.name}
        placeholder={placeholder}
        {...field}
        {...props}
      />
      {meta.touched && meta.error && bottom && (
        <div
          className={
            desktopView ? "input_error input_error_desktop" : "input_error"
          }
          style={{ transform: "translateY(2px)" }}
        >
          {
            //meta.touched -> we are using touched property because when validation fails in yup/formik entire validation schema will
            //run and it will show errors for every fields
            // even the fields which user has not touched yet, its a bad user design and experience, so we only show errors for fields with which
            //user has interacted only by using touched.
            meta.touched && meta.error && <ErrorMessage name={field.name} /> //this div relates to error message only (text) and not the div
            //so even if we conditionalize this it will just hide the text and not the "red" div for error which is hidden by condition written above its parent div
          }
          {meta.touched && meta.error && (
            <div className="error_arrow_bottom"></div>
          )}
        </div>
      )}
      {meta.touched && meta.error && (
        <i
          className="error_icon"
          style={{ top: `${!bottom && !desktopView && "63%"}` }}
        ></i>
      )}
    </div>
  );
}

//we can pass the to the component where we are using them and then retrieve its value from prop's.

{
  /* <LoginInput
type="email"
name="email"
placeholder="Email address or phone number"
//whenever the value for this input is changed this fucntion will be called
onChange={handleLoginChange}
/>; */
}
