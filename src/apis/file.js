import request from '@/utils/request'

/**
 * 上传图片
 * @param {string} userId 用户ID
 * @param {FormData} formData 图像FormData
 */
export const uploadImage = formData =>
	request({
		url: `file/upload_image`,
		method: 'POST',
		data: formData,
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})
