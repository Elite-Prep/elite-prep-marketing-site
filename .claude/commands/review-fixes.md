---
description: Fetch Copilot's (and other reviewers') PR review comments and help apply the fixes
argument-hint: [pr number — defaults to the current branch's PR]
allowed-tools: Bash(gh:*), Bash(git:*)
---

You want to see and act on the review comments on a pull request. PR: **$ARGUMENTS** (if empty, use the PR for the current branch).

Do the following:

1. **Resolve the PR.** If `$ARGUMENTS` is a number, use it. Otherwise find the current branch's PR: `gh pr view --json number,url,title`. Get owner/repo from `gh repo view --json nameWithOwner`.

2. **Fetch the review content:**
   - Overview / summary reviews: `gh api repos/<owner>/<repo>/pulls/<num>/reviews`
   - Inline, line-by-line comments (where Copilot's concrete suggestions live): `gh api --paginate repos/<owner>/<repo>/pulls/<num>/comments`
   - General PR conversation: `gh pr view <num> --comments`

3. **If there are no review comments yet**, say so plainly: Copilot posts ~30–60s after the PR opens, OR Copilot code review isn't enabled on this account yet (see the "Merge gate" section of `DEV-WORKFLOW.md`). Offer to wait and re-check, or stop.

4. **Summarize every comment in plain language, in chat.** For each: the `file:line`, what it flags, the suggested fix, and **your honest take** — worth doing / likely false positive / purely stylistic. Group by file and **number them**.

5. **Ask which to apply** (e.g. "do 1, 3, 4" or "all the real ones"). Do NOT blindly apply everything — Copilot produces false positives; judgment is the point of this step.

6. **For each accepted item:** make the edit, then commit with a clear message (e.g. `Address review: <short>`) and `git push` to the branch — which updates the PR.

7. **Report** what was applied, what was skipped and why, and the PR URL.
