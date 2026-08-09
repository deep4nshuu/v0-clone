import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  {
    id: "hello-world",
    triggers: [
      {
        event: "test/hello.world",
      },
    ],
  },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");

    return {
      message: "Hello World!",
    };
  }
);


// There are two ways to trigger event -> from inngest dev server & another from code using send() method