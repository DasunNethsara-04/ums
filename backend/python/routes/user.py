from fastapi import APIRouter, Depends
from controllers import UserController
from models import User
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
user_dep = Annotated[dict, Depends(auth.get_current_user)]


# API endpoints for User
# update a user
@router.put("/{user_id}")
async def update_user(user: user_dep, user_id: int | str, data: dict[str, Any], db: db):
    pass

