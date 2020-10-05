const config = require("./config");
const puppeteer = require("puppeteer");
const schedule = require("node-schedule");

const submit = async post => {
    try {
        console.log(post.title);
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto("https://news.ycombinator.com/submit");
        await page.waitForSelector("input[name=acct]");
        await page.type("input[name=acct]", config.username);
        await page.waitForSelector("input[name=pw]");
        await page.type("input[name=pw]", config.password);
        await page.waitForSelector("input[type=submit]");
        await page.click("input[type=submit]");
        await page.waitForSelector("input[name=title]");
        await page.type("input[name=title]", post.title);
        if (post.url) {
            await page.waitForSelector("input[name=url]");
            await page.type("input[name=url]", post.url);
        } else if (post.text) {
            await page.waitForSelector("textarea[name=text]");
            await page.type("textarea[name=text]", post.text);
        }
        await page.waitForSelector("input[type=submit]");
        await page.click("input[type=submit]");
        await browser.close();
    } catch (error) {
        console.log(error);
    }
};

for (const post of config.posts) {
    if (post.date && post.title.length < 81) {
        schedule.scheduleJob(post.recurring ? post.date : new Date(post.date), () => submit(post));
    }
}
