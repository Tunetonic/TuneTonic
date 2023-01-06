from algorithme_validation import is_algo_validated, list_is_empty
import pandas as pd
import random

def initial_values(genres, priority_genres = None) -> pd.DataFrame:
    if list_is_empty(genres):
        raise Exception("genres is empty!")
    
    df = pd.DataFrame(index=genres)
    total_chance = 100
    genres_len = len(genres)
    
    if list_is_empty(priority_genres):
        df["chance"] = total_chance / genres_len
    else:
        priority_genre_len = len(priority_genres)
        reserved_chance = 60 if priority_genre_len > 2 else 40
        leftover_chance = total_chance - reserved_chance
        prio_chance = reserved_chance / priority_genre_len
        
        df["chance"] = leftover_chance / (genres_len - priority_genre_len)
        
        for i in priority_genres:
            if not i in df.index:
                continue
            df.loc[i, "chance"] = prio_chance
    return df


# cache df
# df gets updated with the likes after the person logs off or at 12:00 in the night with CRON
def content_algorithme(df = None, songs = [], batch = 1):
    if not is_algo_validated(df, songs):
        raise Exception("Algorithme doesn't have the right tools to execute!")
    
    selected_song_genres = list(map(lambda x:x.genre, songs))
    selected_subset = df.loc[selected_song_genres]
    print(selected_subset)
    if len(selected_subset["chance"].unique()) == 1:
        return random.choices(songs, k=batch)
    else:
        # make all the numbers sum to 100% 
        # choose song based on those %
        # batch = how many songs in the list
        return []

