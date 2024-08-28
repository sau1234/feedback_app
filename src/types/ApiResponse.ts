
import { Message } from "@/model/User"

export interface ApiResponse{
    success: boolean,
    message: string,
    isAcceptingMessage?: false,
    messages?: Array<Message>  // ? is for optional
}