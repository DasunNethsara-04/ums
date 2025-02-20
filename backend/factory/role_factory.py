from models import Role


class RoleFactory:

    def __init__(self) -> None:
        pass

    def create(self) -> set[Role]:
        return {
            Role(role="admin"),
            Role(role="maintainer"),
            Role(role="moderator"),
            Role(role="user")
        }