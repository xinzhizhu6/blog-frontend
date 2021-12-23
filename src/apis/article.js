import request from '@/utils/request'

/**
 * 抓取文章列表
 * @param {string} category 分类 不传时获取全部类别
 * @param {number} limit 返回结果数量
 * @param {string} sortBy 排序 type = 'popular'|'latest'|'random'
 */
export const fetchList = ({ category, limit, sortBy = 'latest' }) =>
	request({
		url: `article/list`,
		params: { category, limit, sortBy }
	})

/**
 * 抓取文章详情
 * @param {string} articleId 文章ID
 */
export const fetchDetail = articleId =>
	request({
		url: `article/detail`,
		params: { articleId }
	})

/**
 * 添加文章
 * @param {string} userId 用户ID
 * @param {string} articleDetail 文章详情
 */
export const addArticle = (userId, articleDetail = {}) =>
	request({
		url: `article/add`,
		method: 'POST',
		data: { userId, articleDetail }
	})

/**
 * 增加文章访问量
 * @param {string} articleId 文章ID
 */
export const increaseViews = articleId =>
	request({
		url: `article/increase_views`,
		method: 'POST',
		data: { articleId }
	})

/**
 * 点赞文章
 * @param {string} userId 用户ID
 * @param {string} articleId 文章ID
 */
export const like = (userId, articleId) =>
	request({
		url: `article/likes`,
		method: 'POST',
		data: { userId, articleId }
	})

/**
 * 取消点赞文章
 * @param {string} userId 用户ID
 * @param {string} articleId 文章ID
 */
export const dislike = (userId, articleId) =>
	request({
		url: `article/dislike`,
		method: 'POST',
		data: { userId, articleId }
	})

/**
 * 发表评论
 * @param {string} articleId 文章ID
 */
export const comment = ({ userId, articleId, content }) =>
	request({
		url: `article/comment`,
		method: 'POST',
		data: { articleId, userId, content }
	})

/**
 * 获取该文章所有评论
 * @param {string} articleId 文章ID
 */
export const fetchReviewList = articleId =>
	request({
		url: `article/review_list`,
		params: { articleId }
	})
