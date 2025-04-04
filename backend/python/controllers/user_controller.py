from typing import List
from schema import UserBaseModel
from models import User
from sqlalchemy.orm import Session
from passlib.context import CryptContext


class UserController:

    def __init__(self) -> None:
        pass

    def create_user(self, user: UserBaseModel, session: Session, bcrypt_context: CryptContext) -> User:
        # if user.role != 'user':
        #     raise Exception('Only user role is allowed to register!')
        create_user: User = User(
            username=user.username,
            email=user.email,
            name=user.name,
            role=user.role,
            password=bcrypt_context.hash(user.password)
        )
        session.add(create_user)
        session.commit()
        return create_user

    def get_user_by_id(self, user_id: int | str, session: Session) -> User:
        pass

    def get_user_by_username(self, username: str, session: Session) -> User:
        pass

    def update_user(self, user: UserBaseModel, session: Session) -> User:
        pass

    def delete_user(self, user_id: int | str, session: Session):
        pass
