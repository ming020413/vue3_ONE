import request from './request'

export let getReadListData = (date: any) => {
    return request({
        url: `find/bymonth/1/${date}`,
    })
}