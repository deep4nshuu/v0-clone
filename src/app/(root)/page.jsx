import Image from 'next/image'
import React from 'react'
import ProjectForm from '../modules/home/components/project-form'


const HomePage = () => {

  return (
    <div className='flex items-center justify-center w-full px-4 py-8'>
      <div className='max-w-5xl w-full'>
        <section className='space-y-8 flex flex-col items-center'>
          <div className='flex flex-col items-center'>
            <Image 
              src={'/logo.svg'}
              height={100}
              width={100}
              alt='logo'
              className='hidden md:block invert dark:invert-0'
            />
          </div>
          <h1 className='text-2xl md:text-5xl font-bold text-center'>Build Something with 💕</h1>

          <p className='text-lg md:text-xl text-muted-foreground text-center'>
            Create apps and websites by chatting with AI
          </p>

          <div className='max-w-3xl w-full'>
            <ProjectForm />
          </div>
        </section>
      </div>
    </div>
  )
}

export default HomePage





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

Chapter : Building Homepage Ui

Step : Format home page or root page.jsx file

Step : Create project form component which is used on homepage
npm i react-textarea-autosize
npm i zod
npm i react-hoo-form
npm i @hookform/resolvers

Chapter 6 : Background jobs

Bacground jobs - these are the tas that run outside of the main req/res cycle

> Without
User req -> api -> send email, process file, return res -> long res time

> With
User req -> api -> queue job(worer processes job lie email, file) -> return response -> User gets fast res as job runs in bg

Services : bullMq(Nodejs), sidekiq, celery, temporal, inngest( Modern event driven bg job services)

> Why are we choosing inngest?
Serverless & event driven archietecture, scalable, developer friendly, local dev support
In inngest, we only need to create fn & it handles everything automatically such as queue, workers 
But in bullmq, we need to create queue, workers, etc manually

> App -> trigger event -> api/inngest which handle it asynchronously -> bg job fn runs -> result

> Steps to setup inngest in project:

1: install inngest as : npm i inngest
2. run inngest dev server as : npx inngest-cli@latest dev

> We got this error : Error: Inngest CLI binary not found -> Because Using Node.js 24 + npm 12, which blocks package postinstall scripts by default for security. & inngest-cli requires its postinstall script to download the actual CLI binary.
 So we allowed to install scripts by: npm install-scripts approve --all -> And then installed Inngest CLI globally while explicitly allowing its postinstall script -> using: npm install -g inngest-cli --allow-scripts=inngest-cli 
 And now we ran : inngest dev -> to run dev server

3. create an inngest client as : src/inngest/client.js 
Inngest invokes your functions through an API endpoint at /api/inngest -> to enable it, create inngest client

> Error | Inngest Error: In cloud mode but no signing key found
> Soln : For Local Development: INNGEST_DEV=1 or isDev: true
Production: INNGEST_SIGNING_KEY is required to verify requests.
Cloud Mode ≠ Local Mode. If the SDK thinks it's in Cloud Mode during development, it will throw this error.

4. You also need to create a route handler that serves the Inngest API as : src/app/api/inngest/route.js and copy paste code from site

5. Now write fn that processes a task in the background -> It waits for a trigger event, runs a sequence of steps, and returns a result.
Create src/ingest/function.js and write fn


Chapter 7: Ai Jobs
They take bg jobs one step ahead as they allow us to run ai driven workflow in the bg
Such as : Code generatn in sandbox, Summarizing user activity & Ai driven automatn

> User req -> API -> Trigger AI job -> Inngest agent -> Ai model(gemini) -> Result

Now to choose AI provider, we have plenty of option such as gpt, claude, gemini,etc

Step : Go to google ai studio and create a project -> enable gemini api -> create api key -> copy it and add it to env file



> AgentKit : AgentKit is a framework to build AI Agents, from single model inference calls to multi-agent systems that use tools. AgentKit enables developers to build, test, and deploy reliable AI applications at scale.

Step : install inngest-agent Kit as : npm install @inngest/agent-kit@latest or latest from docs

Step: Now create agent inside function.js

Step : Also create an invoke fn inside modules/home/actions/index.js 

Step: Now for testing agent, create a btn in page-form.jsx file & when btn clics -> agent should be called for that create fn there also to invoke

> Error : Use of older gemini model which are not supported for new users,
> Soln: Always use newer compatible models


 



*/ 