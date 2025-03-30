from starlette import status
from schema import UserBaseModel
from typing import Final, Annotated, Any
from database import get_db, Session
from fastapi import APIRouter, Depends
from passlib.context import CryptContext
from controllers import AuthController, UserController
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from exception import HttpForbidden

router: APIRouter = APIRouter(
    prefix='/auth',
    tags=['auth'],
)

# controllers
auth_controller: AuthController = AuthController()
user_controller: UserController = UserController()

# dependencies
db_dependency = Annotated[Session, Depends(get_db)]

KEY: Final[str] = "key"
ALGORITHM: Final[str] = "HS256"
bcrypt_context: CryptContext = CryptContext(schemes=['bcrypt'], deprecated='auto')
oauth2_bearer: OAuth2PasswordBearer = OAuth2PasswordBearer(tokenUrl='auth/token')


@router.post('/', status_code=status.HTTP_201_CREATED)
async def register_user(user: UserBaseModel, db: db_dependency) -> dict[str, Any]:
    return auth_controller.register_user(user, bcrypt_context, db, ALGORITHM, KEY)


async def get_current_user(token: Annotated[str, Depends(oauth2_bearer)]) -> dict[str, Any]:
    return auth_controller.get_current_logged_in_user(token, KEY, ALGORITHM)


@router.post("/login")
async def login_for_access_token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db: db_dependency) -> dict[str, str]:
    return auth_controller.login(form_data, db, bcrypt_context, KEY, ALGORITHM)


@router.get("/verify-token")
async def verify_user_token(token: str) -> dict[str, str]:
    if auth_controller.verify_token(token, KEY, ALGORITHM) is None:
        HttpForbidden(detail="Token is invalid or expired!")
    return {"detail": "Token is valid"}


@router.post("/role")
async def get_user_role(token: Annotated[str, Depends(oauth2_bearer)]) -> dict[str, str]:
    if token is None:
        raise HttpForbidden(detail="Token is missing!")
    return auth_controller.get_user_role(token, KEY, ALGORITHM)


@router.get("/profile")
async def get_user_profile(token: Annotated[str, Depends(oauth2_bearer)], db: db_dependency, id:int=None) -> dict[str, Any]:
    if token is None:
        raise HttpForbidden(detail="Token is missing!")
    return auth_controller.get_user_profile(token, KEY, ALGORITHM, db, id)


@router.patch("/profile/edit/{user_id}/basic")
async def update_user_profile_basic_details(
    token: Annotated[str, Depends(oauth2_bearer)], user_id: int, form_data: dict[str, str], db: db_dependency) -> dict[str, str | int | bool]:
    if token is None:
        raise HttpForbidden(detail="Token is missing!")
    if user_id is None:
        raise HttpForbidden(detail="User ID is missing")
    return auth_controller.update_user_basic_details(user_id, form_data, db)


@router.patch("/profile/edit/{user_id}/username")
async def update_user_profile_username(
    token: Annotated[str, Depends(oauth2_bearer)], user_id: int, form_data: dict[str, str], db: db_dependency) -> dict[str, str | int | bool]:
    if token is None:
        raise HttpForbidden(detail="Token is missing!")
    if user_id is None:
        raise HttpForbidden(detail="User ID is missing")
    return auth_controller.update_user_username(user_id, form_data, db)


@router.patch("/profile/edit/{user_id}/password")
async def update_user_profile_email(token: Annotated[str, Depends(oauth2_bearer)], user_id: int, form_data: dict[str, str], db: db_dependency) -> dict[str, str | int | bool]:
    if token is None:
        raise HttpForbidden(detail="Token is missing!")
    if user_id is None:
        raise HttpForbidden(detail="User ID is missing")
    if form_data.get("password") != form_data.get("confirm_password"):
        raise HttpForbidden(detail="Password and Confirm Password do not match")
    return auth_controller.update_user_password(user_id, form_data, db, bcrypt_context)

