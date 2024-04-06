#!/bin/env node
/** 
 * 
 * MIT License
 * 
 * Copyright (c) 2024 Bassem Dghaidi
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 * ---
 * 
 * This code is for illustration purposes. Do not use it in production.
 * 
 * This script will crawl all the pages of this website and call each external URL
 * to make sure none return a 404 error. These are markdown pages.
 * 
 * Usage:
 *  node url-checker.js -t <timeout> -p <path>
 * 
 * Options:
 *  -t, --timeout <timeout>  The timeout in seconds for each request. Default is 5000.
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const marked = require('marked');
const { ArgumentParser } = require('argparse');
const { exit } = require('process');

const parser = new ArgumentParser({
    description: 'URL Checker'
});
parser.add_argument('-t', '--timeout', { help: 'The timeout in seconds for each request' });
parser.add_argument('-d', '--directory', { help: 'The path to the posts directory' });
const args = parser.parse_args();
const timeoutSeconds = args.timeout * 1000 || 5000;
const postsDir = args.dir || __dirname + '/../src/posts';

// Recusively get all the markdown files (.md) only in the posts directory
const walkSync = (dir, filelist = []) => {
    fs.readdirSync(dir).forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            filelist = walkSync(filePath, filelist);
        } else {
            if (filePath.endsWith('.md')) {
                filelist = [...filelist, filePath];
            }
        }
    });
    return filelist;
}

// Read a list of file paths, parse the markdown and return all the URLs
const getUrls = (filePaths) => {
    let urls = [];
    filePaths.forEach(filePath => {
        const markdown = fs.readFileSync(filePath, { encoding: 'utf-8' });
        const tokens = marked.lexer(markdown);
        // Recursively go through the tokens to find all the links
        const findLinks = (token) => {
            if (token.type === 'link') {
                urls = [...urls, token.href];
            }
            if (token.tokens) {
                token.tokens.forEach(findLinks);
            }
        }
        tokens.forEach(findLinks);
    });
    return urls;
}

// Call each URL and if the status code is 404, print an error and exit with non 0
const checkUrl = async (url) => {
    try {
        const response = await axios.get(url, { timeoutSeconds });
        console.log(`${response.status} - ${url}`);
    }
    catch (error) {
        console
            .error(`404 - ${url}`);
        exit(1);
    }
}

// Run
const filePaths = walkSync(postsDir);
const urls = getUrls(filePaths);
urls.forEach(url => checkUrl(url));
console.log('All URLs are valid');