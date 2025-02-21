from schema import UserBaseModel
from models import User
from sqlalchemy.orm import Session
from passlib.context import CryptContext


class UserController:

    def __init__(self) -> None:
        pass

    def create_user(self, user: UserBaseModel, session: Session, bcrypt_context: CryptContext) -> User:
        create_user: User = User(
            username=user.username,
            email=user.email,
            full_name=user.full_name,
            password=bcrypt_context.hash(user.hashed_password)
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
