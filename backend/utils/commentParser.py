import pandas as pd
import csv
import os

def commentParser(comment):
    res = comment.get('content')
    res = res.replace('\n', ' ').replace('\r', ' ')    
    return res


def save(comments):
    # Remove newline characters from comments
    comments = [comment.replace('\n', ' ').replace('\r', ' ') for comment in comments]

    # Ensure the directory exists
    os.makedirs('data', exist_ok=True)

    # Save the comments to test.csv at ../data/test.csv using pandas
    df = pd.DataFrame(comments, columns=['comment'])
    df.to_csv('data/test.csv', index=False, quoting=csv.QUOTE_ALL, mode='w')