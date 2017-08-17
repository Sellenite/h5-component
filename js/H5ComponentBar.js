var H5ComponentBar = function (name, cfg) {
    var component = new H5ComponentBase(name, cfg)

    $.each(cfg.data, function (index, item) {
        var line = $('<div class="line">')
        var name = $('<div class="name">')
        var rate = $('<div class="rate">')
        var per = $('<div class="per">')

        var width = item[1] * 100 + '%'
        rate.css('width', width)
        rate.html('<div class="bg">')

        if (item[2]) {
            rate.find('.bg').css('backgroundColor', item[2])
            per.css('color', item[2])
        }

        name.text(item[0])
        per.text(width)

        line.append(name).append(rate).append(per)
        component.append(line)
    })

    return component
}