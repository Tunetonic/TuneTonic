import os
import socket
import qrcode
from PIL import Image, ImageTk
import tkinter as tk
import matplotlib
import time

matplotlib.use('Agg')

PORT = 19000
BASE_DIR = os.path.dirname(__file__)

def get_ip_address():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.connect(("8.8.8.8", 80))
    return s.getsockname()[0]

def to_expo_link():
    expo_domain = "exp://"
    return f"{expo_domain}{get_ip_address()}:{PORT}"

def show_imge(path):
    image_window = tk.Tk()
    img = ImageTk.PhotoImage(Image.open(path))
    panel = tk.Label(image_window, image=img)
    panel.pack(side="bottom", fill="both", expand="yes")
    image_window.mainloop()

if __name__ == "__main__":
    qr = qrcode.make(to_expo_link())
    qr.save(os.path.join(BASE_DIR, "qr.png"), "PNG")
    
    show_imge(os.path.join(os.path.join(BASE_DIR, "qr.png")))