from schema import UserBaseModel
from models import User
from sqlalchemy.orm import Session


class UserController:

    def __init__(self) -> None:
        pass

    def create_user(self, user: UserBaseModel, session: Session) -> User:
        pass

    def get_user_by_id(self, user_id: int | str, session: Session) -> User:
        pass

    def get_user_by_username(self, username: str, session: Session) -> User:
        pass

    def update_user(self, user: UserBaseModel, session: Session) -> User:
        pass
