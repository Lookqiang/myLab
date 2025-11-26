@echo off
echo 汉字书写演示项目启动脚本
echo ========================

echo 检查 Node.js 环境...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo 错误：未找到 Node.js，请先安装 Node.js
    echo 下载地址：https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js 环境正常

echo 安装项目依赖...
call npm install
if %errorlevel% neq 0 (
    echo 错误：依赖安装失败
    pause
    exit /b 1
)

echo 依赖安装完成

echo 启动开发服务器...
echo 项目将在浏览器中自动打开
echo 如果没有自动打开，请访问：http://localhost:3000
echo 按 Ctrl+C 停止服务器
echo.

call npm run dev

pause