import { User } from "./user";

export interface Thought {
    uid?: string
    title: string
    body: string
    dateCreated: Date
    user: User

}
