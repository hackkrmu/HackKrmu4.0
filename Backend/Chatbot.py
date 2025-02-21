from groq import Groq  # Importing the Groq library
from json import load, dump  # Importing JSON library for reading and writing JSON files
import datetime  # Importing datetime library for date and time operations
from dotenv import dotenv_values  # Importing dotenv library to load environment variables

# Loading environment variables from .env file
env_vars = dotenv_values(".env")

# Getting the username, assistant name, and API key from the environment variables
Username = env_vars.get("Username")
Assistantname = env_vars.get("Assistantname")
GroqAPIKey = env_vars.get("GroqAPIKey")

# Initializing the Groq client with the API key
client = Groq(api_key=GroqAPIKey)

# List to store chatbot messages
messages = []

# Predefined system message for the chatbot
System = f"""Hello, I am {Username}, You are a very accurate and advanced AI chatbot named {Assistantname} which also has real-time up-to-date information from the internet.
*** Do not tell time until I ask, do not talk too much, just answer the question.***
*** Reply in only English, even if the question is in Hindi, reply in English.***
*** Do not provide notes in the output, just answer the question and never mention your training data. ***
"""

# System message in the format required by the chatbot
SystemChatBot = [
    {"role": "system", "content": System}
]

# Try to load the chat log from a JSON file, if it doesn't exist, create an empty one
try:
    with open(r"Data/ChatLog.json", "r") as f:
        messages = load(f)
except FileNotFoundError:
    with open(r"Data/ChatLog.json", "w") as f:
        dump([], f)

# Function to get real-time information
def Realtimelnformation():
    current_date_time = datetime.datetime.now()
    day = current_date_time.strftime("%A")
    date = current_date_time.strftime("%d")
    month = current_date_time.strftime("%B")
    year = current_date_time.strftime("%Y")
    hour = current_date_time.strftime("%H")
    minute = current_date_time.strftime("%M")
    second = current_date_time.strftime("%S")

    data = f"Please use this real-time information if needed,\n"
    data += f"Day: {day}\nDate: {date}\nMonth: {month}\nYear: {year}\n"
    data += f"Time: {hour} hours : {minute} minutes : {second} seconds.\n"
    return data

# Function to modify the answer by removing empty lines
def AnswerModifier(Answer):
    lines = Answer.split('\n')
    non_empty_lines = [line for line in lines if line.strip()]
    modified_answer = '\n'.join(non_empty_lines)
    return modified_answer

# Function to handle the chatbot interaction
def ChatBot(Query):
    """This function sends the user's query to the chatbot and returns the AI's response."""
    try:
        # Load the chat log from the JSON file
        with open(r"Data/ChatLog.json", "r") as f:
            messages = load(f)

        # Append the user's query to the messages
        messages.append({"role": "user", "content": f"{Query}"})

        # Create a completion request to the Groq API
        completion = client.chat.completions.create(
            model="llama3-70b-8192",
            messages=SystemChatBot + [{"role": "system", "content": Realtimelnformation()}] + messages,
            max_tokens=1024,
            temperature=0.7,
            top_p=1,
            stream=True,
            stop=None
        )

        Answer = ""

        # Collect the response from the API
        for chunk in completion:
            if chunk.choices[0].delta.content:
                Answer += chunk.choices[0].delta.content

        # Clean the answer
        Answer = Answer.replace("</s>", "")

        # Append the assistant's response to the messages
        messages.append({"role": "assistant", "content": Answer})

        # Save the updated chat log to the JSON file
        with open(r"Data/ChatLog.json", "w") as f:
            dump(messages, f, indent=4)

        # Return the modified answer
        return AnswerModifier(Answer=Answer)

    except Exception as e:
        print(f"error: {e}")
        # If an error occurs, reset the chat log and retry
        with open(r"Data/ChatLog.json", "w") as f:
            dump([], f, indent=4)
        return ChatBot(Query)

# Main loop to interact with the user
if __name__ == "__main__":
    while True:
        user_input = input("Enter Your Question: ")
        print(ChatBot(user_input))
