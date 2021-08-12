import AnsiRegex from 'ansi-regex'

const ansiRegex = AnsiRegex()
const changesRegex = /^(  *)([+-])/
const updatedRegex = /^(  *)~/
const noChanges = 'Your infrastructure matches the configuration'
const objectsChanged = 'Objects have changed outside of Terraform'
const refreshingState = 'Refreshing state...'
const seperator = '─'.repeat(77)

export function parsePlan(content: string): string {
  if (content.includes(noChanges)) {
    return noChanges
  }

  const lines = content
    .split('\n')
    .filter((line) => !line.includes(refreshingState))
    .map((line) =>
      line
        .replace(ansiRegex, '')
        .replace(changesRegex, '$2$1')
        .replace(updatedRegex, '!$1'),
    )

  const i = content.includes(objectsChanged) ? 1 : 0
  return lines
    .join('\n')
    .split(seperator, i + 1)
    [i].trim()
}
