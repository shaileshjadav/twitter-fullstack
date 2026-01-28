import { useMutation } from "@tanstack/react-query";
import apiSecure from "../libs/axios";
import reactQueryClient from "../libs/reactQuery";
import { QUERY_KEYS } from "../constants";
import useAwsUpload from "../hooks/useAwsUpload";

interface CreatePostData {
  body: string;
  isComment?: boolean;
  image?: string | null;
}
const usePost = (postId: string) => {
  const { uploadObject, generatePresignedUrl } = useAwsUpload();
  const addPost = async (postData: CreatePostData) => {
    const { isComment, image } = postData;
    if (isComment) {
      delete postData.isComment;
    }
    try {
      if (image) {
        const { presigneUrl, filePath } = await generatePresignedUrl(
          `posts/presignedurl`
        );
        await uploadObject(presigneUrl, image);
        postData.image = filePath;
      }
      const url = isComment ? `/comments?postId=${postId}` : `/posts`;
      return await apiSecure.post(url, postData);
    } catch (e: any) {
      console.log(e);
      throw e;
    }
  };

  const mutation = useMutation({
    mutationFn: (postData: CreatePostData) => addPost(postData),
    onSuccess: () => {
      const mutationKey = postId
        ? `${QUERY_KEYS.post}/${postId}`
        : QUERY_KEYS.posts;
      reactQueryClient.invalidateQueries({
        queryKey: [mutationKey],
      });
    },
  });

  return {
    submitPost: mutation.mutate,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
  };

  // const url = `/posts/${postId}`;

  // const fetchPost = async () => {
  //   const result = await apiSecure.get(url);
  //   return result.data;
  // };
  // const { data, error, isLoading } = useQuery("post", fetchPost);
  // const responseData = data;
  // return { data: responseData, error, isLoading };
};
export default usePost;
