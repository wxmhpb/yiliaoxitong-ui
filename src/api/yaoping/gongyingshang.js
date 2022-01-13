import request from '@/utils/request'

// 查询供应商信息管理列表
export function listGongyingshang(query) {
  return request({
    url: '/yaoping/gongyingshang/list',
    method: 'get',
    params: query
  })
}

// 查询供应商信息管理详细
export function getGongyingshang(id) {
  return request({
    url: '/yaoping/gongyingshang/' + id,
    method: 'get'
  })
}

// 新增供应商信息管理
export function addGongyingshang(data) {
  return request({
    url: '/yaoping/gongyingshang',
    method: 'post',
    data: data
  })
}

// 修改供应商信息管理
export function updateGongyingshang(data) {
  return request({
    url: '/yaoping/gongyingshang',
    method: 'put',
    data: data
  })
}

// 删除供应商信息管理
export function delGongyingshang(id) {
  return request({
    url: '/yaoping/gongyingshang/' + id,
    method: 'delete'
  })
}
