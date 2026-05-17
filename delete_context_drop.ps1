# Safe deletion script for context_drop directory
# This preserves all root-level files and only removes the nested context_drop/ folder

Write-Host "=== Context Drop Deletion Script ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "This will DELETE the 'context_drop/' subdirectory" -ForegroundColor Yellow
Write-Host "Your root files (backend/, frontend/, documentation/, etc.) will be PRESERVED" -ForegroundColor Green
Write-Host ""

# Show what will be preserved
Write-Host "Files that will be PRESERVED:" -ForegroundColor Green
Get-ChildItem -Path . -Directory | Where-Object { $_.Name -ne "context_drop" } | ForEach-Object {
    Write-Host "  ✓ $($_.Name)/" -ForegroundColor Green
}
Get-ChildItem -Path . -File | ForEach-Object {
    Write-Host "  ✓ $($_.Name)" -ForegroundColor Green
}

Write-Host ""
Write-Host "Directory to be DELETED:" -ForegroundColor Red
Write-Host "  ✗ context_drop/" -ForegroundColor Red

Write-Host ""
$confirmation = Read-Host "Type 'DELETE' to confirm deletion"

if ($confirmation -eq "DELETE") {
    Write-Host ""
    Write-Host "Attempting to delete context_drop/..." -ForegroundColor Yellow
    
    try {
        Remove-Item -Path "context_drop" -Recurse -Force -ErrorAction Stop
        Write-Host "✓ Successfully deleted context_drop/" -ForegroundColor Green
    }
    catch {
        Write-Host "✗ Failed to delete. Error: $($_.Exception.Message)" -ForegroundColor Red
        Write-Host ""
        Write-Host "Please:" -ForegroundColor Yellow
        Write-Host "1. Close all VS Code tabs from context_drop/" -ForegroundColor Yellow
        Write-Host "2. Stop any running Python/uvicorn processes" -ForegroundColor Yellow
        Write-Host "3. Run this script again" -ForegroundColor Yellow
    }
}
else {
    Write-Host "Deletion cancelled." -ForegroundColor Yellow
}

# Made with Bob
