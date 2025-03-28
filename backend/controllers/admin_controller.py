from typing import List, Any
from models import User
from sqlalchemy.orm import Session
from schema import UserBaseModel
from exception import HttpNotFound
from passlib.context import CryptContext
from exception.internal_server_error import HttpInternalServerError


class AdminController:

    def __init__(self) -> None:
        self.bcrypt_context: CryptContext = CryptContext(schemes=['bcrypt'], deprecated='auto')
        pass

    def create_user(self, form_data: UserBaseModel, session: Session) -> dict[str, Any]:
        try:
            create_user: User = User(
            username=form_data.username,
            email=form_data.email,
            name=form_data.name,
            role="user",
            password=self.bcrypt_context.hash(form_data.password)
        )
            session.add(create_user)
            session.commit()
            return {"success": True, "message": "User created successfully!"}
        except Exception as e:
            raise HttpInternalServerError(f"{e}")

    def get_all_users(self, session: Session) -> List[User]:
        users: List[User] = session.query(User).filter(User.role != 'admin').filter(User.role != 'moderator').filter(User.disabled == 0).all()
        return users
    
    def get_user_count(self, session: Session) -> int:
        return session.query(User).filter(User.role != 'admin').filter(User.role != 'moderator').filter(User.disabled != 1).count()
    
    def get_user_by_id(self, session: Session, user_id: int) -> User | None:
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

    def create_new_moderator(self, session:Session, form_data: UserBaseModel) -> dict[str, str]:
        try:
            create_user: User = User(
            username=form_data.username,
            email=form_data.email,
            name=form_data.name,
            role="moderator",
            password=self.bcrypt_context.hash(form_data.password)
        )
            session.add(create_user)
            session.commit()
            return {"message": "Moderator created successfully!"}
        except Exception as e:
            raise HttpInternalServerError(f"{e}")
    
    def get_moderators_count(self, session:Session) -> dict[str, int]:
        count: int = session.query(User).filter(User.role == 'moderator').filter(User.disabled != 1).count()
        return {'count': count}
    
    def get_all_moderators(self, session: Session) -> List[dict[str, str | int | bool]]:
        moderators: List[User] = session.query(User).filter(User.role == 'moderator').filter(User.disabled != 1).all()
        return [moderator.to_dict() for moderator in moderators]

    def get_moderator_by_id(self, session: Session, moderator_id:int) -> dict[str, str | int | bool]:
        if moderator_id is None:
            raise HttpNotFound("Moderator Not Found!")
        moderator = session.query(User).filter(User.id == moderator_id).first()
        if moderator is None:
            raise HttpNotFound("Moderator Not Found!")
        return moderator.to_dict()

    def update_moderator(self, session: Session, moderator_id: int, form_data: UserBaseModel) -> dict[str, str | int | bool]:
        db_user: User = session.query(User).filter(User.id == moderator_id).first()
        if db_user is None:
            raise HttpNotFound("Moderator Not Found!")
        db_user.id = moderator_id
        db_user.username = form_data.username
        db_user.email = form_data.email
        db_user.name = form_data.name
        db_user.role = form_data.role
        db_user.disabled = form_data.disabled

        session.add(db_user)
        session.commit()

        return db_user.to_dict()
    
    def delete_moderator(self, moderator_id: int, session: Session) -> bool:
        moderator: User = session.query(User).filter(User.id == moderator_id).first()
        if moderator is None:
            raise HttpNotFound("Moderator Not Found!")
        session.delete(moderator)
        session.commit()
        return True
