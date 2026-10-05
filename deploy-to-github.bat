@echo off
echo ==============================================
echo   Pushing Portfolio to GitHub (25al091-dotcom)
echo ==============================================
echo.
git add .
git commit -m "Update portfolio site"
git branch -M main
git push -u origin main
echo.
echo ==============================================
echo   Done! Check your site at:
echo   https://25al091-dotcom.github.io/portfolio/
echo ==============================================
pause
