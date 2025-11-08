import React from "react";
import useAuth from "../../../../hooks/UserDashboard/useAuth";
import { handleApiError } from "../../../../utils/services/handleApiError";
import { forgetFields } from './../../../../utils/services/forgetFields';
import CommonForm from "../../../common/CommonForm";


export default function ForgetPasswordFrom({setMode}) {
  const { logout } = useAuth();

  async function handleForgetPassword(values) {
    try {
      values;
      logout();
      setMode("login");

    } catch (err) {
      handleApiError(err, "Failed to Send Email");
      throw err;
    }
  }
  return (
    <>
      <h3 className="text-2xl font-bold mb-2 text-center">Forget password</h3>
      <p className="text-red-600">api is not implemented yat</p>
      <CommonForm
        fields={forgetFields}
        submitLabel="Forget Password"
        onSubmit={handleForgetPassword}
      />
    </>
  );
}
