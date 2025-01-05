/**
 * 初始化頁面功能
 */
document.addEventListener('DOMContentLoaded', () => {
    const woodfish = document.getElementById('woodfish');
    const hammer = document.getElementById('hammer');
    const scoreElement = document.getElementById('score');
    const hitSound = document.getElementById('hitSound');
    let score = 0;
    let isEvolutionAnimating = false;  // 添加標記來追踪進化動畫狀態

    /**
     * 更換鴨子圖片
     * @param {number} score - 當前分數
     */
    function changeDuck(score) {
        if (score === 100) {
            isEvolutionAnimating = true;
            woodfish.src = './images/DUCK2.png';
            woodfish.style.opacity = '0';
            
            // 添加特殊進化效果
            const effect = document.createElement('div');
            effect.className = 'special-effect evolution-effect';
            effect.textContent = '進化達成';
            document.body.appendChild(effect);

            // 添加閃光效果和漸現效果
            woodfish.classList.add('evolution');
            
            // 漸漸顯示新的鴨子，並放大
            setTimeout(() => {
                woodfish.style.opacity = '1';
                woodfish.style.transition = 'opacity 1s, transform 1s';
                woodfish.style.transform = 'scale(2)';  // 放大到 200%
                woodfish.style.width = '400px';  // 原始寬度的 200%
            }, 100);
            
            // 3秒後移除特效，但保持放大尺寸
            setTimeout(() => {
                document.body.removeChild(effect);
                woodfish.classList.remove('evolution');
                isEvolutionAnimating = false;
            }, 3000);
        }
    }

    /**
     * 創建特殊效果
     * @param {number} level - 當前等級（分數/20）
     */
    function createSpecialEffect(level) {
        // 如果正在播放進化動畫，不顯示升級效果
        if (isEvolutionAnimating) return;

        const effect = document.createElement('div');
        effect.className = 'special-effect';
        effect.textContent = `🎉 恭喜達到 ${level * 20} 分！🎉\n升級！`;
        document.body.appendChild(effect);

        woodfish.classList.add('level-up');
        
        setTimeout(() => {
            woodfish.classList.remove('level-up');
        }, 1000);

        setTimeout(() => {
            document.body.removeChild(effect);
        }, 3000);
    }

    woodfish.addEventListener('click', (e) => {
        hitSound.currentTime = 0;
        hitSound.play();

        score++;
        scoreElement.textContent = score;

        // 檢查是否需要更換鴨子
        changeDuck(score);

        // 檢查是否達到 20 的倍數
        if (score % 20 === 0) {
            createSpecialEffect(score / 20);
        }

        woodfish.classList.add('active');
        hammer.classList.add('active');

        const meritText = document.createElement('div');
        meritText.className = 'merit-text';
        meritText.textContent = '經驗值 +1';
        meritText.style.left = `${e.clientX - 30}px`;
        meritText.style.top = `${e.clientY - 30}px`;
        document.body.appendChild(meritText);

        setTimeout(() => {
            woodfish.classList.remove('active');
            hammer.classList.remove('active');
        }, 100);

        setTimeout(() => {
            document.body.removeChild(meritText);
        }, 400);
    });
}); 