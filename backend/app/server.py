from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/items/")
async def read_items(param_type: str):
    if param_type == "fruit":
        return ["apple", "banana", "cherry", "date", "elderberry"]
    return ["BMW", "Mercedes", "Audi", "Volkswagen", "Tesla"]


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, port=8000)
