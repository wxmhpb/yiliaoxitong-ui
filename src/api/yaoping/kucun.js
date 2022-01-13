import request from '@/utils/request'

// 查询药品信息管理列表
export function listKucun(query) {
  return request({
    url: '/yaoping/kucun/list',
    method: 'get',
    params: query
  })
}

export function listKucun1(query) {
  return request({
    url: '/yaoping/kucun/list1',
    method: 'get',
    params: query
  })
}

