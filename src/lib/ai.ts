import { initChatModel } from 'langchain/chat_models/universal'

/**
 * Initialize a chat model using LangChain. Defaults to OpenAI's GPT model.
 */
export async function getChatModel(
  model: string = 'gpt-3.5-turbo',
  provider: string = 'openai'
) {
  return initChatModel(model, { modelProvider: provider })
}

import { ChatOpenAI } from '@langchain/openai'
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from '@langchain/core/prompts'
import { StringOutputParser } from '@langchain/core/output_parsers'

/**
 * Create a chain that checks whether a news article is fake or not using OpenAI.
 * The returned chain expects an object with an `input` property containing the
 * article text and returns the model response as a string.
 */
export function initAntiFakeAgent(
  apiKey: string,
  model: string = 'gpt-4.1'
) {
  const chat = new ChatOpenAI({
    apiKey,
   model,
    temperature: 0.3,
  })

  const prompt = ChatPromptTemplate.fromMessages([
    SystemMessagePromptTemplate.fromTemplate(
      'You are anti-fake bot. Analyse the provided news content and decide if it feels fake. ' +
        'If the text is incoherent or too short, reply "Content is incoherent. No score." ' +
        'Otherwise reply in Markdown with the likelihood score out of 100 on the first line, the score formatted in **bold**. ' +
        'Under the score outline the reasons in bullet points. Highlight any false statements by surrounding them with **.'
    ),
    HumanMessagePromptTemplate.fromTemplate('{input}'),
  ])

  return prompt.pipe(chat).pipe(new StringOutputParser())
}
