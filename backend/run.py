from app import create_app


app = create_app()


if __name__ == "__main__":
    app.run(debug=True)
    
""" 
Para ejecutar el proyecto
python -m flask run
"""