// 聊天內容資料
const chatData = [
    {
        type: 'question',
        text: '嗨! 自我介紹一下吧'
    },
    {
        type: 'answer',
        text: '我是陳銘彥，視覺與網頁設計師，喜歡設計實際可用、有效的數位體驗。'
    },
    {
        type: 'question',
        text: '你從事什麼類型的設計？'
    },
    {
        type: 'answer',
        text: '從 AI 創意軟體、臉部辨識平台，到通訊工具和銷售導向的產品頁面 — 我做的設計大都是以產品為核心的。'
    },
    {
        type: 'question',
        text: '你只負責視覺設計的部分嗎？'
    },
    {
        type: 'answer',
        text: '其實不止。<br> 我也實作與調整 HTML/CSS 版型、修改 JavaScript，確保設計在不同平台裝置上都能完整呈現。'
    },
    {
        type: 'question',
        text: '你也有參與內容設計嗎？'
    },
    {
        type: 'answer',
        text: '是的，我也參與 SEO 最佳化的專案，像是製作使用情境頁面以及部落格視覺素材，讓流量與曝光度上升。'
    },
    {
        type: 'question',
        text: '工作上你使用哪些工具？'
    },   
    {
        type: 'answer',
        text: 'Adobe Creative Suite, Figma, VS Code, GitHub — 前端技術的話像是 HTML5, CSS3, and JavaScript.'
    },
    {
        type: 'question',
        text: '你工作的動力是什麼？'
    },   
    {
        type: 'answer',
        text: '我喜歡設計簡單易用、運作良好，且對使用者與業務都有價值的數位體驗。'
    },
    {
        type: 'question',
        text: '工作之外，你有參與過什麼有趣的專案嗎？'
    },   
    {
        type: 'answer',
        text: '有啊，我曾經設計過 Line 貼圖<br>有興趣可以看看<br><a href="https://store.line.me/stickershop/product/4439554/en?from=sticker" target="_blank"><img src="images/sticker.png" alt="line sticker" style="max-width: 30%; height:auto; border-radius: 10px; margin-top: 10px;"></a><br><a href="https://store.line.me/stickershop/product/4439554/en?from=sticker" target="_blank" style="font-size:0.75em; font-weight: bold;">Line 貼圖 1</a> / <a href="https://store.line.me/stickershop/product/5626577/en?from=sticker" target="_blank" style="font-size:0.75em; font-weight: bold;">Line 貼圖 2</a>'
    },
];
const scrollTriggerArea = document.getElementById('scrollTriggerArea');
const scrollIndicator = document.getElementById('scrollIndicator');
const portfolioSection = document.getElementById('portfolioSection');
const chatMessages = document.getElementById('chatMessages');

let messageElements = [];
let lastScrollY = 0;

// 建立所有訊息元素
function createAllMessages() {
    let cumulativeTop = 0; // 累積的垂直位置
    let imagesToLoad = 0; // 需要載入的圖片數量
    let imagesLoaded = 0; // 已載入的圖片數量
    
    chatData.forEach((data, index) => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${data.type} hidden`;
        messageDiv.dataset.index = index;

        const bubbleDiv = document.createElement('div');
        bubbleDiv.className = 'message-bubble';
        // 將 \n 轉換成 <br> 標籤
        bubbleDiv.innerHTML = data.text.replace(/\n/g, '<br>');

        messageDiv.appendChild(bubbleDiv);
        
        // 先加入 DOM 以便計算實際高度
        scrollTriggerArea.appendChild(messageDiv);
        
        // 檢查是否有圖片
        const images = bubbleDiv.querySelectorAll('img');
        if (images.length > 0) {
            imagesToLoad += images.length;
            images.forEach(img => {
                // 如果圖片已經載入（來自快取）
                if (img.complete) {
                    imagesLoaded++;
                } else {
                    // 等待圖片載入
                    img.addEventListener('load', () => {
                        imagesLoaded++;
                        if (imagesLoaded === imagesToLoad) {
                            // 所有圖片載入完成，重新計算位置
                            recalculateMessagePositions();
                        }
                    });
                    // 處理圖片載入失敗的情況
                    img.addEventListener('error', () => {
                        imagesLoaded++;
                        if (imagesLoaded === imagesToLoad) {
                            recalculateMessagePositions();
                        }
                    });
                }
            });
        }
        
        // 設定訊息位置
        messageDiv.style.top = cumulativeTop + 'px';
        
        // 計算實際高度（包含 margin）
        const messageHeight = messageDiv.offsetHeight;
        const marginBottom = 20; // 對應 CSS 中的 margin-bottom
        
        messageElements.push({
            element: messageDiv,
            index: index,
            triggerPoint: cumulativeTop,
            isVisible: false
        });
        
        // 更新累積位置
        cumulativeTop += messageHeight + marginBottom;
    });
    
    // 更新滾動區域的總高度
    scrollTriggerArea.style.height = cumulativeTop + 'px';
    
    // 如果所有圖片已經載入完成（或沒有圖片），立即重新計算
    if (imagesToLoad === 0 || imagesLoaded === imagesToLoad) {
        setTimeout(() => recalculateMessagePositions(), 100);
    }
}

// 重新計算所有訊息的位置（當視窗大小改變時使用）
function recalculateMessagePositions() {
    let cumulativeTop = 0;
    
    messageElements.forEach((msg, index) => {
        // 重新計算位置
        msg.element.style.top = cumulativeTop + 'px';
        msg.triggerPoint = cumulativeTop;
        
        // 計算實際高度
        const messageHeight = msg.element.offsetHeight;
        const marginBottom = 20;
        
        // 更新累積位置
        cumulativeTop += messageHeight + marginBottom;
    });
    
    // 更新滾動區域的總高度
    scrollTriggerArea.style.height = cumulativeTop + 'px';
    
    // 重新檢查滾動狀態
    updateMessagesOnScroll();
}

// 根據滾動位置更新訊息顯示狀態
function updateMessagesOnScroll() {
    const scrollY = window.scrollY || window.pageYOffset;
    const viewportHeight = window.innerHeight;
    const viewportBottom = scrollY + viewportHeight;
    const viewportTop = scrollY;

    messageElements.forEach((msg, index) => {
        const msgRect = msg.element.getBoundingClientRect();
        const msgAbsoluteTop = msgRect.top + scrollY;
        const msgAbsoluteBottom = msgAbsoluteTop + msgRect.height;

        // 當訊息進入視窗下方 70% 位置時顯示
        const triggerPoint = viewportTop + (viewportHeight * 0.7);
        // 當訊息離開視窗上方時隱藏
        const hidePoint = viewportTop - 100;

        if (msgAbsoluteTop < triggerPoint && !msg.isVisible) {
            // 往下滾：顯示訊息
            msg.element.classList.remove('hidden');
            msg.element.classList.add('visible');
            msg.isVisible = true;
        } else if (msgAbsoluteTop > triggerPoint && msg.isVisible) {
            // 往上滾：隱藏訊息
            msg.element.classList.remove('visible');
            msg.element.classList.add('hidden');
            msg.isVisible = false;
        }
    });

    // 檢查是否所有訊息都已顯示
    const allVisible = messageElements.every(msg => msg.isVisible);
    const chatContainerBottom = chatMessages.getBoundingClientRect().bottom + scrollY;
    
    if (allVisible && scrollY > chatContainerBottom - viewportHeight) {
        scrollIndicator.classList.add('visible');
    } else {
        scrollIndicator.classList.remove('visible');
    }

    lastScrollY = scrollY;
}

// 滾動到作品集
scrollIndicator.addEventListener('click', () => {
    portfolioSection.scrollIntoView({ behavior: 'smooth' });
});

// 監聽滾動事件
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateMessagesOnScroll();
            ticking = false;
        });
        ticking = true;
    }
});

// 初始化
createAllMessages();
updateMessagesOnScroll();

// 頁面載入後稍微延遲再顯示第一個訊息
setTimeout(() => {
    if (messageElements.length > 0) {
        messageElements[0].element.classList.remove('hidden');
        messageElements[0].element.classList.add('visible');
        messageElements[0].isVisible = true;
    }
}, 500);

// 監聽視窗大小改變，重新計算訊息位置
let resizeTimeout;
window.addEventListener('resize', () => {
    // 使用 debounce 避免過度計算
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        recalculateMessagePositions();
    }, 250);
});