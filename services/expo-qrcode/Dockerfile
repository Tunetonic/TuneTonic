# FROM python:3.8.12-slim

# ENV DISPLAY=host.docker.internal:0.0

# WORKDIR /app

# COPY . .

# RUN apt-get update -y


# RUN apt-get install tk -y

# RUN pip3 install -r requirements.txt

# # RUN apt-get install x11-xserver-utils
# # RUN xhost +

# CMD ["python","-u","main.py"]


# Slim version of Python
FROM ubuntu

WORKDIR /app

COPY . .

# RUN apt install python3-pip
RUN apt-get update

RUN apt-get install -y
RUN apt-get -y install python-pip
RUN apt-get -y install python3.4

RUN apt-get -y install x11-xserver-utils

# ENV DISPLAY=host.docker.internal:0.0
ENV DISPLAY=127.0.0.1:0.0


CMD ["python3","-u","main.py"]

