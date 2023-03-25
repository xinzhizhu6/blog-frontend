import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
import reducer from './reducers'
import rootSaga from './sagas'
import config from '@/config'

const sagaMiddleware = createSagaMiddleware()

const logger = createLogger({
	collapsed: (getState, action, logEntry) => !logEntry.error,
	// titleFormatter: (action, time, took) => `ACTION: ${action.type}     - TIME: ${time} - SPEND: ${took.toFixed(2)}`,
	colors: {
		title: () => 'green',
		prevState: () => 'pink',
		action: () => 'blue',
		nextState: () => 'violet',
		error: () => 'red'
	},
	diff: true
})

/**
 * 浏览器环境需要安装react dev tools
 * 如果是electron环境，则需要在electron中安装electron-devtools-installer，并开启
 * REACT_DEVELOPER_TOOLS、REDUX_DEVTOOLS的功能
 */
 const middleWares = [sagaMiddleware, config.REDUX_LOG && logger].filter(Boolean)
 const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
 const enhancer = composeEnhancers(applyMiddleware(...middleWares))
 const store = createStore(reducer, enhancer)
 sagaMiddleware.run(rootSaga)
 
 export default store