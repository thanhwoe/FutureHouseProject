FROM python:3
ENV PYTHONUNBUFFERED 1
WORKDIR /final
ADD ./backend/requirements.txt /final/backend/
RUN pip install --upgrade pip
RUN pip install gunicorn
RUN pip install -r backend/requirements.txt
ADD ./docker /final/docker
ADD ./backend /final/backend