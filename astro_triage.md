{
  "code": 200,
  "data": {
    "description": "",
    "html": "<html><head><meta name=\"color-scheme\" content=\"light dark\"></head><body><pre style=\"word-wrap: break-word; white-space: pre-wrap;\">---\nname: triage\ndescription: Triage a bug report. Reproduces the bug, diagnoses the root cause, verifies whether the behavior is intentional, and attempts a fix. Use when asked to \"triage issue #1234\", \"triage this bug\", or similar.\n---\n\n# Triage\n\nTriage a bug report end-to-end: reproduce the bug, diagnose the root cause, verify whether the behavior is intentional, and attempt a fix.\n\n## Input\n\nYou need either:\n\n- `issueTitle` and `issueBody` provided in args (preferred — use these directly as the bug report), OR\n- A GitHub issue number or URL mentioned in the conversation (use `gh issue view` to fetch details)\n\nIf a `triageDir` is provided in args, use that as the working directory for the triage. Otherwise, default to `triage/gh-<issue_number>` (if you have an issue number) or `triage/current`.\n\n## Step 1: Reproduce\n\nRead and follow [reproduce.md](reproduce.md). Use a subagent for this step to isolate context.\n\nAfter completing reproduction, check the result:\n\n- If the issue was **skipped** (host-specific, unsupported version, etc.) — skip to Output.\n- If the issue was **not reproducible** — skip to Output.\n- If the issue was **reproduced** — continue to Step 2.\n\n## Step 2: Diagnose\n\nRead and follow [diagnose.md](diagnose.md). Use a subagent for this step to isolate context.\n\nAfter completing diagnosis, check your confidence:\n\n- If confidence is **low** — skip to Output.\n- If confidence is **medium** or **high** — continue to Step 3.\n\n## Step 3: Verify\n\nRead and follow [verify.md](verify.md). Use a subagent for this step to isolate context.\n\nAfter completing verification, check the verdict:\n\n- If the verdict is **intended-behavior** — skip to Output. The issue is not a bug; do not attempt a fix.\n- If the verdict is **bug** or **unclear** — continue to Step 4.\n\n## Step 4: Fix\n\nRead and follow [fix.md](fix.md). Use a subagent for this step to isolate context.\n\nWhether the fix succeeds or fails, continue to Output.\n\n## Output\n\nAfter completing the triage (or exiting early), you may suggest generating a GitHub comment using [comment.md](comment.md) if the user would find it useful.\n</pre></body></html>",
    "title": "",
    "url": "https://raw.githubusercontent.com/withastro/astro/main/.agents/skills/triage/SKILL.md",
    "usage": {
      "tokens": 568
    }
  },
  "meta": {
    "usage": {
      "tokens": 568
    }
  },
  "status": 20000
}