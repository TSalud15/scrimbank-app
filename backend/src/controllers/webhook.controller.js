import { Webhook } from "svix";
import User from "../models/user.model.js";

export const clerkWebhook = async (req, res) => {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        throw new Error(
            "Error: Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env"
        );
    }

    const payload = req.body;
    const headers = req.headers;

    const wh = new Webhook(WEBHOOK_SECRET);

    let evt;
    try {
        evt = wh.verify(payload, headers);
    } catch (err) {
        res.status(400).json({ message: "Clerk webhook verification failed" });
    }

    // console.log(evt);

    if (evt.type === "user.created") {
        const newUser = new User({
            clerkId: evt.data.id,
            username:
                evt.data.username || evt.data.email_addresses[0].email_address,
            email: evt.data.email_addresses[0].email_address,
            profileImg: evt.data.profile_image_url,
        });

        await newUser.save();
    }

    if (evt.type === "user.updated") {
        const updatedUser = await User.findOneAndUpdate(
            { clerkId: evt.data.id },
            {
                username:
                    evt.data.username ||
                    evt.data.email_addresses[0].email_address,
                email: evt.data.email_addresses[0].email_address,
                profileImg: evt.data.profile_image_url,
            }
        );
    }

    if (evt.type === "user.deleted") {
        const deletedUser = await User.findOneAndDelete({
            clerkId: evt.data.id,
        });
    }

    return res.status(200).json({
        message: "Webhook received",
    });
};
