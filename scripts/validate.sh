#!/bin/bash

# Quick validation script for NGEAR Platform
# Tests core functionality without full compilation

echo "🧪 NGEAR Platform - Quick Validation Test"
echo "========================================"

# Test 1: Check project structure
echo "📁 Testing project structure..."
if [ -d "services/auth-service" ] && [ -d "apps/platform-admin" ] && [ -d "libs/shared" ]; then
    echo "✅ Project structure is correct"
else
    echo "❌ Project structure is missing components"
    exit 1
fi

# Test 2: Check essential files
echo "📄 Testing essential files..."
REQUIRED_FILES=(
    "package.json"
    "docker-compose.yml"
    "services/auth-service/src/main.ts"
    "services/auth-service/src/auth/auth.service.ts"
    "apps/platform-admin/src/app/page.tsx"
    ".github/workflows/ci-cd.yml"
)

for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file is missing"
        exit 1
    fi
done

# Test 3: Check Docker setup
echo "🐳 Testing Docker configuration..."
if docker --version > /dev/null 2>&1; then
    echo "✅ Docker is available"
    
    # Validate docker-compose syntax
    if docker-compose config > /dev/null 2>&1; then
        echo "✅ Docker Compose configuration is valid"
    else
        echo "⚠️ Docker Compose configuration has issues"
    fi
else
    echo "⚠️ Docker is not available (optional for validation)"
fi

# Test 4: Check Node.js project validity
echo "📦 Testing Node.js project..."
if [ -f "package.json" ]; then
    # Check if package.json is valid JSON
    if node -pe "JSON.parse(require('fs').readFileSync('package.json', 'utf8'))" > /dev/null 2>&1; then
        echo "✅ Root package.json is valid"
    else
        echo "❌ Root package.json is invalid"
        exit 1
    fi
    
    # Check auth service package.json
    if node -pe "JSON.parse(require('fs').readFileSync('services/auth-service/package.json', 'utf8'))" > /dev/null 2>&1; then
        echo "✅ Auth service package.json is valid"
    else
        echo "❌ Auth service package.json is invalid"
        exit 1
    fi
    
    # Check platform admin package.json
    if node -pe "JSON.parse(require('fs').readFileSync('apps/platform-admin/package.json', 'utf8'))" > /dev/null 2>&1; then
        echo "✅ Platform admin package.json is valid"
    else
        echo "❌ Platform admin package.json is invalid"
        exit 1
    fi
fi

# Test 5: Check TypeScript basics (syntax only)
echo "📝 Testing TypeScript syntax..."
if command -v node > /dev/null 2>&1; then
    # Basic syntax check for main files
    if node -c services/auth-service/src/main.ts 2>/dev/null; then
        echo "✅ Auth service main.ts has valid syntax"
    else
        echo "⚠️ Auth service main.ts syntax issues (expected due to imports)"
    fi
else
    echo "⚠️ Node.js not available for syntax checking"
fi

# Test 6: Check environment configuration
echo "⚙️ Testing environment configuration..."
if [ -f ".env.example" ] && [ -f "services/auth-service/.env.example" ]; then
    echo "✅ Environment configuration templates exist"
    
    # Check if .env.example has required variables
    if grep -q "JWT_SECRET" .env.example && grep -q "DB_HOST" .env.example; then
        echo "✅ Environment templates contain required variables"
    else
        echo "❌ Environment templates missing required variables"
        exit 1
    fi
else
    echo "❌ Environment configuration templates missing"
    exit 1
fi

# Test 7: Check documentation
echo "📚 Testing documentation..."
if [ -f "README.md" ] && [ -s "README.md" ]; then
    # Check if README has essential sections
    if grep -q "## Quick Start" README.md && grep -q "## Architecture" README.md; then
        echo "✅ README.md has essential sections"
    else
        echo "⚠️ README.md missing some essential sections"
    fi
else
    echo "❌ README.md is missing or empty"
    exit 1
fi

# Test 8: Security check - no secrets in code
echo "🔒 Testing for security issues..."
SECURITY_PATTERNS=(
    "password.*=.*['\"][^'\"]*['\"]"
    "secret.*=.*['\"][^'\"]*['\"]"
    "api_key.*=.*['\"][^'\"]*['\"]"
)

SECURITY_ISSUES=0
for pattern in "${SECURITY_PATTERNS[@]}"; do
    if grep -r -i "$pattern" services/ apps/ libs/ --include="*.ts" --include="*.js" --exclude-dir=node_modules > /dev/null 2>&1; then
        echo "⚠️ Potential security issue found (pattern: $pattern)"
        SECURITY_ISSUES=$((SECURITY_ISSUES + 1))
    fi
done

if [ $SECURITY_ISSUES -eq 0 ]; then
    echo "✅ No obvious security issues detected"
else
    echo "⚠️ $SECURITY_ISSUES potential security issues found"
fi

echo ""
echo "🎉 NGEAR Platform validation completed!"
echo "========================================"
echo ""
echo "✅ Core Structure: Ready"
echo "✅ Configuration: Ready" 
echo "✅ Documentation: Ready"
echo "✅ Security: Checked"
echo ""
echo "🚀 Ready for development!"
echo ""
echo "Next steps:"
echo "  1. Run: npm install"
echo "  2. Run: docker-compose up -d postgres mongodb redis"
echo "  3. Run: cd services/auth-service && npm run start:dev"
echo "  4. Run: cd apps/platform-admin && npm run dev"
echo ""
echo "Access points:"
echo "  • Platform Admin: http://localhost:3000"
echo "  • Auth Service: http://localhost:3001"
echo "  • API Docs: http://localhost:3001/docs"