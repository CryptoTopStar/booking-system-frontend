import { useState, useEffect } from 'react';
import ReservationTableService from '../services/reservationTable';
import { API } from '../api';
import moment from 'moment';

// ReservationTable の state と更新ロジックを持つフック
const useReservationTable = ({ menu_id, staff_id }) => {
    const [reservationTable, setReservationTable] = useState([]);
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');

    // このカスタムフックを利用しているコンポーネントがマウントされたら ReservationTable を取得する。
    useEffect(() => {
        const fetchAll = async () => {
            const response = await ReservationTableService.getAll({ menu_id, staff_id });
            setReservationTable(response)
        }
        fetchAll()
    }, []);
    useEffect(() => {
        const fetchAll = async () => {
            const response = await ReservationTableService.getAll({ menu_id, staff_id });
            setReservationTable(response)
        }
        fetchAll()
    }, [menu_id, staff_id]);
    useEffect(() => {
        API.get('/time').then((res) => {
            if (res.data.length != 0) {
                let from = moment(res.data[0].from);
                let to = moment(res.data[0].to);
                setFrom(from);
                setTo(to);
            }
        })
    }, [])
    return { reservationTable, from, to };
};

export default useReservationTable