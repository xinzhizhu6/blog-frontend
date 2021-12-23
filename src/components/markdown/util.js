export function getlang(str) {
	if (typeof str != 'string') return str

	const array = str.split('-')
	return array[1]
}

export function insertTemp(str, index, target) {
	const start = str.substr(0, index)
	const end = str.substr(index, str.length)
	return start + target + end
}


/**
 * 滚动条联动
 * @param {HTMLElement} origin
 * @param {HTMLElement} target
 */
export function followScroll(origin, target) {
	if (!(origin instanceof HTMLElement) || !(target instanceof HTMLElement)) return

	const offset = 10
	const left = 0
	let top =
		(target.scrollHeight * (origin.scrollTop + origin.clientHeight / 2)) / origin.scrollHeight - target.clientHeight / 2
	if (origin.scrollTop < offset) {
		top = 0
	}
	if (origin.scrollHeight - origin.clientHeight - origin.scrollTop < offset) {
		top = target.scrollHeight
	}
	target.scrollTo(left, top)
}

/**
 * 获取正在编辑的坐标
 * @param {HTMLElement} elem
 */
 export function getPosition(elem) {
	if (!elem instanceof HTMLElement) return
	return {
		start: elem?.selectionStart || 0,
		end: elem?.selectionEnd || 0
	}
}

/**
 * 设置正在编辑的坐标
 * @param elem
 * @param pos
 */
export function setPosition(elem, pos) {
	if (!elem instanceof HTMLElement) return
	setTimeout(() => {
		elem.setSelectionRange(pos, pos)
		elem.focus()
	})
}