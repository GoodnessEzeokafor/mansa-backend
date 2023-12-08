# MANSA

---

## Contribution

---

1. PRs detail examples before committing


### Issue
* QA engineer can't test phone verification because twilo not sending sms on staging

### What has changed:
1. Changed line 97 on utils.js file
2. restricted sending of sms to just staging and production

### What reviewers should know:
* used the ternary expression


---

2. Creating Git branch names for adding features, bug fixes, & code cleanups respectively:

- feat/branch-name or feature/branch-name
- fix/branch-name or bug-fix/branch-name    
- chore/branch-name

---

3. Tagging PR changes

- bug fixes: `fix:summary-of-fix` or `bug-fix:summary-of-fix`
- Features added: `feat:commit-message` or `feature:commit-message`
- Code cleanup `chore:commit-message`


The above is simplified in this table:

| Task            | Branch naming     | PR changes tagging     |
| --------------- | ----------------- | ---------------------- |
| Adding features | feat/branch-name  | `feat:commit-message`  |
| Bug fixes       | fix/branch-name   | `fix:summary-of-fix`   |
| Code cleanup    | chore/branch-name | `chore:commit-message` |
| Code deployment    | deployment/branch-name | `deployment:commit-message` |
