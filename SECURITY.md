# Security policy

This is a static portfolio site with no backend and no user accounts. The only
thing that takes input is the contact form, which sends through Web3Forms with
an hCaptcha check.

## Reporting a problem

If you find a vulnerability, please email rulete.jeric@gmail.com instead of
opening a public issue. A short description and the steps to reproduce are
enough. I'll reply within a few days.

## Scope

Only the latest version on `main` (the live site) is supported.

## How dependencies are kept safe

- Dependabot opens weekly update pull requests and applies security updates.
- A weekly workflow runs `npm audit` and checks registry signatures.
- CI installs with `npm ci --ignore-scripts` and pins every GitHub Action to a
  commit hash.
