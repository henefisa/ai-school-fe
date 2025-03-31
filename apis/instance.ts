import axios, { AxiosError } from 'axios';

export const getEndpoint = () => {
  return process.env.NEXT_PUBLIC_URL ?? 'http://localhost:8000';
};

interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

const instance = axios.create({
  baseURL: getEndpoint(),
  headers: {
    'Content-Type': 'application/json',
  },
});

const createRequestInterceptor = () => {
  instance.interceptors.request.use(
    (config) => {
      config.headers = config.headers ?? {};
      const accessToken = localStorage.getItem('accessToken') ?? '';
      config.headers.Authorization = `Bearer ${accessToken}`;

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

const createRepsonseInterceptor = () => {
  const interceptor = instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error: AxiosError) => {
      const status = error.response?.status;
      const originalRequest = error.config;
      const isLogin = originalRequest?.url === '/auth/login';
      const isRefresh = originalRequest?.url === '/auth/refresh-token';
      const refreshToken = localStorage.getItem('refreshToken');

      if (status === 401 && !isLogin && !isRefresh && refreshToken) {
        instance.interceptors.response.eject(interceptor);

        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        try {
          const result = await instance.get<RefreshTokenResponse>(
            '/auth/refresh-token',
            {
              headers: {
                Authorization: refreshToken,
              },
            }
          );

          localStorage.setItem('accessToken', result.data.accessToken);
          localStorage.setItem('refreshToken', result.data.refreshToken);

          return instance(originalRequest ?? {});
        } catch (error) {
          return Promise.reject(error);
        } finally {
          createRepsonseInterceptor();
        }
      }

      return Promise.reject(error);
    }
  );
};

createRequestInterceptor();
createRepsonseInterceptor();

export default instance;
