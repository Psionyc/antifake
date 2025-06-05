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
