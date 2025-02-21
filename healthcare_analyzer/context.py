from transformers import pipeline

intents = [
    "Perform Face Authentication for user login",  
   
    "Moderate content and return an appropriate status code"  
]


qa_pipeline = pipeline("text2text-generation", model="google/flan-t5-large")

def classify_intent(user_input):
    # Define possible intents
    intents = [
        "Perform Face Authentication for user login",  
        "Moderate content and return an appropriate status code"  
    ]

    # Generate intent classification prompt
    prompt = f"Classify the intent of the following input into one of these categories: {intents}.\n\nInput: {user_input}\n\nIntent:"

    # Generate response from model
    response = qa_pipeline(prompt, max_length=10, num_return_sequences=1)[0]['generated_text'].strip().lower()

    # Intent classification with keyword matching
    if "face authentication" in response or "login" in response:
        return 0  # Face Authentication

    elif "moderate content" in response or "status code" in response:
        return 1  # Content Moderation

    else:
        return -1  # Unknown Intent (optional)


 
