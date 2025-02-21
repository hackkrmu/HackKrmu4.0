import asyncio
from random import randint
from PIL import Image
import requests
from dotenv import get_key
import os
from time import sleep

# Function to open and display images based on a given prompt
def open_images(prompt):
    folder_path = r"Data"  # Folder where images are stored
    prompt = prompt.replace(" ", "_")  # Replace spaces with underscores

    # Generate the filenames for the images
    Files = [f"{prompt}{i}.jpg" for i in range(1, 5)]

    for jpg_file in Files:
        image_path = os.path.join(folder_path, jpg_file)

        try:
            # Try to open the image
            img = Image.open(image_path)
            print(f"Opening image: {image_path}")
            img.show()
            sleep(1)  # Pause for 1 sec before showing next image

        except IOError:
            print(f"Unable to open {image_path}")

# API details for the Hugging Face stable diffusion model
API_URL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0"
headers = {"Authorization": f"Bearer {get_key('.env', 'HuggingFaceAPIKey')}"}

# Async function to send queries to Hugging Face through API
async def query(payload):
    response = await asyncio.to_thread(requests.post, API_URL, headers=headers, json=payload)
    return response.content

# Async function to generate images based on a prompt
async def generate_images(prompt: str):
    tasks = []

    # Create 4 image generation tasks
    for _ in range(4):
        payload = {
            "inputs": f"{prompt}, quality=2k, sharpness=maximum, Ultra High details, high resolution, seed = {randint(0, 1000000)}",
        }
        task = asyncio.create_task(query(payload))
        tasks.append(task)

    # Wait for all tasks to complete
    image_bytes_list = await asyncio.gather(*tasks)

    # Save the generated images to the files
    for i, image_bytes in enumerate(image_bytes_list):
        with open(fr"Data/{prompt.replace(' ', '_')}{i + 1}.jpg", "wb") as f:
            f.write(image_bytes)

# Wrapper function to generate and open images
def GenerateImages(prompt: str):
    asyncio.run(generate_images(prompt))
    open_images(prompt)

# Main loop to check for image generation requests
while True:
    try:
        # Read the prompt and status from the file
        with open(r"Frontend/Files/ImageGeneration.data", "r") as f:
            Data: str = f.read()
            prompt, status = Data.split(",")

        # If status indicates an image generation request
        if status == "True":
            print("Generating Images...")
            GenerateImages(prompt=prompt)

            # Reset the status in the file after generating image
            with open(r"Frontend/Files/ImageGeneration.data", "w") as f:
                f.write("False,False")
            break  # Exit the loop after generating image

        else:
            sleep(1)  # Wait for 1 sec before checking again
    except Exception as e:
        print(e)
