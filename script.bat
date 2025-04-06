@echo off
cd /d "D:\Users\widson.araujo\Desktop\Programas\widson.araujo-main"
git add .
git diff --cached --quiet
IF %ERRORLEVEL% NEQ 0 (
    git commit -m "Upload automático"
    git push origin master
    echo ✅ Alterações enviadas com sucesso!
) ELSE (
    echo ⚠️ Nenhuma alteração para enviar.
)
pause
