import UserModel from "@/model/User";
import dbConnect from "@/lib/dbConnect";
import { Message } from "@/model/User";

export async function POST(request: Request) {
    await dbConnect();

    const { username, content } = await request.json();
    try {
        const user = await UserModel.findOne({ username });

        if (!user) {
            return Response.json(
                {
                    success: false,
                    message: "user not found"
                },
                { status: 404 }
            )
        }

        // is user accepting the messages
        if (!user.isAcceptingMessage) {
            return Response.json(
                {
                    success: false,
                    message: "user is not accepting message"
                },
                { status: 403 }
            )
        }

        const newMessage = { content, createdAt: new Date() };
        user.messages.push(newMessage as Message);
        await user.save();

        return Response.json(
            {
                success: true,
                message: "user accepting message successfully"
            },
            { status: 200 }
        )
    } catch (error) {
        console.log("Error adding message", error);
        return Response.json(
            {
                success: false,
                message: "internal server error"
            },
            { status: 500 }
        )
    }

}