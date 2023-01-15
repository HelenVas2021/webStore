let intervalId;

document.querySelectorAll('.list').forEach(e => {
    e.addEventListener('click', e => {
        const menu = e.currentTarget.dataset.path;
        const list = document.querySelector(`[data-target=${menu}]`);
        const up = document.querySelector('#up');
        const down = document.querySelector('#down');
        document.querySelectorAll('.menu_item').forEach(e => {
            if (!list.classList.contains('open')) {
                list.classList.add('active_menu');
                up.classList.add('active_mod');
                down.classList.add('hidden');
                down.classList.remove('active_mod');
                intervalId = setTimeout (() => {
                    list.classList.add('open');
                },0);
            }
            if (list.classList.contains('open')) {
                clearTimeout(intervalId);
                list.classList.remove('active_menu');
                down.classList.add('active_mod');
                up.classList.remove('active_mod');
                intervalId = setTimeout (() => {
                    list.classList.remove('open');
                },0);
            }
        })
    });     
});

