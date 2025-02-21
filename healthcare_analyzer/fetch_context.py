import requests
import base64

# Use this function to convert an image file from the filesystem to base64
def image_file_to_base64(image_path):
    with open(image_path, 'rb') as f:
        image_data = f.read()
    return base64.b64encode(image_data).decode('utf-8')

# Use this function to fetch an image from a URL and convert it to base64
def image_url_to_base64(image_url):
    response = requests.get(image_url)
    image_data = response.content
    return base64.b64encode(image_data).decode('utf-8')


def get_context(imgurl,user_prompt):

    api_key = "SG_2e7c94f94005e550"
    url = "https://api.segmind.com/v1/llava-v1.6"

    # Request payload
    data = {
    "images": image_url_to_base64(imgurl),  # Or use image_file_to_base64("IMAGE_PATH")
    "prompt": user_prompt
    }

    headers = {'x-api-key': api_key}


    response = requests.post(url, json=data, headers=headers)
    return response.content  # The response is the generated image