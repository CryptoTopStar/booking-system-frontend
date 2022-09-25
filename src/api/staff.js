import { API } from ".";

export const list = () => API.get('/staff/list');
export const sidemenulist = () => API.get('/menu/sidemenulist');
export const menuReservation = () => API.post('/reservation/menu')