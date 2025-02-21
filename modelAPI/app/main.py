from api.prediction import router 
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=['*'],
    allow_credentials = True,
    allow_headers=['*']

)
app.include_router(router)


# if __name__ == "__main__":
import uvicorn
uvicorn.run(app, host="0.0.0.0", port=8000)