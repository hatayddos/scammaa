/*! http://mths.be/details v0.1.0 by @mathias | includes http://mths.be/noselect v1.0.3 */
;(function(a, f) {
    var e = f.fn, d, c = Object.prototype.toString.call(window.opera) == '[object Opera]', g = (function(l) {
        var j = l.createElement('details'), i, h, k;
        if (!('open'in j)) {
            return false
        }
        h = l.body || (function() {
            var m = l.documentElement;
            i = true;
            return m.insertBefore(l.createElement('body'), m.firstElementChild || m.firstChild)
        }());
        j.innerHTML = '<summary>a</summary>b';
        j.style.display = 'block';
        h.appendChild(j);
        k = j.offsetHeight;
        j.open = true;
        k = k != j.offsetHeight;
        h.removeChild(j);
        if (i) {
            h.parentNode.removeChild(h)
        }
        return k
    }(a)), b = function(i, l, k, h) {
        var j = i.prop('open')
          , m = j && h || !j && !h;
        if (m) {
            i.removeClass('open').prop('open', false).triggerHandler('close.details');
            l.attr('aria-expanded', false);
            k.hide()
        } else {
            i.addClass('open').prop('open', true).triggerHandler('open.details');
            l.attr('aria-expanded', true);
            k.show()
        }
    };
    e.noSelect = function() {
        var h = 'none';
        return this.bind('selectstart dragstart mousedown', function() {
            return false
        }).css({
            MozUserSelect: h,
            msUserSelect: h,
            webkitUserSelect: h,
            userSelect: h
        })
    }
    ;
    if (g) {
        d = e.details = function() {
            return this.each(function() {
                var i = f(this)
                  , h = f('summary', i).first();
                h.attr({
                    role: 'button',
                    'aria-expanded': i.prop('open')
                }).on('click', function() {
                    var j = i.prop('open');
                    h.attr('aria-expanded', !j);
                    i.triggerHandler((j ? 'close' : 'open') + '.details')
                })
            })
        }
        ;
        d.support = g
    } else {
        d = e.details = function() {
            return this.each(function() {
                var h = f(this)
                  , j = f('summary', h).first()
                  , i = h.children(':not(summary)')
                  , k = h.contents(':not(summary)');
                if (!j.length) {
                    j = f('<summary>').text('Details').prependTo(h)
                }
                if (i.length != k.length) {
                    k.filter(function() {
                        return this.nodeType == 3 && /[^ \t\n\f\r]/.test(this.data)
                    }).wrap('<span>');
                    i = h.children(':not(summary)')
                }
                h.prop('open', typeof h.attr('open') == 'string');
                b(h, j, i);
                j.attr('role', 'button').noSelect().prop('tabIndex', 0).on('click', function() {
                    j.focus();
                    b(h, j, i, true)
                }).keyup(function(l) {
                    if (32 == l.keyCode || (13 == l.keyCode && !c)) {
                        l.preventDefault();
                        j.click()
                    }
                })
            })
        }
        ;
        d.support = g
    }
}(document, jQuery));
