import * as core from '@actions/core'
import { upload } from './upload'

async function run(): Promise<void> {
  try {
    const name = core.getInput('name', { required: true })
    const path = core.getInput('path', { required: true })
    const content = core.getInput('content', { required: true })

    await upload(name, path, content)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
