import * as Booking from '../api/reservation';
import * as API from '../api/menu';

/**
 * get a list of booking
 * @param {} sub 
 */
async function menulist() {
    const response = await API.menulist().then((res) => { return res });
    return response
}

async function list(userId) {
    const response = await Booking.listReservation(userId).then((res) => { return res });
    return response
}
/**
 * get a booking
 * @param {*} sub 
 * @param {*} time 
 */
// async function get(sub, time) {
// }

// /**
//  * create a booking
//  * @param {*} body 
//  */
async function create(body) {
    //let result = {}
    const response = await Booking.addReservation(body)
        .then((res) => { return res });
    // await API.post(apiName, path, { ...myInit, body })
    //     .then(_ => { /* nop */ })
    //     .catch(error => {
    //         const { status } = error.response
    //         console.log('error', status, error.response)
    //         if (status === 409) {
    //             result = { ...result, status: 409 }
    //         } else {
    //             throw new Error(error)
    //         }
    //     });
    return 'ok';
}

// /**
//  * update a booking
//  * @param {*} body 
//  */
// async function update(body) {
//     let result = {}
//     await API.put(apiName, path, { ...myInit, body })
//         .then(_ => { /* nop */ })
//         .catch(error => {
//             const { status } = error.response
//             console.log('error', status, error.response)
//             if (status === 409) {
//                 result = { ...result, status: 409 }
//             } else {
//                 throw new Error(error)
//             }
//         });
//     return result
// }

// /**
//  * cancel a booking
//  * @param {} sub 
//  * @param {*} time 
//  */
async function cancel(reservationId, userId) {
    const response = await Booking.deleteReservation(reservationId, userId);
    return response
}

/**
 * remove a booking
 * @param {} sub 
 * @param {*} time 
 */
async function remove(sub, time) {
}

const BookingService = {
    menulist,
    list,
    // get,
    create,
    // update,
    cancel,
    // remove
}

export default BookingService