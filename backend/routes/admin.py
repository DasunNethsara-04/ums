from fastapi import APIRouter, Depends
from typing import Annotated, List, Any
from controllers import AdminController, UserController
from routes import auth
from sqlalchemy.orm import Session
from database import get_db
from exception import HttpUnauthorized
from routes.auth import oauth2_bearer

router: APIRouter = APIRouter(
    prefix='/admin',
    tags=['admin'],
)

# controllers
admin_controller: AdminController = AdminController()
user_controller: UserController = UserController()

# dependencies
db = Annotated[Session, Depends(get_db)]
user_dep = Annotated[dict, Depends(auth.get_current_user)]


@router.get("/users/")
async def get_all_users(user: user_dep, session: db) -> dict[str, list[dict[str, str | int | bool]]]:
    users = admin_controller.get_all_users(session)
    return {"users": [user.to_dict() for user in users]}


# update a user
@router.put("/{user_id}")
async def update_user(user: user_dep, user_id: int | str, data: dict[str, Any], db: db):
    pass


# delete a user
@router.delete("/{user_id}")
async def delete_user(user: user_dep, user_id: int | str, session: db):
    return user_controller.delete_user(user_id, session)


@router.get("/users/count")
async def get_users_count(user: user_dep, session: db) -> dict[str, Any]:
    count = admin_controller.get_user_count(session)
    return {"count": count, "role": user['role']}
