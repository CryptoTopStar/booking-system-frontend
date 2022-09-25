import * as API from '../api/staff';

/**
 * get a list of staffs
 */
async function list() {
    const response = await API.list().then((res) => { return res });
    return response
}


const StaffService = {
    list,
    // get,
    // update,
    // cancel,
    // remove
}

export default StaffService