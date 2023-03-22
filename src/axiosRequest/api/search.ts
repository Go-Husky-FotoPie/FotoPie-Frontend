import axiosInstance from "../index";

export const searchPosts = <T>(tag: T, page: Number, limit: Number) => {
  return axiosInstance({
    url: `/api/search/${tag}?page=${page}&limit=${limit}`,
    method: "get",
  });
};
