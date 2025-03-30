from fastapi import HTTPException
from schema import UserBaseModel, LoginBaseModel
from datetime import datetime, timedelta
from typing import Final, Any
from database import Session
from jose import jwt, JWTError
from models import User
from passlib.context import CryptContext
from exception import HttpBadRequest, HttpUnauthorized, HttpForbidden
from controllers import UserController
from controllers.admin_controller import AdminController

ACCESS_TOKEN_EXPIRE_MINUTES: Final[int] = 30


class AuthController:

    def __init__(self) -> None:
        pass

    def authenticate_user(self, username: str, password: str, session: Session, bcrypt_context: CryptContext) -> User | bool:
        user: User | None = session.query(User).filter(username == User.username).first()
        if not user:
            return False
        if not bcrypt_context.verify(password, user.password):
            return False
        return user

    def verify_token(self, token: str, SECRET_KEY: str, ALGORITHM: str) -> dict[str, str] | HTTPException:
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            username: str = payload.get("sub")
            if username is None:
                raise HttpForbidden(detail="Could not validate credentials")
            return payload

        except JWTError:
            raise HttpUnauthorized(detail="Invalid token")

    def get_current_logged_in_user(self, token: str, secret_key: str, algorithm: str) -> dict[str, Any]:
        try:
            payload: dict[str, Any] = jwt.decode(token, secret_key, algorithms=[algorithm])
            username: Any | None = payload.get("sub")
            user_id: Any | None = payload.get("id")
            role: Any | None = payload.get("role")
            if username is None or user_id is None or role is None:
                raise HttpUnauthorized(detail="Could not validate credentials")
            return {"username":username, "id":user_id, "role":role}
        except JWTError:
            raise HttpUnauthorized(detail="Invalid token")

    def get_user_by_username(self, username:str, session: Session) -> User | None:
        return session.query(User).filter(User.username == username).first()

    def create_access_token(self, user_id: int | str, username: str, role: str, expires_delta: timedelta, algorithm: str, secret_key: str) -> str:
        encode: dict[str, str | int] = {"sub":username, "id":user_id, "role": role}
        expires = datetime.utcnow() + expires_delta
        encode.update({"exp":expires})
        return jwt.encode(encode, secret_key, algorithm=algorithm)

    def register_user(self, user: UserBaseModel, bcrypt_context: CryptContext, session: Session, algorithm: str, secret_key: str) -> dict[str, Any]:
        db_user: User | None = self.get_user_by_username(user.username, session)
        if db_user:
            raise HttpBadRequest(detail="Username already exists")
        create_user: User | None = UserController().create_user(user, session, bcrypt_context)
        token = self.create_access_token(create_user.id, create_user.username, create_user.role, timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES), algorithm, secret_key)
        return {"access_token":token, "token_type":"bearer", "role":create_user.role}

    def login(self, form_data: LoginBaseModel, session: Session, bcrypt_context: CryptContext, secret_key: str, algorithm: str) -> dict[str, Any]:
        user = self.authenticate_user(form_data.username, form_data.password, session, bcrypt_context)
        if not user:
            raise HttpUnauthorized(detail="Could not validate credentials")
        token = self.create_access_token(user.id, user.username, user.role, timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES), algorithm, secret_key)
        return {"access_token": token, "token_type": "bearer", "role": user.role}

    def get_user_role(self, token, KEY, ALGORITHM) -> dict[str, Any | None]:
        if token is None:
            raise HttpForbidden(detail="Token is missing!")
        payload = self.verify_token(token, KEY, ALGORITHM)
        return {"role": payload.get("role")}
    
    def get_user_profile(self, token, KEY, ALGORITHM, db: Session, id:int=None) -> dict[str, Any]:
        if id is not None:
            user: User | None = AdminController().get_user_by_id(db, id)
            if user is None:
                raise HttpBadRequest(detail="User not found")
            return user.to_dict()
        if token is None:
            raise HttpForbidden(detail="Token is missing!")
        logged_in_user: dict[str, Any] = self.get_current_logged_in_user(token, KEY, ALGORITHM)
        user_id: int | None = logged_in_user.get("id")
        user = AdminController().get_user_by_id(db, user_id)
        if user is None:
            raise HttpBadRequest(detail="User not found")
        return user.to_dict()
