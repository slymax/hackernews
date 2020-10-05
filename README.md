This is a simple bot to schedule posts on [Hacker News](https://news.ycombinator.com).

### Getting started

1. [Download](https://github.com/slymax/hackernews/archive/master.zip) or clone this repository and run `npm install` to install dependencies.
2. Run `cp example.json config.json` and edit the `config.json` file.
3. Run `npm start`.

### Configuration

Set your `username` and `password` in the `config.json` file and add at least one post to the `posts` array. Each post is an object with the following properties: `title` (required), `url` (optional), `text` (optional), `date` (required), `recurring` (optional).

Either `url` or `text` must be set. `date` must be a date in the future and can be any date string that can be parsed by the JavaScript date object constructor. Or, if you set `recurring` to `true`, `date` can also be a cron string – if you want to create a recurring post.
