# Team dev workflow (Claude Code)

Every new piece of work follows the same path: **issue → branch → work → PR → review**.
Three Claude Code slash commands automate the mechanical parts. They live in
`.claude/commands/` in this repo, so **everyone who clones the repo gets them** —
no personal setup needed. Just open Claude Code in the repo folder and type the
command into the chat (it's a terminal app; commands run right in the chat box).

Requirements: the [GitHub CLI](https://cli.github.com) (`gh`) installed and
authenticated (`gh auth login`) as your own GitHub account.

## The workflow

| Step | You type / do | What happens |
|------|---------------|--------------|
| 1 | `/new-work <describe the task>` | Creates a GitHub **issue** (drafts a title/body, shows it for a quick OK) |
| 2 | *(prompted)* type your **comment** | Claude asks for the kickoff comment and posts your exact words |
| 3 | *(prompted)* **assignee** | Defaults to **you**; add `@teammate` in the command to assign someone else |
| 4 | — | Claude creates the **branch** `<issue#>-<slug>` off an up-to-date `main` |
| 5 | *(you code)* | Do the work, commit as you go |
| 6 | `/ship-work` | Opens the **PR** to `main` with `Closes #N` |
| 7 | `/review-fixes` | Claude pulls reviewer/Copilot comments **into chat**; you pick which to apply, Claude edits + pushes |
| 8 | Merge on GitHub | Review, then **Merge** the PR |

Assign to someone else: `/new-work fix the log modal @theirlogin`.
Provide your own comment inline: `/new-work fix log modal — comment: "repro on iPhone with 2+ shots"`.

## Branch naming

`<issue-number>-<short-kebab-title>` — e.g. `42-fix-scorecard-drag-drop`.
Always branched off the latest `main`.

## Merge gate (not enabled yet)

Right now nothing *forces* a review before merge — reviewers eyeball the PR, then
merge. To make review **mandatory**, an admin sets a branch-protection ruleset on
`main` (Repo → Settings → Rules → Rulesets).

- **Heads up:** GitHub won't let you approve your own PR. Requiring "1 approval"
  on a repo with a single maintainer locks that person out of merging their own
  work — so you need a second human reviewer, a bot that can *approve*
  (e.g. CodeRabbit), or a required CI status check instead.
- **GitHub Copilot code review** can be auto-requested on every PR (Settings →
  Rules, or personal Copilot settings), but its review is **advisory** — it
  comments, it can't give the approving review that satisfies the gate. Needs a
  paid Copilot plan (Pro/Pro+/Max).

Once a reviewer path is chosen, enable the ruleset and `/review-fixes` will
surface Copilot's comments automatically after each `/ship-work`.
