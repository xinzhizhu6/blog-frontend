import { combineReducers } from 'redux'
import * as common from './common'
import * as sider from './sider'
import * as article from './article'
import * as setting from './setting'


export default combineReducers({
	...common, ...sider, ...article, ...setting
})
