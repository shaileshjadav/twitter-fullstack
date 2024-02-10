import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import validator from "validator";

import Input from "../Input";
import Modal from "../Modal";

import useLoginModal from "../../hooks/useLoginModal";
import useRegisterModal from "../../hooks/useRegisterModal";
import useAuth from "../../hooks/useAuth";
import useDebounce from "../../hooks/useDebounce";
import useCheckEmail from "../../hooks/useCheckEmail";

interface ValidationFormErrors {
  email?: string;
}
const RegisterModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<ValidationFormErrors>({});
  const [isFormValid, setIsFormValid] = useState(false);

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const navigate = useNavigate();
  const { signup } = useAuth();
  const deboundedEmailVal = useDebounce(email, 3000);
  const { checkEmail } = useCheckEmail();

  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
      if (!validator.isEmail(e.target.value)) {
        setFormErrors({ email: "Please enter valid email!" });
      } else {
        setFormErrors((prev) => ({ ...prev, email: "" }));
      }
    },
    []
  );
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;
      case "username":
        setUserName(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
    }
  }, []);
  useEffect(() => {
    if (!formErrors.email && password && userName && name) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [email, password, userName, name, formErrors.email]);
  useEffect(() => {
    // check email is aready registerd when email is valid
    const checkEmailAPI = async () => {
      setIsLoading(true);
      const result = await checkEmail(deboundedEmailVal);
      if (result && result.isAlreadyExists) {
        setFormErrors((prev) => ({
          ...prev,
          email: "Email is already registered!",
        }));
      }
      setIsLoading(false);
    };
    if (deboundedEmailVal && email === deboundedEmailVal && !formErrors.email)
      checkEmailAPI();
  }, [checkEmail, deboundedEmailVal, email, formErrors.email]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      await signup({ name, username: userName, email, password });

      loginModal.onClose();
      navigate("/home");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong!");
      }
    } finally {
      setIsLoading(false);
    }
  }, [signup, name, userName, email, password, loginModal, navigate]);

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }

    registerModal.onClose();
    loginModal.onOpen();
  }, [isLoading, registerModal, loginModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Email"
        onChange={handleEmailChange}
        value={email}
        disabled={isLoading}
        error={formErrors && formErrors.email}
      />

      <Input
        placeholder="Name"
        onChange={handleChange}
        value={name}
        name="name"
        disabled={isLoading}
      />

      <Input
        placeholder="Username"
        onChange={handleChange}
        value={userName}
        name="username"
        disabled={isLoading}
      />

      <Input
        placeholder="Password"
        type="password"
        name="password"
        onChange={handleChange}
        value={password}
        disabled={isLoading}
      />
    </div>
  );

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4 ">
      <p>Already have an account?</p>
      <span
        className="text-white cursor-pointer hover:underline"
        onClick={onToggle}
      >
        Sign in
      </span>
    </div>
  );
  return (
    <Modal
      disabled={isLoading || !isFormValid}
      isOpen={registerModal.isOpen}
      title="Create an account"
      actionLabel="Register"
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};
export default RegisterModal;
