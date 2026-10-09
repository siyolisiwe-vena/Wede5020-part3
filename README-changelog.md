## Changelog

| Date / Version | Area | Issue / Feedback | Change Made | Reason / Result |
|---|---|---|---|---|
| v3.1 | CSS linking | Part 2 feedback: CSS not linked properly across all pages | Added `<link rel="stylesheet" href="css/styles.css">` and `css/part3.css` inside `<head>` of every HTML file using correct relative paths | Desktop styling, typography, pseudo-classes now visible on every page |
| v3.2 | Responsive design | Media queries implemented but not reflecting | Fixed linking and confirmed `<meta name="viewport">` on all pages; re-tested tablet (768px) and mobile (480px) breakpoints | Layout, navigation, typography and images now adjust on tablet/mobile |
| v3.3 | README | Missing screenshots demonstrating responsiveness | Added desktop, tablet and mobile screenshots in `/screenshots` and linked below | Evidence of responsive behaviour |
| v3.4 | Git | Needed multiple descriptive commits | Committed each change separately with descriptive messages | Clear version history |
| v3.5 | JavaScript | New: accordion, event search/filter/sort, gallery lightbox, Leaflet map | Added `js/main.js`, `features.html`, `css/part3.css` | Improves interactivity |
| v3.6 | Forms | New: validated enquiry and contact forms | HTML5 attributes + JS validation, inline errors, enquiry response (cost/availability), contact mailto email | Prevents invalid submissions |
| v3.7 | SEO | New: on-page + technical SEO | Unique titles/meta descriptions, one H1 per page, descriptive alt text, `robots.txt`, `sitemap.xml` | Better discoverability |

## Responsiveness screenshots
![Desktop](screenshots/desktop.png) ![Tablet](screenshots/tablet.png) ![Mobile](screenshots/mobile.png)

## References
- Leaflet. (2026) *Leaflet documentation*. Available at: https://leafletjs.com (Accessed: 9 October 2026).
- MDN Web Docs. (2026) *Client-side form validation*. Available at: https://developer.mozilla.org (Accessed: 9 October 2026).
- Google. (2026) *SEO Starter Guide*. Available at: https://developers.google.com/search (Accessed: 9 October 2026).