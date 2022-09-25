import { useState, useEffect } from 'react';
import BookingService from '../services/booking';

// Booking の state と更新ロジックを持つフック
const useBooking = (userId) => {
	const [bookings, setBookings] = useState(null);
	// このカスタムフックを利用しているコンポーネントがマウントされたら Booking を取得する。
	useEffect(() => {
		const fetchAll = async () => {
			const response = await BookingService.list(userId)
			setBookings(response.data);
		}
		fetchAll()
	}, [userId]);

	const cancel = async (reservationId, userId) => {
		const response = await BookingService.cancel(reservationId, userId);
		setBookings(response.data);
	}

	return { bookings, cancel, setBookings };
};

export default useBooking