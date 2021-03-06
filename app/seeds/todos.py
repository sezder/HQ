from app.models import db, Todo

seeded_todos = [
  Todo(task='Brainstorm questions for poll', list_id=1, creator_id=11, due='2021-02-01'),
  Todo(task='Finalize poll questions', list_id=1, creator_id=11, due='2021-02-14'),
  Todo(task='Create poll', list_id=1, creator_id=11, due='2021-02-15'), 
  Todo(task='Review Poll Results', list_id=1, creator_id=11, due='2021-02-15'), 
  Todo(task='Lorem ipsum', list_id=4, creator_id=3, due='2021-02-01'),
  Todo(task='Nec commodo', list_id=4, creator_id=3, due='2021-02-01'),
  Todo(task='Neque tempor', list_id=4, creator_id=3, due='2021-02-01'),
  # Todo(task='', list_id=, creator_id=, due=''),
]


def seed_todos():
  db.session.add_all(seeded_todos)
  db.session.commit()


def undo_todos():
  db.session.execute('TRUNCATE todos RESTART IDENTITY CASCADE;')
  db.session.commit()
