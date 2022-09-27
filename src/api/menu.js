import { API } from ".";

export const menulist = () => API.get('/menu/list');
export const menuReservation = () => API.post('/reservation/menu')