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

Chapter 8: Setting up E2B Sandboxes & Preview nextjs app in sandbox

> E2B sandbox : it is an isolated env to build & test app in a sandbox

Step 1 : Go to e2b.dev & create account -> dashboard -> templates -> create a new nextjs template so that agent can use, create some file, run terminal cmd 

Step 2 : install e2b:  npm i e2b or latest cmd

Step 3 : install e2b cli globally to manage template & sandboxes as : npm i -g @e2b/cli

Step 4 : Authenticate in cli as : e2b auth login
 
Step 5: Now list all sandboxes as : e2b sandbox list -> which will show no sandboxes found as nothing is running

Step 6: Now we need to create dockerfile template which is using nextjs
So for that create a folder in root structure as : sandbox-templates/next-js/e2b.Dockerfile -> copy paste code from

Step 7: also create compile_page.sh file there to write shell cmd to run app itself

Step 8: Now run docker desktop and go to sandbox-template/nextjs folder in terminal using cd cmd

Step 9: now run this create template cmd to push it to e2b as : e2b template create v0-nextjs-build --cmd "/compile_page.sh" --ready-cmd "curl -f http://localhost:3000"

Step 10: Now run this cmd to make your template Public : e2b template publish template_name or toogle from e2b template dashboard

Step 11: now start a sandbox in inngest with new template -> for that go to e2b -> create api key -> Paste that into env file 

Step 12: Write 2 fns: one for creating sandbox(use template name) and another for getting sandbox url

Step 13: now run app & inngest dev server to test and then invoe agent and get new app url from inngest dev server 

> Summary for this ch: we created e2b acc, then logged in with help of cli & then pushed docer template & uused inngest to spin up sandbox for us

> E2B Dockerfile 
Purpose -> Defines the environment that every E2B sandbox will be created from.
Steps : 1.Base Image, 2.Install System Packages, 3.Copy Startup Script -> Copies the startup script into the image and makes it executable, 4. Set Working Directory ->All commands execute from /home/user, 5. Create Next.js App, 6. Initialize shadcn, 7. Install All Components

> compile_page.sh 
Purpose -> Scripts to be executed when the sandbox starts.
What it does? -> Changes to the project directory & Starts the Next.js development server using Turbopack.

# Chapter 9: Agent tools -> adding agent tools to sandbox such as reading, creating & updating files & adding terminals for running cmd

Whenevr we need to run cmd, there is something called buffers which have 2 props: stdout(to show output on terminal), stderr(to show err on terminal)

to run cmd in sandbox, we use sandbox.command.run() before it connect sandbox -> Now write buffer cmd here

Steps : Go inside function.js file and create 3 agent tools(terminal, create/upd, read) using createTool(name, desc, params, handler)

Step : create network fn -> maxIter: limiting no of rounds or times inngest can try running job which failed

Step : create prompt.js file in src

Step : add prompt, lifecycle inside agent creatn fn

Step : create utils.js file inside inngest


*/ 