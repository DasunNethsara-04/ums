from typing import Final
from fastapi import APIRouter
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer

KEY: Final[str] = "key"
ALGORITHM: Final[str] = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES: Final[int] = 30
bcrypt_context: CryptContext = CryptContext(schemes=['bcrypt'], deprecated='auto')
oauth2_bearer: OAuth2PasswordBearer = OAuth2PasswordBearer(tokenUrl='auth/token')

router: APIRouter = APIRouter(
    prefix='/auth',
    tags=['auth'],
)

