from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

from app.db.base_class import Base

class Document(Base):
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    file_path = Column(String)  # S3 path
    content_type = Column(String)
    processed_text = Column(String)  # Extracted text from document
    created_at = Column(DateTime, default=datetime.utcnow)
    owner_id = Column(Integer, ForeignKey("user.id"))
    
    # Relationships
    owner = relationship("User", back_populates="documents")