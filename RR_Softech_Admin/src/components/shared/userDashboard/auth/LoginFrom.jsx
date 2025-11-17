import React from "react";
import { toast } from "react-toastify";
import CommonForm from "../../../common/CommonForm";
import useAuth from "../../../../hooks/UserDashboard/useAuth";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../../api/auth";
import { handleApiError } from "../../../../utils/UserDashboard/services/handleApiError";
import { loginFields } from "../../../../utils/UserDashboard/services/loginFields";

export default function LoginFrom({ setMode,role }) {
  const { setAuthState } = useAuth();
  const navigate = useNavigate();

  async function handleLogin(values) {
    try {
      const { email, password } = values;
      const tokenObj = await loginUser({ email, password });
      setAuthState({
        access: tokenObj.access,
        refresh: tokenObj.refresh,
        user: { email },
        role:role,
      });
      toast.success("Logged in successfully");
      if(role === "CUSTOMER"){
        navigate("/user/services");
      }else if(role === "OWNER"){
        navigate("/admindashboard");
      }else if(role === "EMPLOYEE"){
        navigate("/employeedashboard");
      }
    } catch (err) {
      handleApiError(err, "Login failed. Please try again.");
      throw err;
    }
  }
  return (
    <>
      <h3 className="text-2xl font-bold mb-2 text-center">Log In</h3>
      <CommonForm
        fields={loginFields}
        submitLabel="Login"
        onSubmit={handleLogin}
        extraFooter={
          <div className="text-sm mt-2 flex justify-between">
            <button
              onClick={() => setMode("register")}
              className="text-blue-600 hover:underline"
            >
              Create account
            </button>
            <button
              onClick={() => setMode("forgetPassword")}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Forget password
            </button>
          </div>
        }
      />
    </>
  );
}
