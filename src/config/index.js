import localCfg from './local'
import remoteCfg from './remote'

const env = process.env.REACT_APP_PROXY_ENV
console.log('env: ', env)

export default env === 'production' ? remoteCfg : localCfg
