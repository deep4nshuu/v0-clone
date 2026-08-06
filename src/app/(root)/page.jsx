import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Button>Add</Button>
      <UserButton />
    </div>
  );
}





/*

Chapter 1: Installation of nextjs and shadcn
npx create@latest nextjs
npx shadcn@latest init

Chapter 2: Setting up db
npm i prisma @prisma/client
npm prisma init

Step : Create docker-compose.yml file and write configuratn

Step : Add db url in env file

Step : Create db.js file inside lib folder

Chapter 3: Authenticatn with clerk

Step : follow clerk auth guide

Step : Create (root) inside app & add root page.jsx inside that & also create (root)/layout file 

Step : Then create sing-in & sign-up functionality

Flow : 
Currently when user sign-in -> redirected to Home(as auth user) -> So we want to onBoard user after that -> in db to fetch it's details -> So we need to create server action

user -> id : this is user id in db
clerkid -> this is unique id provided by clerk to get currently logged in user data

Step : Create User model schema(image,name,clerkId,created,updated)
npx prisma migrate dev

Step : Create server actns as : app/modules/auth/actions/index.js & create onBoardUser fn and getCurrentUser() fn

To prevent multiple entry of same user -> we use upsert instead of create (22:34)

Chapter : Creating header of app

Step : Go to tweakcn and choose fav theme and copy code -> paste into global css for theme-inline - dark

Step : Now to create header or navbar, make modules/home/components/navbar.jsx file

Step : Now to download v0 svg

Step : Install next themes as : npm install next-themes

Step : Create a file called theme-provider.jsx inside components to write theme rovider

Step : wrap children inside theme provider in layout file

Step : Create another file for model toggle button inside components and use that btn with signed or signup btn in navbar.jsx


*/