---
description: Start new work — create a GitHub issue (kickoff comment + assignee) and a branch off main
argument-hint: <short description of the task> [@assignee]
allowed-tools: Bash(gh:*), Bash(git:*)
---

You are starting a new piece of work in the **current** repository. The task is:

**$ARGUMENTS**

Do the following steps in order. Only stop to ask if something is genuinely ambiguous — otherwise use good defaults and keep moving.

1. **Confirm the repo.** Run `gh repo view --json nameWithOwner,defaultBranchRef -q '.nameWithOwner + " (default: " + .defaultBranchRef.name + ")"'`. Default branch is `main`. If it errors or isn't a git repo, stop and say to `cd` into the right project.

2. **Task description.** If `$ARGUMENTS` is empty, ask for a one-line description of the work. Otherwise use it.

3. **Draft the issue.** Write a concise **title** (imperative, ~≤70 chars) and a short **body** (2–5 sentences: what we're doing and why; add a "Tasks" checklist if there are obvious sub-steps). Show the title + body for a one-line confirm before creating — unless the task is trivially clear.

4. **Determine the assignee.** Default to `@me` (whoever is running the command). If someone else is named (e.g. `@somelogin`, or "assign to X"), use that login instead.

5. **Create the issue:**
   ```
   gh issue create --title "<title>" --body "<body>" --assignee <@me or login>
   ```
   Capture the new issue number and URL.

6. **Add a kickoff comment — in the author's words, not yours.** STOP and ask: "What should the kickoff comment say?" Wait for the reply, then post it **verbatim** (do not rewrite):
   ```
   gh issue comment <number> --body "<exact wording>"
   ```
   - If comment text was already provided in the command (e.g. `comment: "..."`), use it verbatim and don't ask again.
   - If told to skip the comment, skip this step.

7. **Create the work branch off an up-to-date main:**
   ```
   git fetch origin
   git checkout main
   git pull --ff-only origin main
   git checkout -b <number>-<kebab-slug-of-title>
   git push -u origin <number>-<kebab-slug-of-title>
   ```
   Branch convention: `<issue-number>-<short-kebab-title>` (e.g. `42-fix-scorecard-drag-drop`). Slug under ~50 chars.

8. **Report back:** the issue URL, the assignee, and the branch name. Remind that `/ship-work` opens the PR when the work is done.

Do NOT start writing feature code in this command — this only sets up the issue + branch. Stop after step 8.
