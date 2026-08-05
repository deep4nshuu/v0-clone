"use server"

import db from "@/lib/db"
import { currentUser } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export const onBoardUser = async() => {
    try {
        const user = await currentUser()

        if(!user){
            return NextResponse.json({
                error:"Unauthorized User"
            })
        }

        const {id, firstName, lastName, imageUrl, emailAdresses} = user;

        const newUser = await db.user.upsert({
            where:{
                clerkId: id
            },
            update: {
                name: 
                    firstName && lastName
                        ? `${firstName} ${lastName}`
                        : firstName || lastName || null,
                image: imageUrl || null,
                email: emailAdresses[0]?.emailAdresses || ""
            },
            create: {
                clerkId: id,
                name: 
                    firstName && lastName
                        ? `${firstName} ${lastName}`
                        : firstName || lastName || null,
                image: imageUrl || null,
                email: emailAdresses[0]?.emailAdresses || ""
            }
        })

        return {
            success: true,
            user: newUser,
            message: "User onboarded sucessfully"
        }
    } catch (error) {
        console.error("Error onboarding user:", error)
        return {
            success: false,
            error: "Failed to on board user"
        }
    }
}

export const getCurrentUser = async() => {
    try {
        const user = await currentUser()

        if(!user){
            return null;
        }

        const dbUser = await db.user.findUnique({
            where:{
                clerkId: user.id,
            },
            select: {
                id: true,
                email: true,
                name: true, 
                image: true,
                clerkId: true
            }
        })

        return dbUser;
    } catch (error) {
        console.error("Error fetching current user:", error)
        return {
            success: false,
            error: "Failed to fetch current user"
        }
    }
}