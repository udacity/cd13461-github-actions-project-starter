# CorpX Documentation

Welcome to CorpX documentation! Our documentation serves as a vital resource for understanding our products, services, and processes. It ensures clarity, consistency, and accessibility for both internal teams and external users. We value your contributions to keeping our documentation robust and up-to-date.

## Why Documentation Matters

Clear and comprehensive documentation is essential for several reasons:

- **Accessibility**: It provides easy access to information for all stakeholders, including developers, designers, and end-users.
- **Consistency**: It ensures consistency in communication, reducing confusion and errors.
- **Onboarding**: New team members can quickly familiarize themselves with our products and processes, accelerating their onboarding process.
- **Troubleshooting**: It serves as a reference point for troubleshooting common issues and resolving queries efficiently.

## Your task

You are a new DevOps engineer at CorpX. You have been tasked with creating a GitHub Actions workflow to automate the deployment process of CorpX's internal knowledge base.

This knowledge base receives contributions on a daily basis through pull requests to this repository. The previous engineers have been releasing the changes manually at the end of each week. However, this is not good enough for CorpX. They want to publish changes as soon as they are merged to the main branch.

## Setup

### Test your environment

1. Launch your project workspace and open the terminal (Use the menu bar at the top: Terminal > New Terminal)

1. Run the web server and make sure the docs are rendered, with images and style properly:

    ```bash
    $ npm run workspace:dev

    ...
    Starting up http-server, serving ./

    http-server version: 14.1.1
    
    http-server settings: 
    CORS: disabled
    Cache: 3600 seconds
    Connection Timeout: 120 seconds
    Directory Listings: visible
    AutoIndex: visible
    Serve GZIP Files: false
    Serve Brotli Files: false
    Default File Extension: none
    
    Available on:
      http://127.0.0.1:8080
      http://10.124.12.199:8080
    Hit CTRL-C to stop the server
    Open: http://127.0.0.1:8080/_site/

    ```

1. If everything went well, you will see: `Open: http://127.0.0.1:8080/_site/`

1. To open the site, you need to navigate to the "Ports" tab (right next to the terminal tab)

1. Under "Local Address" you should see a URL similar to this: `https://yotzaustpu.prod.udacity-student-workspaces.com/proxy/8080/`

1. Click on the "Globe" icon to open the link directly in your browser or copy and paste the full link
    1. You should be able to see the knowledge base fully rendered and you should be able to navigate through all the links

Once the above is done, you can proceed to the next steps.

## Requirements

Create a new GitHub Actions workflow called `deploy.yaml`. This workflow should at least:

1. Trigger a workflow run when changes are pushed to the `main` branch and only the `main` branch. All pushes to other branches should be ignored
    1. Do no trigger a run when any of these files have been changed:
        1. `.gitignore`
        2. `README.md`
        3. `CONTRIBUTING.md`
        4. `LICENSE`
2. Trigger a workflow run when for every `pull_request` created again the `main` branch only. All pull requests created against other branches should be ignored
3. In case of an emergency, you'll want the option to trigger a force deployment. Your workflow should include that option
4. Your workflow should have a maximum of 1 run at all times. If other runs are queued, the older runs should be canceled
5. Your workflow should have at least 3 jobs:
    1. `test`
    2. `build`
    3. `deploy`
6. Your workflow should run fast, it should not take more than `<TODO: define how fast in seconds>` (on average) to run all the jobs
7. You must adopt the security best practices discussed in the course and [outlined in the docs](https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions)

### `test` job

For this job, you are required to:

1. Checkout the repository
2. Setup Node (version 18+)
3. Run all the linters
4. Run all the scripts in the folder `script/**`
5. You should define and use a repository variable named `URL_CHECKER_TIMEOUT` to configure the `timeout` value for the `script/url-checker.js` script
    1. Use any reasonable value (in seconds)

The job should fail if any of its steps fail.

### `build` job

For this job, you are required to:

1. Make sure that the `test` ran and succeeded
2. Checkout the repository
3. Setup pages using `actions/configure-pages@v4`
4. Build the static pages
    1. In order for 11ty to build your site successfully, it requires an environment variable `PATH_PREFIX` to be set and to have the value of the name of your repository
    2. The `PATH_PREFIX` should be of the following format: `/repository name/`. Make sure that the repository name does not include the repository owner! Do not forget the `/` at the start and end
5. Upload all the content of the built `_site` as an artifact

The job should fail if any of its steps fail.

### `deploy` job

For this job, you are required to:

1. Never deploy changes if any of the previous jobs fail
2. Deploy to GitHub pages your site
3. Using the GitHub CLI, authenticate to GitHub with `GITHUB_TOKEN` and create an issue that reports the status of the deployment, with:
    1. Title: `<date> - Deployment: <status>`
        1. Make sure to replace `<date>` with today's date
        2. Make sure to replace `<status>` with the outcome of the deployment (succeeded or failed)
    2. Body: `URL: <url>`
        1. Make sure to replace `<url>` with the link to the knowledge base

The job should fail if any of its steps fail.

## Deliverables

Once you've successfully completed your project, you need to submit the following:

1. The `deploy.yml` workflow file
2. The link to your repository
3. The link to your published knowledge base website on GitHub pages

## Project Structure

```plaintext
spruecss-eleventy-documentation-template/
├─ node_modules/
├─ dist/
├─ src/
│  ├─ _data/
│  ├─ _includes/
│  ├─ css/
│  ├─ filters/
│  ├─ font/
│  ├─ img/
│  ├─ js/
│  ├─ posts/
│  ├─ scss/
│  ├─ shortcodes/
│  ├─ transforms/
│  ├─ changelog.md
│  ├─ faq.md
│  ├─ index.md
├─ .eleventy.js
├─ package.json
├─ README.md
├─ ...
```

- **_data**: Some global data, like the name of your site and helpers like the active navigation element or current year.
- **__includes**: All of the layout and partial templates.
- **css**: The compiled CSS.
- **filters**: The additional filters that you can use.
- **font**: The custom fonts.
- **img**: The static image files.
- **posts**: The markdown contents.
- **scss**: The Sass files.
- **shortcodes**: The available shortcodes.
- **transforms**: The transformations.
