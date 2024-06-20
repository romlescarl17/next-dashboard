import { auth } from "@/auth";

export const useCurrentSession = async () => {
    const session = await auth();

    if (!session) {
        return null;
    }
    
    console.log(session);
    return session;
}