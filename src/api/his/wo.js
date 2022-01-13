import request from '@/utils/request'

// 查询排班表列表
export function listPaiban(query) {
  return request({
    url: '/his/wo/list',
    method: 'get',
    params: query
  })
}
