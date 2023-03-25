import request from '@/utils/request'

/**
 * 获取用户配置
 * @param {string} userId 用户ID
 */
export const fetchSetting = userId =>
	request({
		url: `setting/fetch`,
		params: { userId }
	})

/**
 * 更新用户配置
 * @param {string} userId 用户ID
 * @param {Record<string, unknown>} setting 用户配置
 */
export const updateSetting = (setting = {}) =>
	request({
		url: `setting/update`,
		method: 'PUT',
		data: setting
	})
