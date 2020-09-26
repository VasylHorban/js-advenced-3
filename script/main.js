'use strict';
/**
 * функція для отримання DOM елемента 
 * 
 * @param {string} selector  - селектор дом елемента.
 * @return {object} - DOM елемент
 */
const getS = selector => document.querySelector(selector);
const tree = document.querySelector('.tree-wrapper');
let arrey = [
    {
        name: 'Google',
        src: 'https://www.google.com'
    },
    [
        {
            name: 'Gmail',
            src: 'https://www.gmail.com'

        },
        {
            name: 'YouTube',
            src: 'https://www.youtube.com'

        },
        [
            {
                name: 'YoutubeMusic',
                src: 'https://www.youtubemusic.com'

            },
            {
                name: 'YoutubePremium',
                src: 'https://www.youtubepremium.com'

            }
        ],
        ],
    {
        name: 'FaceBook',
        src: 'https://www.facebook.com'

    },
    [
        {
            name: 'Instagram',
            src: 'https://www.instagram.com'

            },
        {
            name: 'WhatsApp',
            src: 'https://www.whatsapp.com'

            }
        

    ],
    {
        name: 'Telegram',
        src: 'https://www.telegram.com'
    },
    {
        name : 'Yandex',
        src : 'https://www.yandex.com'
    },
    [
        {
        name : 'Alisa',
        src : 'https://www.yandexalisa.com'
    },
        {
        name : 'YandexMoney',
        src : 'https://www.yandexmoney.com'
        }
    ]
    ]
/**
 * модуль функціонування одального вікна 
 *  
 * @return {function} init - метод запуску модуля
 */
const modalWindow = (function () {
    const wrapper = document.querySelector('.window');
    /**
     * генерує та виводить в HTML вікно
     *  
     * @param {obj} data - дані про текст та шлях вікна
     */
    function showWindow(data) {
        let tab = document.createElement('div');
        tab.classList.add('window__tab');
        let head = document.createElement('div');
        head.classList.add('window__header');
        head.innerHTML = `<div class="window__addres">${data.src}</div><button class="window__btn"></button>`;
        let content = document.createElement('div');
        content.classList.add('window__content');
        content.textContent = data.name;
        let top = wrapper.scrollTop + randomNum();
        let left = wrapper.scrollLeft + randomNum();
        tab.style.top = top + 'px';
        tab.style.left = left + 'px';
        tab.append(head);
        tab.append(content);
        wrapper.append(tab);
    }
    /**
     * видаляє модальне вікно
     *  
     * @param {obj} elem - вкладка для видалення
     */
    function removeWindow(elem) {
        for (let i = 0; i < wrapper.children.length; i++) {
            if (wrapper.children[i] == elem) {
                wrapper.removeChild(wrapper.children[i])
            }
        }
    }
    /**
     * вмикає івент видалення
     */
    function setEvent() {
        wrapper.addEventListener('click', e => {
            if (e.target.classList.contains('window__btn')) {
                removeWindow(e.target.parentElement.parentElement);
            }
        })
    }
    /**
     * повертає випадкове число
     *
     *@return {number} - випадкове число
     */
    function randomNum() {
        let rand = 50 - 0.5 + Math.random() * (50 - 5 + 1);
        return Math.round(rand);
    }
    /**
     * вмикає функціонування модуля
     */
    function init() {
        setEvent();
    }
    return {
        init: init,
        showWindow: showWindow
    }
})();
modalWindow.init();
/**
 * генерує дерево за допомогою рекурсії
 *
 *@param{ob} - масив з даними для дерева
 *@eturn{string} out - згенеровані HTML елементи
 */

function recursion(obj) {
    let out = ``;
    for (let i = 0; i < obj.length; i++) {
        if (Array.isArray(obj[i + 1])) {
            out += `<li class = "tree-wrapper__item tree-wrapper__item_folder"><button class ='tree-wrapper__btn'>+</button><a class ='tree-wrapper__link tree-wrapper__link-folder' src = '${obj[i].src}'>${obj[i].name}</a><ul>` + recursion(obj[i + 1]) + `</ul></li>`;
            i++;
        } else {
            out += `<li class ='tree-wrapper__item tree-wrapper__item_file'><a class ='tree-wrapper__link tree-wrapper__link-file' src = '${obj[i].src}'>${obj[i].name}</a></li>`;
        }
    }
    return out;
}
/**
 * викликає функцію рекурсії 
 *
 *@param{obj} arr - масив з даними для дерева
 */
function getTree(arr){
    tree.innerHTML = recursion(arr);
}
getTree(arrey)
/**
 * відкриває та закриває вкладені елементи дерева
 *
 *@param{ob}ul - список , що треба відкрити
 *@param{ob}b - список , що треба відкрити
 *@eturn{string} out - згенеровані HTML елементи
 */
function switchUl(ul, btn) {
    if (ul.style.display === 'none') {
        ul.style.display = 'block';
        btn.textContent = '-';
    } else {
        ul.style.display = 'none';
        btn.textContent = '+';
    }
}
tree.addEventListener('click', e => {
    if (e.target.classList.contains('tree-wrapper__btn')) {
        let ul = e.target.nextElementSibling.nextElementSibling;
        switchUl(ul, e.target);
    } else if (e.target.classList.contains('tree-wrapper__link')) {
        let text = e.target.textContent;
        let src = e.target.getAttribute('src');
        modalWindow.showWindow({
            name: text,
            src: src
        })
    }
})
tree.addEventListener('keypress', e => {
    if (e.code === 'Enter' && e.target.classList.contains('tree-wrapper__btn')) {
        let ul = e.target.nextElementSibling.nextElementSibling;
        switchUl(ul, e.target);
    }
})

alert('Для власного дерева скористайтесь функцією : getTree(arr)');
