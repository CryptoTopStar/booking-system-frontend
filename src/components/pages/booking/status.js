import React from 'react';
import moment from 'moment';
import { Link, TableBody, Table, TableCell, TableHead, TableContainer, TableRow, Paper, BottomNavigation, BottomNavigationAction, styled } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import useConfirm from '../../../hooks/useConfirm'
import useDevice from '../../../hooks/useDevice'
import userResavationTable from '../../../hooks/useResavationTable'
import Const from '../../../const'

const DeviceSettingMapping = {
    iPhoneSE: {
        cols: 3,
        tableHeight: { maxHeight: 0.50 }
    },
    iPhoneX: {
        cols: 3,
        tableHeight: { maxHeight: 0.58 }
    },
    iPhoneXPlus: {
        cols: 4,
        tableHeight: { maxHeight: 0.59 }
    },
    iPad: {
        cols: 7,
        tableHeight: { maxHeight: 0.65 }
    },
    iPadPro: {
        cols: 7,
        tableHeight: { maxHeight: 0.75 }
    },
}

const Navigation = ({ navigation, page, handleChange }) => (
    <BottomNavigation
        value={navigation}
        onChange={handleChange}
        style={{ width: '100%' }}
    >
        <BottomNavigationAction disabled={page === 0} label="前へ" icon={<ArrowBackIosIcon />} />
        <BottomNavigationAction label="次へ" icon={<ArrowForwardIosIcon />} />
    </BottomNavigation>
)

function createData(at, today, tomorrow, daysAfter2, daysAfter3, daysAfter4, daysAfter5, daysAfter6) {
    return { at, today, tomorrow, daysAfter2, daysAfter3, daysAfter4, daysAfter5, daysAfter6 };
}

const start = new Date()

const StatusForm = ({ handleNext, form }) => {
    const confirm = useConfirm();
    const device = useDevice();
    const reservationTable = userResavationTable({ start, menu_id: form.menu.id, staff_id: form.staff.id })
    /**
     * Device Settings 
     */
    const [deviceSettings, setDeviceSettings] = React.useState({
        cols: 3,
        tableHeight: { maxHeight: 0.58 }
    });

    /**
     * Page Settings 
     */
    const [page, setPage] = React.useState(0);

    React.useEffect(() => {
        const settings = DeviceSettingMapping[device]
        const tableHeight = { maxHeight: window.innerHeight * settings.tableHeight.maxHeight + 'px' };
        setDeviceSettings({ ...settings, tableHeight });

        const cols = settings.cols
        const date = moment(start)
        const startAt = cols * page
        date.add(startAt, 'days');

        const headers = [{ id: 'blank', label: '' }]

        for (let i = 0; i < cols; i++) {
            const day = date.add(i && 1, 'days')
            const id = day.format('YYYYMMDD')
            headers.push({ id, label: day.format('M/D') })
        }
        setColums(headers)

        const data =
            reservationTable.map(row => createData(row.time, row[startAt], row[startAt + 1], row[startAt + 2], row[startAt + 3], row[startAt + 4], row[startAt + 5], row[startAt + 6]))
        setRows(data)
    }, [reservationTable, device, page]);

    /**
     * Compornent State 
     */
    const [navigation, setNavigation] = React.useState(1);
    const [columns, setColums] = React.useState([]);
    const [rows, setRows] = React.useState([]);

    const handleChange = async (_, newValue) => {
        if (newValue && Const.reservableRange <= (page + 1) * deviceSettings.cols) {
            await confirm({ alert: true, description: 'これ以上先の予約はできません' })
            return
        }

        setNavigation(newValue)

        if (newValue) next()
        else prev();
    };

    const prev = () => {
        console.log('prev')
        setPage(page - 1)
    };

    const next = () => {
        console.log('next')
        setPage(page + 1)
    };

    const handleClickOpenBooking = (day, at) => {
        const now = moment(start);
        const date = now.add(day + page * deviceSettings.cols, "days").format("YYYY-MM-DD");
        handleNext({ date, at })
    };
    //my changed code
    const timeChange = (item) => {
        let hour = item.slice(0, 2);
        let minute = item.slice(2, 4);
        let endhour;
        let endminute;
        if (minute == '30') {
            endhour = parseInt(hour) + 1;
            endminute = '00';
        }
        else {
            endhour = hour;
            endminute = '30';
        }
        const result = (hour + ':' + minute + ' - ' + endhour + ':' + endminute);
        return result;
    }
    return (
        <>
            <Paper sx={{ marginTop: '30px' }} elevation={3} >
                <TableContainer style={deviceSettings.tableHeight}>
                    <Table stickyHeader aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {columns.slice(0, deviceSettings.cols + 1).map((column) => (
                                    <TableCell
                                        key={column.id}
                                        size={'small'}
                                        align="center"
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (

                                <TableRow key={row.at}>
                                    <TableCell component="th" scope="row">
                                        {timeChange(row.at)}
                                    </TableCell>
                                    <TableCell align="center">
                                        {!!row.today && (row.today === 'OK') && (
                                            <Link color="inherit" onClick={() => handleClickOpenBooking(0, row.at)}>{row.today}</Link>
                                        )}
                                    </TableCell>
                                    <TableCell align="center">
                                        {!!row.tomorrow && (row.tomorrow === 'OK') && (
                                            <Link color="inherit" onClick={() => handleClickOpenBooking(1, row.at)}>{row.tomorrow}</Link>
                                        )}
                                    </TableCell>
                                    <TableCell align="center">
                                        {!!row.daysAfter2 && (row.daysAfter2 === 'OK') && (
                                            <Link color="inherit" onClick={() => handleClickOpenBooking(2, row.at)}>{row.daysAfter2}</Link>
                                        )}
                                    </TableCell>
                                    {4 <= deviceSettings.cols && (
                                        <TableCell align="center">
                                            {!!row.daysAfter3 && (row.daysAfter3 === 'OK') && (
                                                <Link color="inherit" onClick={() => handleClickOpenBooking(3, row.at)}>{row.daysAfter3}</Link>
                                            )}
                                        </TableCell>
                                    )}
                                    {4 < deviceSettings.cols && (
                                        <>
                                            <TableCell align="center">
                                                {!!row.daysAfter4 && (row.daysAfter4 === 'OK') && (
                                                    <Link color="inherit" onClick={() => handleClickOpenBooking(4, row.at)}>{row.daysAfter4}</Link>
                                                )}
                                            </TableCell>
                                            <TableCell align="center">
                                                {!!row.daysAfter5 && (row.daysAfter5 === 'OK') && (
                                                    <Link color="inherit" onClick={() => handleClickOpenBooking(5, row.at)}>{row.daysAfter5}</Link>
                                                )}
                                            </TableCell>
                                            <TableCell align="center">
                                                {!!row.daysAfter6 && (row.daysAfter6 === 'OK') && (
                                                    <Link color="inherit" onClick={() => handleClickOpenBooking(6, row.at)}>{row.daysAfter6}</Link>
                                                )}
                                            </TableCell>
                                        </>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <Paper elevation={1} >
                <Navigation navigation={navigation} page={page} handleChange={handleChange} />
            </Paper>
        </>
    );
}

export default StatusForm