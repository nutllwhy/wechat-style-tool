// 获取DOM元素
const textInput = document.getElementById('textInput');
const styleSelect = document.getElementById('styleSelect');
const previewBtn = document.getElementById('previewBtn');
const copyBtn = document.getElementById('copyBtn');
const clearBtn = document.getElementById('clearBtn');
const previewArea = document.getElementById('previewArea');
const copyNotice = document.getElementById('copyNotice');

// 样式配置
const styleConfigs = {
    style1: {
        name: '橙色经典',
        className: 'style1'
    },
    style2: {
        name: '橙色渐变',
        className: 'style2'
    },
    style3: {
        name: '橙色简约',
        className: 'style3'
    },
    style4: {
        name: '橙色商务',
        className: 'style4'
    }
};

// 解析Markdown文本
function parseMarkdown(text) {
    if (!text.trim()) {
        return '<p class="placeholder">请输入内容</p>';
    }

    let html = text
        .split('\n')
        .map(line => {
            line = line.trim();
            
            // 处理一级标题
            if (line.startsWith('# ')) {
                return `<h1>${line.substring(2)}</h1>`;
            }
            
            // 处理二级标题
            if (line.startsWith('## ')) {
                return `<h2>${line.substring(3)}</h2>`;
            }
            
            // 处理空行
            if (line === '') {
                return '';
            }
            
            // 处理普通段落
            return `<p>${line}</p>`;
        })
        .join('\n');

    // 清理多余的空行
    html = html.replace(/\n{3,}/g, '\n\n');
    
    return html;
}

// 生成微信公众号样式的HTML
function generateStyledHTML(content, styleClass) {
    const container = document.createElement('div');
    container.className = styleClass;
    // 为h1添加包装器以确保居中
    const wrappedContent = wrapH1ForCenter(content);
    container.innerHTML = wrappedContent;
    
    // 为微信公众号生成内联样式
    const styledHTML = generateInlineStyles(container, styleClass);
    return styledHTML;
}

// 生成h2装饰元素
function getH2Decoration(styleClass) {
    const decorations = {
        style1: '<span style="display: inline-block; width: 20px; height: 20px; background: linear-gradient(135deg, #ff7043, #ff9800); border-radius: 4px; margin-right: 6px; vertical-align: middle;"></span><span style="display: inline-block; width: 3px; height: 16px; background: #ff7043; margin-right: 11px; vertical-align: middle;"></span>',
        style2: '<span style="display: inline-block; width: 20px; height: 20px; background: linear-gradient(45deg, #ff6b35, #f7931e); border-radius: 6px; margin-right: 6px; vertical-align: middle;"></span><span style="display: inline-block; width: 3px; height: 16px; background: #ff6b35; margin-right: 11px; vertical-align: middle;"></span>',
        style3: '<span style="display: inline-block; width: 20px; height: 20px; background: linear-gradient(135deg, #ffb74d, #ff9800); border-radius: 50%; margin-right: 6px; vertical-align: middle;"></span><span style="display: inline-block; width: 3px; height: 16px; background: #ffb74d; margin-right: 11px; vertical-align: middle;"></span>',
        style4: '<span style="display: inline-block; width: 20px; height: 20px; background: linear-gradient(135deg, #d84315, #ff5722); border-radius: 2px; margin-right: 6px; vertical-align: middle;"></span><span style="display: inline-block; width: 3px; height: 16px; background: #d84315; margin-right: 11px; vertical-align: middle;"></span>'
    };
    
    return decorations[styleClass] || decorations.style1;
}

// 生成内联样式（用于复制到微信公众号）
function generateInlineStyles(container, styleClass) {
    const elements = container.querySelectorAll('*');
    
    // 样式映射
    const styleMap = {
        style1: {
            h1: 'background: linear-gradient(135deg, #ff7043, #ff9800); color: white; padding: 16px 24px; text-align: center; font-size: 18px; font-weight: 600; border-radius: 12px; margin: 20px auto 16px auto; box-shadow: 0 3px 8px rgba(255, 112, 67, 0.25); display: block; width: fit-content; max-width: 90%; font-family: PingFang SC, Helvetica Neue, Helvetica, Arial, sans-serif;',
            h2: 'color: #333; font-size: 18px; font-weight: 600; margin: 16px 0 12px 0; padding: 8px 0; text-align: left; font-family: PingFang SC, Helvetica Neue, Helvetica, Arial, sans-serif;',
            p: 'line-height: 1.8; color: #333; margin: 12px 0; text-indent: 2em; text-align: left; font-size: 15px; font-family: PingFang SC, Helvetica Neue, Helvetica, Arial, sans-serif;'
        },
        style2: {
            h1: 'background: linear-gradient(45deg, #ff6b35, #f7931e, #ff9a56); color: white; padding: 16px 24px; text-align: center; font-size: 18px; font-weight: 600; border-radius: 12px; margin: 20px auto 16px auto; box-shadow: 0 3px 8px rgba(255, 107, 53, 0.25); display: block; width: fit-content; max-width: 90%; font-family: PingFang SC, Helvetica Neue, Helvetica, Arial, sans-serif;',
            h2: 'color: #333; font-size: 18px; font-weight: 600; margin: 16px 0 12px 0; padding: 8px 0; text-align: left; font-family: PingFang SC, Helvetica Neue, Helvetica, Arial, sans-serif;',
            p: 'line-height: 1.8; color: #444; margin: 12px 0; text-align: left; font-size: 15px; font-family: PingFang SC, Helvetica Neue, Helvetica, Arial, sans-serif;'
        },
        style3: {
            h1: 'background: linear-gradient(135deg, #ffb74d, #ff9800); color: white; padding: 16px 24px; text-align: center; font-size: 18px; font-weight: 600; border-radius: 12px; margin: 20px auto 16px auto; box-shadow: 0 3px 8px rgba(255, 183, 77, 0.25); display: block; width: fit-content; max-width: 90%; font-family: PingFang SC, Helvetica Neue, Helvetica, Arial, sans-serif;',
            h2: 'color: #333; font-size: 18px; font-weight: 600; margin: 16px 0 12px 0; padding: 8px 0; text-align: left; font-family: PingFang SC, Helvetica Neue, Helvetica, Arial, sans-serif;',
            p: 'line-height: 1.8; color: #333; margin: 12px 0; text-align: left; font-size: 15px; font-family: PingFang SC, Helvetica Neue, Helvetica, Arial, sans-serif;'
        },
        style4: {
            h1: 'background: linear-gradient(135deg, #d84315, #ff5722); color: white; padding: 16px 24px; text-align: center; font-size: 18px; font-weight: 600; border-radius: 12px; margin: 20px auto 16px auto; box-shadow: 0 3px 8px rgba(216, 67, 21, 0.25); display: block; width: fit-content; max-width: 90%; font-family: PingFang SC, Helvetica Neue, Helvetica, Arial, sans-serif;',
            h2: 'color: #333; font-size: 18px; font-weight: 600; margin: 16px 0 12px 0; padding: 8px 0; text-align: left; font-family: PingFang SC, Helvetica Neue, Helvetica, Arial, sans-serif;',
            p: 'line-height: 1.8; color: #333; margin: 12px 0; text-align: left; font-size: 15px; font-family: PingFang SC, Helvetica Neue, Helvetica, Arial, sans-serif;'
        }
    };

    const currentStyles = styleMap[styleClass] || styleMap.style1;

    // 应用内联样式
    container.querySelectorAll('h1').forEach(el => {
        el.style.cssText = currentStyles.h1;
        // 确保父容器有居中样式
        if (el.parentNode && el.parentNode.tagName === 'DIV') {
            el.parentNode.style.cssText = 'text-align: center; margin: 0; padding: 0;';
        }
    });

    container.querySelectorAll('h2').forEach(el => {
        el.style.cssText = currentStyles.h2;
        
        // 为每种样式添加对应的装饰元素
        const decorationHTML = getH2Decoration(styleClass);
        el.innerHTML = decorationHTML + el.innerHTML;
    });

    container.querySelectorAll('p').forEach(el => {
        el.style.cssText = currentStyles.p;
    });

    return container.innerHTML;
}

// 预览功能
function updatePreview() {
    const text = textInput.value;
    const selectedStyle = styleSelect.value;
    
    if (!text.trim()) {
        previewArea.innerHTML = '<p class="placeholder">在左侧输入内容后点击"预览效果"查看样式</p>';
        previewArea.className = 'preview-content';
        return;
    }
    
    const parsedHTML = parseMarkdown(text);
    // 为h1添加包装器以确保居中
    const wrappedHTML = wrapH1ForCenter(parsedHTML);
    previewArea.innerHTML = wrappedHTML;
    previewArea.className = `preview-content ${styleConfigs[selectedStyle].className}`;
}

// 为h1添加居中包装器
function wrapH1ForCenter(html) {
    // 为微信编辑器使用更兼容的居中方式
    return html.replace(/<h1>(.*?)<\/h1>/g, '<div style="text-align: center; margin: 0; padding: 0;"><h1>$1</h1></div>');
}

// 复制到剪贴板功能
async function copyToClipboard() {
    const text = textInput.value;
    const selectedStyle = styleSelect.value;
    
    if (!text.trim()) {
        alert('请先输入内容');
        return;
    }
    
    try {
        const parsedHTML = parseMarkdown(text);
        const styledHTML = generateStyledHTML(parsedHTML, selectedStyle);
        
        // 创建临时容器用于复制
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = styledHTML;
        tempDiv.style.position = 'absolute';
        tempDiv.style.left = '-9999px';
        tempDiv.style.width = '800px'; // 给一个固定宽度以便测试
        document.body.appendChild(tempDiv);
        
        // 输出调试信息
        console.log('复制的HTML内容:', styledHTML);
        
        // 选择内容
        const range = document.createRange();
        range.selectNodeContents(tempDiv);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        
        // 复制到剪贴板
        const successful = document.execCommand('copy');
        
        // 清理
        document.body.removeChild(tempDiv);
        selection.removeAllRanges();
        
        if (successful) {
            showCopyNotice();
        } else {
            // 尝试新的Clipboard API
            await navigator.clipboard.writeText(styledHTML);
            showCopyNotice();
        }
    } catch (err) {
        console.error('复制失败:', err);
        
        // 备用方案：显示内容让用户手动复制
        const text = textInput.value;
        const parsedHTML = parseMarkdown(text);
        const styledHTML = generateStyledHTML(parsedHTML, selectedStyle);
        
        const newWindow = window.open('', '_blank');
        newWindow.document.write(`
            <html>
                <head>
                    <title>复制内容</title>
                    <meta charset="UTF-8">
                </head>
                <body>
                    <h3>请选择下面的内容，然后按 Ctrl+C (或 Cmd+C) 复制：</h3>
                    <div style="border: 2px solid #ff9a56; padding: 20px; margin: 20px 0; width: 800px;">
                        ${styledHTML}
                    </div>
                    <p><strong>提示：</strong>复制后可以直接粘贴到微信公众号编辑器中</p>
                    <p><strong>调试信息：</strong></p>
                    <textarea style="width: 100%; height: 200px;">${styledHTML}</textarea>
                </body>
            </html>
        `);
        newWindow.document.close();
    }
}

// 显示复制成功提示
function showCopyNotice() {
    copyNotice.classList.add('show');
    setTimeout(() => {
        copyNotice.classList.remove('show');
    }, 3000);
}

// 清空内容
function clearContent() {
    if (confirm('确定要清空所有内容吗？')) {
        textInput.value = '';
        previewArea.innerHTML = '<p class="placeholder">在左侧输入内容后点击"预览效果"查看样式</p>';
        previewArea.className = 'preview-content';
    }
}

// 事件监听器
previewBtn.addEventListener('click', updatePreview);
copyBtn.addEventListener('click', copyToClipboard);
clearBtn.addEventListener('click', clearContent);

// 样式选择变化时自动更新预览
styleSelect.addEventListener('change', () => {
    if (textInput.value.trim()) {
        updatePreview();
    }
});

// 输入框内容变化时自动更新预览（防抖）
let debounceTimer;
textInput.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        if (textInput.value.trim()) {
            updatePreview();
        }
    }, 500);
});

// 初始化：设置默认示例内容
window.addEventListener('load', () => {
    textInput.value = `# 欢迎使用微信公众号样式工具

## 功能特点

这是一个专为微信公众号内容创作者设计的样式工具，具有以下特点：

支持一级和二级标题的自动识别，让您的文章结构更清晰。

提供多种橙色系样式选择，满足不同的设计需求。

## 使用方法

只需要按照Markdown格式输入内容，选择喜欢的样式，然后一键复制到微信公众号编辑器即可。

希望这个工具能够帮助您创作出更加美观的公众号文章！`;
    
    // 自动显示预览
    updatePreview();
});

// 快捷键支持
document.addEventListener('keydown', (e) => {
    // Ctrl+Enter 或 Cmd+Enter 预览
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        updatePreview();
    }
    
    // Ctrl+Shift+C 或 Cmd+Shift+C 复制
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        copyToClipboard();
    }
});

// 添加键盘快捷键提示
document.querySelector('.footer').innerHTML = `
    <p>提示：复制后的内容可以直接粘贴到微信公众号编辑器中，保持样式不变<br>
    <small>快捷键：Ctrl+Enter 预览 | Ctrl+Shift+C 复制</small></p>
    <p>欢迎关注作者 小红书/公众号/视频号/即刻/知乎/bilibili @栗噔噔</p>
`;

// 图片样式转换器功能（批量处理版本）
class ImageStyleConverter {
    constructor() {
        this.modal = document.getElementById('imageStyleModal');
        this.uploadArea = document.getElementById('uploadArea');
        this.imageInput = document.getElementById('imageInput');
        this.styleOptions = document.getElementById('styleOptions');
        this.imagePreviewSection = document.getElementById('imagePreviewSection');
        this.addWatermark = document.getElementById('addWatermark');
        
        // 批量处理相关元素
        this.batchPreviewSection = document.getElementById('batchPreviewSection');
        this.batchImagesGrid = document.getElementById('batchImagesGrid');
        this.imageCount = document.getElementById('imageCount');
        this.clearAllBtn = document.getElementById('clearAllBtn');
        this.addMoreBtn = document.getElementById('addMoreBtn');
        this.batchPreviewContainer = document.getElementById('batchPreviewContainer');
        this.downloadAllBtn = document.getElementById('downloadAllBtn');
        this.downloadZipBtn = document.getElementById('downloadZipBtn');
        this.progressSection = document.getElementById('progressSection');
        this.progressFill = document.getElementById('progressFill');
        this.progressText = document.getElementById('progressText');
        
        // 存储所有图片的数据
        this.imageFiles = [];
        this.selectedStyle = 'style1';
        
        this.initEventListeners();
    }
    
    initEventListeners() {
        // 打开模态框
        document.getElementById('imageStyleBtn').addEventListener('click', () => {
            this.showModal();
        });
        
        // 关闭模态框
        document.querySelector('.close').addEventListener('click', () => {
            this.hideModal();
        });
        
        // 点击模态框外部关闭
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.hideModal();
            }
        });
        
        // 上传区域点击
        this.uploadArea.addEventListener('click', () => {
            this.imageInput.click();
        });
        
        // 文件选择（支持多文件）
        this.imageInput.addEventListener('change', (e) => {
            this.handleFilesSelect(Array.from(e.target.files));
        });
        
        // 添加更多图片按钮
        this.addMoreBtn.addEventListener('click', () => {
            this.imageInput.click();
        });
        
        // 清空所有图片按钮
        this.clearAllBtn.addEventListener('click', () => {
            this.clearAllImages();
        });
        
        // 拖拽上传（支持多文件）
        this.uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.uploadArea.classList.add('dragover');
        });
        
        this.uploadArea.addEventListener('dragleave', () => {
            this.uploadArea.classList.remove('dragover');
        });
        
        this.uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            this.uploadArea.classList.remove('dragover');
            const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
            if (files.length > 0) {
                this.handleFilesSelect(files);
            }
        });
        
        // 样式选择
        document.querySelectorAll('.style-option').forEach(option => {
            option.addEventListener('click', () => {
                this.selectStyle(option.dataset.style);
            });
        });
        
        // 批量下载按钮
        this.downloadAllBtn.addEventListener('click', () => {
            this.downloadAllImages();
        });
        
        this.downloadZipBtn.addEventListener('click', () => {
            this.downloadAsZip();
        });
        
        // 水印选项变化
        this.addWatermark.addEventListener('change', () => {
            if (this.imageFiles.length > 0) {
                this.generateBatchPreview();
            }
        });
    }
    
    showModal() {
        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    hideModal() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        this.resetModal();
    }
    
    resetModal() {
        this.imageFiles = [];
        this.styleOptions.style.display = 'none';
        this.imagePreviewSection.style.display = 'none';
        this.batchPreviewSection.style.display = 'none';
        this.uploadArea.style.display = 'block';
        this.imageInput.value = '';
        this.progressSection.style.display = 'none';
        
        // 清空批量预览网格
        this.batchImagesGrid.innerHTML = '';
        this.batchPreviewContainer.innerHTML = '';
        this.updateImageCount();
        
        // 重置样式选择
        document.querySelectorAll('.style-option').forEach(option => {
            option.classList.remove('selected');
        });
        document.querySelector('[data-style="style1"]').classList.add('selected');
        this.selectedStyle = 'style1';
    }
    
    // 批量文件处理
    async handleFilesSelect(files) {
        const validFiles = files.filter(file => file.type.startsWith('image/'));
        
        if (validFiles.length === 0) {
            alert('请选择有效的图片文件！');
            return;
        }
        
        // 添加新文件到现有列表中
        for (const file of validFiles) {
            // 检查是否已经存在同名文件
            const existingFile = this.imageFiles.find(item => item.file.name === file.name);
            if (!existingFile) {
                try {
                    const imageData = await this.loadImageFromFile(file);
                    this.imageFiles.push({
                        file: file,
                        image: imageData.image,
                        dataUrl: imageData.dataUrl,
                        id: Date.now() + Math.random() // 唯一ID
                    });
                } catch (error) {
                    console.error(`加载图片失败: ${file.name}`, error);
                }
            }
        }
        
        if (this.imageFiles.length > 0) {
            this.showBatchInterface();
        }
    }
    
    // 从文件加载图片
    loadImageFromFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    resolve({
                        image: img,
                        dataUrl: e.target.result
                    });
                };
                img.onerror = reject;
                img.src = e.target.result;
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }
    
    // 显示批量处理界面
    showBatchInterface() {
        this.uploadArea.style.display = 'none';
        this.batchPreviewSection.style.display = 'block';
        this.styleOptions.style.display = 'block';
        
        // 更新图片预览网格
        this.updateBatchGrid();
        this.updateImageCount();
        
        // 默认选择第一个样式
        document.querySelector('[data-style="style1"]').classList.add('selected');
        this.generateBatchPreview();
    }
    
    // 更新图片数量显示
    updateImageCount() {
        this.imageCount.textContent = `(${this.imageFiles.length})`;
    }
    
    // 更新批量图片网格显示
    updateBatchGrid() {
        this.batchImagesGrid.innerHTML = '';
        
        this.imageFiles.forEach((item, index) => {
            const gridItem = document.createElement('div');
            gridItem.className = 'batch-image-item';
            gridItem.innerHTML = `
                <img src="${item.dataUrl}" alt="${item.file.name}" class="batch-image-preview">
                <div class="batch-image-name" title="${item.file.name}">${item.file.name}</div>
                <button class="batch-image-remove" onclick="imageConverter.removeImage(${index})" title="删除">×</button>
            `;
            this.batchImagesGrid.appendChild(gridItem);
        });
    }
    
    // 删除指定图片
    removeImage(index) {
        this.imageFiles.splice(index, 1);
        this.updateBatchGrid();
        this.updateImageCount();
        
        if (this.imageFiles.length === 0) {
            this.resetToUpload();
        } else {
            this.generateBatchPreview();
        }
    }
    
    // 清空所有图片
    clearAllImages() {
        if (confirm('确定要清空所有图片吗？')) {
            this.imageFiles = [];
            this.resetToUpload();
        }
    }
    
    // 重置到上传状态
    resetToUpload() {
        this.batchPreviewSection.style.display = 'none';
        this.styleOptions.style.display = 'none';
        this.imagePreviewSection.style.display = 'none';
        this.uploadArea.style.display = 'block';
        this.updateImageCount();
        this.batchImagesGrid.innerHTML = '';
        this.batchPreviewContainer.innerHTML = '';
    }
    
    selectStyle(styleName) {
        // 更新选择状态
        document.querySelectorAll('.style-option').forEach(option => {
            option.classList.remove('selected');
        });
        document.querySelector(`[data-style="${styleName}"]`).classList.add('selected');
        
        this.selectedStyle = styleName;
        
        // 重新生成批量预览
        if (this.imageFiles.length > 0) {
            this.generateBatchPreview();
        }
    }
    
    // 生成批量预览
    generateBatchPreview() {
        if (this.imageFiles.length === 0) return;
        
        this.batchPreviewContainer.innerHTML = '';
        
        this.imageFiles.forEach((item, index) => {
            const canvasContainer = document.createElement('div');
            canvasContainer.className = 'batch-canvas-item';
            
            const canvas = document.createElement('canvas');
            const canvasName = document.createElement('div');
            canvasName.className = 'canvas-name';
            canvasName.textContent = item.file.name;
            
            canvasContainer.appendChild(canvas);
            canvasContainer.appendChild(canvasName);
            this.batchPreviewContainer.appendChild(canvasContainer);
            
            // 为每个图片生成预览
            this.generateSinglePreview(canvas, item.image, item.file.name);
        });
        
        // 显示预览区域
        this.imagePreviewSection.style.display = 'block';
    }
    
    // 生成单个图片预览
    generateSinglePreview(canvas, image, fileName) {
        const ctx = canvas.getContext('2d');
        
        // 计算合适的画布尺寸 - 提高预览质量
        const maxSize = 500; // 增加预览尺寸以保持清晰度
        const outerBorderWidth = 6;
        const whiteBorderWidth = 5;
        const totalBorderWidth = outerBorderWidth + whiteBorderWidth;
        const cornerRadius = 12;
        const innerCornerRadius = 8;
        
        let { width, height } = image;
        
        // 保持原始比例，但确保最小尺寸
        const minSize = 200; // 设置最小尺寸防止过度压缩
        
        if (width > height) {
            if (width > maxSize) {
                height = (height * maxSize) / width;
                width = maxSize;
            } else if (width < minSize) {
                height = (height * minSize) / width;
                width = minSize;
            }
        } else {
            if (height > maxSize) {
                width = (width * maxSize) / height;
                height = maxSize;
            } else if (height < minSize) {
                width = (width * minSize) / height;
                height = minSize;
            }
        }
        
        // 设置画布尺寸（包含边框和阴影）
        const shadowOffset = 4;
        canvas.width = width + totalBorderWidth * 2 + shadowOffset;
        canvas.height = height + totalBorderWidth * 2 + shadowOffset;
        
        // 启用高质量缩放
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        
        // 清除画布
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 绘制立体阴影
        this.drawShadow(ctx, shadowOffset, shadowOffset, width + totalBorderWidth * 2, height + totalBorderWidth * 2, cornerRadius);
        
        // 绘制外边框背景
        this.drawBorder(ctx, 0, 0, width + totalBorderWidth * 2, height + totalBorderWidth * 2, cornerRadius);
        
        // 绘制白色内边框
        this.drawWhiteBorder(ctx, outerBorderWidth, outerBorderWidth, width + whiteBorderWidth * 2, height + whiteBorderWidth * 2, innerCornerRadius + 2);
        
        // 绘制圆角图片
        this.drawRoundedImage(ctx, image, totalBorderWidth, totalBorderWidth, width, height, innerCornerRadius);
        
        // 添加水印（如果选中）
        if (this.addWatermark.checked) {
            this.drawWatermark(ctx, canvas.width, canvas.height);
        }
    }
    
    drawShadow(ctx, x, y, width, height, cornerRadius) {
        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.roundRect(ctx, x, y, width, height, cornerRadius);
        ctx.fill();
        
        ctx.restore();
    }

    drawBorder(ctx, x, y, width, height, cornerRadius) {
        // 根据选择的样式绘制边框
        const borderStyles = {
            style1: { colors: ['#ff7043', '#ff9800'] },
            style2: { colors: ['#ff6b35', '#f7931e', '#ff9a56'] },
            style3: { colors: ['#ffb74d', '#ff9800'] },
            style4: { colors: ['#d84315', '#ff5722'] }
        };
        
        const style = borderStyles[this.selectedStyle];
        
        // 创建渐变
        let gradient;
        if (style.colors.length === 2) {
            gradient = ctx.createLinearGradient(x, y, x + width, y + height);
            gradient.addColorStop(0, style.colors[0]);
            gradient.addColorStop(1, style.colors[1]);
        } else {
            gradient = ctx.createLinearGradient(x, y, x + width, y + height);
            gradient.addColorStop(0, style.colors[0]);
            gradient.addColorStop(0.5, style.colors[1]);
            gradient.addColorStop(1, style.colors[2]);
        }
        
        // 绘制圆角矩形边框
        ctx.fillStyle = gradient;
        this.roundRect(ctx, x, y, width, height, cornerRadius);
        ctx.fill();
        
        // 添加内部高光效果
        const highlightGradient = ctx.createLinearGradient(x, y, x, y + height / 3);
        highlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
        highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.fillStyle = highlightGradient;
        this.roundRect(ctx, x, y, width, height, cornerRadius);
        ctx.fill();
    }
    
    drawWhiteBorder(ctx, x, y, width, height, cornerRadius) {
        // 绘制白色内边框
        ctx.fillStyle = '#ffffff';
        this.roundRect(ctx, x, y, width, height, cornerRadius);
        ctx.fill();
        
        // 添加轻微的内阴影效果
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.06)';
        ctx.lineWidth = 1;
        this.roundRect(ctx, x + 0.5, y + 0.5, width - 1, height - 1, cornerRadius);
        ctx.stroke();
    }
    
    drawRoundedImage(ctx, img, x, y, width, height, radius) {
        ctx.save();
        
        // 启用高质量缩放
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        
        // 创建圆角裁剪路径
        this.roundRect(ctx, x, y, width, height, radius);
        ctx.clip();
        
        // 绘制图片
        ctx.drawImage(img, x, y, width, height);
        
        ctx.restore();
    }
    
    drawWatermark(ctx, canvasWidth, canvasHeight) {
        ctx.save();
        
        // 设置水印样式
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.font = '12px PingFang SC, sans-serif';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'bottom';
        
        // 添加水印阴影效果
        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        ctx.shadowBlur = 2;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        
        // 绘制水印（考虑阴影偏移）
        const watermarkText = '微信公众号样式工具';
        const shadowOffset = 4;
        ctx.fillText(watermarkText, canvasWidth - shadowOffset - 8, canvasHeight - shadowOffset - 8);
        
        ctx.restore();
    }
    
    roundRect(ctx, x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
    }
    
    // 批量下载所有图片
    async downloadAllImages() {
        if (this.imageFiles.length === 0) return;
        
        this.showProgress(true);
        this.updateProgress(0, '开始处理图片...');
        
        for (let i = 0; i < this.imageFiles.length; i++) {
            const item = this.imageFiles[i];
            const progress = ((i + 1) / this.imageFiles.length) * 100;
            
            this.updateProgress(progress, `正在处理: ${item.file.name} (${i + 1}/${this.imageFiles.length})`);
            
            try {
                await this.downloadSingleImage(item.image, item.file.name);
                // 添加小延迟以避免浏览器阻止多个下载
                await this.delay(500);
            } catch (error) {
                console.error(`下载失败: ${item.file.name}`, error);
            }
        }
        
        this.updateProgress(100, '所有图片处理完成！');
        setTimeout(() => {
            this.showProgress(false);
            this.showDownloadSuccess();
        }, 1000);
    }
    
    // 下载单个图片（高清版本）
    downloadSingleImage(image, fileName) {
        return new Promise((resolve) => {
            // 创建高分辨率画布用于下载
            const downloadCanvas = document.createElement('canvas');
            const downloadCtx = downloadCanvas.getContext('2d');
            
            // 大幅提高分辨率，保持原图质量
            const maxSize = 2000; // 大幅提高最大尺寸
            const minSize = 800;  // 设置最小尺寸，确保小图也有足够清晰度
            const outerBorderWidth = 20; // 增大边框宽度以匹配高分辨率
            const whiteBorderWidth = 16;
            const totalBorderWidth = outerBorderWidth + whiteBorderWidth;
            const cornerRadius = 48; // 增大圆角半径
            const innerCornerRadius = 32;
            
            let { width, height } = image;
            
            // 优化缩放逻辑，尽量保持原始分辨率
            const scale = Math.min(maxSize / Math.max(width, height), 2); // 最多放大2倍
            
            if (scale < 1) {
                // 只有在原图太大时才缩小
                width = width * scale;
                height = height * scale;
            } else if (Math.max(width, height) < minSize) {
                // 如果原图太小，适度放大到最小尺寸
                const upscale = minSize / Math.max(width, height);
                width = width * upscale;
                height = height * upscale;
            }
            
            const shadowOffset = 16;
            downloadCanvas.width = width + totalBorderWidth * 2 + shadowOffset;
            downloadCanvas.height = height + totalBorderWidth * 2 + shadowOffset;
            
            // 启用最高质量设置
            downloadCtx.imageSmoothingEnabled = true;
            downloadCtx.imageSmoothingQuality = 'high';
            
            // 清除画布
            downloadCtx.clearRect(0, 0, downloadCanvas.width, downloadCanvas.height);
            
            // 使用高清绘制逻辑
            this.drawShadowHD(downloadCtx, shadowOffset, shadowOffset, width + totalBorderWidth * 2, height + totalBorderWidth * 2, cornerRadius);
            this.drawBorderHD(downloadCtx, 0, 0, width + totalBorderWidth * 2, height + totalBorderWidth * 2, cornerRadius);
            this.drawWhiteBorderHD(downloadCtx, outerBorderWidth, outerBorderWidth, width + whiteBorderWidth * 2, height + whiteBorderWidth * 2, innerCornerRadius + 8);
            this.drawRoundedImageHD(downloadCtx, image, totalBorderWidth, totalBorderWidth, width, height, innerCornerRadius);
            
            if (this.addWatermark.checked) {
                this.drawWatermarkHD(downloadCtx, downloadCanvas.width, downloadCanvas.height);
            }
            
            // 创建下载链接
            const link = document.createElement('a');
            const fileNameWithoutExt = fileName.replace(/\.[^/.]+$/, "");
            link.download = `styled-${fileNameWithoutExt}-${this.selectedStyle}.png`;
            link.href = downloadCanvas.toDataURL('image/png', 1.0);
            
            // 触发下载
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            resolve();
        });
    }
    
    // 打包下载为ZIP
    async downloadAsZip() {
        if (this.imageFiles.length === 0) {
            alert('请先选择要处理的图片！');
            return;
        }
        
        // 检查JSZip是否可用
        if (typeof JSZip === 'undefined') {
            alert('ZIP功能库加载失败，请刷新页面重试或使用"批量下载所有图片"功能。');
            return;
        }
        
        this.showProgress(true);
        this.updateProgress(0, '开始创建ZIP包...');
        
        try {
            const zip = new JSZip();
            const folder = zip.folder(`styled-images-${this.selectedStyle}`);
            
            // 为每张图片生成高清版本并添加到ZIP
            for (let i = 0; i < this.imageFiles.length; i++) {
                const item = this.imageFiles[i];
                const progress = ((i + 1) / this.imageFiles.length) * 80; // 80%用于处理图片
                
                this.updateProgress(progress, `正在处理: ${item.file.name} (${i + 1}/${this.imageFiles.length})`);
                
                try {
                    // 生成高清图片的base64数据
                    const imageBlob = await this.generateHighQualityImageBlob(item.image, item.file.name);
                    const fileNameWithoutExt = item.file.name.replace(/\.[^/.]+$/, "");
                    const fileName = `styled-${fileNameWithoutExt}-${this.selectedStyle}.png`;
                    
                    // 添加到ZIP文件夹
                    folder.file(fileName, imageBlob);
                    
                } catch (error) {
                    console.error(`处理图片失败: ${item.file.name}`, error);
                }
            }
            
            this.updateProgress(90, '正在生成ZIP文件...');
            
            // 生成ZIP文件
            const zipBlob = await zip.generateAsync({
                type: "blob",
                compression: "DEFLATE",
                compressionOptions: {
                    level: 6
                }
            });
            
            this.updateProgress(95, '准备下载...');
            
            // 创建下载链接
            const link = document.createElement('a');
            link.href = URL.createObjectURL(zipBlob);
            link.download = `styled-images-${this.selectedStyle}-${new Date().toISOString().slice(0, 10)}.zip`;
            
            // 触发下载
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // 清理URL对象
            URL.revokeObjectURL(link.href);
            
            this.updateProgress(100, 'ZIP文件下载完成！');
            
            setTimeout(() => {
                this.showProgress(false);
                this.showDownloadSuccess();
            }, 1000);
            
        } catch (error) {
            console.error('ZIP生成失败:', error);
            alert('ZIP文件生成失败，请重试或使用批量下载功能。');
            this.showProgress(false);
        }
    }
    
    // 生成高质量图片的Blob
    generateHighQualityImageBlob(image, fileName) {
        return new Promise((resolve) => {
            // 创建超高分辨率画布
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // 使用超高分辨率设置
            const maxSize = 2000; // 与单个下载保持一致
            const minSize = 800;
            const outerBorderWidth = 20;
            const whiteBorderWidth = 16;
            const totalBorderWidth = outerBorderWidth + whiteBorderWidth;
            const cornerRadius = 48;
            const innerCornerRadius = 32;
            
            let { width, height } = image;
            
            // 使用与单个下载相同的优化缩放逻辑
            const scale = Math.min(maxSize / Math.max(width, height), 2);
            
            if (scale < 1) {
                width = width * scale;
                height = height * scale;
            } else if (Math.max(width, height) < minSize) {
                const upscale = minSize / Math.max(width, height);
                width = width * upscale;
                height = height * upscale;
            }
            
            const shadowOffset = 16;
            canvas.width = width + totalBorderWidth * 2 + shadowOffset;
            canvas.height = height + totalBorderWidth * 2 + shadowOffset;
            
            // 启用最高质量设置
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            
            // 清除画布
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // 绘制图片效果
            this.drawShadowHD(ctx, shadowOffset, shadowOffset, width + totalBorderWidth * 2, height + totalBorderWidth * 2, cornerRadius);
            this.drawBorderHD(ctx, 0, 0, width + totalBorderWidth * 2, height + totalBorderWidth * 2, cornerRadius);
            this.drawWhiteBorderHD(ctx, outerBorderWidth, outerBorderWidth, width + whiteBorderWidth * 2, height + whiteBorderWidth * 2, innerCornerRadius + 8);
            this.drawRoundedImageHD(ctx, image, totalBorderWidth, totalBorderWidth, width, height, innerCornerRadius);
            
            if (this.addWatermark.checked) {
                this.drawWatermarkHD(ctx, canvas.width, canvas.height);
            }
            
            // 转换为高质量Blob
            canvas.toBlob((blob) => {
                resolve(blob);
            }, 'image/png', 1.0);
        });
    }
    
    // 显示/隐藏进度条
    showProgress(show) {
        this.progressSection.style.display = show ? 'block' : 'none';
    }
    
    // 更新进度
    updateProgress(percent, text) {
        this.progressFill.style.width = `${percent}%`;
        this.progressText.textContent = text;
    }
    
    // 延迟函数
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    // 高清版本的绘制方法
    drawShadowHD(ctx, x, y, width, height, cornerRadius) {
        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
        ctx.shadowBlur = 16;
        ctx.shadowOffsetX = 4;
        ctx.shadowOffsetY = 4;
        
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.roundRect(ctx, x, y, width, height, cornerRadius);
        ctx.fill();
        
        ctx.restore();
    }
    
    drawBorderHD(ctx, x, y, width, height, cornerRadius) {
        const borderStyles = {
            style1: { colors: ['#ff7043', '#ff9800'] },
            style2: { colors: ['#ff6b35', '#f7931e', '#ff9a56'] },
            style3: { colors: ['#ffb74d', '#ff9800'] },
            style4: { colors: ['#d84315', '#ff5722'] }
        };
        
        const style = borderStyles[this.selectedStyle];
        
        let gradient;
        if (style.colors.length === 2) {
            gradient = ctx.createLinearGradient(x, y, x + width, y + height);
            gradient.addColorStop(0, style.colors[0]);
            gradient.addColorStop(1, style.colors[1]);
        } else {
            gradient = ctx.createLinearGradient(x, y, x + width, y + height);
            gradient.addColorStop(0, style.colors[0]);
            gradient.addColorStop(0.5, style.colors[1]);
            gradient.addColorStop(1, style.colors[2]);
        }
        
        ctx.fillStyle = gradient;
        this.roundRect(ctx, x, y, width, height, cornerRadius);
        ctx.fill();
        
        const highlightGradient = ctx.createLinearGradient(x, y, x, y + height / 3);
        highlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
        highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.fillStyle = highlightGradient;
        this.roundRect(ctx, x, y, width, height, cornerRadius);
        ctx.fill();
    }
    
    drawWhiteBorderHD(ctx, x, y, width, height, cornerRadius) {
        ctx.fillStyle = '#ffffff';
        this.roundRect(ctx, x, y, width, height, cornerRadius);
        ctx.fill();
        
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.06)';
        ctx.lineWidth = 2;
        this.roundRect(ctx, x + 1, y + 1, width - 2, height - 2, cornerRadius);
        ctx.stroke();
    }
    
    drawRoundedImageHD(ctx, img, x, y, width, height, radius) {
        ctx.save();
        
        // 启用最高质量设置
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        
        this.roundRect(ctx, x, y, width, height, radius);
        ctx.clip();
        ctx.drawImage(img, x, y, width, height);
        ctx.restore();
    }
    
    drawWatermarkHD(ctx, canvasWidth, canvasHeight) {
        ctx.save();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        
        // 根据画布大小动态调整字体大小
        const fontSize = Math.max(24, Math.min(canvasWidth, canvasHeight) * 0.025);
        ctx.font = `${fontSize}px PingFang SC, sans-serif`;
        ctx.textAlign = 'right';
        ctx.textBaseline = 'bottom';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        ctx.shadowBlur = fontSize * 0.2;
        ctx.shadowOffsetX = fontSize * 0.1;
        ctx.shadowOffsetY = fontSize * 0.1;
        
        const watermarkText = '微信公众号样式工具';
        const shadowOffset = 16;
        const margin = fontSize * 0.8;
        ctx.fillText(watermarkText, canvasWidth - shadowOffset - margin, canvasHeight - shadowOffset - margin);
        ctx.restore();
    }
    
    showDownloadSuccess() {
        const originalText = this.downloadBtn.textContent;
        this.downloadBtn.textContent = '✅ 下载成功！';
        this.downloadBtn.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
        
        setTimeout(() => {
            this.downloadBtn.textContent = originalText;
            this.downloadBtn.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
        }, 2000);
    }
}

// 初始化图片样式转换器
let imageConverter; // 全局变量，供HTML中的onclick事件使用

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        imageConverter = new ImageStyleConverter();
    });
} else {
    imageConverter = new ImageStyleConverter();
} 