from pydantic import BaseModel


class UserBaseModel(BaseModel):
    username: str
    role: str
    email: str
    name: str
    hashed_password: str | None = None

    def __str__(self) -> str:
        return self.username
    
    def __repr__(self) -> str:
        return self.username
    
    def __eq__(self, value) -> bool:
        return self.username == value.username
