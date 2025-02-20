from fastapi import FastAPI
from database.database import Base, get_db, engine
from models import User, Role
from factory import RoleFactory
from database import DBSeeder

app = FastAPI()


@app.on_event("startup")
async def on_startup() -> None:
    Base.metadata.create_all(bind=engine)
    db = next(get_db())
    DBSeeder(db).seed(RoleFactory().create())


@app.get("/")
async def index() -> dict[str, str]:
    return {"message": "Hello, World!"}
