import request from '@/utils/request'

/**
 * 获取用户账号信息、基本信息、用户设置
 */
export const initialData = () => request.get(`user/init_data`)

/**
 * 获取用户基本信息
 * @param {string} username 用户名
 */
export const fetchProfile = username =>
	request({
		url: `user/profile`,
		params: { username }
	})

/**
 * 保存用户基本信息
 * @param {Record<string, unknown>} profile 用户基本信息
 */
export const saveProfile = profile =>
	request({
		url: `user/save_profile`,
		method: 'PUT',
		data: profile
	})

/**
 * 注册
 * @param {string} username 用户名
 * @param {string} password 密码
 * @param {string} nickname 名称
 */
export const register = (username, password, profile) =>
	request({
		url: `user/register`,
		method: 'POST',
		data: { username, password, profile }
	})

/**
 * 登录
 * @param {string} username 用户名
 * @param {string} password 密码
 */
export const login = (username, password) =>
	request({
		url: `user/sign_in`,
		method: 'POST',
		data: { username, password }
	})

/**
 * 登出
 * @param {string} username 用户ID
 */
export const logout = () =>
	request({
		url: `user/sign_out`,
		method: 'POST'
	})
