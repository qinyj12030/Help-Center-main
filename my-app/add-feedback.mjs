#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const feedbackSection = `
---

## 反馈与建议:给帮助中心提需求

我们非常重视您的意见,您的每一个建议都能帮助我们把产品做得更好!

<FeedbackButton href="https://kcnfstknddo1.feishu.cn/share/base/form/shrcnPCPMzQMlLQbNmedv6YRZff" />`;

const feedbackImport = `import { FeedbackButton } from '@/components/FeedbackButton';\n`;

// 不需要添加反馈部分的文件列表
const excludedFiles = [
  'index.mdx', // 首页
];

// 需要处理的目录
const docsDir = path.join(__dirname, 'content', 'docs');

function getAllMdxFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getAllMdxFiles(filePath, fileList);
    } else if (file.endsWith('.mdx')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

function processMdxFile(filePath) {
  const fileName = path.basename(filePath);

  // 跳过排除的文件
  if (excludedFiles.includes(fileName)) {
    console.log(`跳过: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf-8');

  // 检查是否已经有 FeedbackButton
  if (content.includes('FeedbackButton')) {
    console.log(`已存在反馈部分: ${filePath}`);
    return;
  }

  // 检查是否已经有反馈建议部分
  if (content.includes('反馈与建议')) {
    console.log(`已存在反馈建议: ${filePath}`);
    return;
  }

  // 提取 frontmatter 和内容
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n/);

  if (!frontmatterMatch) {
    console.log(`无法解析frontmatter: ${filePath}`);
    return;
  }

  const frontmatter = frontmatterMatch[0];
  const restContent = content.slice(frontmatter.length);

  // 检查是否已经有导入语句
  let newContent;
  if (restContent.trim().startsWith('import')) {
    // 如果已有导入语句,检查是否有 FeedbackButton 导入
    const importSection = restContent.match(/^(import[\s\S]*?\n\n)/)?.[0] || '';
    if (!importSection.includes('FeedbackButton')) {
      // 添加 FeedbackButton 导入
      newContent = frontmatter + feedbackImport + restContent + feedbackSection;
    } else {
      newContent = frontmatter + restContent + feedbackSection;
    }
  } else {
    // 没有导入语句,添加导入和反馈部分
    newContent = frontmatter + '\n' + feedbackImport + restContent + feedbackSection;
  }

  fs.writeFileSync(filePath, newContent, 'utf-8');
  console.log(`✓ 已更新: ${filePath}`);
}

try {
  const mdxFiles = getAllMdxFiles(docsDir);
  console.log(`找到 ${mdxFiles.length} 个 MDX 文件\n`);

  mdxFiles.forEach(processMdxFile);

  console.log('\n批量处理完成!');
} catch (error) {
  console.error('处理失败:', error);
  process.exit(1);
}
