#!/bin/bash
# Documentation Update Script for Desktop App Project

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🔄 Updating Documentation...${NC}"

# Create docs directory if it doesn't exist
mkdir -p docs/generated

# Update current structure
echo -e "${YELLOW}📁 Updating project structure...${NC}"
if command -v tree >/dev/null 2>&1; then
    tree -I 'node_modules|.git|dist|build' > docs/generated/current_structure.txt
else
    echo "tree command not found, using find instead"
    find . -type d -name "node_modules" -prune -o -name ".git" -prune -o -name "dist" -prune -o -name "build" -prune -o -type f -print | head -50 > docs/generated/current_structure.txt
fi

# Update current packages
echo -e "${YELLOW}📦 Updating package information...${NC}"
if [ -f "package.json" ]; then
    npm list --depth=0 > docs/generated/current_packages.txt 2>/dev/null || echo "Package list generation failed" > docs/generated/current_packages.txt
else
    echo "No package.json found" > docs/generated/current_packages.txt
fi

# Update external links
echo -e "${YELLOW}🔗 Checking external links...${NC}"
if command -v grep >/dev/null 2>&1; then
    grep -r "https\?://" docs/ --include="*.md" | head -20 > docs/generated/external_links.txt 2>/dev/null || echo "No external links found" > docs/generated/external_links.txt
else
    echo "grep command not found" > docs/generated/external_links.txt
fi

# Update bundle analysis
echo -e "${YELLOW}📊 Updating build analysis...${NC}"
if [ -f "package.json" ]; then
    echo "Run 'npm run build' manually for detailed analysis" >> docs/generated/bundle_analysis.txt
else
    echo "No package.json found for bundle analysis" > docs/generated/bundle_analysis.txt
fi

# Update last update log
echo -e "${YELLOW}📝 Updating log...${NC}"
echo "Documentation updated on $(date)" > docs/generated/last_update.log
echo "Structure files: $(find . -name "*.md" -type f | wc -l)" >> docs/generated/last_update.log
echo "JavaScript/TypeScript files: $(find . -name "*.js" -o -name "*.ts" -o -name "*.jsx" -o -name "*.tsx" -type f | wc -l)" >> docs/generated/last_update.log
echo "Configuration files: $(find . -name "*.json" -o -name "*.config.*" -type f | wc -l)" >> docs/generated/last_update.log
echo "Total files tracked: $(find . -type f | wc -l)" >> docs/generated/last_update.log

echo -e "${GREEN}✅ Documentation update completed!${NC}"
echo -e "${GREEN}📄 Check docs/generated/ for updated files${NC}" 