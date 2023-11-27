import os
import json
import requests

# GitHub 仓库信息
repo_owner = 'poiroe'
repo_name = 'poiroe.github.io'
MY_GITHUB_TOKEN = os.environ['MY_GITHUB_TOKEN']

# VRChat、Game-G、A&M 的 API 地址
api_endpoints = {
    'VRChat': 'https://api.github.com/repos/poiroe/picx-images-hosting/contents/VRChat',
    'Game-G': 'https://api.github.com/repos/poiroe/picx-images-hosting/contents/Game-G',
    'A&M': 'https://api.github.com/repos/poiroe/picx-images-hosting/contents/A&M'
}

# GitHub 仓库中的目标文件夹
destination_dir = 'PackeryPW/list'

def fetch_and_save_to_json(api_name, api_endpoint):
    # 发送请求获取数据
    print(f'正在请求数据：{api_endpoint}')
    resp = requests.get(api_endpoint)
    
    # 检查请求是否成功
    if resp.status_code == 200:
        data = resp.json()
        json_filename = os.path.join(destination_dir, f'{api_name.lower()}.json')

        # 确保目录存在
        os.makedirs(os.path.dirname(json_filename), exist_ok=True)

        # 直接替换已存在的文件内容
        with open(json_filename, 'w', encoding='utf-8') as json_file:
            json.dump(data, json_file, ensure_ascii=False, indent=2)
        print(f'成功写入数据到：{json_filename}')
    else:
        # 输出错误信息
        print(f'错误：{resp.status_code} - {resp.text}')

# 遍历 API 地址并获取数据
for api_name, api_endpoint in api_endpoints.items():
    fetch_and_save_to_json(api_name, api_endpoint)

# 拉取远程仓库的更改
os.system('git pull origin main')

# 推送更改到 GitHub 仓库
os.system(f'git add {destination_dir}/*.json')
os.system(f'git commit -m "更新 JSON 文件"')
os.system(f'git push https://{MY_GITHUB_TOKEN}@github.com/{repo_owner}/{repo_name}.git HEAD:main')

