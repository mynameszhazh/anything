# pip  install Flask

from flask import Flask, render_template

app = Flask(__name__)

hero = ["蜘蛛人", "鋼鐵人", "美國隊長", "雷神", "浩克"]


@app.route("/")
def index():
    return render_template("index.html", hero=hero)


app.run(debug=True)
