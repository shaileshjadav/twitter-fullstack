import { useCallback } from "react";
import LoginModal from "../components/modals/LoginModal";
import useLoginModal from "../hooks/useLoginModal";
import { BsTwitterX } from "react-icons/bs";
import useRegisterModal from "../hooks/useRegisterModal";
import RegisterModal from "../components/modals/RegisterModal";

const Auth: React.FC = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const handleSignin = useCallback(() => {
    loginModal.onOpen();
  }, [loginModal]);

  const handleSignup = useCallback(() => {
    registerModal.onOpen();
  }, [registerModal]);
  return (
    <div className="min-h-screen bg-neutral-800">
      <LoginModal />
      <RegisterModal />

      <div className="flex flex-row">
        <div className="h-screen w-1/2 p-10">
          <div className="flex justify-center items-center h-screen">
            <BsTwitterX size="60%" color="#fff" />
          </div>
        </div>
        <div className="h-screen w-1/2 pt-12 ">
          <h5 className="text-6xl font-semibold text-white">Happening now</h5>
          <h3 className="text-3xl font-semibold text-white mt-4">Join today</h3>

          <div className="text-neutral-400 mt-12 ">
            <button
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full min-w-80"
              onClick={handleSignup}
            >
              Create an account
            </button>
          </div>
          <div className="text-center text-white mt-4 w-1/2">
            <hr />
          </div>
          <div className="text-neutral-400 mt-12">
            <p>Already have Account?</p>

            <button
              className="border border-blue-500 text-blue-500 font-semibold py-2 px-4 rounded-full min-w-80"
              onClick={handleSignin}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Auth;
