import HanziWriter from 'hanzi-writer';

class HanziWriterApp {
    constructor() {
        this.writer = null;
        this.currentChar = '永';
        this.isQuizMode = false;
        this.init();
    }

    init() {
        this.setupElements();
        this.setupEventListeners();
        this.initWriter();
        this.updateStrokeInfo();
    }

    setupElements() {
        // 获取DOM元素
        this.characterInput = document.getElementById('character-input');
        this.animateBtn = document.getElementById('animate-btn');
        this.quizBtn = document.getElementById('quiz-btn');
        this.resetBtn = document.getElementById('reset-btn');
        this.showOutlineCheckbox = document.getElementById('show-outline');
        this.showCharacterCheckbox = document.getElementById('show-character');
        this.strokeInfo = document.getElementById('stroke-info');
        this.targetDiv = document.getElementById('character-target-div');
        this.exampleChars = document.querySelectorAll('.example-char');
    }

    setupEventListeners() {
        // 输入框事件
        this.characterInput.addEventListener('input', (e) => {
            const char = e.target.value.trim();
            if (char && char.length === 1) {
                this.currentChar = char;
                this.initWriter();
                this.updateStrokeInfo();
            }
        });

        // 按钮事件
        this.animateBtn.addEventListener('click', () => {
            this.animateCharacter();
        });

        this.quizBtn.addEventListener('click', () => {
            this.toggleQuizMode();
        });

        this.resetBtn.addEventListener('click', () => {
            this.resetWriter();
        });

        // 选项事件
        this.showOutlineCheckbox.addEventListener('change', () => {
            this.updateWriterOptions();
        });

        this.showCharacterCheckbox.addEventListener('change', () => {
            this.updateWriterOptions();
        });

        // 示例汉字点击事件
        this.exampleChars.forEach(button => {
            button.addEventListener('click', () => {
                const char = button.dataset.char;
                this.selectCharacter(char);
                
                // 更新激活状态
                this.exampleChars.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });

        // 键盘事件
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.animateCharacter();
            } else if (e.key === 'Escape') {
                this.resetWriter();
            }
        });
    }

    initWriter() {
        if (this.writer) {
            this.writer.hideCharacter();
            this.writer = null;
        }

        try {
            this.writer = HanziWriter.create(this.targetDiv, this.currentChar, {
                width: 300,
                height: 300,
                padding: 5,
                strokeColor: '#333333',
                radicalColor: '#ff6b6b',
                strokeAnimationSpeed: 1,
                delayBetweenStrokes: 100,
                showOutline: this.showOutlineCheckbox.checked,
                showCharacter: this.showCharacterCheckbox.checked,
                renderer: 'svg'
            });

            // 监听动画事件
            this.writer.on('animateStrokeStart', (data) => {
                console.log(`开始第 ${data.strokeNum + 1} 笔`);
            });

            this.writer.on('animateStrokeEnd', (data) => {
                console.log(`完成第 ${data.strokeNum + 1} 笔`);
            });

            this.writer.on('animateComplete', () => {
                console.log('动画完成');
                if (this.isQuizMode) {
                    this.showQuizComplete();
                }
            });

        } catch (error) {
            console.error('初始化 HanziWriter 失败:', error);
            this.showError('无法加载汉字，请输入有效的汉字');
        }
    }

    updateWriterOptions() {
        if (this.writer) {
            this.writer.updateOptions({
                showOutline: this.showOutlineCheckbox.checked,
                showCharacter: this.showCharacterCheckbox.checked
            });
        }
    }

    animateCharacter() {
        if (this.writer) {
            this.writer.animateCharacter();
        }
    }

    toggleQuizMode() {
        this.isQuizMode = !this.isQuizMode;
        
        if (this.isQuizMode) {
            this.quizBtn.textContent = '退出测试';
            this.quizBtn.style.background = 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)';
            this.startQuiz();
        } else {
            this.quizBtn.textContent = '测试模式';
            this.quizBtn.style.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
            this.stopQuiz();
        }
    }

    startQuiz() {
        if (this.writer) {
            this.writer.quiz();
        }
    }

    stopQuiz() {
        if (this.writer) {
            this.writer.hideCharacter();
            this.writer.showCharacter();
        }
    }

    showQuizComplete() {
        // 可以在这里添加测试完成的反馈
        setTimeout(() => {
            this.showMessage('测试完成！做得很好！');
        }, 500);
    }

    resetWriter() {
        if (this.writer) {
            this.writer.hideCharacter();
            setTimeout(() => {
                this.writer.showCharacter();
            }, 100);
        }
    }

    selectCharacter(char) {
        this.characterInput.value = char;
        this.currentChar = char;
        this.initWriter();
        this.updateStrokeInfo();
    }

    updateStrokeInfo() {
        // 这里可以添加更详细的笔画信息
        const strokeCount = this.getStrokeCount(this.currentChar);
        this.strokeInfo.innerHTML = `
            <p><strong>当前汉字：</strong>${this.currentChar}</p>
            <p><strong>笔画数：</strong>${strokeCount}</p>
            <p><strong>拼音：</strong>${this.getPinyin(this.currentChar)}</p>
            <p><strong>部首：</strong>${this.getRadical(this.currentChar)}</p>
        `;
    }

    getStrokeCount(char) {
        // 简单的笔画数估算（实际应用中应该使用更准确的字典）
        const commonStrokes = {
            '永': 5, '福': 13, '爱': 10, '中': 4, '国': 8,
            '春': 9, '夏': 10, '秋': 9, '冬': 5
        };
        return commonStrokes[char] || '未知';
    }

    getPinyin(char) {
        const pinyinMap = {
            '永': 'yǒng', '福': 'fú', '爱': 'ài', '中': 'zhōng', '国': 'guó',
            '春': 'chūn', '夏': 'xià', '秋': 'qiū', '冬': 'dōng'
        };
        return pinyinMap[char] || '未知';
    }

    getRadical(char) {
        const radicalMap = {
            '永': '水', '福': '示', '爱': '心', '中': '丨', '国': '囗',
            '春': '日', '夏': '夊', '秋': '禾', '冬': '冫'
        };
        return radicalMap[char] || '未知';
    }

    showError(message) {
        this.showMessage(message, 'error');
    }

    showMessage(message, type = 'info') {
        // 创建消息元素
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 5px;
            color: white;
            font-weight: bold;
            z-index: 1000;
            max-width: 300px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            background: ${type === 'error' ? 'linear-gradient(135deg, #ff6b6b, #feca57)' : 'linear-gradient(135deg, #667eea, #764ba2)'};
            animation: slideIn 0.3s ease;
        `;

        // 添加动画样式
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(messageDiv);

        // 3秒后自动移除
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 3000);
    }
}

// 页面加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new HanziWriterApp();
});

// 添加一些实用的工具函数
window.HanziWriterUtils = {
    // 批量加载汉字
    loadMultipleChars(chars, containerId = 'character-target-div') {
        chars.forEach((char, index) => {
            setTimeout(() => {
                const writer = HanziWriter.create(containerId, char, {
                    width: 200,
                    height: 200,
                    padding: 5,
                    strokeColor: '#333333',
                    showOutline: true,
                    showCharacter: true
                });
                writer.animateCharacter();
            }, index * 1000);
        });
    },

    // 创建汉字网格
    createCharacterGrid(chars, gridId) {
        const grid = document.getElementById(gridId);
        if (!grid) return;

        grid.innerHTML = '';
        chars.forEach(char => {
            const cell = document.createElement('div');
            cell.className = 'character-cell';
            cell.style.cssText = `
                display: inline-block;
                width: 100px;
                height: 100px;
                margin: 5px;
                border: 1px solid #ddd;
                vertical-align: top;
            `;
            
            const writer = HanziWriter.create(cell, char, {
                width: 100,
                height: 100,
                padding: 2,
                strokeColor: '#333333',
                showOutline: true,
                showCharacter: true
            });
            
            grid.appendChild(cell);
        });
    }
};