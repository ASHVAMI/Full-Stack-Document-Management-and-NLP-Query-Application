from datetime import datetime
from pydantic import BaseModel

class DocumentBase(BaseModel):
    title: str
    content_type: str
    file_path: str
    processed_text: str

class DocumentCreate(DocumentBase):
    owner_id: int

class Document(DocumentBase):
    id: int
    created_at: datetime
    owner_id: int

    class Config:
        from_attributes = True