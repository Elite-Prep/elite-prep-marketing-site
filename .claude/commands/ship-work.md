---
description: Open a PR from the current work branch to main, linking its issue and (optionally) requesting review
argument-hint: [@reviewer github login]
allowed-tools: Bash(gh:*), Bash(git:*)
---

You are ready to merge the current work branch to `main`. Optional argument = a reviewer's GitHub login: **$ARGUMENTS**

Do the following in order:

1. **Find the branch + issue.** Run `git branch --show-current`. It should start with an issue number (e.g. `42-...`). Extract `N`.
   - If on `main`, STOP and say to run this from a work branch.
   - If no leading issue number, ask which issue this closes (or proceed with no `Closes` link).

2. **Check the working tree.** Run `git status --short`. If there are uncommitted changes, list them and ask whether to commit them (write a clear, conventional message) or stop. Don't commit silently.

3. **Push the branch:** `git push -u origin <branch>`.

4. **Create the PR:**
   ```
   gh pr create --base main --head <branch> \
     --title "<issue title, or concise summary>" \
     --body "Closes #N

   ## Summary
   <2–4 bullets on what changed>

   ## Testing
   <how it was verified, or 'not yet tested'>"
   ```
   - Body MUST include `Closes #N` (when there's a linked issue) so merging auto-closes it.
   - Derive the summary from the actual diff (`git log main..HEAD --oneline`, `git diff main...HEAD --stat`).

5. **Reviewer.** If `$ARGUMENTS` names a reviewer, add `--reviewer <login>`. Otherwise note that no automatic reviewer is configured yet — the PR is open for manual review or a review tool once one is set up (see the "Merge gate" section of `DEV-WORKFLOW.md`).

6. **Report** the PR URL. Suggest running `/review-fixes` to pull any Copilot/reviewer comments straight into chat.

**Note:** `main` currently has NO required-review gate, so this PR *can* be merged without approval. To make review mandatory, see the "Merge gate" section of `DEV-WORKFLOW.md`.
