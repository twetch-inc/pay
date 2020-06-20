This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/zeit/next.js/) - your feedback and contributions are welcome!

## Deploy on ZEIT Now

The easiest way to deploy your Next.js app is to use the [ZEIT Now Platform](https://zeit.co/) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Developing Twetch Pay

For development of `Pay`, use the scripts:

Development:

`npm run dev`

Production:

`npm run build`

Package `pay.js` for the browser:

`npm run build-browser`

Deploy to remote service, export with:

`npm run export`

Testing the demo.html, demo-vbox.html andn demo-crypto-operations.html:

Open `twetch-pay.js` and locate the `POSTMATE_TWETCH_PAY_URL` variable and update it to the location of your test site.

```javascript
// Note: Change the URL to where it is deployed to be able to test with demo-*.html pages.
const POSTMATE_TWETCH_PAY_URL='https://pay.twetch.com'
```
