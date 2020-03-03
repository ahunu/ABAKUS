(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
            typeof define === 'function' && define.amd ? define(['exports'], factory) :
            (factory((global.pell = {})));
}(this, (function (exports) {
    'use strict';

    var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };

    var defaultParagraphSeparatorString = 'defaultParagraphSeparator';
    var formatBlock = 'formatBlock';
    var addEventListener = function addEventListener(parent, type, listener) {
        return parent.addEventListener(type, listener);
    };
    var appendChild = function appendChild(parent, child) {
        return parent.appendChild(child);
    };
    var createElement = function createElement(tag) {
        return document.createElement(tag);
    };
    var queryCommandState = function queryCommandState(command) {
        return document.queryCommandState(command);
    };
    var queryCommandValue = function queryCommandValue(command) {
        return document.queryCommandValue(command);
    };

    var exec = function exec(command) {
        var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        return document.execCommand(command, false, value);
    };

    var defaultActions = {
        bold: {
            icon: '<b>F</b>',
            title: 'Fett',
            state: function state() {
                return queryCommandState('bold');
            },
            result: function result() {
                return exec('bold');
            }
        },
        italic: {
            icon: '<i>K</i>',
            title: 'Kursiv',
            state: function state() {
                return queryCommandState('italic');
            },
            result: function result() {
                return exec('italic');
            }
        },
        underline: {
            icon: '<u>U</u>',
            title: 'Unterstreichen',
            state: function state() {
                return queryCommandState('underline');
            },
            result: function result() {
                return exec('underline');
            }
        },
        superscript: {
            icon: '<sup>H</sup>',
            title: 'Hochstellen',
            state: function state() {
                return queryCommandState('superscript');
            },
            result: function result() {
                return exec('superscript');
            }
        },
        subscript: {
            icon: '<sub>T</sub>',
            title: 'Tiefstellen',
            state: function state() {
                return queryCommandState('subscript');
            },
            result: function result() {
                return exec('subscript');
            }
        },
        strikethrough: {
            icon: '<strike>S</strike>',
            title: 'Strike-through',
            state: function state() {
                return queryCommandState('strikeThrough');
            },
            result: function result() {
                return exec('strikeThrough');
            }
        },
        heading1: {
            icon: '<b>H<sub>1</sub></b>',
            title: 'Heading 1',
            result: function result() {
                return exec(formatBlock, '<h1>');
            }
        },
        heading2: {
            icon: '<b>H<sub>2</sub></b>',
            title: 'Heading 2',
            result: function result() {
                return exec(formatBlock, '<h2>');
            }
        },
        paragraph: {
            icon: '&#182;',
            title: 'Paragraph',
            result: function result() {
                return exec(formatBlock, '<p>');
            }
        },
        quote: {
            icon: '&#8220; &#8221;',
            title: 'Quote',
            result: function result() {
                return exec(formatBlock, '<blockquote>');
            }
        },
        olist: {
            icon: '1.',
            title: 'Nummerieren',
            result: function result() {
                return exec('insertOrderedList');
            }
        },
        ulist: {
            icon: '&#8226;',
            title: 'Gruppieren',
            result: function result() {
                return exec('insertUnorderedList');
            }
        },
        code: {
            icon: '&lt;/&gt;',
            title: 'Code',
            result: function result() {
                return exec(formatBlock, '<pre>');
            }
        },
        line: {
            icon: '&#8213;',
            title: 'Trennlinie',
            result: function result() {
                return exec('insertHorizontalRule');
            }
        },
        links: {
            icon: '&#128279;',
            title: 'Link',
            result: function result() {
                var url = window.prompt('Vollständige URL:');
                if (url) {
                    var prompt = window.prompt('Link:');
                    if (prompt)
                        exec('insertHTML', '<span class="cBlau P" onclick="window.open(\'' + url + '\')">' + prompt + '</span>');
                }
            }
        },
        link: {
            icon: '&#128279;',
            title: 'Link',
            result: function result() {
                var url = window.prompt('URL: (Immer mit http:// oder https://.)');
                if (url)
                    exec('createLink', url);
            }
        },
        image: {
            icon: '&#128247;',
            title: 'Image',
            result: function result() {
                var url = window.prompt('Enter the image URL');
                if (url)
                    exec('insertImage', url);
            }
        },
        fotoS: {
            icon: '&FilledSmallSquare;',
            title: 'Ein kleines Foto einfügen',
            result: function result() {
                var url = window.prompt('Google-Drive-Link:');
                if (url) {
                    if (url.indexOf('/file/d/') > 1) {
                        url = url.substr(url.indexOf('/file/d/') + 8);
                    }
                    if (url.indexOf('/open?id=') > 1) {
                        url = url.substr(url.indexOf('/open?id=') + 9);
                    }
                    if (url.indexOf('/view?') > 1) {
                        url = url.substr(0, url.indexOf('/view?'));
                    }
                    exec('insertHTML', '<img class="cFotoS" src="https://drive.google.com/uc?id=' + url + '" style="float:right; margin-left: 15px;"/>');
                }
            }
        },
        fotoM: {
            icon: '&marker;',
            title: 'Ein mittelgroßes Foto einfügen',
            result: function result() {
                var url = window.prompt('Google-Drive-Link:');
                if (url) {
                    if (url.indexOf('/file/d/') > 1) {
                        url = url.substr(url.indexOf('/file/d/') + 8);
                    }
                    if (url.indexOf('/open?id=') > 1) {
                        url = url.substr(url.indexOf('/open?id=') + 9);
                    }
                    if (url.indexOf('/view?') > 1) {
                        url = url.substr(0, url.indexOf('/view?'));
                    }
                    exec('insertHTML', '<img class="cFotoM" src="https://drive.google.com/uc?id=' + url + '" style="float:left; margin-right: 15px;"/>');
                }
            }
        },
        fotoL: {
            icon: '&block;',
            title: 'Ein großes Foto einfügen',
            result: function result() {
                var url = window.prompt('Google-Drive-Link:');
                if (url) {
                    if (url.indexOf('/file/d/') > 1) {
                        url = url.substr(url.indexOf('/file/d/') + 8);
                    }
                    if (url.indexOf('/open?id=') > 1) {
                        url = url.substr(url.indexOf('/open?id=') + 9);
                    }
                    if (url.indexOf('/view?') > 1) {
                        url = url.substr(0, url.indexOf('/view?'));
                    }
                    exec('insertHTML', '<img class="cFotoL" src="https://drive.google.com/uc?id=' + url + '"/>');
                }
            }
        },
        undo: {
            icon: '<b>&#8630</b>',
            title: 'Rückgängig',
            result: function result() {
                exec('undo');
            }
        },
        redo: {
            icon: '<b>&#8631</b>',
            title: 'Wiederherstellen',
            result: function result() {
                exec('redo');
            }
        }
    };

    var defaultClasses = {
        actionbar: 'pell-actionbar',
        button: 'pell-button',
        content: 'pell-content',
        selected: 'pell-button-selected'
    };

    var init = function init(settings) {
        var actions = settings.actions ? settings.actions.map(function (action) {
            if (typeof action === 'string')
                return defaultActions[action];
            else if (defaultActions[action.name])
                return _extends({}, defaultActions[action.name], action);
            return action;
        }) : Object.keys(defaultActions).map(function (action) {
            return defaultActions[action];
        });

        var classes = _extends({}, defaultClasses, settings.classes);

        var defaultParagraphSeparator = settings[defaultParagraphSeparatorString] || 'div';

        var actionbar = createElement('div');
        actionbar.className = classes.actionbar;
        appendChild(settings.element, actionbar);

        var content = settings.element.content = createElement('div');
        content.contentEditable = true;
        content.className = classes.content;
        content.oninput = function (_ref) {
            var firstChild = _ref.target.firstChild;

            if (firstChild && firstChild.nodeType === 3)
                exec(formatBlock, '<' + defaultParagraphSeparator + '>');
            else if (content.innerHTML === '<br>')
                content.innerHTML = '';
            settings.onChange(content.innerHTML);
        };
        content.onkeydown = function (event) {
            if (event.key === 'Enter' && queryCommandValue(formatBlock) === 'blockquote') {
                setTimeout(function () {
                    return exec(formatBlock, '<' + defaultParagraphSeparator + '>');
                }, 0);
            }
        };
        appendChild(settings.element, content);

        actions.forEach(function (action) {
            var button = createElement('button');
            button.className = classes.button;
            button.innerHTML = action.icon;
            button.title = action.title;
            button.setAttribute('type', 'button');
            button.onclick = function () {
                return action.result() && content.focus();
            };

            if (action.state) {
                var handler = function handler() {
                    return button.classList[action.state() ? 'add' : 'remove'](classes.selected);
                };
                addEventListener(content, 'keyup', handler);
                addEventListener(content, 'mouseup', handler);
                addEventListener(button, 'click', handler);
            }

            appendChild(actionbar, button);
        });

        if (settings.styleWithCSS)
            exec('styleWithCSS');
        exec(defaultParagraphSeparatorString, defaultParagraphSeparator);

        return settings.element;
    };

    var pell = {exec: exec, init: init};

    exports.exec = exec;
    exports.init = init;
    exports['default'] = pell;

    Object.defineProperty(exports, '__esModule', {value: true});

})));

function repairPell(pHtml) {

    if (!pHtml) {
        return null;
    } else {

        // html nach pellEdit reparieren
        var hVon = 0;
        var hBis = 0;

        hVon = pHtml.indexOf('<a href="');
        if (hVon >= 0) {
            hBis = pHtml.substr(hVon + 9).indexOf('"');
            if (hBis >= 0) {
                pHtml = pHtml.substr(0, hVon + 10 + hBis) + ")'" + pHtml.substr(hVon + 10 + hBis);
            }
            pHtml = pHtml.substr(0, hVon) + "<SPAN class='cBlau P N' ONclick='window.open(" + pHtml.substr(hVon + 8);
            hBis = pHtml.substr(hVon).indexOf('</a>');
            if (hBis >= 0) {
                pHtml = pHtml.substr(0, hVon + hBis) + '</SPAN>' + pHtml.substr(hVon + hBis + 4);
            }
        }


        hVon = pHtml.indexOf('<a href="');
        if (hVon >= 0) {
            hBis = pHtml.substr(hVon + 9).indexOf('"');
            if (hBis >= 0) {
                pHtml = pHtml.substr(0, hVon + 10 + hBis) + ")'" + pHtml.substr(hVon + 10 + hBis);
            }
            pHtml = pHtml.substr(0, hVon) + "<SPAN class='cBlau P N' ONclick='window.open(" + pHtml.substr(hVon + 8);
            hBis = pHtml.substr(hVon).indexOf('</a>');
            if (hBis >= 0) {
                pHtml = pHtml.substr(0, hVon + hBis) + '</SPAN>' + pHtml.substr(hVon + hBis + 4);
            }
        }

        if (pHtml.substr(0, 5) === '<div>') {
            pHtml = pHtml.substr(5);
        }
        pHtml = pHtml
                .replace(/<\/b><br><b><br><\/b><br>/g, '<br>aaa<br>') // Um einen Fehler nach '</b><br>' zu korrigieren
                .replace(/<div><br><\/div><div>/g, '<br>')
//                .replace(/<div>/g, '<br>##')
                .replace(/<div><br>/g, '<br><br>')
//                .replace(/<div>/g, '<br>####');
//        pHtml = pHtml.replace(/<a href="/g, '<SPAN class="cBlau P" onclick="').replace(/<\/a>/g, '</SPAN>');

        hVon = 0;
        while (hVon >= 0) {
            hVon = pHtml.indexOf('<div');
            if (hVon < 0) {
                hVon = pHtml.indexOf('</div');
                if (hVon < 0) {
                    hVon = pHtml.indexOf('<span');
                    if (hVon < 0) {
                        hVon = pHtml.indexOf('</span');
                        if (hVon < 0) {
                            hVon = pHtml.indexOf('<p');
                            if (hVon < 0) {
                                hVon = pHtml.indexOf('</p');
                                if (hVon < 0) {
                                    hVon = pHtml.indexOf('<h1');
                                    if (hVon < 0) {
                                        hVon = pHtml.indexOf('</h1');
                                        if (hVon < 0) {
                                            hVon = pHtml.indexOf('<h2');
                                            if (hVon < 0) {
                                                hVon = pHtml.indexOf('</h2');
                                                if (hVon < 0) {
                                                    hVon = pHtml.indexOf('<h3');
                                                    if (hVon < 0) {
                                                        hVon = pHtml.indexOf('</h3');
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (hVon >= 0) {
                hBis = pHtml.substr(hVon).indexOf('>');
                if (hBis > 0) {
                    pHtml = pHtml.substr(0, hVon) + pHtml.substr(hVon + hBis + 1);
                }
            }
        }
        return pHtml;
    }
}