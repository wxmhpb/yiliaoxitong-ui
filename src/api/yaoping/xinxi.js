import request from '@/utils/request'

// 查询药品信息管理列表
export function listXinxi(query) {
  return request({
    url: '/yaoping/xinxi/list',
    method: 'get',
    params: query
  })
}

// 查询药品信息管理详细
export function getXinxi(id) {
  return request({
    url: '/yaoping/xinxi/' + id,
    method: 'get'
  })
}

// 新增药品信息管理
export function addXinxi(data) {
  return request({
    url: '/yaoping/xinxi',
    method: 'post',
    data: data
  })
}

// 修改药品信息管理
export function updateXinxi(data) {
  return request({
    url: '/yaoping/xinxi',
    method: 'put',
    data: data
  })
}

// 删除药品信息管理
export function delXinxi(id) {
  return request({
    url: '/yaoping/xinxi/' + id,
    method: 'delete'
  })
}
