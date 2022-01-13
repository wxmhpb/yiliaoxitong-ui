import request from '@/utils/request'

// 查询科室列表
export function listKeshi(query) {
  return request({
    url: '/his/keshi/list',
    method: 'get',
    params: query
  })
}

// 查询科室详细
export function getKeshi(deptId) {
  return request({
    url: '/his/keshi/' + deptId,
    method: 'get'
  })
}

// 新增科室
export function addKeshi(data) {
  return request({
    url: '/his/keshi',
    method: 'post',
    data: data
  })
}

// 修改科室
export function updateKeshi(data) {
  return request({
    url: '/his/keshi',
    method: 'put',
    data: data
  })
}

// 删除科室
export function delKeshi(deptId) {
  return request({
    url: '/his/keshi/' + deptId,
    method: 'delete'
  })
}
