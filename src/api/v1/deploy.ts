import { requireManager } from "./decorator/requireManager"
import { errorTypes, ResponseError } from "../../libs/error"
import tar from 'tar'
import { mkdir, writeFile } from "fs/promises"
import path from "path"
import { existsSync } from "fs"

let isWorking = false
export const deploy = requireManager(async ({ bundle }: { bundle: string }) => {
  try {
    if (isWorking) throw ResponseError.create(errorTypes['deploying'])
    isWorking = true
    if (typeof bundle !== 'string') throw ResponseError.create(errorTypes['param-error'], { params: 'bundle is not a valid base64 string' })
    if (!existsSync(path.resolve(__dirname, '../../../versions'))) {
      await mkdir(path.resolve(__dirname, '../../../versions'))
    }
    const bundlePath = path.resolve(__dirname, '../../../versions', `bundle${Date.now()}.tar.gz`)
    try {
      await writeFile(bundlePath, Buffer.from(bundle, 'base64'))
    } catch (e) {
      throw ResponseError.create(errorTypes['default'], { message: 'write file error' })
    }
    try {
      if (!existsSync(path.resolve(__dirname, '../../../public'))) {
        await mkdir(path.resolve(__dirname, '../../../public'))
      }
      await tar.x({
        file: bundlePath,
        cwd: path.resolve(__dirname, '../../../public'),
        strip: 1,
      })
    } catch (e) {
      throw ResponseError.create(errorTypes['default'], { message: 'tar error' })
    }
    return { message: 'deploy success' }
  } finally {
    isWorking = false
  }
})
