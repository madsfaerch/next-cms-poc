This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, start json-server from the project root:
```bash
json-server --watch db.json --port 3001
```

In parallel, run the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Concept
A json-server that serves pages which contain a title, layout type, pathName and content (a recursive React component map with props).

getStaticPaths: Statically render all the pages from db.json by running `npm run build`. This will compile available paths into an HTML file and a JSON file.

- This means initial load is super fast HTML which is then hydrated. 
- Subsequent navigation only fetches the JSON for that route. 

Try running `npm run start` and navigate the site on `http://localhost:3000`. 
Revalidate is set to 10 seconds meaning a page is considered cached (on the file system) for 10 seconds. Visits to a page more than 10 seconds after last generation of the page will trigger a regeneration. While regenerating the old files are served to users.
- Users will never wait for content
- Content is always as fresh as the revalidation time (10 seconds here)

Paths added after build time will be compiled into HTML and JSON during runtime. 
- Try this by editing the db.json file directly (json-server will reload automatically), then visit the path.

