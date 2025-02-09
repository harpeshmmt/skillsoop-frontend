import { useState, useEffect } from "react";

const usePasswordValidations = (password: string) => {
  const [validations, setValidations] = useState([
    {
      message: "Password must be less than 8 characters",
      isValid: false,
    },
    {
      message: "Password must contain at least one number",
      isValid: false,
    },
    {
      message: "Password must contain at least one lowercase letter",
      isValid: false,
    },
    {
      message: "Password must contain at least one uppercase letter",
      isValid: false,
    },
    {
      message: "Password must contain at least one symbol",
      isValid: false,
    },
  ]);

  useEffect(() => {
    setValidations([
      {
        message: "Password must be less than 8 characters",
        isValid: password?.length <= 8,
      },
      {
        message: "Password must contain at least one number",
        isValid: /\d/.test(password),
      },
      {
        message: "Password must contain at least one lowercase letter",
        isValid: /[a-z]/.test(password),
      },
      {
        message: "Password must contain at least one uppercase letter",
        isValid: /[A-Z]/.test(password),
      },
      {
        message: "Password must contain at least one symbol",
        isValid: /[#?!@$%^&*-]/.test(password),
      },
    ]);
  }, [password]);

  return validations;
};

export default usePasswordValidations;
