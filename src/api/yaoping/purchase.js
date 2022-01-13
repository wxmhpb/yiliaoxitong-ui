import request from '@/utils/request'

// 查询采购信息列表
export function listPurchase(query) {
  return request({
    url: '/yaoping/purchase/list',
    method: 'get',
    params: query
  })
}

// 查询采购信息详细
export function getPurchase(id) {
  return request({
    url: '/yaoping/purchase/' + id,
    method: 'get'
  })
}

// 新增采购信息
export function addPurchase(data) {
  return request({
    url: '/yaoping/purchase',
    method: 'post',
    data: data
  })
}

// 修改采购信息
export function updatePurchase(data) {
  return request({
    url: '/yaoping/purchase',
    method: 'put',
    data: data
  })
}

// 删除采购信息
export function delPurchase(id) {
  return request({
    url: '/yaoping/purchase/' + id,
    method: 'delete'
  })
}
