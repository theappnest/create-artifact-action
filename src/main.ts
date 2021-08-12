import * as core from '@actions/core'
import { context } from '@actions/github'
import { parsePlan } from './parsePlan'
import { uploadPlan } from './upload'

async function run(): Promise<void> {
  if (!context.payload.pull_request) {
    return
  }
  try {
    const name = core.getInput('name', { required: true })
    const module = core.getInput('module', { required: true })
    const plan = core.getInput('plan', { required: true })

    await uploadPlan(name, module, parsePlan(plan))
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
