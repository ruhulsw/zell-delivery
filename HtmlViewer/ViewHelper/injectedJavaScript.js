const injectedJavaScriptAndroid = `
(function () {
  const style = document.createElement('style');
  style.innerHTML = \`
    .custom-context-menu {
      position: absolute;
      background: white;
      border: 1px solid #ccc;
      border-radius: 5px;
      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
      padding: 10px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
    .custom-context-menu div {
      display: flex;
      align-items: center;
      padding: 5px 10px;
      gap: 10px;
      font-family: Arial, sans-serif;
    }
    .custom-context-menu button {
      border: none;
      background: none;
      font-size: 45px;
    }
  \`;
  document.head.appendChild(style);

  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();

    const selectedText = window.getSelection().toString().trim();
    document.querySelectorAll('.custom-context-menu').forEach(menu => menu.remove());

    const menu = document.createElement('div');
    menu.className = 'custom-context-menu';

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    let left = e.pageX;
    let top = e.pageY - 130;

    if (left > screenWidth / 2) {
      left = screenWidth - 500;
    }
    if (top < 100) {
      top = e.pageY + 35;
    }

    menu.style.left = left + 'px';
    menu.style.top = top + 'px';

    menu.innerHTML = \`
      <div style="display: flex; justify-content: space-between; gap: 20px; padding: 5px 10px;">
        <button onclick="sendMessageToApp('copy', '\${selectedText.replace(/'/g, '\\\'')}')">
          📋
        </button>
        <button onclick="sendMessageToApp('highlight', '\${selectedText.replace(/'/g, '\\\'')}')">
          🖍️
        </button>
        <button onclick="sendMessageToApp('share', '\${selectedText.replace(/'/g, '\\\'')}')">
          🔗
        </button>
        <button onclick="sendMessageToApp('note', '\${selectedText.replace(/'/g, '\\\'')}')">
          📝
        </button>
      </div>
    \`;

    document.body.appendChild(menu);
    document.addEventListener('click', function removeMenu() {
      if (menu.parentNode) {
        menu.parentNode.removeChild(menu);
      }
      document.removeEventListener('click', removeMenu);
    });
  });

 let touch = 0;
    document.addEventListener('touchstart', function () {
      touch += 1;
      sendMessageToApp('touch', touch.toString());
    });

  // Send message to React Native app
  window.sendMessageToApp = function (action, text) {
    window.ReactNativeWebView.postMessage(JSON.stringify({ action, text }));
  };
})();
true;
`;

const injectedJavaScriptApple = `
(function () {
  const style = document.createElement('style');
  style.innerHTML = \`
    * {
      -webkit-touch-callout: none; /* Disable long-press callout */
      -webkit-user-select: none; /* Disable text selection */
      user-select: none; /* Disable text selection */
      
    }
  \`;
  document.head.appendChild(style);

  const customStyle = document.createElement('style');
  customStyle.innerHTML = \`
    .custom-context-menu {
      position: absolute;
      background: white;
      border: 1px solid #ccc;
      border-radius: 5px;
      box-shadow: 3px 4px 6px rgba(0, 0, 0, 0.27);
      padding: 20px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
    }
    .custom-context-menu div {
      display: flex;
      align-items: center;
      padding: 5px;
      font-family: Arial, sans-serif;
    }
    .custom-context-menu button {
      border: none;
      background: none;
      font-size: 50px;
    }
  \`;
  document.head.appendChild(customStyle);

  let longPressTimer = null;
  let touchStartX = 0;
  let touchStartY = 0;
  const LONG_PRESS_DELAY = 400;

  document.addEventListener('touchstart', handleTouchStart, { passive: false });
  document.addEventListener('touchend', handleTouchEnd);

  function handleTouchStart(event) {
    const selectedText = window.getSelection().toString().trim();

    const touch = event.touches[0];
    touchStartX = touch.pageX;
    touchStartY = touch.pageY;

    longPressTimer = setTimeout(() => {
      showCustomContextMenu(touch.pageX, touch.pageY, selectedText);
      event.preventDefault();
    }, LONG_PRESS_DELAY);
  }

  function handleTouchEnd() {
    clearTimeout(longPressTimer);
    longPressTimer = null;
  }

  function showCustomContextMenu(x, y, selectedText) {
  document.querySelectorAll('.custom-context-menu').forEach(menu => menu.remove());
    const menu = document.createElement('div');
    menu.className = 'custom-context-menu';

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    let left = "14%";
    let top =y - 150;

    if (top < 100) {
      top = y + 35;
    }

    menu.style.left = left;
    menu.style.top = top + 'px';

    menu.innerHTML = \`
      <div style="display: flex; justify-content: space-between; gap: 20px; padding: 5px 10px;">
        <button onclick="sendMessageToApp('copy', '\${selectedText.replace(/'/g, '\\\'')}')">
          📋
        </button>
        <button onclick="sendMessageToApp('highlight', '\${selectedText.replace(/'/g, '\\\'')}')">
          🖍️
        </button>
        <button onclick="sendMessageToApp('share', '\${selectedText.replace(/'/g, '\\\'')}')">
          🔗
        </button>
        <button onclick="sendMessageToApp('note', '\${selectedText.replace(/'/g, '\\\'')}')">
          📝
        </button>
    \`;

    document.body.appendChild(menu);

    document.addEventListener('click', function removeMenu() {
      if (menu.parentNode) menu.parentNode.removeChild(menu);
      document.removeEventListener('click', removeMenu);
    });
  }

  window.sendMessageToApp = function (action, text) {
    window.ReactNativeWebView.postMessage(JSON.stringify({ action, text }));
  };
})();
true;
`;

export { injectedJavaScriptAndroid, injectedJavaScriptApple };
