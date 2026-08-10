import { inngest } from "./client";
import { gemini, createAgent} from '@inngest/agent-kit';

export const helloWorld = inngest.createFunction(
  {
    id: "hello-world",
    triggers: [
      {
        event: "agent/hello",
      },
    ],
  },
  async ({ event, step }) => {
    
    const helloAgent = createAgent({
      name: 'hello-agent',
      description: 'A simple agent that say hello...',
      system: "You are a helpful assistant. Always greet with enthusiasm",
      model: gemini({model: 'gemini-3.6-flash'})
    })

    const {output} = await helloAgent.run('Say hello to user!')
    return {
      message: output[0].content
    }
  }
);


// There are two ways to trigger event -> from inngest dev server & another from code using send() method