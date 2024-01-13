import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Button from "../components/Button";
import Avatar from "./Avatar";
import usePost from "../hooks/usePost";

interface FormProps {
  placeHolder: string;
  isComment?: boolean;
  postId?: string;
}
const Form: React.FC<FormProps> = ({ placeHolder, isComment, postId }) => {
  const { submitPost, isLoading, isSuccess, isError } = usePost(
    postId as string
  );

  const [body, setBody] = useState("");

  const onSubmit = useCallback(async () => {
    submitPost({ body, isComment });
  }, [body, isComment, submitPost]);

  useEffect(() => {
    if (isSuccess) {
      setBody("");
      toast.success("Post created successfully");
    }
  }, [isSuccess]);
  useEffect(() => {
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isError]);
  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
      <div className="flex flex-row gap-4">
        <div>
          <Avatar userId="12" />
        </div>
        <div className="w-full">
          <textarea
            disabled={isLoading}
            onChange={(e) => setBody(e.target.value)}
            value={body}
            placeholder={placeHolder}
            className="disabled:opacity-800 peer resize-none mt-3 w-full bg-black ring-0 outline-none text-[20px] placeholder-neutral-500 text-white "
          />
          <hr className="opacity-0 focus:peer-focus:opacity-100 h-[1px] w-full border-neutral-800 transition" />
          <div className="flex flex-row justify-end mt-4">
            <Button
              label="Post"
              disabled={isLoading || !body}
              onClick={onSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Form;
