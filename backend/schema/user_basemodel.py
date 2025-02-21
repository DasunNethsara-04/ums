from pydantic import BaseModel
from typing import Optional


class UserBaseModel(BaseModel):
    username: str
    role_id: Optional[int] | None = None
    email: str
    full_name: Optional[str] = None
    hashed_password: str | None = None

    def __str__(self) -> str:
        return self.username
    
    def __repr__(self) -> str:
        return self.username
    
    def __eq__(self, value) -> bool:
        return self.username == value.username
