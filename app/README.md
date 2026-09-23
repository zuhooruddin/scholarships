# Worldwide Scholarships – Next.js landing page

Copy `app/` and `components/` into a project made with:

    npx create-next-app@latest scholarships --ts --tailwind --app

Then replace the generated `app/` files, and run `npm run dev`.
The `@/` import alias is on by default in create-next-app.
The login dialog opens 9 seconds after load (change `DELAY_MS` in components/LoginDialog.tsx).
Connect real authentication in `handleSubmit`.
