
import OpenAI from "openai";
import {OPENAPI_KEY} from "../utils/constants"
const openai =new OpenAI({
apiKey: OPENAPI_KEY,
dangerouslyAllowBrowser: true,
});


export default openai;
