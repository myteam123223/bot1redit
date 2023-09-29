import { schedule } from "@netlify/functions"
import { sendVideos } from "../../sendVideo/index"
import { N_VIDEOS, SUBREDDIT_NAME  } from "../../sendVideo/myConfig"

let frequency = "0 */1 * * *"

export const handler = schedule(frequency, async () => {
	console.log("Handler Init...")
	await sendVideos(N_VIDEOS, SUBREDDIT_NAME)
	console.log("Handler Finish...")
	return {
		statusCode: 200,
	}
})
