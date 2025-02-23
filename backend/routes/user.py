from fastapi import APIRouter, Depends
from controllers import UserController
from models import users
from sqlalchemy.orm import Session
from typing import Any, Annotated, List
from database import get_db
from routes import auth

router: APIRouter = APIRouter(
    prefix="/users",
    tags=['users']
)

# controller initialization
user_controller: UserController = UserController()

# dependencies
db = Annotated[Session, Depends(get_db)]

# API endpoints for User

