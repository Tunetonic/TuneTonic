from typing import List

class Song:
    def __init__(self, name, artist, genre):
        self.name = name
        self.artist = artist
        self.genre = genre
    
    @staticmethod
    def transform_to_song(data = []) -> List:
        if len(data) == 0:
            raise Exception("There are no songs!")

        return list(map(lambda e:Song(e.name, e.artist, e.genre)))
    
    def __str__(self) -> str:
        return f"name: {self.name}, genre: {self.genre}"
    
    def __repr__(self) -> str:
        return self.__str__()