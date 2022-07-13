import * as fs from 'fs'
import * as path from 'path'
import { IGNORE_I18N_PATH } from '../../constant'
import { Text, transformChinese } from '../../transformer/transformChinese'
import writeOutputFile from './writeOutputFile'
import writeDirExportEntry from './writeDirExportEntry'
import { ExtConfig } from '../config/interface'

/**
 * 递归遍历文件并对中文进行抽取
 * @export
 * @param {string} pathName 当前遍历路径
 */
export function traverseDir(pathName: string, getUnMatchedEntries?: (entries: Text[]) => void) {
  const { whiteList } = <ExtConfig>global['intlConfig']
  if (fs.statSync(pathName).isFile()) {
    // 单个文件
    if (!whiteList.includes(path.extname(pathName))) {
      return
    }
    const text = fs.readFileSync(pathName).toString()
    const result = transformChinese(text, pathName)
    getUnMatchedEntries(result.filter((item) => !item.isMatch))
    writeOutputFile(result, pathName)
  } else {
    // 文件夹
    const files = fs.readdirSync(pathName)
    files.forEach((file) => {
      const absPath = path.resolve(pathName, file)
      if (absPath !== IGNORE_I18N_PATH) {
        traverseDir(absPath, getUnMatchedEntries)
      }
    })
    // 针对文件夹写入入口文件
    writeDirExportEntry(pathName)
  }
}