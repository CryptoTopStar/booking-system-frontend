import { API } from ".";

export const menuReservation = (data) => API.post(`/reservation/menu`, data);
export const addReservation = (formData) => API.post(`/reservation/add`, formData);
export const listReservation = (userId) => API.post(`/reservation/list`, { userId: userId });
export const deleteReservation = (reservationId, userId) => API.post(`/reservation/delete`, { reservationId: reservationId, userId: userId });
