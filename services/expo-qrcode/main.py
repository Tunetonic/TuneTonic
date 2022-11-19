import os
import socket
import qrcode

PORT = 19000
BASE_DIR = os.path.dirname(__file__)

def get_ip_address():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.connect(("8.8.8.8", 80))
    return s.getsockname()[0]

def to_expo_link():
    expo_domain = "exp://"
    return f"{expo_domain}{get_ip_address()}:{PORT}"

if __name__ == "__main__":
    qr = qrcode.make(to_expo_link()).show()
    