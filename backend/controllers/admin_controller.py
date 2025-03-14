from typing import List
from models import User
from sqlalchemy.orm import Session
from schema import UserBaseModel
from exception import HttpNotFound


class AdminController:

    def __init__(self) -> None:
        pass

    def get_all_users(self, session: Session) -> List[User]:

        users: List[User] = session.query(User).filter(User.role != 'admin').filter(User.disabled == 0).all()
        return users
    
    def get_user_count(self, session: Session) -> int:
        return session.query(User).filter(User.role != 'admin').filter(User.disabled != 1).count()
    
    def get_user_by_id(self, session: Session, user_id: int) -> User:
        return session.query(User).filter(User.id == user_id).first()

    def update_user(self, session: Session, user_id: int, form_data: UserBaseModel) -> dict[str, str | int | bool]:
        db_user: User = session.query(User).filter(User.id == user_id).first()
        if db_user is None:
            raise HttpNotFound("User Not Found!")
        db_user.id = user_id
        db_user.username = form_data.username
        db_user.email = form_data.email
        db_user.name = form_data.name
        db_user.role = form_data.role
        db_user.disabled = form_data.disabled

        session.add(db_user)
        session.commit()
        return db_user.to_dict()

    def delete_user(self, user_id: int, session: Session) -> bool:
        user: User = session.query(User).filter(User.id == user_id).first()
        if user is None:
            raise HttpNotFound("User Not Found!")
        session.delete(user)
        session.commit()
        return True
