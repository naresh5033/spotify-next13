# Full Stack Spotify Clone

- with Next.js 13.4 App Router: React, Tailwind, Supabase, PostgreSQL, Stripe

For DEMO, use [Stripe Testing Cards](https://stripe.com/docs/testing)

Key Features:

- Song upload
- Stripe integration
- Tailwind design for sleek UI
- Tailwind animations and transition effects
- Full responsiveness for all devices
- Credential authentication with Supabase
- Github authentication integration
- File and image upload using Supabase storage
- Client form validation and handling using react-hook-form
- Server error handling with react-toast
- Play song audio
- Favorites system
- Playlists / Liked songs system
- Advanced Player component
- Stripe recurring payment integration
- How to write POST, GET, and DELETE routes in route handlers (app/api)
- How to fetch data in server React components by directly accessing the database (WITHOUT API! like Magic!)
- Handling relations between Server and Child components in a real-time environment
- Cancelling Stripe subscriptions

### Prerequisites

**Node version 14.x**

### Cloning the repository

```shell
git clone https://github.com/AntonioErdeljac/next13-spotify.git
```

### Install packages

```shell
npm i
```

### Setup .env file

```js
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

### Add SQL Tables

Use `database.sql` file, create songs and liked_songs table

### Start the app

```shell
npm run dev
```

## Available commands

` npx create-next-app@latest spotify --ts`

## Dependencies

- tailwindcss
- tailwind-merge `yarn add tailwind-merge` -for the box and few other comp.. Utility function to efficiently merge Tailwind CSS classes in JS without style conflicts.
- supabase - for DB. (an alternative for firebase DB). we can create our cust table(for liked songs, and songs) and the policies then create couple of buckets for the storage. then create a script to gen all the types from the database & assign it into our proj.
- `npm i supabase@">1.8.1" --dev `
- `npm i @supabase/supabase-js ` - for creating the client (createClient()) we will use this in the supabaseAdmin.ts/libs
- `npx supabase login`
- ````npx supabase gen types typescript --project-id gtvonjbbzmjrfuvqikid --schema public > types_db.ts ``` this will gen the types(types_db.ts) for our proj
  ````
- `npm i @supabase/auth-helpers-nextjs` and then also the relevant pckg for react
- `npm i @supabase/auth-helpers-react`
- `npm i @supabase/auth-ui-react @supabase/auth-ui-shared ` for the auth modal.
- The supabase even has the strip code snippet.
- the Stripe for the payment `npm i stripe`
- "Radix for the modals" Radix Primitives is a low-level UI component library with a focus on accessibility, customization and developer experience. You can use these components either as the base layer of your design system, or adopt them incrementally.
- it Supports modal and non-modal modes.
- Esc closes the component automatically.
- `npm install @radix-ui/react-dialog`
- zustand - `npm i zustand` for the state management.
- toast - `npm i react-hot-toast` for the notification.
- React Form hook `npm i react-hook-form` for the forms.
- unique id `npm i uniqid @types/uniqid` for to generate a unique id
- query string `npm i query-string` for strringify our queries
- Radix ui Slider `npm i @radix-ui/react-slider` for volume slider
- React icons `npm i react-icons` for all the icons that we have
- use-sound Hook `npm i use-sound` to play our song (we will be using this hook in the player context component)
- react-spinners `npm i react-spinners` for the loader
- stripe `npm i @stripe/stripe-js` for payments (the stipe logics in the libs directory)
- install the stripe cli ` brew install stripe/stripe-cli/stripe`
- and to listen the payment events `stripe login`
- `stripe listen --forward-to localhost:3000/api/webhooks` get the stripe webhook secret keey
- `stripe trigger payment_intent.succeeded`
- now that we re listening for the event create a product (spotify premium) in the stripe and it will trigger the event

## Deployment

- the project has been deployed in the vercel and the [deployed url](https://next13-spotify-2bpjpj5um-antonioerdeljac.vercel.app/) - 
- then finally replace our deployed stripe's url(along with /api/webhooks) in the stripe with our local url(under webhooks and add the hosted end point )
- then finally select all the events for listen to.
- then copy the sign in secret, and replace the env vars in vercel with the new secret(webhook secret)
- then redeploy.
- then copy our site's url and replace that in our supabase --> site url (under url configuration), otherwise the url in our conformation email will send to localhost
