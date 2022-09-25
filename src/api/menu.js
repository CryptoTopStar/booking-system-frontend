import { API } from ".";

export const menulist = () => API.get('/service/list');
export const menuReservation = () => API.post('/reservation/menu')