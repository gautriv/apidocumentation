#!/usr/bin/env bash
# Wrapper: lint specific lesson files, or (with no args) lint staged + changed _docs/*.md.
# Legacy lessons that have not yet been rewritten are NOT linted by default; passing them
# explicitly will lint them (useful for spot-checking).
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
root="$(cd "$here/.." && pwd)"

if [ "$#" -gt 0 ]; then
  files=("$@")
else
  cd "$root"
  # Staged + modified + new files matching _docs/*.md, deduped.
  mapfile -t files < <(
    {
      git diff --cached --name-only -- '_docs/*.md'
      git diff --name-only -- '_docs/*.md'
      git ls-files --others --exclude-standard -- '_docs/*.md'
    } | sort -u
  )
  if [ "${#files[@]}" -eq 0 ]; then
    echo "voice-check: no changed _docs/*.md files. Pass paths explicitly to lint legacy lessons." >&2
    exit 0
  fi
fi

ruby "$here/voice-check.rb" "${files[@]}"
