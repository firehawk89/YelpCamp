export type ApiResponse<T> = Promise<{
  data?: T;
  error?: string;
}>;

export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const API_ROUTES = {
  CAMPGROUNDS: `${API_URL}/campgrounds`
};
