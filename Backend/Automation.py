from webbrowser import open as webopen  # Import web browser functionality.
from pywhatkit import search, playonyt  # Import functions for Google search and YouTube playback.
from dotenv import dotenv_values  # Import dotenv to manage environment variables.
from bs4 import BeautifulSoup  # Import BeautifulSoup for parsing HTML content.
from rich import print  # Import rich for styled console output.
from groq import Groq  # Import Groq for AI chat functionalities.
import webbrowser  # Import webbrowser for opening URLs.
import subprocess  # Import subprocess for interacting with the system.
import requests  # Import requests for making HTTP requests.
import asyncio  # Import asyncio for asynchronous programming.
import os  # Import os for operating system functionalities.

# Load environment variables from the .env file
env_vars = dotenv_values(".env")
GroqAPIKey = env_vars.get("GroqAPIKey")  # Retrieve the Groq API key

# Define CSS classes for parsing specific elements in HTML content
classes = [
    "zCubwf", "hgKElc", "LTKOO sY7ric", "ZOLcW", "gsrt vk_bk FzvWsb YwPhnf",
    "pclqee", "tw-Data-text tw-text-small tw-ta", "1Z6rdc", "05uR6d LTKOO",
    "V1zY6d", "webanswers-webanswers_table_webanswers-table", "dDoNo ikb4Bb gsrt",
    "sXLaOe", "LwkfKe", "VQF4g", "qviWpe", "kno-rdesc", "SPZz6b"
]

# Define a user-agent for making web requests (updated for macOS)
useragent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/1'

# Initialize the Groq client with the API key
client = Groq(api_key=GroqAPIKey)

# Predefined professional responses for user interactions.
professional_responses = [
    "Your satisfaction is my top priority; feel free to reach out if there's anything else I can help with.",
    "I'm at your service for any additional questions or support you may need—don't hesitate to ask."
]

# List to store chatbot messages
messages = []
SystemChatBot = [{"role": "system", "content": f"Hello, I am {os.environ['Username']}, You're a content writer. You have to write content like letter,codes,applications,essays,notes,songs,poems etc "}]


def GoogleSearch(Topic):
    search(Topic)  # Use pywhatkit's search function to perform a Google search
    return True  # Indicate success



# Function to generate content using AI and save it to a file.
def Content(Topic):
    # Nested function to open a file in TextEdit (macOS equivalent of Notepad).
    def OpenTextEdit(File):
        subprocess.run(["open", "-a", "TextEdit", File])  # Open the file in TextEdit.

    # Nested function to generate content using the AI chatbot
    def ContentWriterAI(prompt):
        messages.append({"role": "user", "content": f"{prompt}"})  # Add the user's prompt to messages
        completion = client.chat.completions.create(
            model="mixtral-8x7b-32768",
            messages=SystemChatBot + messages,
            max_tokens=2048,
            temperature=0.7,
            top_p=1,
            stream=True,
            stop=None
        )
        Answer = "" 
        for chunk in completion:
            if chunk.choices[0].delta.content:
                Answer += chunk.choices[0].delta.content
        Answer = Answer.replace("</s>", "")
        messages.append({"role": "assistant", "content": Answer})
        return Answer

    Topic = Topic.replace("content ", "")
    ContentByAI = ContentWriterAI(Topic)
    os.makedirs("Data", exist_ok=True)  # Ensure the "Data" directory exists
    with open(f"Data/{Topic.lower().replace(' ', '')}.txt", "w", encoding="utf-8") as file:
        file.write(ContentByAI)
    OpenTextEdit(f"Data/{Topic.lower().replace(' ', '')}.txt")
    return True

 
# Function to search YouTube.
def YouTubeSearch(Topic):
    Url4Search = f"https://www.youtube.com/results?search_query={Topic}"  
    webbrowser.open(Url4Search)  
    return True  


# Function to play a video on YouTube.
def PlayYouTube(query):
    playonyt(query)  # Use pywhatkit's playonyt function to play the video
    return True  # Indicate success


# Function to open an application.
def OpenApp(app):
    try:
        subprocess.run(["open", "-a", app])  # Open the application using macOS's `open` command
        return True
    except Exception as e:
        print(f"Error opening app: {e}")
        return False


def extract_Links(html):
    if html is None:
        return []
    soup = BeautifulSoup(html, 'html.parser')  # Parse the HTML content
    links = soup.find_all('a', {'jsname': 'UWckNb'})  # Find relevant links
    return [link.get('href') for link in links]  # Return the links


# Function to perform a Google search and retrieve HTML.
def search_google(query):
    url = f"https://www.google.com/search?q={query}"
    headers = {"User-Agent": useragent}
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.text
    else:
        print("Error: Unable to fetch search results.")
        return None

# Function to close an application.
def CloseApp(app):
    try:
        subprocess.run(["pkill", app])  # Close the application using `pkill`
        return True
    except Exception as e:
        print(f"Error closing app: {e}")
        return False


CloseApp("TextEdit")


# Function to control system volume.
def System(command):
    # Nested function to mute the system volume
    def mute():
        subprocess.run(["osascript", "-e", "set Volume 0"])  # Mute volume using AppleScript

    def unmute():
        subprocess.run(["osascript", "-e", "set Volume 5"])  # Unmute and set volume to 50%

    # Nested function to increase the system volume
    def volume_up():
        subprocess.run(["osascript", "-e", "set Volume output volume (output volume of (get volume settings) + 10)"])

    # Nested function to decrease the system volume
    def volume_down():
        subprocess.run(["osascript", "-e", "set Volume output volume (output volume of (get volume settings) - 10)"])

    if command == "mute":
        mute()
    elif command == "unmute":
        unmute()
    elif command == "volume up":
        volume_up()
    elif command == "volume down":
        volume_down()
    else:
        return True


async def TranslateAndExecute(commands: list[str]):
    funcs = []  # List to store asynchronous tasks
    for command in commands:
        if command.startswith("open "):  # Handle "open" commands
            if "open file" in command:  # Ignore "open file" commands
                pass
            else:
                fun = asyncio.to_thread(OpenApp, command.removeprefix("open "))
                funcs.append(fun)
        elif command.startswith("general "):
            pass
        elif command.startswith("realtime "):
            pass
        elif command.startswith("close "):  # Handle "close" commands
            fun = asyncio.to_thread(CloseApp, command.removeprefix("close "))
            funcs.append(fun)
        elif command.startswith("play "):  # Handle "play" commands
            fun = asyncio.to_thread(PlayYouTube, command.removeprefix("play "))
            funcs.append(fun)
        elif command.startswith("content "):  # Handle "content" commands
            fun = asyncio.to_thread(Content, command.removeprefix("content "))
            funcs.append(fun)
        elif command.startswith("google search "):  # Handle "google search" commands
            fun = asyncio.to_thread(GoogleSearch, command.removeprefix("google search "))
            funcs.append(fun)
        elif command.startswith("youtube search "):  # Handle "youtube search" commands
            fun = asyncio.to_thread(YouTubeSearch, command.removeprefix("youtube search "))
            funcs.append(fun)
        elif command.startswith("system "):  # Handle "system" commands
            fun = asyncio.to_thread(System, command.removeprefix("system "))
            funcs.append(fun)
        else:
            print(f"No function found for command: {command}")
    results = await asyncio.gather(*funcs)
    for result in results:
        if isinstance(result, str):
            yield result
        else:
            yield result


# Asynchronous function to automate command execution.
async def Automation(commands: list[str]):
    async for result in TranslateAndExecute(commands):
        pass
    return True
