/* 发现页面相关api */
import request from './request'

export let getNoteListData = (date: any) => {
    return request({
        url: `feeds/list/${date}`,
    })
}