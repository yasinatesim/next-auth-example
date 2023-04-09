import request from './request';

export const getUserInfo = async ({ username, password }: { username: string; password: string }): Promise<any> => {
  return request.post(`/login`, { username, password });
};

export const getUserInfoWithToken = async ({ token }: { token: string }): Promise<any> => {
  return request.post(`/user`, { token });
};
