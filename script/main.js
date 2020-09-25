'use strict';
function deepMap(obj) {
        let out = ``;
        for (let i = 0; i < obj.length; i++) {
            if (Array.isArray(obj[i + 1])) {
                out += `<li class = "tree-wrapper__item tree-wrapper__item_folder"><button class ='tree-wrapper__btn'>+</button><a class ='tree-wrapper__link tree-wrapper__link-folder' src = '${obj[i].src}'>${obj[i].name}</a><ul>` + deepMap(obj[i + 1]) + `</ul></li>`;
                i++;
            }else{
                out += `<li class ='tree-wrapper__item tree-wrapper__item_file'><a class ='tree-wrapper__link tree-wrapper__link-file' src = '${obj[i].src}'>${obj[i].name}</a></li>`;
            }
        }
        return out;
}

let arrey = [
    {
        name: '111',
        src: 'some'
    },
    [
        {
            name: '122',
            src: 'some'

        },
        {
            name: '133',
            src: 'some'

        },
        [
            {
                name: '211',
                src: 'some'

            },
            {
                name: '223',
                src: 'some'

            }
        ],
        ],
    {
        name: '222',
        src: 'some'

    },
    [
        {
            name: '444',
            src: 'some'

            }

    ]
    ]


console.log(deepMap(arrey))
document.querySelector('.tree-wrapper').innerHTML = deepMap(arrey);

document.querySelector('.tree-wrapper').addEventListener('click', e => {
    if(e.target.classList.contains('tree-wrapper__btn')){
        let ul = e.target.nextElementSibling.nextElementSibling;
        switchUl(ul, e.target);
    }
    
})
function switchUl(ul, btn){
    if(ul.style.display === 'none'){
        ul.style.display = 'block';
        btn.textContent = '-'
    }else {
        ul.style.display = 'none';
        btn.textContent = '+'

    }
}