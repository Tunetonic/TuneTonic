import pandas as pd

def list_is_empty(arr) -> bool:
    if isinstance(arr, list) and len(arr) > 0:
        return False
    return True

def is_algo_validated(df = None, songs = []) -> bool:
    if not isinstance(df, pd.DataFrame):
        raise Exception("Dataframe is incorrect!")
    if list_is_empty(songs):
        raise TypeError("Songs are not of type List!")
    if len(songs) == 0:
        raise BaseException("Songs are Empty!")
    return True
