import { ACTIONS_CORS_HEADERS, ActionGetResponse, ActionPostRequest, ActionPostResponse, createPostResponse } from "@solana/actions";
import { transferSolTransaction } from "./transaction";

const icon_ids = ['1lrmK3Rurt5NAY8-O_VwdkCErWbkisNZY','11HsuitWbpYGL0tcITHPo-_CjpUuDAFy6','1W8HPq9Xf2gXBzgRLqjJACtivYZH5rwdN']
let icon_id = icon_ids;
let count = 0;

export const GET = async (req: Request) => {
    const payload: ActionGetResponse = {
        title: "SuperteamPHL 🇵🇭 Transfer SOL BLINK",
        // icon: "https://i.imgur.com/wKY2gEc.jpeg", // reference 
        icon: `https://drive.usercontent.google.com/download?id=${icon_id[count]}`,
        description: "Transfer SOL to another wallet",
        label: "Grow with SOL 🤙🏻🤙🏻🤙🏻"
    }

    return Response.json(payload, {
        headers: ACTIONS_CORS_HEADERS,
    });
}

// make a solana blink that updates its metadata whenever there's a successful transaction 
//     metadata holds 
//         url to icon
//     whenever there's a successful transaction, updates the url to icon of next stage 
//         url to icon stages
//             normal
//             abnormal
//             super
//         by default normal should be the icon

export const OPTIONS = GET;

export const POST = async (req: Request) => {
    const body: ActionPostRequest = await req.json();
    const transaction = await transferSolTransaction({ from: body.account, amount: 1 })
    const payload: ActionPostResponse = await createPostResponse({
        fields: {
            transaction,
            message: `Send 1 SOL`,
        },
    });
    count++;
    return Response.json(payload, {
        headers: ACTIONS_CORS_HEADERS,
    });
}