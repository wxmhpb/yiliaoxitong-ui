import request from '@/utils/request'

// 查询厂家信息管理列表
export function listChangjia(query) {
  return request({
    url: '/yaoping/changjia/list',
    method: 'get',
    params: query
  })
}

// 查询厂家信息管理详细
export function getChangjia(id) {
  return request({
    url: '/yaoping/changjia/' + id,
    method: 'get'
  })
}

// 新增厂家信息管理
export function addChangjia(data) {
  return request({
    url: '/yaoping/changjia',
    method: 'post',
    data: data
  })
}

// 修改厂家信息管理
export function updateChangjia(data) {
  return request({
    url: '/yaoping/changjia',
    method: 'put',
    data: data
  })
}

// 删除厂家信息管理
export function delChangjia(id) {
  return request({
    url: '/yaoping/changjia/' + id,
    method: 'delete'
  })
}
