from backend.server import Manager, create_app

if __name__ == "__main__":
    Manager.connect()
    app = create_app()
    app.run(debug=True)