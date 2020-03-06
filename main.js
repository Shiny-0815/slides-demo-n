let $buttons = $('#buttonWrapper>button')
let $slides = $('#slides')
let $images = $slides.children('img')
let current = 0

makeFakeSlides()
$slides.css({ transform: `translateX(-400px)` })
bindEvents()

//上一张下一张按钮
$('#previous').on('click', function () {
    goToSlides(current - 1)
})
$('#next').on('click', function () {
    goToSlides(current + 1)
})

//自动轮播
let timer = setInterval(() => {
    goToSlides(current + 1)
}, 2000);

//鼠标进入轮播停，出轮播继续
$('#slides').on('mouseenter', function () {
    window.clearInterval(timer)
}).on('mouseleave', function () {
    timer = setInterval(() => {
        goToSlides(current + 1)
    }, 2000);
})
$('#controls').on('mouseenter', function () {
    window.clearInterval(timer)
}).on('mouseleave', function () {
    timer = setInterval(() => {
        goToSlides(current + 1)
    }, 2000);
})
$('#buttonWrapper').on('mouseenter', function () {
    window.clearInterval(timer)
}).on('mouseleave', function () {
    timer = setInterval(() => {
        goToSlides(current + 1)
    }, 2000);
})

//以下为上面用到的函数
function makeFakeSlides() {
    let $firstCopy = $images.eq(0).clone(true)
    let $lastCopy = $images.eq($images.length - 1).clone(true)

    $slides.append($firstCopy)
    $slides.prepend($lastCopy)
}

function bindEvents() {
    $('#buttonWrapper').on('click', 'button', function (e) {
        let $button = $(e.currentTarget)
        let index = $button.index()
        goToSlides(index)
    })
}


//重要  无缝轮播过程
function goToSlides(index) {
    if (index > $buttons.length - 1) {
        index = 0
    } else if (index < 0) {
        index = $buttons.length - 1
    }
    if (current === $buttons.length - 1 && index === 0) {
        //最后一张到第一张
        $slides.css({ transform: `translateX(${-($buttons.length + 1) * 400}px)` })
            .one('transitionend', function () {
                $slides.hide()
                $slides.offset()
                $slides.css({ transform: `translateX(${-(index + 1) * 400}px)` }).show()

            })
    } else if (current === 0 && index === $buttons.length - 1) {
        //第一张到最后一张
        $slides.css({ transform: `translateX(0px)` })
            .one('transitionend', function () {
                $slides.hide()
                $slides.offset()
                $slides.css({ transform: `translateX(${-$buttons.length * 400}px)` }).show()
            })
    } else {
        $slides.css({ transform: `translateX(${-(index + 1) * 400}px)` })
    }
    current = index
}