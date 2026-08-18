import Image from 'next/image'
import React from 'react'
import ProjectForm from '../modules/home/components/project-form'
import ProjectList from '../modules/home/components/project-list'


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

          <ProjectList />
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
2. run inngest dev server as : inngest dev

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


## Error -> We can't use Agentkit as it is not compatible with gemini new models -> And give error for thought signature -> Means whie passing api req, Gemini also wants though signature with that  -> But inngest doesn't have that functionality right now


## Solution -> Ai Agent sdk -> where we don't need of passing thought signature and handles itself -> Here it reduce the code by providing default fn and we don't need here createNetwork or createAgent as generateText handles all of them itself


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

Step : create utils.js file ins`ide inngest


Ch - 10: Creating projects

> prompt -> create project -> projectId -> project/[id] page -> render data from bg & ai jobs
                -> on creating project, we want to run ai jobs in parallel which will handle rest of logic

Step 1: Create model named as project, message & fragement(created app url,title,summary storer) inside prisma schma
run migrate cmd

Step 2: Create projects folder inside modules and inside it create 3 folders as: actions,components,hooks

Step 3: Now create a file named index.js inside projects/actions/index.js to create server actn for projects

Step 4: npm i random-word-slugs @tanstack/react-query

Step 5: Now write step.run cmd to run event created in fn.js 

Step 6: Now start implementing tanstac query and for that create query-provider.jsx inside root component folder & wrap app layout file using it & project.js file inside projects/hooks for writing query hooks inside it

Step 7: apply query hooks inside project form & remove invoke btn & fn and create new changes for btn
install spinner from shadcn, no need as it is pre installed


Chapter 11: Project Ui page

Step : Add project list component in home page below project form and create that component in module/home/component/project-list.jsx 

Step : IN project list compo, create 2 type of views -> one for desktop & other for mobile(Caroseul)

Step : Create root -> projects/[projectId]/page.jsx file which will render project view based on id and create project view component inside modules/projects/components/project-view.jsx

Step : Create another comp for project header in projects comp



# Chapter 12: Messages 
Add server actn, hooks, UI related to msg

Step 1: Create modules -> messages -> actions(index.js -> make 2fn as createMsg & getMsd) & hooks

Step 2: Create hooks/message.js where make fn for prefetching msgs & a getMsg fn & a useCreateMsg hook

Step 3: Create a message-container.jsx component inside project -> comp & use it in project-view comp

> Fragement : it contains sandbox url & code url and message shows in form of fragement -> after clicking that code will be shown on right side of project view page

Step 4: Create message-card.jsx comp inside modules/projects/comp/msg-card & use it in msg container comp -> create it based on role: USER or ASSISTANT -> create comp or fn inside that -> And Create fragement card comp 

Step 5: Create modules/projects/comp/message-form.jsx comp which is similar to project form comp -> SO cpy-paste code and make changes in hooks -> Remove proj.template & use it in msg-container

Step 6: Also create a msg-loader comp in projects and use it in msg container comp


# Chapter 13: CodeView and Demo View
Implement code demo view ui(sandbox url), codeview -> install prismjs & add codeview comp(file explorer, treenode, syntax highlighting)

Flow : We will be on projectId page -> where we have fragment web view or msg with fragment -> when we click on that fragment -> it will show a code explorer or codeView(files) powered by syntax highlighting  & a live running demoView(sandbox url) powered by e2b sandbox on right side of page

Step 1: Go to project-view comp & implement tabs  in msg container 

Step 2: Create a component as : modules/project/comp/fragment-web.jsx which contains fragment views where we fetch sandbox url on iframe

It will contain sandboxUrl link & iframe 

Step 3: Create a hint comp in shadcn ui folder in root component & use it in fragment web comp -> this hint comp will give the hints like copy or anything like that when we hover on that

Step 4: Create another tabcontent for file explorer in project view

Step 5: Create file-explorer.jsx comp in module/project/comp

Step 6: Create utility to convert record of files from string to tree structure inside lib/utils.js

Step 7: Create a tree-view comp which will provide tree lie file system or side bar for code files such as vscode have

Step 8: Also create a filebradcrumb comp inside file-explorer -> which defines how much depth/segments of file you want to show -> it will show files lie this : app/src/modules

Step 9: Create a folder named code-view for showing the code files inside modules/proj/comp which have 2 files: one for comp(index.js) & another for css(code-theme.css)
> npm i prismjs -> which is used for syntax highlighting


Chapter 14: Adding Text & Response Generator Agent
Add fragmentTitleGenerator Agent & Response Genertor Agent

Step 1: Create fragmentTitleGenerator Agent inside fn.js & also add fragment title prompt in prompt.js

Step 2: Create another agent named response generator & add response prompt in prompt.js


Chapter 15: Clerk billing
Setup clerk billing(add free & pro plan)
Setup pricing pagr
implement rate limiting -> 
add usage prisma schema, install & setup rate-limiter-flexible and add getUsageTRacker, consumeTracker, getUsageStatus and also add usage comp


Step 1: Create a pro plan on clerk billing section

Step 2: Create pricing page in (root) folder
npm i @clerk/themes

# To supress hydratn warning : add supressHydratnWarning in html tag in root layout.js file

Step 3: Create features in free plan also on clerk

Step 4: Create use-current-theme.js hook inside src/hooks

# we use ! sign after css prop -> to make it important

Step 5: Add Usage schema in prisma.schema file and then run migrate & generate cmd

Step 6: Now to create rate limiting functionality which limit credit & tell to upgrade when finished, create usage.js file in lib
Here create 3 fn as : getUsageTracker() -> to track usage of credits, etc
npm i rate-limiter-flexible -> provide rate limits or limit credit usage

Step 7: Create utility to limit credit in lib as usage.js -> Here we identify user for Pro plan using key from clerk 
# has in auth() -> fn that checks if user has an organizatn role or custom permisn
# then to access user plan -> we pass plan key & pass to has

Step 8: Create usage module, then actions, comp, hooks

Step 9: Then create a server actn to get client side status in action/index.js

Step 10: Now create a hook inside hooks/usage.js

Step 11: Also create usage component in comp/usage.jsx 

Step 12: Go to message-form & add usage comp

# Now we need to create logic of consumung credit -> so we add that logic where we are using credits

Step 13: So add consumCredit fn in createMsg server actn(message/actn/index.js) & project/index.js createProject() fn

Step 14: Go to project /hook & message/hook->  add status invalidateQuery 

# Assignment : Add credit reducing functionality


Chapter 16: Inngest agent memory
# Agent Memory -> It is a way to remember past msgs,actns & results from previous executn
So when we use agent memory functionality -> it store results in Memory Store

# Why do we need this in inngest?
As inngest fns are stateless by default -> so when it finshes -> it doesn't retain any data from before

Step 1: Add prev msg storing functionality in functn.js below sandboxId & also create a state using createState() -> createState creates new state for a given network. You can add any initial state data for routing, plus provide an object of previous AgentResult objects or conversation history within Message.



*/ 