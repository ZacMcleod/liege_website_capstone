"""empty message

Revision ID: 5eb0be1851f9
Revises: 540228584e63
Create Date: 2023-08-16 14:57:18.995554

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5eb0be1851f9'
down_revision = '540228584e63'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('cart_item', schema=None) as batch_op:
        batch_op.add_column(sa.Column('type', sa.String(length=255), nullable=False))
        batch_op.add_column(sa.Column('description', sa.Text(), nullable=False))
        batch_op.add_column(sa.Column('color', sa.String(length=255), nullable=False))
        batch_op.add_column(sa.Column('size', sa.String(length=255), nullable=False))
        batch_op.add_column(sa.Column('year', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('price', sa.Float(), nullable=False))
        batch_op.add_column(sa.Column('picture', sa.String(length=255), nullable=False))

    with op.batch_alter_table('clothing_item', schema=None) as batch_op:
        batch_op.add_column(sa.Column('year', sa.Integer(), nullable=False))
        batch_op.drop_column('date')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('clothing_item', schema=None) as batch_op:
        batch_op.add_column(sa.Column('date', sa.DATE(), nullable=True))
        batch_op.drop_column('year')

    with op.batch_alter_table('cart_item', schema=None) as batch_op:
        batch_op.drop_column('picture')
        batch_op.drop_column('price')
        batch_op.drop_column('year')
        batch_op.drop_column('size')
        batch_op.drop_column('color')
        batch_op.drop_column('description')
        batch_op.drop_column('type')

    # ### end Alembic commands ###