import { useCallback } from "react";
import LoginModal from "../components/modals/LoginModal";
import useLoginModal from "../hooks/useLoginModal";

const Auth: React.FC = () => {
  const loginModal = useLoginModal();

  const handleSignin = useCallback(() => {
    loginModal.onOpen();
  }, [loginModal]);

  return (
    <div className="min-h-screen bg-neutral-800">
      <LoginModal />

      <div className="flex flex-row">
        <div className="h-screen w-1/2">
          <h3>X</h3>
        </div>
        <div className="h-screen w-1/2 pt-4 ">
          <h5 className="text-3xl font-semibold text-white">Happening now</h5>
          <h3 className="text-3xl font-semibold text-white">Join today</h3>

          <div className="text-neutral-400 mt-4 ">
            <p>First time using Twitter?</p>
            <span className="text-white cursor-pointer hover:underline">
              Create an account
            </span>
          </div>

          <div className="text-neutral-400 mt-4">
            <p>Already have Account?</p>
            <span
              className="text-white cursor-pointer hover:underline"
              onClick={handleSignin}
            >
              SignIn
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Auth;
