import request from '@/utils/request'

/**
 * 文章模糊搜索
 * @param {string} keywords 关键字
 */
export const search = keywords =>
	request({
		url: `common/search`,
		method: 'GET',
		params: { keywords }
	})

/**
 * 获取文档 url
 */
export const fetchUrls = () => request(`common/urls`)
