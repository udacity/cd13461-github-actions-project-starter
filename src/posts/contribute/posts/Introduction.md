---
title: "Introduction"
summary: ""
eleventyNavigation:
  key: Introduction
  parent: Contribute
  order: 1
---

## Your first contribution

We made this guide to help you get started contributing to our documentation.

## Steps

1. Fork the repository
2. Clone the repository to your local machine or use a Codespace

    ```bash
    gh repo clone <your-username>/docs
    ```

3. Create a new branch

    ```bash
    git switch -c my-new-branch
    ```

4. Make your changes

    ```bash
    echo "Hello, World!" > ./posts/<new-section>/posts/hello-world.md
    ```

5. Push your changes

    ```bash
    git add .
    git commit -S -m "Add hello world section"
    git push origin my-new-branch
    ```

6. Create a pull request

    ```bash
    gh pr create --base main --head my-new-branch
    ```

7. Wait for the pull request to be reviewed
8. Merge the pull request
9. Celebrate 🎉
