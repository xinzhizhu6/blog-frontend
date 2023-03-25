/**
 * 读取二进制文件为base64
 * @param file 二进制
 */
export function readFile(file) {
    return new Promise(resolve => {
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onload = () => {
            const base64 = fileReader.result
            resolve(base64)
        }
    })
}