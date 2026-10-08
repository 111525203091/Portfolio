@echo off
echo ==============================================
echo   Pushing Portfolio to GitHub (111525203091)
echo ==============================================
echo.
git add .
git commit -m "Update portfolio site"
git branch -M main
git push origin main
git checkout gh-pages
git merge main
git push origin gh-pages
git checkout main
echo.
echo ==============================================
echo   Done! Check your live site at:
echo   https://111525203091.github.io/Portfolio/
echo ==============================================
pause
