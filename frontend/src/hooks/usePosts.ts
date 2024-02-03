import { useInfiniteQuery } from "@tanstack/react-query";
import apiSecure from "../libs/axios";
import { useEffect } from "react";
import { useInView, InViewHookResponse } from "react-intersection-observer";
import { Post } from "../types";
import { POSTS_PAGINATION_LIMIT, QUERY_KEYS } from "../constants";

const usePosts = (userId?: string) => {
  const LIMIT = POSTS_PAGINATION_LIMIT;
  const { ref, inView }: InViewHookResponse = useInView();

  const fetchPosts = async (page = 1) => {
    try {
      const url = userId
        ? `/posts?userId=${userId}&page=${page}`
        : `/posts?page=${page}`;
      const result = await apiSecure.get(url);
      return result.data || [];
    } catch (error) {
      console.log(error);
    }
  };

  const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [QUERY_KEYS.posts],
      queryFn: ({ pageParam }) => fetchPosts(pageParam),
      getNextPageParam: (lastPage, allPages) => {
        const nextPage =
          lastPage.length === LIMIT ? allPages.length + 1 : undefined;
        return nextPage;
      },
      initialPageParam: 1,
    });
  // useInfiniteQuery("posts", ({ pageParam = 1 }) => fetchPosts(pageParam), {
  //   getNextPageParam: (lastPage, allPages) => {
  //     const nextPage =
  //       lastPage.length === LIMIT ? allPages.length + 1 : undefined;
  //     return nextPage;
  //   },
  // });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  //   const { data, error, isLoading } = useQuery("postsData", fetchPost);

  const allData: Post[] = [];
  data?.pages.map((page) => {
    allData.push(...page);
  });
  return {
    data: allData,
    isSuccess,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    ref,
  };
};
export default usePosts;
