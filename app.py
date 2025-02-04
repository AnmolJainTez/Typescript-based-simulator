from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')  # Loads HTML from templates folder

if __name__ == '__main__':
    app.run(debug=True)  # Runs the server on http://127.0.0.1:5000
