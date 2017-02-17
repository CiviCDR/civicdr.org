# civicdr.org
Website for [CiviCDR](civicdr.org).

# development
This website is build using [choo](https://github.com/yoshuawuyts/choo).

`master` branch contains pre-compiled version of the code that you will be
working with prior to deploying. 

`gh-pages` contains the compiled version that you can then access over at the
main site.

To make changes to this repository, please follow these steps:

1. Fork this repo.
2. Clone your forked version.
3. Run `npm install` to make sure you have all the right dependencies. You will
need to make sure node and npm are installed on your machine.
4. Running `npm run start` will start a local version that you can access at
localhost:8080. [bankai](https://github.com/yoshuawuyts/bankai) will watch for
changes. 
5. Once you're ready, please submit a pull request to this repo.
6. Once the PR is rebased and merged, you can deploy back from the `master`
branch with `npm run publish`. This command will compile, copy over the assets
to `dist/` and push over to `gh-pages` so you don't have to.
