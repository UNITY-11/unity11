$env:GIT_AUTHOR_DATE="2026-06-01T00:00:00"
$env:GIT_COMMITTER_DATE="2026-06-01T00:00:00"

$files = git status --porcelain
foreach ($fileLine in $files) {
    if ($fileLine.Trim() -ne "") {
        $status = $fileLine.Substring(0,2)
        $path = $fileLine.Substring(3).Trim()
        
        if ($path.StartsWith("`"")) {
            $path = $path.Substring(1, $path.Length - 2)
        }

        Write-Host "Adding $path"
        git add $path
        
        $filename = Split-Path $path -Leaf
        if ($status -eq " D") {
            git commit --no-verify -m "Delete $filename"
        } else {
            git commit --no-verify -m "Update $filename"
        }
    }
}
