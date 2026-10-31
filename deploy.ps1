param(
    [string]$Message = "chore: update portfolio"
)

Write-Host "Deploying to production..." -ForegroundColor Cyan

git add .
git commit -m $Message
git push origin main

Write-Host "Done! Vercel is deploying... check vercel.com/dashboard" -ForegroundColor Green
