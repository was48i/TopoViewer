import axios, { AxiosInstance } from 'axios';


const service: AxiosInstance = axios.create({
  baseURL: 'http://10.40.49.171:8080/',
  timeout: 150000,
});

service.interceptors.request.use((config: any) => {
  // 添加cookie验证信息
  const clientId = localStorage.getItem('client-id');
  if (clientId) {
    config.headers['Client-Id'] = clientId;
  }
  return config;
}, (error: Error) => {
  Promise.reject(error);
});

// respone拦截器
service.interceptors.response.use(
  (response: any) => {
    const res = response.data;
    return res;
  },
  (error: Error) => {
    return Promise.reject(error);
  },
);

function request(options: {url: string, method: string, [k: string]: any}): Promise<any> {
  return new Promise((resolve, reject) => {
    service(options).then((res: any) => {
      resolve(res);
    }).catch((error: Error) => {
      reject(error);
    });
  });
}

export default request;
