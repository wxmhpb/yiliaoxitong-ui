import request from '@/utils/request'

// 查询排班表列表
export function listPaiban(query) {
  return request({
    url: '/his/paiban/list',
    method: 'get',
    params: query
  })
}
export function listBanci(query) {
  return request({
    url: '/his/paiban/list1',
    method: 'get',
    params: query
  })
}

// 查询排班表详细
export function getPaiban(id) {
  return request({
    url: '/his/paiban/' + id,
    method: 'get'
  })
}

// 新增排班表
export function addPaiban(data) {
  return request({
    url: '/his/paiban',
    method: 'post',
    data: data
  })
}

// 修改排班表
export function updatePaiban(data) {
  return request({
    url: '/his/paiban',
    method: 'put',
    data: data
  })
}

// 删除排班表
export function delPaiban(id) {
  return request({
    url: '/his/paiban/' + id,
    method: 'delete'
  })
}
