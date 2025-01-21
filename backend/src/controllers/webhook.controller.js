import { Webhook } from "svix";
import User from "../models/user.model.js";

export const clerkWebhook = async (req, res) => {
    const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!CLERK_WEBHOOK_SECRET) {
        throw new Error(
            "Error: Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env"
        );
    }

    const payload = req.body;
    const headers = req.headers;

    const wh = new Webhook(CLERK_WEBHOOK_SECRET);

    let evt;
    try {
        evt = wh.verify(payload, headers);
    } catch (err) {
        res.status(400).json({ message: "Clerk webhook verification failed" });
    }

    console.log(evt.data);

    // if (evt.type === "user.created") {
    //     const newUser = new User({
    //         clerkId: evt.data.id,
    //         username: evt.data.username,
    //         email: evt.data.emailAddresses[0].emailAddress,
    //         img: evt.data.profile_img_url,
    //     });
    // }
};
