import {create} from 'apisauce';

class NetworkOps {
  get = async (url) => {
    const api = create({
      baseUrl: 'https://api.openweathermap.org',
      timeout: 30000,
    });
    const res = await api.get(`https://api.openweathermap.org${url}`);
    if (res.status == 200) {
      return {data: res.data, status: res.status};
    }
    return {status: res.status};
  };
}

export default new NetworkOps();
