from typing import List
from models import User
from sqlalchemy.orm import Session


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
