// 聊天內容資料
const chatData = [
    {
        type: 'question',
        text: '嗨! 自我介紹一下吧'
    },
    {
        type: 'answer',
        text: '我是陳銘彥，視覺與網頁設計師。'
    },
    {
        type: 'question',
        text: '你從事過什麼產品類型？'
    },
    {
        type: 'answer',
        text: '主要是網頁設計，經手過的類型從 AI 創意軟體、臉部辨識平台，到通訊工具和銷售用途都有，並且負責相關功能的使用情境視覺。'
    },
    {
        type: 'question',
        text: '你只負責網頁視覺設計的部分嗎？'
    },
    {
        type: 'answer',
        text: '其實不止。我也參與 HTML/CSS 版型開發與調整，加上 JavaScript 動態效果，確保網頁 SEO 最佳化，並且確保設計在不同平台裝置上都能完整呈現。'
    },
    {
        type: 'question',
        text: '你平常使用的工具有哪些？'
    },   
    {
        type: 'answer',
        text: '主要是 Adobe Creative Suite，Figma，VS Code，GitHub。網頁是用 HTML5，CSS3 以及 JavaScript，AI 輔助工具則是 ChatGPT 和 Claude。'
    },
    {
        type: 'question',
        text: 'AI 如何幫助你的設計工作？'
    },   
    {
        type: 'answer',
        text: '我認為 AI 能幫助減少重複性工作，並在短時間內探索更多可能性。它不是取代設計思考，而是讓我能更專注在問題解決，以及打造清晰且以使用者為中心的設計體驗。'
    },
    // {
    //     type: 'question',
    //     text: '你在設計工作中會使用哪些 AI 工具？'
    // },   
    // {
    //     type: 'answer',
    //     text: '我使用許多 AI 來協助我的創作。在圖像編輯與最佳化方面，我使用 Photoshop 的 AI 功能。對於 AI 生成式內容（圖片與影片），我使用像 Kling 這樣的 AI 引擎，並透過精準的propmp指令來達成想要的結果。這些工具幫助我快速探索想法，創建原型，並更專注於整體用戶體驗，而不是重複性任務。'
    // },
    {
        type: 'question',
        text: '有什麼其他非 AI 的數位創作嗎？'
    },   
    {
        type: 'answer',
        text: '有的。除了 AI 相關工作之外，我曾經創作過一些 Line 貼圖系列。有興趣可以看看：<br><a href="https://store.line.me/stickershop/product/4439554/en?from=sticker" target="_blank"><img src="images/sticker.png" alt="line sticker" style="max-width: 30%; height:auto; border-radius: 10px; margin-top: 10px;"></a><br><a href="https://store.line.me/stickershop/product/4439554/en?from=sticker" target="_blank" style="font-size:0.75em; font-weight: bold;">Line 貼圖 1</a> / <a href="https://store.line.me/stickershop/product/5626577/en?from=sticker" target="_blank" style="font-size:0.75em; font-weight: bold;">Line 貼圖 2</a>'
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