import { useCallback, useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import EmojiPicker, { Theme } from "emoji-picker-react";
import {
  AiFillCloseCircle,
  AiFillFileImage,
  AiOutlineSmile,
} from "react-icons/ai";
import { useDropzone } from "react-dropzone";

import Button from "../components/Button";
import Avatar from "./Avatar";
import usePost from "../hooks/usePost";
import useAuth from "../hooks/useAuth";

interface FormProps {
  placeHolder: string;
  isComment?: boolean;
  postId?: string;
}
const Form: React.FC<FormProps> = ({ placeHolder, isComment, postId }) => {
  const { submitPost, isLoading, isSuccess, isError } = usePost(
    postId as string
  );
  const { user: currentUser } = useAuth();
  const [body, setBody] = useState("");
  const [isOpenEmojiPicker, setIsEmojiPicker] = useState(false);
  const fileUploader = useRef<HTMLInputElement | null>(null);
  const [base64, setBase64] = useState(null);

  const onSubmit = useCallback(async () => {
    submitPost({ body, isComment, image: base64 });
  }, [body, isComment, submitPost, base64]);

  useEffect(() => {
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isError]);

  const concatEmoji = useCallback((str: string, unifiedValue: string) => {
    return str.concat(String.fromCodePoint(parseInt(unifiedValue, 16)));
  }, []);

  const appendEmoji = useCallback(
    (unifiedValue: string) => {
      setBody((prevBody) => concatEmoji(prevBody, unifiedValue));
    },
    [concatEmoji]
  );

  const handleDrop = useCallback((files: any) => {
    const file = files[0];

    const reader = new FileReader();
    reader.onload = (event: any) => {
      setBase64(event.target.result);
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });

  const openFileUploader = useCallback(() => {
    fileUploader && fileUploader.current && fileUploader.current.click();
  }, [fileUploader]);

  const resetFileInput = useCallback(() => {
    setBase64(null);
    if (fileUploader && fileUploader.current) {
      fileUploader.current.value = "";
    }
  }, [fileUploader]);

  useEffect(() => {
    if (isSuccess) {
      setBody("");
      resetFileInput();
      toast.success("Post created successfully");
    }
  }, [isSuccess, resetFileInput]);

  if (!currentUser) {
    return false;
  }
  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
      <div className="flex flex-row gap-4">
        <div>
          <Avatar
            userId={currentUser?.id}
            imageUrl={currentUser?.profileImageUrl}
          />
        </div>
        <div className="w-full">
          <textarea
            disabled={isLoading}
            onChange={(e) => setBody(e.target.value)}
            value={body}
            placeholder={placeHolder}
            className="disabled:opacity-800 peer resize-none mt-3 w-full bg-black ring-0 outline-none text-[20px] placeholder-neutral-500 text-white "
          />
          {base64 && (
            <div className="flex flex-center justify-center relative cursor-pointer">
              <div className="absolute top-0 right-0 text-white">
                <AiFillCloseCircle
                  size={20}
                  color="#fff"
                  onClick={resetFileInput}
                />
              </div>
              <img
                src={base64}
                height="100"
                width="100"
                alt="Uploaded Image"
                className="object-cover h-48 w-96"
              />
            </div>
          )}
          <div
            {...getRootProps({
              className: "hidden w-full p-4 ",
            })}
          >
            <input {...getInputProps()} ref={fileUploader} />
          </div>

          <hr className="opacity-0 focus:peer-focus:opacity-100 h-[1px] w-full border-neutral-800 transition" />
          <div className="flex flex-row justify-between mt-4">
            <div className="relative inline-flex ">
              {!isComment && (
                <AiFillFileImage
                  size={20}
                  color="#fff"
                  className="mr-4"
                  onClick={openFileUploader}
                />
              )}
              <div className="">
                <AiOutlineSmile
                  size={20}
                  color="#fff"
                  onClick={() => setIsEmojiPicker(!isOpenEmojiPicker)}
                />
                <div className=" w-full absolute z-10 top-4 mt-2 right-0">
                  <EmojiPicker
                    open={isOpenEmojiPicker}
                    skinTonesDisabled={true}
                    theme={Theme.DARK}
                    onEmojiClick={(emoji) => appendEmoji(emoji.unified)}
                  />
                </div>
              </div>
            </div>
            <div>
              <Button
                label="Post"
                disabled={isLoading || !body}
                onClick={onSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Form;
