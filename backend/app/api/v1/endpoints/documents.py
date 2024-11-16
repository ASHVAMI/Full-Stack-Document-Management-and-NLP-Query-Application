from typing import List
from fastapi import APIRouter, Depends, File, UploadFile, HTTPException
from sqlalchemy.orm import Session
import uuid

from app.core.auth import get_current_user
from app.db.session import get_db
from app.models.user import User
from app.schemas.document import DocumentCreate, Document
from app.services.s3 import S3Service
from app.services.document_processor import DocumentProcessor

router = APIRouter()
s3_service = S3Service()
doc_processor = DocumentProcessor()

@router.post("/upload", response_model=Document)
async def upload_document(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Generate unique filename
    file_ext = file.filename.split(".")[-1]
    file_name = f"{uuid.uuid4()}.{file_ext}"
    
    # Upload to S3
    s3_path = await s3_service.upload_file(file.file, file_name)
    
    # Process document
    processed_text = await doc_processor.process_document(file.file, file.content_type)
    
    # Create document record
    doc = DocumentCreate(
        title=file.filename,
        file_path=s3_path,
        content_type=file.content_type,
        processed_text=processed_text,
        owner_id=current_user.id
    )
    
    return doc

@router.post("/query")
async def query_documents(
    query: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Query vector store and return results
    results = await doc_processor.query(query)
    return {"results": results}