var S = [
    ["Ум", 11, "11%"],
    ["Лень", 99, "99%"],
    ["Запас пельменей", 6, "6%"],
    ["Сила воли", 1, "1%"],
    ["Крошки на груди", 100, "100%"],
    ["Шансы сдать с первого раза", 9, "9%"],
    ["Желание идти на пары", 0.5, "0.5%"],
    ["Уровень «ещё 5 минут»", 100, "100%"],
    ["Вера в чудо перед сессией", 87, "87%"]
];
var st = document.getElementById("stats");
S.forEach(function (s) {
    var d = document.createElement("div");
    d.className = "stat";
    d.innerHTML = "<span>" + s[0] + "</span><div class='bar'><b data-w='" + s[1] + "'></b></div><span>" + s[2] + "</span>";
    st.appendChild(d);
});
setTimeout(function () {
    document.querySelectorAll(".bar b").forEach(function (b) {
        b.style.width = b.dataset.w + "%";
    });
}, 150);

var A = [30, 15, 5, 2, 1, 1, 3, 6, 5, 5, 4, 4, 6, 7, 8, 6, 6, 8, 10, 14, 25, 45, 70, 100],
    c = document.getElementById("chart");
A.forEach(function (v, i) {
    var d = document.createElement("div");
    d.style.height = v + "%";
    d.title = i + ":00";
    if (i >= 23 || i <= 3) d.className = "n";
    c.appendChild(d);
});

document.querySelectorAll(".tag").forEach(function (t) {
    t.addEventListener("click", function () {
        document.querySelectorAll(".tag.on").forEach(function (o) {
            if (o !== t) o.classList.remove("on");
        });
        t.classList.toggle("on");
    });
});

var P = { bed: [65, 50], desk: [210, 50], door: [350, 50], micro: [190, 198], fridge: [340, 205] };
var R = {
    fridge: [
        ["desk", "Особь покидает кровать. Причина: запах чужих пельменей. Классика жанра."],
        ["desk", "Остановка у стола. Проверяет, не появилась ли еда сама. Не появилась. На лице — искреннее удивление."],
        ["micro", "Маршрут через микроволновку. Заглянул, ничего не разогревал, ушёл. Зачем — неизвестно даже ему самому."],
        ["fridge", "Холодильник открыт. Внутри горчица и надпись «НЕ ТРОГАТЬ». Особь, конечно же, трогает. Потому что хуй с ним."]
    ],
    micro: [
        ["desk", "Особь встаёт. Звук для науки: хруст сустава и тихий стон «бля, опять вставать»."],
        ["micro", "Достигнута микроволновка. Пельмени греются 14 минут вместо 5. Терпение на нуле, как и сила воли."],
        ["micro", "Тарелка пуста. Вилка в стороне. Пельмени съедены в режиме промышленного пылесоса. Миссия выполнена. Можно обратно в кровать."]
    ],
    pair: [
        ["desk", "Особь надевает ту самую толстовку. Ритуал подготовки занял почти 2 часа. Уже устал от самого факта сборов."],
        ["door", "Особь у двери на пары. Рука на ручке, взгляд почти героический. Кажется, сейчас случится чудо."],
        ["bed", "Миграция прервана: особь передумала на пороге («а вдруг дождь / холодно / лень / просто хуйню») и вернулась в кровать. Староста орёт. Мы тоже."]
    ]
};
var mk = document.getElementById("mk"),
    log = document.getElementById("log"),
    bs = document.querySelectorAll("button");

function add(t) {
    var l = document.createElement("li");
    l.textContent = t;
    log.insertBefore(l, log.firstChild);
}

function mv(k) {
    var p = P[k];
    mk.style.transform = "translate(" + p[0] + "px," + p[1] + "px)";
}

bs.forEach(function (b) {
    b.addEventListener("click", function () {
        var route = R[b.dataset.r],
            i = 0;
        bs.forEach(function (x) {
            x.disabled = true;
        });
        mk.style.transition = "none";
        mv("bed");
        void mk.getBoundingClientRect();
        mk.style.transition = "";
        log.innerHTML = "";
        add("Начало наблюдения. Камера включена, герой не в курсе (как всегда).");
        (function step() {
            if (i >= route.length) {
                bs.forEach(function (x) {
                    x.disabled = false;
                });
                return;
            }
            mv(route[i][0]);
            var t = route[i][1];
            i++;
            setTimeout(function () {
                add(t);
            }, 900);
            setTimeout(step, 2300);
        })();
    });
});