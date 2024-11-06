import request from '@/utils/request'

// 分页查询
export function pageQuery(pageNum, pageSize) {
    const data = {
        pageNum,
        pageSize
    }
    return request({
        url: '/salary/query',
        method: 'post',
        data: data
    })
}

//计算工资
export function calc(employeeId) {
    return request({
        url: '/salary/calc/' + employeeId,
        method: 'get'
    })
}

// 获取部门列表
export function getDeptList() {
    return request({
        url: '/salary/dept/list',
        method: 'get'
    })
}

//获取所有部门工资
export function getAllDeptSalary() {
    return request({
        url: '/salary/calc/dept',
        method: 'get'
    })
}

//获取部门工资
export function getDeptSalary(dept) {
    return request({
        url: '/salary/dept/calc/' + dept,
        method: 'get'
    })
}