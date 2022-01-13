import request from '@/utils/request'

// 查询挂号费用设置列表
export function listGuahao(query) {
  return request({
    url: '/his/guahao/list',
    method: 'get',
    params: query
  })
}

// 查询挂号费用设置详细
export function getGuahao(id) {
  return request({
    url: '/his/guahao/' + id,
    method: 'get'
  })
}

// 新增挂号费用设置
export function addGuahao(data) {
  return request({
    url: '/his/guahao',
    method: 'post',
    data: data
  })
}

// 修改挂号费用设置
export function updateGuahao(data) {
  return request({
    url: '/his/guahao',
    method: 'put',
    data: data
  })
}

// 删除挂号费用设置
export function delGuahao(id) {
  return request({
    url: '/his/guahao/' + id,
    method: 'delete'
  })
}
