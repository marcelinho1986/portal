import React, { useState, useRef, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EmailVerify = () => {
  const toastId = React.useRef(null);
  const errornotify = (msg) => toast.error(msg);
  const sendingnotify = (msg) => (toastId.current = toast.loading(msg));
  const dismiss = () => toast.dismiss(toastId.current);
  const successnotify = (msg) => toast.success(msg);

  const Navigate = useNavigate();

  const [otp, setOtp] = useState(Array(6).fill(""));
  const [error, setError] = useState("");
  const inputRefs = Array(6)
    .fill()
    .map((_, index) => useRef(null));

  const handleOtpChange = (index, value) => {
    if (!/^[0-9a-zA-Z]*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.toUpperCase();
    setOtp(newOtp);

    if (index < inputRefs.length - 1 && value !== "") {
      inputRefs[index + 1].current.focus();
    }

    setError("");
  };

  const [verifybtn, setverifybtn] = useState(false);

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setverifybtn(true);
    const enteredOtp = otp.join("");

    if (/^[0-9a-zA-Z]{6}$/.test(enteredOtp)) {
      sendingnotify("Verifying account...");
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_APP_BACKEND_URL}/api/v1/users/verifyotp`,
          { token: enteredOtp, reason: "verify" },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        sessionStorage.clear();
        dismiss();
        successnotify("Account verified successfully");
        setTimeout(() => {
          Navigate("/login");
        }, 1000);
      } catch (error) {
        dismiss();
        setverifybtn(false);
        errornotify(error.response.data.message);
        console.error(error.response.data.message);
        setOtp(Array(6).fill(""));
      }
    } else {
      setverifybtn(false);
      setError("Please enter a valid OTP");
    }
  };

  const resendOTP = async (e) => {
    e.preventDefault();
    setverifybtn(true);
    sendingnotify("Sending OTP again...");
    setOtp(Array(6).fill(""));
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/api/v1/users/register`,
        {
          username: sessionStorage.getItem("username"),
          email: sessionStorage.getItem("email"),
          password: sessionStorage.getItem("password"),
          confirmpassword: sessionStorage.getItem("confirmpassword"),
          category: sessionStorage.getItem("category"),
          avatar: sessionStorage.getItem("avatar"),
          refferalcode: sessionStorage.getItem("refferalcode"),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dismiss();
      setverifybtn(false);
      successnotify(response.data.message);
    } catch (error) {
      dismiss();
      setverifybtn(false);
      errornotify(error.response.data.message);
      console.error(error.response.data.message);
    }
  };

  // useEffect(() => {
  //   if (!sessionStorage.getItem("username")) {
  //     Navigate("/");
  //   }
  // }, []);

  return (
    <>
      <Toaster position="bottom-left" reverseOrder={false} />
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-100 py-12">
        <div className="relative bg-white p-9  max-sm:p-4 shadow-xl border-t mx-auto w-full sm:max-w-[410px]  max-sm:w-[300px]  ">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-16 max-sm:space-y-10">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-3xl max-sm:text-2xl">
                <p>Email Verification</p>
              </div>
              <div className="flex flex-row text-sm font-medium text-gray-400">
                <p>We have sent a code to your email</p>
              </div>
            </div>
            <div>
              <form onSubmit={handleOtpSubmit}>
                <div className="flex flex-col space-y-5 max-sm:space-y-2">
                  <div className="flex flex-row items-center justify-between mx-auto w-auto">
                    <div className="w-auto h-16  flex">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          type="text"
                          value={digit}
                          onChange={(e) =>
                            handleOtpChange(index, e.target.value)
                          }
                          maxLength="1"
                          ref={inputRefs[index]}
                          className="w-12 h-12 max-sm:w-9 max-sm:h-9 m-1 border border-gray-300 text-center text-xl rounded-md focus:outline-none focus:border-blue-500"
                        />
                      ))}
                    </div>
                  </div>
                  {error && <p className="text-red-500 mt-1 ">{error}</p>}
                  <div className="flex flex-col space-y-5 max-sm:space-y-3">
                    <div>
                      <button
                        disabled={verifybtn}
                        className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-4 bg-gray-700 hover:bg-gray-800  border-none text-white text-sm shadow-sm"
                      >
                        Verify Account
                      </button>
                    </div>
                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                      <p>Didn't recieve code?</p>{" "}
                      <button
                        disabled={verifybtn}
                        onClick={resendOTP}
                        className="flex flex-row items-center text-gray-600 hover:underline"
                      >
                        Resend
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailVerify;
