import { mkdirSync, mkdtempSync, writeFileSync } from 'fs'
import { tmpdir } from 'os'
import { dirname, join, sep } from 'path'
import { create } from '@actions/artifact'

export async function upload(
  name: string,
  path: string,
  content: string,
): Promise<void> {
  const dir = mkdtempSync(`${tmpdir()}${sep}`)
  const filename = join(dir, path)
  mkdirSync(dirname(filename), { recursive: true })
  writeFileSync(filename, content)

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
