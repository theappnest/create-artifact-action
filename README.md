# Create Artifact Action

This GitHub action creates a file from a variable and uploads it to an artifact.

## Usage

```yaml
jobs:
  artifact:
    runs-on: ubuntu-latest
    steps:
      - uses: theappnest/create-artifact-action@v1
        with:
          name: hello
          path: greetings/hello.md
          content: Hello World
```

## Inputs

- `name` (Optional) The name of the artifact to create. Defaults to `artifact`.
- `path` The path of the created file.
- `content` The contents of the created file.
