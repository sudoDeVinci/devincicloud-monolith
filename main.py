from server import Manager, create_app
from server import PostService, Post, TagManager, Comment

if __name__ == "__main__":
    Manager.connect()
    app = create_app()
    app.run(debug=True)
