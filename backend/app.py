from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from database.database import Base, get_db, engine
from models import User, Role
from factory import RoleFactory
from database import DBSeeder
from routes import auth
from typing import Annotated
from sqlalchemy.orm import Session
from exception import HttpUnauthorized

# initialize the main FastAPI application
app = FastAPI()

# include routes
app.include_router(auth.router)

# middlewares
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# app.add_middleware(RateLimitMiddleware)


@app.on_event("startup")
async def on_startup() -> None:
    Base.metadata.create_all(bind=engine)
    db = next(get_db())
    DBSeeder(db).seed(RoleFactory().create())


@app.on_event("shutdown")
async def on_shutdown() -> None:
    # delete all the tables
    Base.metadata.drop_all(bind=engine)


@app.get("/")
async def index() -> dict[str, str]:
    return {"message": "Hello, World!"}


@app.get("/api/users")
async def get_all_users(user: Annotated[dict, Depends(auth.get_current_user)], session: Annotated[Session, Depends(get_db)]):
    if user is None:
        raise HttpUnauthorized()
    users = session.query(User).all()
    return {"users": [user.to_dict() for user in users]}
