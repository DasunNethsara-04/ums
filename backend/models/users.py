from database import Base
from sqlalchemy import Column, Integer, String, Sequence, ForeignKey, DateTime
from datetime import datetime, timezone
from sqlalchemy.orm import relationship


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, Sequence("user_id_seq"), primary_key=True, index=True)
    role_id = Column(ForeignKey("roles.id"), nullable=False)
    username = Column(String(50), unique=True, index=True)
    email = Column(String(50), unique=True, index=True)
    full_name = Column(String(50))
    disabled = Column(Integer)
    hashed_password = Column(String(65), nullable=False)
    created_at = Column(DateTime, default=datetime.now(timezone.utc))

    role = relationship("Role", back_populates="users")

    def to_dict(self) -> dict[str, str | int | bool]:
        return {
            "id": self.id,
            "role_id": self.role_id,
            "role": self.role.role.value if self.role else None,
            "username": self.username,
            "email": self.email,
            "full_name": self.full_name,
            "disabled": self.disabled,
            "hashed_password": self.hashed_password
        }
