import { mkdirSync, mkdtempSync, writeFileSync } from 'fs'
import { tmpdir } from 'os'
import { dirname, join, sep } from 'path'
import { create } from '@actions/artifact'

export async function uploadPlan(
  name: string,
  module: string,
  plan: string,
): Promise<void> {
  const dir = mkdtempSync(`${tmpdir()}${sep}`)
  const filename = join(dir, `${module}.txt`)
  mkdirSync(dirname(filename), { recursive: true })
  writeFileSync(filename, plan)

  const artifactClient = create()
  const uploadResponse = await artifactClient.uploadArtifact(
    name,
    [filename],
    dir,
    { retentionDays: 1 },
  )

  if (uploadResponse.failedItems.length > 0) {
    throw new Error('Failed to upload artifact')
  }
}
