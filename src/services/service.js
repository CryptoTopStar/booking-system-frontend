import * as API from '../api/service';

/**
 * get a list of staffs
 */
async function list() {
    const response = await API.list().then((res) => { return res });
    return response
}


const Service = {
    list,
    // get,
    // update,
    // cancel,
    // remove
}

export default Service