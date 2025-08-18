1. code/config/vs-default.ts contains modelname, it should not, that should be stored on server along with prompt template
2. Continue might want to have a embeddings-endpoints (vllm has one, but not tabby)
3. OnBoardingCardLAnding.tsx is still shown, if user removes all chat-posts. It should never be visible, from now until end of time