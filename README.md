# Park Smarts

A 10-question random quiz on Walt Disney World facts. Answer, get your card
punched, and see a score and rank at the end.

Plain HTML, CSS and JavaScript. No backend, no build step, no dependencies.

> Unofficial fan project. Not affiliated with, sponsored by, or endorsed by
> The Walt Disney Company. Facts are drawn from the Disney Parks Blog article
> [Disney World Facts to Quiz Your Friends On](https://disneyparksblog.com/wdw/disney-world-facts-to-quiz-your-friends-on/)
> (March 2025), including its "by the numbers" infographic; questions and
> explanations are written in this project's own words.

## What it does

- Draws 10 questions at random from a bank of 112, favouring ones you have seen least
- Never puts two questions about the same fact in one quiz, so no question gives away another
- Shuffles the answer order every time
- Shows the right answer and a short fact after each question
- Ends with a score out of 10, a rank, and a review of every question
- Remembers your best score, recent scores and any unfinished quiz in `localStorage`
- **Share my score** sends a message with a link; whoever opens it sees your score as the
  "score to beat", and is told at the end whether they beat it
- Works offline after the first visit (a small service worker stores the files on the device)
- Every status has an icon and a text label, so nothing depends on color alone
- Keyboard: press `A`-`D` or `1`-`4` to answer

## Publish on GitHub Pages

1. Create a new public repository and upload every file in this folder to its root.
2. Go to **Settings > Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, pick `main` and `/ (root)`, then save.
4. After a minute your quiz is live at `https://<your-username>.github.io/<repo-name>/`.

## Add it to your home screen

- **iPhone / iPad (Safari):** Share > Add to Home Screen
- **Android (Chrome):** menu > Add to Home screen (or Install app)

Open it once while online so the files are cached. After that it runs without a connection.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | The whole app: markup, styles, script and question bank |
| `sw.js` | Service worker that stores the files for offline use and picks up updates |
| `manifest.webmanifest` | Name, colors and icons for home-screen install |
| `icon.svg`, `icon-180.png`, `icon-512.png` | App icons |

## Changing things

- **Questions:** edit the `BANK` array in `index.html`. The first entry in each
  `a` list is the correct answer; the app shuffles them when shown. `g` is the
  fact group (the source article's bullet number, or a higher number for its
  intro and infographic facts): a quiz uses at most one question per group, so
  give overlapping questions the same `g`.
- **Ranks:** edit the `RANKS` array.
- **Colors:** edit the CSS variables at the top of the `<style>` block.
- **After any change:** just upload the changed files. An installed copy keeps
  showing the old version the first time it is opened online and shows the new
  one from the next launch. You do not need to change `VERSION` in `sw.js`.

## Your data

Scores are stored only in your browser under the key `parkSmarts.v1`. Nothing is
sent anywhere. Use **Erase my scores** on the start screen to clear them.

A link made by **Share my score** ends in something like `?card=1101110111`: one
digit per question, 1 for right and 0 for wrong. That is all it carries, and it
only goes where you send it.

## License

[MIT](LICENSE)
