const { menuReservation } = require('../api/reservation')

// 予約表 を取得する
const getAll = async (data) => {
    const status = await menuReservation(data).then(response => { return response.data })
    return status
};

const ReservationTableService = { getAll }

export default ReservationTableService