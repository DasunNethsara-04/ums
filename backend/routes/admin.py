from fastapi import APIRouter, Depends
from typing import Annotated, List
from controllers import AdminController
from routes import auth
from sqlalchemy.orm import Session
from database import get_db

router: APIRouter = APIRouter(
    prefix='/admin',
    tags=['admin'],
)

# controllers
admin_controller: AdminController = AdminController()

# dependencies
db = Annotated[Session, Depends(auth.get_db)]
user_dep = Annotated[dict, Depends(auth.get_current_user)]


@router.get("/users/")
async def get_all_users(user: user_dep, session: db) -> dict[str, list[dict[str, str | int | bool]]]:
    users = admin_controller.get_all_users(session)
    return {"users": [user.to_dict() for user in users]}
