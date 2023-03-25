import { combineReducers } from 'redux'
import * as common from './common'
import * as sider from './sider'
import * as article from './article'
import * as setting from './setting'
import * as modal from './modal'


export default combineReducers({
	...common, 
	sider: combineReducers(sider), 
	...article, 
	...setting, 
	modal: combineReducers(modal),
})
