/**
 * If there are more the one cnzzID used in the page, the counted should be the first included.
 */

var _cnzzEventList = [
    /* ID,                  Category,       Action,     Label,          Value */
    ["5726673_011", "首页", "下载按钮点击", "按钮点击", null],
    ["5726673_012", "详情页", "下载按钮点击", "按钮点击", null],
    ["5726673_013", "作品列表", "下载按钮点击", "按钮点击", null],
    ["5726673_014", "文章列表", "下载按钮点击", "按钮点击", null],

    ["1259822949_002", "Boss直聘", "投票", "138170", null],
    ["1259822949_003", "Boss直聘", "投票", "154132", null],
    ["1259822949_004", "Boss直聘", "投票", "154137", null],
    ["1259822949_005", "Boss直聘", "投票", "156129", null],
    ["1259822949_006", "Boss直聘", "投票", "159182", null],
    ["1259822949_007", "Boss直聘", "投票", "161219", null],
    ["1259822949_008", "Boss直聘", "投票", "150445", null],
    ["1259822949_009", "Boss直聘", "投票", "153846", null],
    ["1259822949_010", "Boss直聘", "投票", "153591", null],
    ["1259822949_011", "Boss直聘", "投票", "160727", null]
];

/**
 * e: System Event
 * eventId: The ID of cnzz event
 * o: this object
 */

function cnzzEvent(e, eventId, o) {
    var target = o.target,
        href = o.href,
        nodeId = o.id;

    var cnzzEvent = null;
    for (var item in _cnzzEventList) {
        if (!_cnzzEventList[item] || _cnzzEventList[item].length < 4) continue;

        var eId = _cnzzEventList[item][0];

        if (eId == eventId) {
            cnzzEvent = _cnzzEventList[item];
            break;
        }
    }

    if (cnzzEvent) {
        var categoryStr = cnzzEvent[1];
        var actionStr = cnzzEvent[2];
        var labelStr = cnzzEvent[3];
        var valueStr = cnzzEvent[4];

        _czc.push(['_trackEvent', categoryStr, actionStr, labelStr, valueStr, nodeId]);
    }

    if (!target || target == '_self') {
        var t;
        if (href) {
            t = setTimeout(function() {
                clearTimeout(t);
                location.href = href;
                return true;
            }, 100);
            if (e && e.preventDefault) {
                e.preventDefault();
            } else {
                window.event.returnValue = false;
            }
            return false;
        }
    } else {
        if (href) {
            window.open(href);
            if (e && e.preventDefault) {
                e.preventDefault();
            } else {
                window.event.returnValue = false;
            }
            return false;
        }
    }
}
