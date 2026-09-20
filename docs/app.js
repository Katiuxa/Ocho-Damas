(function () {
  "use strict";

  var SHARE_URL = "https://8damas.com";
  var QUEEN_IMG = (typeof window !== "undefined" && window.OCHO_QUEEN_SRC) ? window.OCHO_QUEEN_SRC : "img/queen-piece.png";
  var firebaseConfig = window.OCHO_FIREBASE_CONFIG || null;

  var traducciones = {
    es: {
      titulo: "8 DAMAS",
      tamanoTablero: "Tamaño del tablero:",
      modoNormal: "Normal",
      modoProblema: "Problemas",
      modoContrarreloj: "Contrarreloj",
      seleccionaDuracion: "Selecciona duración",
      unMinuto: "1 minuto",
      tresMinutos: "3 minutos",
      cincoMinutos: "5 minutos",
      damasTablero: "Damas en el tablero: ",
      conflictos: "Hay conflictos entre las damas.",
      tiempoAgotado: "⏱ ¡Tiempo agotado! Has completado",
      tablero: "tablero(s).",
      reiniciar: "Reiniciar contrarreloj",
      compartirResultado: "✨ Has resuelto el tablero en",
      compartir: "Compartir en:",
      compartirFinal: "Compartir tu resultado en:",
      vaciar: "Vaciar tablero",
      tablerosResueltos: "Tableros resueltos:",
      botonInstrucciones: "¿Cómo jugar?",
      rankingTitulo: "Ranking",
      rankingTamano: "Tablero:",
      rankingDuracion: "Duración:",
      cargando: "Cargando...",
      sinPuntuaciones: "No hay puntuaciones aún.",
      nameTitle: "¡Buen trabajo!",
      nameHint: "Escribe tu nombre para el ranking:",
      save: "Guardar",
      skip: "Cancelar",
      homeTag: "Coloca las reinas. Ninguna puede atacarse.",
      modoNormalSub: "Coloca a tu ritmo",
      desafioSub: "Damas fijas",
      modoContrarrelojSub: "Resuelve tableros",
      rankingSub: "Mejores tiempos",
      homeCredit: "Made with ❤️ by Metamovidas",
      howTitle: "Cómo jugar",
      howBannerTitle: "Cómo jugar",
      howBannerSub: "Coloca las damas en el tablero",
      howProblemTitle: "El problema de las ocho damas",
      howProblemText: "Coloca las damas en el tablero de modo que ninguna ataque a otra: no pueden compartir fila, columna ni diagonal.",
      howNormalText: "Coloca las damas a tu ritmo. El botón Ayuda, dentro de la partida, marca en rojo los conflictos entre las damas.",
      howProblemMode: "Resuelve el tablero con varias damas ya colocadas. Pertenecen a una solución válida y no se pueden mover.",
      howTimedText: "Completa tantos tableros como puedas antes de que se acabe el tiempo. Cada uno empieza con damas fijas.",
      timeTitle: "Elige duración",
      playLibre: "Normal",
      playProblema: "Problemas",
      playTimed: "Contrarreloj",
      ayuda: "Ayuda",
      sizeTitle: "Tablero",
      pcDesafio: "Desafío",
      pcTipo: "Contrarreloj",
      pcTipoSub: "Resuelve la mayor cantidad de tableros",
      musicLabel: "Música",
      sfxLabel: "Sonido"
    },
    en: {
      titulo: "8 QUEENS",
      tamanoTablero: "Board size:",
      modoNormal: "Normal",
      modoProblema: "Challenge",
      modoContrarreloj: "Type",
      seleccionaDuracion: "Select duration",
      unMinuto: "1 minute",
      tresMinutos: "3 minutes",
      cincoMinutos: "5 minutes",
      damasTablero: "Queens on the board: ",
      conflictos: "There are conflicts between the queens.",
      tiempoAgotado: "⏱ Time's up! You've completed",
      tablero: "board(s).",
      reiniciar: "Restart timed mode",
      compartirResultado: "✨ You've solved the board in",
      compartir: "Share on:",
      compartirFinal: "Share your result on:",
      vaciar: "Clear board",
      tablerosResueltos: "Boards solved:",
      botonInstrucciones: "How to play?",
      rankingTitulo: "Ranking",
      rankingTamano: "Board size:",
      rankingDuracion: "Duration:",
      cargando: "Loading...",
      sinPuntuaciones: "No scores yet.",
      nameTitle: "Nice work!",
      nameHint: "Enter your name for the ranking:",
      save: "Save",
      skip: "Cancel",
      homeTag: "Place the queens. None may attack another.",
      modoNormalSub: "Play at your pace",
      desafioSub: "Fixed queens",
      modoContrarrelojSub: "Solve boards",
      rankingSub: "Best times",
      homeCredit: "Made with ❤️ by Metamovidas",
      howTitle: "How to play",
      howBannerTitle: "How to play",
      howBannerSub: "Place the queens on the board",
      howProblemTitle: "The eight queens problem",
      howProblemText: "Place the queens so that none attack another: they cannot share a row, column, or diagonal.",
      howNormalText: "Place queens at your own pace. The Help button in-game marks attacking queens in red.",
      howProblemMode: "Solve the board with some queens already placed. They belong to a valid solution and cannot be moved.",
      howTimedText: "Solve as many boards as you can before time runs out. Each starts with fixed queens.",
      timeTitle: "Pick a duration",
      playLibre: "Normal",
      playProblema: "Challenge",
      playTimed: "Timed",
      ayuda: "Help",
      sizeTitle: "Board",
      pcDesafio: "Challenge",
      pcTipo: "Timed",
      pcTipoSub: "Solve as many boards as you can",
      musicLabel: "Music",
      sfxLabel: "Sound"
    },
    fr: {
      titulo: "8 REINES",
      tamanoTablero: "Taille de l'échiquier :",
      modoNormal: "Normal",
      modoProblema: "Défi",
      modoContrarreloj: "Chrono",
      seleccionaDuracion: "Choisir la durée",
      unMinuto: "1 minute",
      tresMinutos: "3 minutes",
      cincoMinutos: "5 minutes",
      damasTablero: "Reines sur l'échiquier : ",
      conflictos: "Il y a des conflits entre les reines.",
      tiempoAgotado: "⏱ Temps écoulé ! Vous avez complété",
      tablero: "échiquier(s).",
      reiniciar: "Redémarrer le mode chronométré",
      compartirResultado: "✨ Vous avez résolu l’échiquier en",
      compartir: "Partager sur :",
      compartirFinal: "Partager votre résultat sur :",
      vaciar: "Vider l’échiquier",
      tablerosResueltos: "Échiquiers résolus :",
      botonInstrucciones: "Comment jouer ?",
      rankingTitulo: "Classement",
      rankingTamano: "Taille :",
      rankingDuracion: "Durée :",
      cargando: "Chargement...",
      sinPuntuaciones: "Aucun score pour l’instant.",
      nameTitle: "Bravo !",
      nameHint: "Entrez votre nom pour le classement :",
      save: "Enregistrer",
      skip: "Annuler",
      homeTag: "Placez les dames. Aucune ne doit s'attaquer.",
      modoNormalSub: "À votre rythme",
      desafioSub: "Dames fixes",
      modoContrarrelojSub: "Résous des plateaux",
      rankingSub: "Meilleurs temps",
      homeCredit: "Made with ❤️ by Metamovidas",
      howTitle: "Comment jouer",
      howBannerTitle: "Comment jouer",
      howBannerSub: "Placez les dames sur l'échiquier",
      howProblemTitle: "Le problème des huit dames",
      howProblemText: "Placez les dames de sorte qu'aucune n'en attaque une autre : pas la même ligne, colonne ou diagonale.",
      howNormalText: "Placez les dames à votre rythme. Le bouton Aide en partie marque en rouge les conflits entre dames.",
      howProblemMode: "Résolvez l'échiquier avec des dames déjà placées. Elles font partie d'une solution valide et ne bougent pas.",
      howTimedText: "Résolvez autant d'échiquiers que possible avant la fin du temps. Chacun commence avec des dames fixes.",
      timeTitle: "Choisissez la durée",
      playLibre: "Normal",
      playProblema: "Défi",
      playTimed: "Chrono",
      ayuda: "Aide",
      sizeTitle: "Échiquier",
      pcDesafio: "Défi",
      pcTipo: "Chrono",
      pcTipoSub: "Résous le plus de plateaux possible",
      musicLabel: "Musique",
      sfxLabel: "Sons"
    },
    de: {
      titulo: "8 DAMEN",
      tamanoTablero: "Brettgröße:",
      modoNormal: "Normal",
      modoProblema: "Problem",
      modoContrarreloj: "Zeitmodus",
      seleccionaDuracion: "Dauer wählen",
      unMinuto: "1 Minute",
      tresMinutos: "3 Minuten",
      cincoMinutos: "5 Minuten",
      damasTablero: "Damen auf dem Brett: ",
      conflictos: "Es gibt Konflikte zwischen den Damen.",
      tiempoAgotado: "⏱ Zeit abgelaufen! Du hast",
      tablero: "Brett(e) gelöst.",
      reiniciar: "Zeitmodus neu starten",
      compartirResultado: "✨ Du hast das Brett gelöst in",
      compartir: "Teilen auf:",
      compartirFinal: "Teile dein Ergebnis auf:",
      vaciar: "Brett leeren",
      tablerosResueltos: "Gelöste Bretter:",
      botonInstrucciones: "Wie spielt man?",
      rankingTitulo: "Rangliste",
      rankingTamano: "Größe:",
      rankingDuracion: "Dauer:",
      cargando: "Wird geladen...",
      sinPuntuaciones: "Noch keine Punktzahlen.",
      nameTitle: "Gut gemacht!",
      nameHint: "Gib deinen Namen für die Rangliste ein:",
      save: "Speichern",
      skip: "Abbrechen",
      homeTag: "Setze die Damen. Keine darf eine andere bedrohen.",
      modoNormalSub: "In deinem Tempo",
      desafioSub: "Feste Damen",
      modoContrarrelojSub: "Bretter lösen",
      rankingSub: "Beste Zeiten",
      homeCredit: "Made with ❤️ by Metamovidas",
      howTitle: "So spielt man",
      howBannerTitle: "So spielt man",
      howBannerSub: "Setze die Damen auf das Brett",
      howProblemTitle: "Das Acht-Damen-Problem",
      howProblemText: "Stelle die Damen so, dass keine eine andere angreift: nicht dieselbe Reihe, Spalte oder Diagonale.",
      howNormalText: "Setze die Damen in deinem Tempo. Die Hilfe-Taste im Spiel markiert Konflikte zwischen Damen rot.",
      howProblemMode: "Löse das Brett mit bereits gesetzten Damen. Sie gehören zu einer gültigen Lösung und bleiben stehen.",
      howTimedText: "Löse so viele Bretter wie möglich, bevor die Zeit abläuft. Jedes beginnt mit festen Damen.",
      timeTitle: "Dauer wählen",
      playLibre: "Normal",
      playProblema: "Problem",
      playTimed: "Zeitmodus",
      ayuda: "Hilfe",
      sizeTitle: "Brett",
      pcDesafio: "Herausforderung",
      pcTipo: "Zeitmodus",
      pcTipoSub: "Löse so viele Bretter wie möglich",
      musicLabel: "Musik",
      sfxLabel: "Sound"
    },
    ru: {
      titulo: "8 ФЕРЗЕЙ",
      tamanoTablero: "Размер доски:",
      modoNormal: "Нормальный",
      modoProblema: "Задача",
      modoContrarreloj: "Таймер",
      seleccionaDuracion: "Выберите длительность",
      unMinuto: "1 минута",
      tresMinutos: "3 минуты",
      cincoMinutos: "5 минут",
      damasTablero: "Ферзи на доске: ",
      conflictos: "Есть конфликты между ферзями.",
      tiempoAgotado: "⏱ Время вышло! Ты завершил",
      tablero: "досок.",
      reiniciar: "Сбросить таймер",
      compartirResultado: "✨ Ты решил(а) доску за",
      compartir: "Поделиться:",
      compartirFinal: "Поделиться результатом:",
      vaciar: "Очистить доску",
      tablerosResueltos: "Решено досок:",
      botonInstrucciones: "Как играть?",
      rankingTitulo: "Рейтинг",
      rankingTamano: "Доска:",
      rankingDuracion: "Длительность:",
      cargando: "Загрузка...",
      sinPuntuaciones: "Пока нет результатов.",
      nameTitle: "Отличная работа!",
      nameHint: "Введите имя для рейтинга:",
      save: "Сохранить",
      skip: "Отмена",
      homeTag: "Размести ферзей так, чтобы никто не бил другого.",
      modoNormalSub: "Играйте в своём темпе",
      desafioSub: "Фиксированные ферзи",
      modoContrarrelojSub: "Решай доски",
      rankingSub: "Лучшие результаты",
      homeCredit: "Сделано с ❤️ Metamovidas",
      howTitle: "Как играть",
      howBannerTitle: "Как играть",
      howBannerSub: "Размести ферзей на доске",
      howProblemTitle: "Задача о восьми ферзях",
      howProblemText: "Размести ферзей так, чтобы ни один не бил другого: нельзя быть в одной строке, столбце или диагонали.",
      howNormalText: "Размещай ферзей в своём темпе. Кнопка «Помощь» в игре отмечает красным конфликты между ферзями.",
      howProblemMode: "Реши доску с уже расставленными ферзями. Они принадлежат корректному решению и их нельзя передвигать.",
      howTimedText: "Решай как можно больше досок, пока не закончится время. Каждая начинается с фиксированных ферзей.",
      timeTitle: "Выбери длительность",
      playLibre: "Нормальный",
      playProblema: "Задача",
      playTimed: "Таймер",
      ayuda: "Помощь",
      sizeTitle: "Доска",
      pcDesafio: "Задача",
      pcTipo: "На время",
      pcTipoSub: "Реши как можно больше досок",
      musicLabel: "Музыка",
      sfxLabel: "Звук",
      ayudaTooltip: "Отметить ферзей в конфликте"
    }
  };

  var idiomaActual = "es";
  var db = null;
  var damas = [];
  var damasFijas = [];
  var conflictos = [];
  var tamanoTablero = 8;
  var tiempo = 0;
  var tiempoRestante = 0;
  var tiempoOriginalContrarreloj = 0;
  var intervalo = null;
  var juegoEnCurso = false;
  var modoDesafio = false;
  var modoContrarreloj = false;
  var modoContrarrelojActivo = false;
  var cuentaAtrasIniciada = false;
  var tableroBloqueado = false;
  var tablerosResueltos = 0;
  var pendingScore = null;
  var audioCtx = null;
  var ayudaNormal = localStorage.getItem("ochodamas.help") !== "0";

  var tablero = document.getElementById("tablero");
  var mensaje = document.getElementById("mensaje");
  var contador = document.getElementById("contador");
  var minutosSpan = document.getElementById("minutos");
  var segundosSpan = document.getElementById("segundos");
  var resultado = document.getElementById("resultado");
  var cronometro = document.getElementById("cronometro");
  var compartirFinal = document.getElementById("compartirFinal");

  try {
    if (window.firebase && firebaseConfig && firebaseConfig.apiKey) {
      if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
      db = firebase.database();
    }
  } catch (e) {}

  function t() { return traducciones[idiomaActual] || traducciones.es; }

  function pad(n) { return String(n).padStart(2, "0"); }

  function actualizarCronometro(sec) {
    var s = Math.max(0, sec | 0);
    minutosSpan.textContent = pad(Math.floor(s / 60));
    segundosSpan.textContent = pad(s % 60);
  }

  function detenerTemporizador() {
    juegoEnCurso = false;
    if (intervalo) clearInterval(intervalo);
    intervalo = null;
  }

  function iniciarTemporizador() {
    if (intervalo) return;
    juegoEnCurso = true;
    intervalo = setInterval(function () {
      tiempo += 1;
      actualizarCronometro(tiempo);
    }, 1000);
  }

  function sizeBoard() {
    var n = tamanoTablero;
    var stage = document.querySelector(".board-stage");
    var playHidden = document.getElementById("screen-play").hidden;
    var w;
    var h;
    if (stage && !playHidden) {
      var r = stage.getBoundingClientRect();
      w = Math.max(160, r.width);
      h = Math.max(160, r.height);
      var extra = 0;
      var sizes = document.getElementById("size-row");
      var toolbar = document.getElementById("play-toolbar");
      var solved = document.getElementById("tablerosResueltos");
      if (sizes && !sizes.hidden) extra += sizes.offsetHeight + 6;
      if (toolbar && !toolbar.hidden) extra += toolbar.offsetHeight + 6;
      if (solved && !solved.hidden) extra += solved.offsetHeight;
      extra += 14;
      h = Math.max(160, h - extra);
    } else {
      w = Math.max(160, window.innerWidth - 6);
      h = Math.max(160, window.innerHeight - 112);
    }
    if (isWeb()) {
      // Use most of the viewport for a large web board.
      var maxBoard = Math.min(920, Math.floor(window.innerWidth * 0.72), Math.floor(window.innerHeight * 0.62));
      maxBoard = Math.max(420, maxBoard);
      w = Math.min(w, maxBoard);
      h = Math.min(h, maxBoard);
    }
    var coord = n >= 10 ? 14 : 16;
    var frame = 5;
    var border = 4;
    var cell = Math.floor(Math.min(
      (w - coord - (frame + border) * 2 - 2) / n,
      (h - coord - (frame + border) * 2 - 2) / n
    ));
    cell = Math.max(22, cell);
    document.documentElement.style.setProperty("--cell", cell + "px");
    document.documentElement.style.setProperty("--coord", coord + "px");
    document.documentElement.style.setProperty("--frame", frame + "px");
  }

  function isWeb() {
    return document.documentElement.classList.contains("is-web");
  }

  function isWebPc() {
    // Web version always uses the board as the main page (all widths).
    return isWeb();
  }

  function showHome() {
    // On web the board screen is the main page — never switch to the 4-card menu.
    if (isWebPc()) {
      if (document.getElementById("screen-play").hidden) activarModoNormal();
      return;
    }
    detenerTemporizador();
    document.getElementById("screen-play").hidden = true;
    document.getElementById("screen-home").hidden = false;
    document.body.classList.add("is-home");
    document.body.classList.remove("is-play");
    try { if (window.OchoDamasAds) window.OchoDamasAds.onScreen("home"); } catch (e) {}
  }

  function showPlay() {
    document.getElementById("screen-home").hidden = true;
    document.getElementById("screen-play").hidden = false;
    document.body.classList.remove("is-home");
    document.body.classList.add("is-play");
    updatePlayLabel();
    syncAyudaBtn();
    requestAnimationFrame(function () {
      sizeBoard();
      requestAnimationFrame(sizeBoard);
    });
    try { if (window.OchoDamasAds) window.OchoDamasAds.onScreen("play"); } catch (e) {}
  }

  function updatePlayLabel() {
    var s = t();
    var label = s.playLibre;
    if (modoContrarreloj) label = s.playTimed;
    else if (modoDesafio) label = s.playProblema;
    document.getElementById("play-mode-label").textContent = label;
  }

  function setSize(n) {
    tamanoTablero = parseInt(n, 10);
    document.getElementById("tamano").value = String(tamanoTablero);
    document.querySelectorAll("#size-row .chip").forEach(function (chip) {
      chip.classList.toggle("on", chip.getAttribute("data-size") === String(tamanoTablero));
    });
  }

  function playSound() {
    try {
      if (window.OchoDamasAudio && window.OchoDamasAudio.playMove) {
        window.OchoDamasAudio.playMove();
        return;
      }
    } catch (e0) {}
    try {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      audioCtx = audioCtx || new AC();
      if (audioCtx.state === "suspended") audioCtx.resume();
      var o = audioCtx.createOscillator();
      var g = audioCtx.createGain();
      o.type = "triangle";
      o.frequency.value = 760;
      g.gain.setValueAtTime(0.07, audioCtx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.11);
      o.connect(g);
      g.connect(audioCtx.destination);
      o.start();
      o.stop(audioCtx.currentTime + 0.12);
    } catch (e) {}
    try { if (navigator.vibrate) navigator.vibrate(12); } catch (e2) {}
  }

  function esDamaFija(fila, col) {
    return damasFijas.some(function (d) { return d.fila === fila && d.col === col; });
  }

  function generarSolucionValida(n) {
    var cols = [];
    var i;
    for (i = 0; i < n; i++) cols.push(i);
    for (i = n - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = cols[i]; cols[i] = cols[j]; cols[j] = tmp;
    }
    var estado = [];
    function seguro(fila, col) {
      for (var r = 0; r < fila; r++) {
        var c = estado[r];
        if (c === col || Math.abs(c - col) === fila - r) return false;
      }
      return true;
    }
    function bt(fila) {
      if (fila === n) return true;
      for (var k = 0; k < n; k++) {
        var col = cols[k];
        if (!seguro(fila, col)) continue;
        estado[fila] = col;
        if (bt(fila + 1)) return true;
      }
      return false;
    }
    if (!bt(0)) return generarSolucionValida(n);
    return estado.map(function (col, fila) { return { fila: fila, col: col }; });
  }

  function detectarConflictos() {
    var out = [];
    function add(d) {
      if (!out.some(function (x) { return x.fila === d.fila && x.col === d.col; })) out.push(d);
    }
    for (var i = 0; i < damas.length; i++) {
      for (var j = i + 1; j < damas.length; j++) {
        var d1 = damas[i], d2 = damas[j];
        if (d1.fila === d2.fila || d1.col === d2.col || Math.abs(d1.fila - d2.fila) === Math.abs(d1.col - d2.col)) {
          add(d1); add(d2);
        }
      }
    }
    return out;
  }

  function queenEl() {
    var img = document.createElement("img");
    img.src = QUEEN_IMG;
    img.alt = "♛";
    img.className = "queen-piece";
    img.draggable = false;
    img.setAttribute("decoding", "async");
    img.onerror = function () {
      var span = document.createElement("span");
      span.className = "queen-piece queen-fallback";
      span.textContent = "♛";
      span.setAttribute("aria-hidden", "true");
      if (img.parentNode) img.parentNode.replaceChild(span, img);
    };
    return img;
  }

  function crearTablero() {
    sizeBoard();
    tablero.innerHTML = "";
    var n = tamanoTablero;
    tablero.style.gridTemplateColumns = "var(--coord) repeat(" + n + ", var(--cell))";
    tablero.style.gridTemplateRows = "repeat(" + n + ", var(--cell)) var(--coord)";
    var f, c;
    for (f = 0; f < n; f++) {
      var num = document.createElement("div");
      num.className = "coord-num";
      num.textContent = String(n - f);
      tablero.appendChild(num);
      for (c = 0; c < n; c++) {
        var cell = document.createElement("div");
        cell.className = "casilla " + ((f + c) % 2 === 0 ? "blanca" : "negra");
        cell.dataset.fila = String(f);
        cell.dataset.col = String(c);
        if (damas.some(function (d) { return d.fila === f && d.col === c; })) {
          cell.appendChild(queenEl());
          if (esDamaFija(f, c)) cell.classList.add("fija");
          if (conflictos.some(function (x) { return x.fila === f && x.col === c; })) cell.classList.add("en-conflicto");
        }
        tablero.appendChild(cell);
      }
    }
    var corner = document.createElement("div");
    corner.className = "coord-esquina";
    tablero.appendChild(corner);
    for (c = 0; c < n; c++) {
      var letEl = document.createElement("div");
      letEl.className = "coord-letra";
      letEl.textContent = String.fromCharCode(65 + c);
      tablero.appendChild(letEl);
    }
  }

  function ayudaActiva() {
    return ayudaNormal && !modoDesafio && !modoContrarreloj;
  }

  function syncAyudaBtn() {
    var btn = document.getElementById("btn-ayuda");
    var normal = !modoDesafio && !modoContrarreloj;
    btn.hidden = !normal;
    btn.classList.toggle("on", ayudaNormal);
    btn.setAttribute("aria-pressed", ayudaNormal ? "true" : "false");
    btn.textContent = t().ayuda;
    var sizes = document.getElementById("size-row");
    var bar = document.getElementById("play-bar");
    // Web board page always shows size chips and bottom mode buttons.
    if (isWebPc()) {
      if (sizes) sizes.hidden = false;
      if (bar) bar.hidden = false;
    } else {
      if (sizes) sizes.hidden = normal;
      if (bar) bar.hidden = normal;
    }
  }

  function actualizarEstado() {
    conflictos = [];
    var s = t();
    var lleno = damas.length === tamanoTablero;
    contador.textContent = damas.length + " / " + tamanoTablero;
    contador.className = "";
    if (lleno || ayudaActiva()) conflictos = detectarConflictos();
    if (lleno) {
      if (conflictos.length) {
        mensaje.textContent = "";
        contador.classList.add("bad");
      } else {
        mensaje.textContent = "";
        contador.classList.add("ok");
        if (modoContrarreloj && modoContrarrelojActivo) {
          tablerosResueltos += 1;
          document.getElementById("tablerosResueltos").textContent = s.tablerosResueltos + " " + tablerosResueltos;
          siguienteTableroContrarreloj();
          return;
        }
        detenerTemporizador();
        var m = Math.floor(tiempo / 60);
        var sec = tiempo % 60;
        resultado.innerHTML = s.compartirResultado + " " + m + "m " + sec + "s.";
        document.getElementById("btn-share-result").hidden = false;
        compartirFinal.hidden = false;
      }
    } else {
      mensaje.textContent = "";
      resultado.textContent = "";
      compartirFinal.hidden = true;
      document.getElementById("btn-share-result").hidden = true;
      if (ayudaActiva() && conflictos.length) contador.classList.add("bad");
    }
    crearTablero();
  }

  function noteMove() {
    playSound();
    if (!modoContrarreloj && !juegoEnCurso) iniciarTemporizador();
    if (modoContrarreloj && !cuentaAtrasIniciada) {
      cuentaAtrasIniciada = true;
      iniciarCuentaAtras();
    }
  }

  function manejarClick(fila, col) {
    if (tableroBloqueado) return;
    if (esDamaFija(fila, col)) return;
    var idx = damas.findIndex(function (d) { return d.fila === fila && d.col === col; });
    if (idx >= 0) damas.splice(idx, 1);
    else if (damas.length < tamanoTablero) {
      damas.push({ fila: fila, col: col });
      noteMove();
    }
    actualizarEstado();
  }

  function moverDama(fromF, fromC, toF, toC) {
    if (tableroBloqueado) return false;
    if (fromF === toF && fromC === toC) return false;
    if (esDamaFija(fromF, fromC) || esDamaFija(toF, toC)) return false;
    var fromIdx = damas.findIndex(function (d) { return d.fila === fromF && d.col === fromC; });
    if (fromIdx < 0) return false;
    var toIdx = damas.findIndex(function (d) { return d.fila === toF && d.col === toC; });
    if (toIdx >= 0) {
      damas[fromIdx].fila = toF;
      damas[fromIdx].col = toC;
      damas[toIdx].fila = fromF;
      damas[toIdx].col = fromC;
    } else {
      damas[fromIdx].fila = toF;
      damas[fromIdx].col = toC;
    }
    noteMove();
    actualizarEstado();
    return true;
  }

  function activarModoNormal() {
    modoDesafio = false;
    modoContrarreloj = false;
    modoContrarrelojActivo = false;
    cuentaAtrasIniciada = false;
    tableroBloqueado = false;
    document.getElementById("selectorTiempo").hidden = true;
    document.getElementById("reiniciarContrarreloj").hidden = true;
    document.getElementById("tablerosResueltos").hidden = true;
    tiempo = 0;
    detenerTemporizador();
    actualizarCronometro(0);
    cronometro.classList.remove("danger");
    damas = [];
    damasFijas = [];
    conflictos = [];
    resultado.textContent = "";
    compartirFinal.hidden = true;
    actualizarEstado();
    showPlay();
  }

  function activarDesafio() {
    modoDesafio = true;
    modoContrarreloj = false;
    modoContrarrelojActivo = false;
    cuentaAtrasIniciada = false;
    tableroBloqueado = false;
    document.getElementById("selectorTiempo").hidden = true;
    document.getElementById("reiniciarContrarreloj").hidden = true;
    document.getElementById("tablerosResueltos").hidden = true;
    tiempo = 0;
    detenerTemporizador();
    actualizarCronometro(0);
    cronometro.classList.remove("danger");
    resultado.textContent = "";
    compartirFinal.hidden = true;
    var solucion = generarSolucionValida(tamanoTablero);
    var numFijas = tamanoTablero >= 9 ? 5 : 3;
    damasFijas = solucion.slice().sort(function () { return 0.5 - Math.random(); }).slice(0, numFijas)
      .map(function (d) { return { fila: d.fila, col: d.col }; });
    damas = damasFijas.map(function (d) { return { fila: d.fila, col: d.col }; });
    actualizarEstado();
    showPlay();
  }

  function siguienteTableroContrarreloj() {
    var solucion = generarSolucionValida(tamanoTablero);
    var numFijas = 4;
    if (tamanoTablero === 9) numFijas = 5;
    if (tamanoTablero >= 10) numFijas = 6;
    damasFijas = solucion.slice().sort(function () { return 0.5 - Math.random(); }).slice(0, numFijas)
      .map(function (d) { return { fila: d.fila, col: d.col }; });
    damas = damasFijas.map(function (d) { return { fila: d.fila, col: d.col }; });
    conflictos = [];
    resultado.textContent = "";
    compartirFinal.hidden = true;
    actualizarEstado();
  }

  function iniciarModoContrarreloj(segundos) {
    segundos = parseInt(segundos, 10);
    if (!segundos) return;
    tiempoOriginalContrarreloj = segundos;
    detenerTemporizador();
    modoContrarreloj = true;
    modoContrarrelojActivo = true;
    modoDesafio = true;
    cuentaAtrasIniciada = false;
    tableroBloqueado = false;
    juegoEnCurso = false;
    tiempo = 0;
    tiempoRestante = segundos;
    tablerosResueltos = 0;
    actualizarCronometro(tiempoRestante);
    cronometro.classList.remove("danger");
    document.getElementById("selectorTiempo").hidden = true;
    var solved = document.getElementById("tablerosResueltos");
    solved.hidden = false;
    solved.textContent = t().tablerosResueltos + " 0";
    document.getElementById("reiniciarContrarreloj").hidden = false;
    siguienteTableroContrarreloj();
    cambiarIdioma(idiomaActual);
    showPlay();
  }

  function iniciarCuentaAtras() {
    detenerTemporizador();
    actualizarCronometro(tiempoRestante);
    intervalo = setInterval(function () {
      tiempoRestante -= 1;
      actualizarCronometro(tiempoRestante);
      if (tiempoRestante > 0) return;
      clearInterval(intervalo);
      intervalo = null;
      cronometro.classList.add("danger");
      mensaje.textContent = t().tiempoAgotado + " " + tablerosResueltos + " " + t().tablero;
      if (tablerosResueltos >= 2) openNameModal();
      modoContrarreloj = false;
      modoContrarrelojActivo = false;
      juegoEnCurso = false;
      tableroBloqueado = true;
      document.getElementById("reiniciarContrarreloj").hidden = false;
      try { if (window.OchoDamasAds) window.OchoDamasAds.onGameEnd(); } catch (e) {}
    }, 1000);
  }

  function rankingKey(size, duration) {
    return "ranking/" + size + "x" + size + "_" + duration + "s";
  }

  function mostrarRanking() {
    var list = document.getElementById("rankingLista");
    var size = document.getElementById("rankingTamano").value;
    var duration = document.getElementById("rankingTiempo").value;
    list.innerHTML = "<em>" + t().cargando + "</em>";
    if (!db) {
      list.innerHTML = "<em>" + t().sinPuntuaciones + "</em>";
      return;
    }
    db.ref(rankingKey(size, duration)).orderByChild("puntuacion").limitToLast(20).once("value", function (snapshot) {
      var datos = [];
      snapshot.forEach(function (child) { datos.push(child.val()); });
      datos.sort(function (a, b) { return b.puntuacion - a.puntuacion; });
      if (!datos.length) {
        list.innerHTML = "<em>" + t().sinPuntuaciones + "</em>";
        return;
      }
      var html = "<ol>";
      datos.forEach(function (d) {
        html += "<li><strong>" + escapeHtml(d.nombre || "?") + "</strong>: " + (d.puntuacion || 0) + "</li>";
      });
      html += "</ol>";
      list.innerHTML = html;
    });
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function (ch) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch];
    });
  }

  function guardarEnRanking(nombre, size, duration, score) {
    if (!db) return;
    db.ref(rankingKey(size, duration)).push({ nombre: nombre, puntuacion: score }, function (error) {
      if (error) return;
      document.getElementById("rankingTamano").value = String(size);
      document.getElementById("rankingTiempo").value = String(duration);
      document.getElementById("sheet-rank").hidden = false;
      mostrarRanking();
    });
  }

  function openNameModal() {
    pendingScore = { size: tamanoTablero, duration: tiempoOriginalContrarreloj, score: tablerosResueltos };
    var input = document.getElementById("player-name");
    input.value = localStorage.getItem("ochodamas.player") || "";
    document.getElementById("name-modal").hidden = false;
    setTimeout(function () { input.focus(); }, 50);
  }

  function abrirRedSocial(red, url, texto) {
    var mensajeCompleto = encodeURIComponent(texto + " " + url);
    var urlCodificada = encodeURIComponent(url);
    var shareUrl = "";
    if (red === "x") shareUrl = "https://twitter.com/intent/tweet?text=" + mensajeCompleto;
    if (red === "whatsapp") shareUrl = "https://wa.me/?text=" + mensajeCompleto;
    if (red === "telegram") shareUrl = "https://t.me/share/url?url=" + url + "&text=" + encodeURIComponent(texto);
    if (red === "facebook") shareUrl = "https://www.facebook.com/sharer/sharer.php?u=" + urlCodificada;
    if (navigator.share && (red === "whatsapp" || red === "x")) {
      navigator.share({ title: "8 DAMAS", text: texto, url: url }).catch(function () {
        window.open(shareUrl, "_blank");
      });
      return;
    }
    window.open(shareUrl, "_blank");
  }

  function cambiarIdioma(lang) {
    if (!traducciones[lang]) return;
    idiomaActual = lang;
    localStorage.setItem("ochodamas.lang", lang);
    var s = t();
    document.title = s.titulo;
    document.documentElement.lang = lang;
    document.getElementById("logo").textContent = s.titulo;
    var playLogo = document.getElementById("play-logo");
    if (playLogo) playLogo.textContent = s.titulo;
    document.getElementById("botonInstrucciones").setAttribute("aria-label", s.howTitle);
    document.querySelectorAll("[data-audio-btn='music']").forEach(function (btn) {
      btn.setAttribute("aria-label", s.musicLabel || "Music");
    });
    document.querySelectorAll("[data-audio-btn='sfx']").forEach(function (btn) {
      btn.setAttribute("aria-label", s.sfxLabel || "Sound");
    });
    var btnAyuda = document.getElementById("btn-ayuda");
    if (btnAyuda) btnAyuda.title = s.ayudaTooltip || "Marca las damas en conflicto";
    document.getElementById("lbl-tamano").textContent = s.tamanoTablero;
    document.getElementById("modoNormal").textContent = s.modoNormal;
    document.getElementById("desafio").textContent = s.modoProblema;
    document.getElementById("modoContrarreloj").textContent = s.modoContrarreloj;
    document.getElementById("modoNormalSub").textContent = s.modoNormalSub;
    document.getElementById("desafioSub").textContent = s.desafioSub;
    document.getElementById("modoContrarrelojSub").textContent = s.modoContrarrelojSub;
    document.getElementById("rank-card-name").textContent = s.rankingTitulo;
    document.getElementById("rank-card-sub").textContent = s.rankingSub;
    document.getElementById("pc-problem-name").textContent = s.pcDesafio || s.modoProblema;
    document.getElementById("pc-problem-sub").textContent = s.desafioSub;
    document.getElementById("pc-timed-name").textContent = s.pcTipo || s.modoContrarreloj;
    document.getElementById("pc-timed-sub").textContent = s.pcTipoSub || s.modoContrarrelojSub;
    document.getElementById("pc-ranking-name").textContent = s.rankingTitulo;
    document.getElementById("pc-ranking-sub").textContent = s.rankingSub;
    document.getElementById("pc-how-name").textContent = s.howBannerTitle;
    document.getElementById("home-credit").textContent = s.homeCredit;
    var playCredit = document.getElementById("play-credit");
    if (playCredit) playCredit.textContent = s.homeCredit;
    document.getElementById("how-banner-title").textContent = s.howBannerTitle;
    document.getElementById("how-title").textContent = s.howTitle;
    document.getElementById("how-problem-title").textContent = s.howProblemTitle;
    document.getElementById("how-problem-text").textContent = s.howProblemText;
    document.getElementById("how-normal-name").textContent = s.modoNormal;
    document.getElementById("how-normal-text").textContent = s.howNormalText;
    document.getElementById("how-problem-name").textContent = s.modoProblema;
    document.getElementById("how-problem-mode").textContent = s.howProblemMode;
    document.getElementById("how-timed-name").textContent = s.modoContrarreloj;
    document.getElementById("how-timed-text").textContent = s.howTimedText;
    document.getElementById("time-title").textContent = s.timeTitle;
    document.getElementById("size-title").textContent = s.sizeTitle;
    document.getElementById("rank-title").textContent = s.rankingTitulo;
    document.getElementById("reset").textContent = s.vaciar;
    document.getElementById("reiniciarContrarreloj").textContent = s.reiniciar;
    document.getElementById("btn-share-result").textContent = s.compartir;
    document.getElementById("lbl-rank-size").textContent = s.rankingTamano;
    document.getElementById("lbl-rank-time").textContent = s.rankingDuracion;
    document.getElementById("name-title").textContent = s.nameTitle;
    document.getElementById("name-hint").textContent = s.nameHint;
    document.getElementById("name-save").textContent = s.save;
    document.getElementById("name-skip").textContent = s.skip;
    document.getElementById("pick-60").textContent = s.unMinuto;
    document.getElementById("pick-180").textContent = s.tresMinutos;
    document.getElementById("pick-300").textContent = s.cincoMinutos;
    document.querySelectorAll(".lang-menu [data-lang]").forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
    });
    contador.textContent = damas.length + " / " + tamanoTablero;
    var solved = document.getElementById("tablerosResueltos");
    if (!solved.hidden) solved.textContent = s.tablerosResueltos + " " + tablerosResueltos;
    updatePlayLabel();
    syncAyudaBtn();
  }

  function closeSheets() {
    ["sheet-how", "sheet-time", "sheet-size", "sheet-rank", "name-modal"].forEach(function (id) {
      document.getElementById(id).hidden = true;
    });
  }

  function applySizeAndRestart(n) {
    setSize(n);
    tiempo = 0;
    detenerTemporizador();
    actualizarCronometro(0);
    resultado.textContent = "";
    compartirFinal.hidden = true;
    if (modoContrarreloj) iniciarModoContrarreloj(tiempoOriginalContrarreloj || 60);
    else if (modoDesafio) activarDesafio();
    else activarModoNormal();
  }

  var dragState = null;
  var ghost = null;

  function hideGhost() {
    if (ghost) ghost.hidden = true;
    tablero.querySelectorAll(".casilla.dragging").forEach(function (el) {
      el.classList.remove("dragging");
    });
  }

  function showGhost(x, y) {
    if (!ghost) {
      ghost = document.createElement("img");
      ghost.src = QUEEN_IMG;
      ghost.alt = "";
      ghost.className = "queen-ghost";
      document.body.appendChild(ghost);
    }
    ghost.hidden = false;
    ghost.style.left = x + "px";
    ghost.style.top = y + "px";
  }

  tablero.addEventListener("pointerdown", function (ev) {
    var cell = ev.target.closest(".casilla");
    if (!cell || tableroBloqueado) return;
    var fila = Number(cell.dataset.fila);
    var col = Number(cell.dataset.col);
    var hasQueen = damas.some(function (d) { return d.fila === fila && d.col === col; });
    dragState = {
      fila: fila,
      col: col,
      x: ev.clientX,
      y: ev.clientY,
      moved: false,
      piece: hasQueen && !esDamaFija(fila, col)
    };
    if (dragState.piece) {
      try { tablero.setPointerCapture(ev.pointerId); } catch (e) {}
      ev.preventDefault();
    }
  });
  tablero.addEventListener("pointermove", function (ev) {
    if (!dragState || !dragState.piece) return;
    var dx = ev.clientX - dragState.x;
    var dy = ev.clientY - dragState.y;
    if (!dragState.moved && dx * dx + dy * dy < 64) return;
    if (!dragState.moved) {
      dragState.moved = true;
      var src = tablero.querySelector(".casilla[data-fila=\"" + dragState.fila + "\"][data-col=\"" + dragState.col + "\"]");
      if (src) src.classList.add("dragging");
    }
    showGhost(ev.clientX, ev.clientY);
  });
  function endDrag(ev) {
    if (!dragState) return;
    var state = dragState;
    dragState = null;
    hideGhost();
    lastPointerHandledAt = Date.now();
    if (state.piece && state.moved) {
      var el = document.elementFromPoint(ev.clientX, ev.clientY);
      var cell = el && el.closest ? el.closest(".casilla") : null;
      if (cell) moverDama(state.fila, state.col, Number(cell.dataset.fila), Number(cell.dataset.col));
      return;
    }
    manejarClick(state.fila, state.col);
  }
  var lastPointerHandledAt = 0;
  tablero.addEventListener("pointerup", endDrag);
  tablero.addEventListener("pointercancel", function () {
    dragState = null;
    hideGhost();
  });
  // Fallback if pointer events don't finish a place/remove.
  tablero.addEventListener("click", function (ev) {
    if (Date.now() - lastPointerHandledAt < 450) return;
    if (tableroBloqueado) return;
    var cell = ev.target.closest(".casilla");
    if (!cell) return;
    manejarClick(Number(cell.dataset.fila), Number(cell.dataset.col));
  });
  function closeLangMenu() {
    document.querySelectorAll(".lang-menu").forEach(function (menu) {
      menu.hidden = true;
    });
  }

  function toggleLangMenu(menuId) {
    var menu = document.getElementById(menuId);
    if (!menu) return;
    var open = menu.hidden;
    closeLangMenu();
    menu.hidden = !open;
  }

  document.getElementById("btn-lang").addEventListener("click", function (ev) {
    ev.stopPropagation();
    toggleLangMenu("selector-idioma");
  });
  document.getElementById("btn-lang-play").addEventListener("click", function (ev) {
    ev.stopPropagation();
    toggleLangMenu("selector-idioma-play");
  });
  document.querySelectorAll(".lang-menu").forEach(function (menu) {
    menu.addEventListener("click", function (ev) {
      ev.stopPropagation();
    });
  });
  document.querySelectorAll(".lang-menu [data-lang]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      cambiarIdioma(btn.getAttribute("data-lang"));
      closeLangMenu();
    });
  });
  document.addEventListener("click", function () { closeLangMenu(); });
  document.getElementById("botonInstrucciones").addEventListener("click", function () {
    document.getElementById("sheet-how").hidden = false;
  });
  var playLogoBtn = document.getElementById("play-logo-btn");
  if (playLogoBtn) {
    playLogoBtn.addEventListener("click", function () {
      window.location.reload();
    });
    playLogoBtn.addEventListener("keydown", function (ev) {
      if (ev.key === "Enter" || ev.key === " ") {
        ev.preventDefault();
        window.location.reload();
      }
    });
  }
  document.getElementById("card-how").addEventListener("click", function () {
    document.getElementById("sheet-how").hidden = false;
  });
  document.getElementById("card-normal").addEventListener("click", function () {
    document.getElementById("sheet-size").hidden = false;
  });
  document.getElementById("card-problem").addEventListener("click", activarDesafio);
  document.getElementById("card-timed").addEventListener("click", function () {
    document.getElementById("sheet-time").hidden = false;
  });
  document.getElementById("pc-problem-btn").addEventListener("click", activarDesafio);
  document.getElementById("pc-timed-btn").addEventListener("click", function () {
    document.getElementById("sheet-time").hidden = false;
  });
  document.getElementById("pc-ranking-btn").addEventListener("click", function () {
    document.getElementById("sheet-rank").hidden = false;
    mostrarRanking();
  });
  document.getElementById("pc-how-btn").addEventListener("click", function () {
    document.getElementById("sheet-how").hidden = false;
  });
  document.querySelectorAll(".size-pick").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.getElementById("sheet-size").hidden = true;
      setSize(btn.getAttribute("data-size"));
      activarModoNormal();
    });
  });
  document.querySelectorAll(".time-pick").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.getElementById("sheet-time").hidden = true;
      iniciarModoContrarreloj(btn.getAttribute("data-time"));
    });
  });
  document.querySelectorAll("[data-close]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.getElementById(btn.getAttribute("data-close")).hidden = true;
    });
  });
  document.getElementById("btn-ayuda").addEventListener("click", function () {
    ayudaNormal = !ayudaNormal;
    localStorage.setItem("ochodamas.help", ayudaNormal ? "1" : "0");
    syncAyudaBtn();
    actualizarEstado();
  });
  document.getElementById("btn-home").addEventListener("click", showHome);
  document.querySelectorAll("#size-row .chip").forEach(function (chip) {
    chip.addEventListener("click", function () { applySizeAndRestart(chip.getAttribute("data-size")); });
  });
  document.getElementById("reiniciarContrarreloj").addEventListener("click", function () {
    tableroBloqueado = false;
    mensaje.textContent = "";
    iniciarModoContrarreloj(tiempoOriginalContrarreloj || 60);
  });
  document.getElementById("reset").addEventListener("click", function () {
    if (modoDesafio) damas = damasFijas.slice();
    else { damas = []; damasFijas = []; }
    conflictos = [];
    resultado.textContent = "";
    mensaje.textContent = "";
    compartirFinal.hidden = true;
    document.getElementById("btn-share-result").hidden = true;
    actualizarEstado();
  });
  document.getElementById("botonRanking").addEventListener("click", function () {
    document.getElementById("sheet-rank").hidden = false;
    mostrarRanking();
  });
  document.getElementById("rankingTamano").addEventListener("change", mostrarRanking);
  document.getElementById("rankingTiempo").addEventListener("change", mostrarRanking);
  document.getElementById("btn-share-result").addEventListener("click", function () {
    var m = Math.floor(tiempo / 60);
    var sec = tiempo % 60;
    var texto = (resultado.textContent || t().titulo) + " " + SHARE_URL;
    if (navigator.share) {
      navigator.share({ title: "8 DAMAS", text: resultado.textContent, url: SHARE_URL }).catch(function () {
        abrirRedSocial("whatsapp", SHARE_URL, resultado.textContent);
      });
    } else abrirRedSocial("whatsapp", SHARE_URL, resultado.textContent);
  });
  document.getElementById("name-skip").addEventListener("click", function () {
    document.getElementById("name-modal").hidden = true;
    pendingScore = null;
  });
  document.getElementById("name-save").addEventListener("click", function () {
    var name = (document.getElementById("player-name").value || "").trim().slice(0, 24);
    if (!name || !pendingScore) return;
    localStorage.setItem("ochodamas.player", name);
    guardarEnRanking(name, pendingScore.size, pendingScore.duration, pendingScore.score);
    document.getElementById("name-modal").hidden = true;
    pendingScore = null;
  });
  window.addEventListener("resize", function () {
    if (isWeb()) {
      document.body.classList.add("web-pc");
      if (document.getElementById("screen-play").hidden) activarModoNormal();
    }
    if (!document.getElementById("screen-play").hidden) sizeBoard();
  });

  window.DamasConsumeBack = function () {
    var lang = document.querySelector(".lang-menu:not([hidden])");
    if (lang) { closeLangMenu(); return true; }
    var ids = ["name-modal", "sheet-rank", "sheet-how", "sheet-time", "sheet-size"];
    for (var i = 0; i < ids.length; i++) {
      var el = document.getElementById(ids[i]);
      if (el && !el.hidden) { el.hidden = true; return true; }
    }
    if (!document.getElementById("screen-play").hidden) {
      if (isWebPc()) return false;
      showHome();
      return true;
    }
    return false;
  };

  var stored = localStorage.getItem("ochodamas.lang");
  if (stored && traducciones[stored]) idiomaActual = stored;
  else if (document.documentElement.classList.contains("is-web") && traducciones.ru) idiomaActual = "ru";
  else {
    var nav = (navigator.language || "es").slice(0, 2);
    if (traducciones[nav]) idiomaActual = nav;
  }
  cambiarIdioma(idiomaActual);
  if (isWeb()) {
    document.body.classList.add("web-pc");
    activarModoNormal();
  } else {
    showHome();
  }
})();
