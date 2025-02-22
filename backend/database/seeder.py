from sqlalchemy.orm import Session
from models import Role


class DBSeeder:

    def __init__(self, db: Session):
        self.db = db

    def seed(self, data: set[Role]) -> bool:
        # Query the database for existing role names
        existing_roles = self.db.query(Role.role).all()
        existing_roles = {role[0] for role in existing_roles}  # Extract role names

        # Filter out roles that already exist
        new_roles = [role for role in data if role.role not in existing_roles]

        if new_roles:
            self.db.add_all(new_roles)
            self.db.commit()

        self.db.close()
        return True
