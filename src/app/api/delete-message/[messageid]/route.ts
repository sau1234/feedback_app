import UserModel from "@/model/User";
import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { User } from "next-auth";;
import { authOptions } from "../../auth/[...nextauth]/options";



export async function DELETE(request: Request, {params}: {params: {messageid : string}}){

    const messageId = params.messageid;
    await dbConnect();

    const session = await getServerSession(authOptions);
    const user:User = session?.user as User;

    if(!session || !session.user){
        return Response.json(
            {
                success: false,
                message: "Not Authanticate"
            },
            {status: 401}
        )
    }

    try {
        const updateResult = await UserModel.updateOne(
            {_id: user._id},
            {$pull : {messages:{_id : messageId}}}
        )
        if(updateResult.modifiedCount == 0){
            return Response.json(
                {
                    success: false,
                    message: "message already deleted or not found"
                },
                {status: 404}
            )
        }

        return Response.json(
            {
                success: true,
                message: "message deleted"
            },
            {status : 200}
        )
    } catch (error) {
        console.log("error in deleting message", error);
        return Response.json(
            {
                success: false,
                message: "message deleting error"
            },
            {status: 500}
        )
    }
    
    

}