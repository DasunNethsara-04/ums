from pydantic import BaseModel


class LoginBaseModel(BaseModel):
    username: str
    password: str
