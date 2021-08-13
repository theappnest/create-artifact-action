# terraform-upload-plan-action

This GitHub action parses and uploads the result of `terraform plan` for use with [terraform-plan-comment-action](https://github.com/theappnest/terraform-plan-comment-action).

## Usage

```yaml
jobs:
  modules:
    runs-on: ubuntu-latest
    steps:
      - uses: theappnest/terraform-monorepo-action@v1
        id: modules
    outputs:
      modules: ${{ steps.modules.outputs.modules }}

  terraform:
    runs-on: ubuntu-latest
    needs: modules
    strategy:
      matrix:
        module: ${{ fromJson(needs.modules.outputs.modules) }}
    defaults:
      run:
        working-directory: ${{ matrix.module }}
    steps:
      - uses: actions/checkout@v2
      - uses: hashicorp/setup-terraform@v1
      - run: terraform init
      - run: terraform plan
        id: plan
      - uses: theappnest/terraform-upload-plan-action@v1
        with:
          module: ${{ matrix.module }}
          plan: ${{ steps.plan.outputs.stdout }}

  comment:
    runs-on: ubuntu-latest
    needs: terraform
    steps:
      - uses: theappnest/terraform-plan-comment-action@v1
```

## Inputs

- `name` (Optional) The name of the artifact to create. Defaults to `terraform-plan`.
- `module` The name of the Terraform module.
- `plan` The output of `terraform plan`.
