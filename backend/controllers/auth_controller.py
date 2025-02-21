from schema import UserBaseModel, TokenBaseModel
from datetime import datetime, timedelta
from typing import Final
from database import Session
from jose import jwt
from models import User
from passlib.context import CryptContext
from exception import HttpBadRequest
from controllers import UserController

ACCESS_TOKEN_EXPIRE_MINUTES: Final[int] = 30


class AuthController:

    def __init__(self) -> None:
        pass

    def get_user_by_username(self, username:str, session: Session) -> User | None:
        return session.query(User).filter(User.username == username).first()

    def create_access_token(self, id: int | str, username: str, expires_delta: timedelta, algorithm: str, secret_key: str) -> str:
        encode: dict[str, str] = {"sub":username, "id":id}
        expires = datetime.utcnow() + expires_delta
        encode.update({"exp":expires})
        return jwt.encode(encode, secret_key, algorithm=algorithm)

    def register_user(self, user: UserBaseModel, bcrypt_context: CryptContext, session: Session, algorithm: str, secret_key: str) -> dict[str, str]:
        db_user: User = self.get_user_by_username(user.username, session)
        if db_user:
            raise HttpBadRequest(detail="Username already exists")
        create_user: User = UserController().create_user(self, user, session, bcrypt_context)
        token = self.create_access_token(id, create_user.username, timedelta(ACCESS_TOKEN_EXPIRE_MINUTES), algorithm, secret_key)
        return {"access_token":token, "token_type":"bearer"}
