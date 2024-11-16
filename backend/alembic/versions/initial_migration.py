"""initial migration

Revision ID: 1a1fea3c7e2d
Revises: 
Create Date: 2024-03-15 10:00:00.000000

"""
from alembic import op
import sqlalchemy as sa

revision = '1a1fea3c7e2d'
down_revision = None
branch_labels = None
depends_on = None

def upgrade() -> None:
    # Create users table
    op.create_table(
        'user',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('email', sa.String(), nullable=False),
        sa.Column('hashed_password', sa.String(), nullable=False),
        sa.Column('is_active', sa.Boolean(), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_user_email'), 'user', ['email'], unique=True)
    op.create_index(op.f('ix_user_id'), 'user', ['id'], unique=False)

    # Create documents table
    op.create_table(
        'document',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('title', sa.String(), nullable=True),
        sa.Column('file_path', sa.String(), nullable=True),
        sa.Column('content_type', sa.String(), nullable=True),
        sa.Column('processed_text', sa.String(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('owner_id', sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(['owner_id'], ['user.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_document_id'), 'document', ['id'], unique=False)
    op.create_index(op.f('ix_document_title'), 'document', ['title'], unique=False)

def downgrade() -> None:
    op.drop_index(op.f('ix_document_title'), table_name='document')
    op.drop_index(op.f('ix_document_id'), table_name='document')
    op.drop_table('document')
    op.drop_index(op.f('ix_user_id'), table_name='user')
    op.drop_index(op.f('ix_user_email'), table_name='user')
    op.drop_table('user')