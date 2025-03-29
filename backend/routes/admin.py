from fastapi import APIRouter, Depends
from typing import Annotated, List, Any
from controllers import AdminController, UserController
from models import User
from routes import auth
from sqlalchemy.orm import Session
from database import get_db
from schema import UserBaseModel
from exception import HttpForbidden

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
    if user['role'] != 'admin' and user['role'] != 'moderator':
        raise HttpForbidden(detail="You are not authorized to access this resource")
    users = admin_controller.get_all_users(session)
    return [user.to_dict() for user in users]


# create a new user
@router.post("/users/")
async def create_new_user(user: user_dep, form_data: UserBaseModel, db: db) -> dict[str, Any]:
    if user['role'] != 'admin' and user['role'] != 'moderator':
        raise HttpForbidden(detail="You are not authorized to access this resource")
    return admin_controller.create_user(form_data, db)


# update a user
@router.put("/users/{user_id}")
async def update_user(user: user_dep, user_id: int | str, data: UserBaseModel, db: db) -> dict[str, str | int | bool]:
    if user['role'] != 'admin' and user['role'] != 'moderator':
        raise HttpForbidden(detail="You are not authorized to access this resource")
    return admin_controller.update_user(db, user_id, data)


# delete a user
@router.delete("/users/{user_id}")
async def delete_user(user: user_dep, user_id: int | str, session: db) -> bool:
    return admin_controller.delete_user(user_id, session)


# get user count
@router.get("/users/count")
async def get_users_count(user: user_dep, session: db) -> dict[str, Any]:
    if user['role'] != 'admin' and user['role'] != 'moderator':
        raise HttpForbidden(detail="You are not authorized to access this resource")
    count = admin_controller.get_user_count(session)
    return {"count": count}


@router.get("/users/{user_id}")
async def get_user_by_id(user: user_dep, user_id: int | str, session: db) -> dict[str, str | int | bool] | dict[str, str]:
    if user['role'] != 'admin' and user['role'] != 'moderator':
        raise HttpForbidden(detail="You are not authorized to access this resource")
    db_user: User = admin_controller.get_user_by_id(session, user_id)
    if db_user:
        return db_user.to_dict()
    return {"detail": "User not found"}


@router.get("/moderators/count")
async def get_moderators_count(user: user_dep, session: db) -> dict[str, int]:
    if user['role'] != 'admin':
        raise HttpForbidden(detail="You are not authorized to access this resource")
    return admin_controller.get_moderators_count(session)


@router.post("/moderators/")
async def create_new_moderator(user: user_dep, session: db, form_data: UserBaseModel) -> dict[str, str]:
    if user['role'] != 'admin':
        raise HttpForbidden(detail="You are not authorized to access this resource")
    return admin_controller.create_new_moderator(session, form_data)


@router.get("/moderators/")
async def get_all_moderators(user: user_dep, session: db) -> List[dict[str, str | int | bool]]:
    if user['role'] != 'admin':
        raise HttpForbidden(detail="You are not authorized to access this resource")
    return admin_controller.get_all_moderators(session)


@router.get("/moderators/{moderator_id}")
async def get_moderator_by_id(user: user_dep, moderator_id:int, session:db) -> dict[str, str | int | bool]:
    if user['role'] != 'admin':
        raise HttpForbidden(detail="You are not authorized to access this resource")
    return admin_controller.get_moderator_by_id(session, moderator_id)


@router.put("/moderators/{moderator_id}")
async def update_moderator(user: user_dep, moderator_id:int, form_data: UserBaseModel, session:db) -> dict[str, str | int | bool]:
    if user['role'] != 'admin':
        raise HttpForbidden(detail="You are not authorized to access this resource")
    return admin_controller.update_user(session, moderator_id, form_data)


@router.delete("/moderators/{moderator_id}")
async def delete_moderator(user: user_dep, moderator_id:int, session:db) -> bool:
    if user['role'] != 'admin':
        raise HttpForbidden(detail="You are not authorized to access this resource")
    return admin_controller.delete_user(moderator_id, session)
