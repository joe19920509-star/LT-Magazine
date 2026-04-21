#!/usr/bin/env node
/**
 * LTMagazine 内容同步脚本
 * 用途：将外部文案/Markdown 文件同步到 content/articles/
 *
 * 使用方式：
 *   node scripts/sync-content.js --source ./external-articles/
 *   node scripts/sync-content.js --pull  # 从远程仓库拉取
 */

const fs = require("fs");
const path = require("path");

const ARTICLES_DIR = path.join(__dirname, "../content/articles");

function syncFiles(sourceDir) {
  if (!fs.existsSync(sourceDir)) {
    console.error("❌ 源目录不存在: " + sourceDir);
    process.exit(1);
  }

  const files = fs.readdirSync(sourceDir).filter(function(f) {
    return f.endsWith(".md");
  });
  console.log("📁 发现 " + files.length + " 个待同步文件");

  if (!fs.existsSync(ARTICLES_DIR)) {
    fs.mkdirSync(ARTICLES_DIR, { recursive: true });
  }

  files.forEach(function(file) {
    const src = path.join(sourceDir, file);
    const dest = path.join(ARTICLES_DIR, file);
    fs.copyFileSync(src, dest);
    console.log("✅ 已同步: " + file);
  });

  console.log("\n🎉 同步完成！共 " + files.length + " 个文件");
}

// CLI 参数解析
const args = process.argv.slice(2);
if (args.includes("--pull")) {
  console.log("🔄 从远程仓库拉取内容（需要配置 Git）...");
  console.log("📝 请在 GitHub Actions 或 CI/CD 环境中配置自动拉取");
} else {
  const sourceIndex = args.indexOf("--source");
  if (sourceIndex !== -1 && args[sourceIndex + 1]) {
    syncFiles(path.resolve(args[sourceIndex + 1]));
  } else {
    console.log("用法: node scripts/sync-content.js --source <目录路径>");
    console.log("      node scripts/sync-content.js --pull");
  }
}
