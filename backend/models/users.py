from database import Base
from sqlalchemy import Column, Integer, String, Sequence


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, Sequence("user_id_seq"), primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True)
    email = Column(String(50), unique=True, index=True)
    full_name = Column(String(50))
    disabled = Column(Integer)
    hashed_password = Column(String(65))

    def to_dict(self) -> dict[str, str | int | bool]:
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "full_name": self.full_name,
            "disabled": self.disabled,
            "hashed_password": self.hashed_password
        }
