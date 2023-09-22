::批量重命名txt后缀的文件
@echo off
set a=00
setlocal EnableDelayedExpansion
for %%n in (*.webp) do (
set /A a+=1
ren "%%n" "!a!.webp"
)