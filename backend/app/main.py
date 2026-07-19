from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import pipelines

app = FastAPI(title="Pipeline Builder API")

# Enable CORS for frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(pipelines.router)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}
