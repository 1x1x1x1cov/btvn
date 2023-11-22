import { useState } from "react";
import styles from "./Login.module.css";
import Toast from "../../UI/Toast/Toast";
import useBearStore from "../../state/state";
import { Link, useNavigate } from "react-router-dom";

const Login = (props) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // const [message, setMessage] = useState("");
  const [toast, setToast] = useState({
    showToast: false,
    message: "",
    type: "",
  });

  const onChange = (e) => {
    setFormData((prev) => {
      let helper = { ...prev };
      helper[`${e.target.id}`] = e.target.value;
      return helper;
    });
  };

  const navigate = useNavigate();
  const setIsUserValid = useBearStore((state) => state.setIsUserValid);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (formData.username.length < 4) {
      setToast({
        showToast: true,
        message: "Username or Email should atleast be 4 characters long.",
        type: "danger",
      });
      return;
    } else if (formData.password.length < 8) {
      setToast({
        showToast: true,
        message: "Password should atleast be 8 characters long.",
        type: "danger",
      });
      return;
    }
    setToast({
      showToast: false,
      message: "",
      type: "",
    });

    console.log("FORM DATA ", formData);

    const dbUsername = "test";
    const dbPassword = "test1@23";

    if (formData.username === dbUsername && formData.password === dbPassword) {
      setIsUserValid(true);
      navigate("/profile");
    } else {
      setToast({
        showToast: true,
        message: "Invalid username or password.",
        type: "danger",
      });
    }
  };

  return (
    <div className={styles["main"]}>
      <form className={styles["form"]} onSubmit={onSubmitHandler}>
        <div className={styles["user-image"]}>
          <div className={styles["head"]} />
          <div className={styles["body"]} />
        </div>
        <p className={styles["heading"]}>Login</p>
        <div className={styles["inputs-div"]}>
          <input
            onChange={onChange}
            value={formData.username}
            type={"text"}
            id='username'
            name='username'
            placeholder='Username or Email'
          />
          <input
            onChange={onChange}
            value={formData.password}
            type={"password"}
            id='password'
            name='password'
            placeholder='Password'
          />
          <button>Submit</button>
        </div>

        <p className={styles["p-link"]}>
          New User?{" "}
          <Link to={"/signup"} className={styles["link"]}>
            Sign up
          </Link>
        </p>
      </form>
      {toast.showToast ? (
        <Toast setToast={setToast} message={toast.message} type={toast.type} />
      ) : (
        ""
      )}
    </div>
  );
};

export default Login;
