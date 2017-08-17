var H5ComponentPie = function (name, cfg) {
    component = new H5ComponentBase(name, cfg)

    var w = cfg.width
    var h = cfg.height

    var cns = document.createElement('canvas')
    var ctx = cns.getContext('2d')
    $(cns).css('zIndex', 1)
    cns.width = ctx.width = w
    cns.height = ctx.height = h
    component.append(cns)

    var r = w / 2

    // 绘制底图层
    ctx.beginPath()
    ctx.fillStyle = '#eee'
    ctx.strokeStyle = '#eee'
    ctx.lineWidth = 1
    ctx.arc(r, r, r, 0, 2 * Math.PI)
    ctx.fill()
    ctx.stroke()

    // 绘制数据层
    var cns = document.createElement('canvas')
    var ctx = cns.getContext('2d')
    $(cns).css('zIndex', 2)
    cns.width = ctx.width = w
    cns.height = ctx.height = h
    component.append(cns)

    var colors = ['red', 'green', 'blue', 'darkred', 'orange']
    var sAngel = 1.5 * Math.PI  // 开始角度在12点方向
    var eAngel = 0  // 结束角度
    var aAngel = Math.PI * 2  // 100%圆的角度

    var step = cfg.data.length
    for (var i = 0; i < step; i++) {
        var item = cfg.data[i]
        var color = item[2] || (item[2] = colors.pop())
        eAngel = sAngel + aAngel * item[1]

        ctx.beginPath()
        ctx.fillStyle = color
        ctx.strokeStyle = color
        ctx.lineWidth = 0.1
        ctx.moveTo(r, r)
        ctx.arc(r, r, r, sAngel, eAngel)
        ctx.fill()
        ctx.stroke()

        // 重新设置好开始的角度
        sAngel = eAngel

        // 加入项目文本及百分比
        var text = $('<div class="text">')
        text.text(cfg.data[i][0])
        var per = $('<div class="per">')
        per.text(cfg.data[i][1] * 100 + '%')
        text.append(per)

        // 文本坐标修正
        var x = r + Math.sin(0.5 * Math.PI - sAngel) * r
        var y = r + Math.cos(0.5 * Math.PI - sAngel) * r

        if (x > w / 2) {
            text.css('left', x / 2)
        } else {
            text.css('right', (w - x) / 2)
        }

        if (y > h / 2) {
            text.css('top', y / 2)
        } else {
            text.css('bottom', (h - y) / 2)
        }

        if (cfg.data[i][2]) {
            text.css('color', cfg.data[i][2])
        }

        text.css('opacity', 0)
        component.append(text)
    }

    // 遮罩层
    var cns = document.createElement('canvas')
    var ctx = cns.getContext('2d')
    $(cns).css('zIndex', 3)
    cns.width = ctx.width = w
    cns.height = ctx.height = h
    component.append(cns)

    ctx.fillStyle = '#eee'
    ctx.strokeStyle = '#eee'
    ctx.lineWidth = 1

    var draw = function (per) {
        ctx.clearRect(0, 0, w, h)

        ctx.beginPath()
        ctx.moveTo(r, r)
        if (per <= 0) {
            component.find('.text').css('opacity', 0)
            ctx.arc(r, r, r, 0, 2 * Math.PI)
        } else {
            // 最后一个参数传true代表反向绘制，这里使用调换开始和结束点角度进行顺时针
            // ctx.arc(r, r, r, sAngel + 2 * Math.PI * per, sAngel)
            ctx.arc(r, r, r, sAngel, sAngel + 2 * Math.PI * per, true)
        }
        ctx.fill()
        ctx.stroke()

        if (per >= 1) {
            component.find('.text').css('opacity', 1)
        }
    }

    draw(0)

    // 动画
    component.on('onLoad', function () {
        var s = 0;
        for (i = 0; i < 100; i++) {
            setTimeout(function () {
                s += 0.01
                draw(s)
            }, i * 10 + 500)
        }
    })

    component.on('onLeave', function () {
        var s = 1;
        for (i = 0; i < 100; i++) {
            setTimeout(function () {
                s -= 0.01
                draw(s)
            }, i * 10)
        }
    })

    return component
}