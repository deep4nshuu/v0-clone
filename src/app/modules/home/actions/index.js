"use server";
import { inngest } from "@/inngest/client";

export const onInvoke = async() => {
    // here we pass event name inside send method
    await inngest.send({
        name: 'agent/hello'
    })
}