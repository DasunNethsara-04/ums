from database import Base
from sqlalchemy import Column, Integer, String, Sequence, DateTime, Boolean
from datetime import datetime, timezone


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, Sequence("user_id_seq"), primary_key=True, index=True)
    role = Column(String(10), nullable=False)
    username = Column(String(50), unique=True, index=True)
    email = Column(String(50), unique=True, index=True)
    name = Column(String(50))
    disabled = Column(Boolean(), default=0)
    password = Column(String(65), nullable=False)
    created_at = Column(DateTime, default=datetime.now(timezone.utc))

    def to_dict(self) -> dict[str, str | int | bool]:
        return {
            "id": self.id,
            "role": self.role,
            "username": self.username,
            "email": self.email,
            "name": self.name,
            "disabled": self.disabled,
        }
