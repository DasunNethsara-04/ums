from fastapi import APIRouter, Depends
from typing import Annotated, List, Any
from controllers import AdminController, UserController
from exception import HttpNotFound
from models import User
from routes import auth
from sqlalchemy.orm import Session
from database import get_db
from schema import UserBaseModel

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


# create a new user
@router.post("/users/")
async def create_new_user(user: user_dep, form_data: UserBaseModel, db: db) -> dict[str, Any]:
    return admin_controller.create_user(form_data, db)


# update a user
@router.put("/users/{user_id}")
async def update_user(user: user_dep, user_id: int | str, data: UserBaseModel, db: db) -> dict[str, str | int | bool]:
    return admin_controller.update_user(db, user_id, data)


# delete a user
@router.delete("/users/{user_id}")
async def delete_user(user: user_dep, user_id: int | str, session: db) -> bool:
    return admin_controller.delete_user(user_id, session)


# get user count
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
