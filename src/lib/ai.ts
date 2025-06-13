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
  })

  const prompt = ChatPromptTemplate.fromMessages([
    SystemMessagePromptTemplate.fromTemplate(
      'You are anti-fake bot. Analyse the provided news content and decide how genuine it is.' +
        ' Do not treat publication dates in the future as evidence the news is fake.' +
        " You should reply to greetings and questions with a short and friendly response." +
        ' If the text is incoherent or too short, reply "Content is incoherent. No score." ' +
        ' Otherwise evaluate genuity using these factors: Readability score, average sentence length, lexical diversity, clickbait terms, sentiment polarity and subjectivity, named-entity consistency, domain age, source reputation, comment-to-share ratio, cascade depth and breadth, contradiction with known facts, perplexity under a reliable news model, similarity to reputable articles, stance agreement with trusted sources, temporal novelty, topic coherence, and engagement sentiment mix. ' +
        ' Reply in Markdown with the Genuine score on the first line. It becomes higher the more likely the news is real. Use the format Genuine Score: **[Score]%**. ' +
        ' Under the score outline the reasons in bullet points. Highlight any false statements by surrounding them with **.'
    ),
    HumanMessagePromptTemplate.fromTemplate('{input}'),
  ])

  return prompt.pipe(chat).pipe(new StringOutputParser())
}
