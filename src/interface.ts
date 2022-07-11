export interface ExtConfig {
  outputPath: string
  rootPath: string
  extractOnly: boolean
  whiteList: string[]
  prefix?: string[]
  templateString?: {
    funcName: string
  }
  langs?: string[]
  /**
   * 字段命名前缀
   */
  fieldPrefix?: string
  /**
   * 当次运行的版本名
   */
  versionName?: string
  /**
   * 远程API地址
   */
  origin?: string
  /**
   * 用户访问权限
   */
  accessKey?: string
}

export interface ExtCustomConfig extends Omit<ExtConfig, 'outputPath' | 'versionName'> {}

export interface ReplacementItem {
  pos: number
  end: number
  text: string | number
}

export interface OriginEntryItem {
  key: string
  mainLang: string
  mainLangText: string
  langs: any
}
