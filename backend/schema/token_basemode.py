from pydantic import BaseModel


class TokenBaseModel(BaseModel):
    access_token: str
    token_type: str
