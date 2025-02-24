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
