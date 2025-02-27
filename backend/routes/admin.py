from fastapi import APIRouter, Depends
from typing import Annotated, List, Any
from controllers import AdminController, UserController
from models import User
from routes import auth
from sqlalchemy.orm import Session
from database import get_db

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
async def get_all_users(user: user_dep, session: db) -> List[dict[str, str | int | bool]]:
    users = admin_controller.get_all_users(session)
    return [user.to_dict() for user in users]


# update a user
@router.put("/users/{user_id}")
async def update_user(user: user_dep, user_id: int | str, data: dict[str, Any], db: db):
    pass


# delete a user
@router.delete("/users/{user_id}")
async def delete_user(user: user_dep, user_id: int | str, session: db):
    return user_controller.delete_user(user_id, session)


@router.get("/users/count")
async def get_users_count(user: user_dep, session: db) -> dict[str, Any]:
    count = admin_controller.get_user_count(session)
    return {"count": count}


@router.get("/users/{user_id}")
async def get_user_by_id(user: user_dep, user_id: int | str, session: db) -> dict[str, str | int | bool] | dict[str, str]:
    db_user: User = admin_controller.get_user_by_id(session, user_id)
    if db_user:
        return db_user.to_dict()
    return {"detail": "User not found"}
