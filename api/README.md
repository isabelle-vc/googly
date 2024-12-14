# Googly - API

![License](https://img.shields.io/github/license/isabelle-vc/googly?logo=apache&color=lightseagreen)
![#](https://img.shields.io/badge/python-3.9.6-yellow.svg)

## Quick Start

Here are the steps you need to execute in order to have the API up and running.

### Python Virtual Environment

You need to **create** the virtual environment **only once**!  
If you don't have a `.venv/` yet, then do the following steps.

```bash
# 👇 Checking your Python version
python3 --version # 3.9.6

# 👇 Virtual Environment
python3 -m venv .venv \
  && source .venv/bin/activate \
  && python -m pip install --upgrade pip

# 👇 Dependencies
pip install -r api/requirements.txt
```

If you already have, you just have to activate it...

```bash
source .venv/bin/activate
```

### The API

To start the API, you just need to run the following commands.

```bash
# Check in your browser 👉 http://127.0.0.1:8000
fastapi dev api/main.py
```

_For more details about Fast API, check their [documentation]._

[documentation]: https://fastapi.tiangolo.com/
