import request from '@/utils/request'

// 查询检查费用设置列表
export function listCheck(query) {
  return request({
    url: '/his/check/list',
    method: 'get',
    params: query
  })
}

// 查询检查费用设置详细
export function getCheck(id) {
  return request({
    url: '/his/check/' + id,
    method: 'get'
  })
}

// 新增检查费用设置
export function addCheck(data) {
  return request({
    url: '/his/check',
    method: 'post',
    data: data
  })
}

// 修改检查费用设置
export function updateCheck(data) {
  return request({
    url: '/his/check',
    method: 'put',
    data: data
  })
}

// 删除检查费用设置
export function delCheck(id) {
  return request({
    url: '/his/check/' + id,
    method: 'delete'
  })
}
