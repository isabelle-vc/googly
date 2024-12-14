from datetime import datetime, timezone
from random import choice

from fastapi import FastAPI, HTTPException

app = FastAPI()
emojis = ["🪴", "🌵", "🌻", "🌷", "🍀", "🍂", "🍁", "🌱"]
fake_db = [
    {
        "nickname": "isabelle-vc",
        "profile_picture": "https://avatars.githubusercontent.com/u/190193184?v=4",
    },
    {
        "nickname": "avcaliani",
        "profile_picture": "https://avatars.githubusercontent.com/u/15377830?v=4",
    },
]


@app.get("/")
async def root():
    return {
        "api_name": f"Googly API {choice(emojis)}",
        "current_datetime": datetime.now(timezone.utc),
    }


@app.post("/login")
async def login(credentials: dict):

    if not credentials.get("password"):
        raise HTTPException(status_code=401, detail="Invalid Credentials!")

    nickname = credentials.get("nickname")
    for user in fake_db:
        if nickname == user.get("nickname"):
            response = user.copy()
            response["current_datetime"] = datetime.now(timezone.utc)
            return response

    raise HTTPException(status_code=404, detail="User not found!")
