import ollama

# Initialize the model (only once)
model_name = "llama3.2:1b"

def chat_with_llama(prompt, max_tokens=100):
    """Reuses the model for chat and limits output tokens."""
    response = ollama.chat(model=model_name, messages=[{"role": "user", "content": prompt}], options={"num_predict": max_tokens})
    return response["message"]["content"]

# Example Usage
while True:
    prompt = input("Enter your Message : ")
    response = chat_with_llama(prompt,50)
    print(response)