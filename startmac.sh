#!/bin/bash
pip install -r ./services/expo-qrcode/requirements.txt
python ./services/expo-qrcode/main.py

docker-compose up

