import os
import json
import requests

# GitHub repository information
repo_owner = 'poiroe'
repo_name = 'poiroe.github.io'
MY_GITHUB_TOKEN = os.environ['MY_GITHUB_TOKEN']

# API endpoints for VRChat, Game-G, A&M
api_endpoints = {
    'VRChat': 'https://api.github.com/repos/poiroe/picx-images-hosting/contents/vrchat',
    'Game-G': 'https://api.github.com/repos/poiroe/picx-images-hosting/contents/game-g',
    'A&M': 'https://api.github.com/repos/poiroe/picx-images-hosting/contents/a&m'
}

# Destination directory in the GitHub repository
destination_dir = 'PackeryPW/list'

def fetch_and_save_to_json(api_name, api_endpoint):
    resp = requests.get(api_endpoint)
    data = resp.json()

    json_filename = f'{destination_dir}/{api_name.lower()}.json'

    with open(json_filename, 'w', encoding='utf-8') as json_file:
        json.dump(data, json_file, ensure_ascii=False, indent=2)

# Loop through API endpoints and fetch data
for api_name, api_endpoint in api_endpoints.items():
    fetch_and_save_to_json(api_name, api_endpoint)

# Push changes to GitHub repository
os.system(f'git config user.email "actions@github.com"')
os.system(f'git config user.name "GitHub Actions"')
os.system(f'git add {destination_dir}/*.json')
os.system(f'git commit -m "Update JSON files"')
os.system(f'git push https://{MY_GITHUB_TOKEN}@github.com/{repo_owner}/{repo_name}.git HEAD:main')
