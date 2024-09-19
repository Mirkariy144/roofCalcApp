import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  // headers: {
  //   Authorization: localStorage.getItem('token'),
  // },
  baseURL: 'http://api.mirkariy-roofcalc.online',
});

// API к юзерам (логинизация и регистрация пользователей)

export const axiosAuthCheker = async () => {
  const response = await instance.post('auth');
  return response;
};

export const axiosLogout = async () => {
  const response = await instance.post('logout');
  return response;
};

export const axiosRegistration = async (
  email: string,
  login: string,
  password: string
) => {
  const response = await instance.post('registration', {
    email,
    login,
    password,
  });
  return response;
};

export const axiosLogin = async (login: string, password: string) => {
  const response = await instance.post('login', { login, password });
  localStorage.setItem('token', response.data.token);
  instance.defaults.headers.Authorization = response.data.token;
  return response;
};

// API к проектам
export const axiosNewProject = async (name: string) => {
  const response = await instance.post('projects', { name });
  return response;
};

export const axiosGetProjects = async () => {
  const response = await instance.get('projects');
  return response;
};

export const axiosDeleteProject = async (projectId: number) => {
  const response = await instance.delete(`projects/${projectId}`);
  return response;
};

export const axiosEditProject = async (name: string, projectId?: number) => {
  const response = await instance.put(`projects/${projectId}`, { name });
  return response;
};

// Api к очередям

export const axiosGetQueues = async (projectId: number) => {
  const response = await instance.get(`projectqueue/${projectId}`);
  return response;
};

export const axiosNewQueue = async (name: string, projectId?: number) => {
  const response = await instance.post(`projectqueue`, { name, projectId });
  return response;
};
export const axiosDeleteQueue = async (queueId: number) => {
  const response = await instance.delete(`projectqueue/${queueId}`);
  return response;
};
export const axiosEditQueue = async (name: string, queueId?: number) => {
  console.log(name, queueId);
  const response = await instance.put(`projectqueue/${queueId}`, { name });
  return response;
};

// API к секциям

export const axiosGetSections = async (sectionId: number) => {
  const response = await instance.get(`section/${sectionId}`);
  return response;
};

export const axiosNewSection = async (
  name: string,
  projectId?: number,
  queueId?: number
) => {
  const response = await instance.post(`section`, { name, projectId, queueId });
  return response;
};
export const axiosDeleteSection = async (sectionId: number) => {
  const response = await instance.delete(`section/${sectionId}`);
  return response;
};
export const axiosEditSection = async (name: string, sectionId?: number) => {
  const response = await instance.put(`section/${sectionId}`, { name });
  return response;
};

// API к типам кровли

export const axiosGetRoofTypes = async (roofTypeId: number) => {
  const response = await instance.get(`rooflist/${roofTypeId}`);
  return response;
};

export const axiosNewRoofType = async (
  name: string,
  projectId?: number,
  queueId?: number,
  sectionId?: number,
  roofLayers?: any,
  squareMeters?: number,
  upperPoint?: number,
  lowerPoint?: number
) => {
  const response = await instance.post(`rooflist`, {
    name,
    projectId,
    queueId,
    sectionId,
    roofLayers,
    squareMeters,
    upperPoint,
    lowerPoint,
  });
  return response;
};

export const axiosDeleteRoofType = async (roofTypeId: number) => {
  const response = await instance.delete(`rooflist/${roofTypeId}`);
  return response;
};
export const axiosEditRoofType = async (
  name: string,
  projectId?: number,
  queueId?: number,
  sectionId?: number,
  roofLayers?: any,
  squareMeters?: number,
  upperPoint?: number,
  lowerPoint?: number,
  roofId?: number
) => {
  const response = await instance.put(`rooflist/${roofId}`, {
    name,
    projectId,
    queueId,
    sectionId,
    roofLayers,
    squareMeters,
    upperPoint,
    lowerPoint,
    roofId,
  });
  return response;
};

export const axiosAddJunction = async (
  name: string,
  junctionLength: number,
  junctions: any,
  roofId: number
) => {
  const response = await instance.post(`junctions/${roofId}`, {
    name,
    junctionLength,
    junctions,
    roofId,
  });
  return response;
};

export const axiosGetJunctions = async (roofId: number) => {
  const response = await instance.get(`junctions/${roofId}`);
  return response.data;
};

export const axiosDeleteJunction = async (junctionId: number) => {
  const response = await instance.delete(`junctions/${junctionId}`);
  return response;
};

export const axiosEditJunction = async (
  name: string,
  junctionLength: number,
  junctions: any,
  roofId: number
) => {
  const response = await instance.put(`junctions/${roofId}`, {
    name,
    junctionLength,
    junctions,
    roofId,
  });
  return response;
};
