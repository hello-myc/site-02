// 聊天內容資料
const chatData = [
    {
        type: 'question',
        text: 'Hey! Please introduce yourself.'
    },
    {
        type: 'answer',
        text: ' I\'m Ming-Yen, a Visual & Web Designer. '
    },
    {
        type: 'question',
        text: 'What kind of projects do you usually work on?'
    },
    {
        type: 'answer',
        text: 'From AI creative software and facial recognition platforms to communication tools and sales-driven landing pages — basically anything product-focused.'
    },
    {
        type: 'question',
        text: 'So you only design visuals?'
    },
    {
        type: 'answer',
        text: 'No, a bit more than that.<br> I implement and tweak HTML/CSS layouts, modify JavaScript interactions, and make sure designs work smoothly across devices.'
    },
    {
        type: 'question',
        text: 'Do you do content design too?'
    },
    {
        type: 'answer',
        text: 'Yup. I help with SEO-driven initiatives — like building use case pages and creating blog visuals to boost organic reach.'
    },
    {
        type: 'question',
        text: 'What tools do you use?'
    },   
    {
        type: 'answer',
        text: 'ChatGPT, Claude, Adobe Creative Suite, Figma, VS Code, GitHub — and front-end technologies like HTML5, CSS3, and JavaScript.'
    },
    {
        type: 'question',
        text: 'What drives your work?'
    },   
    {
        type: 'answer',
        text: 'I just enjoy creating digital experiences that feel simple and work well.'
    },
    {
        type: 'question',
        text: 'Any fun projects outside product work?'
    },   
    {
        type: 'answer',
        text: 'Yes, I designed Messenger sticker sets. <br>Just a fun way to explore emotions through simple visuals.<br>Feel free to check them out.<br><a href="https://store.line.me/stickershop/product/4439554/en?from=sticker" target="_blank"><img src="images/sticker.png" alt="line sticker" style="max-width: 30%; height:auto; border-radius: 10px; margin-top: 10px;"></a><br><a href="https://store.line.me/stickershop/product/4439554/en?from=sticker" target="_blank" style="font-size:0.75em; font-weight: bold;">Sticker 1</a> / <a href="https://store.line.me/stickershop/product/5626577/en?from=sticker" target="_blank" style="font-size:0.75em; font-weight: bold;">Sticker 2</a>'
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